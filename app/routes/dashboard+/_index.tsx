import {
	json,
	type MetaFunction,
	type LoaderFunctionArgs,
	ActionFunctionArgs,
} from '@remix-run/cloudflare';
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react';
import { drizzle } from 'drizzle-orm/d1';
import { SessionStorage } from '~/services/session.server';
import * as schema from '../../drizzle/schema.server';
import { Auth } from '~/services/auth.server';
import { requireUser } from '~/services/auth.utils.server';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { z } from 'zod';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { useIsPending } from '~/lib/misc';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { HoneypotInputs } from 'remix-utils/honeypot/react';
import { BatchItem, BatchResponse } from 'drizzle-orm/batch';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Dashboard | Remix Cloudflare D1 Auth Demo' },
		{
			name: 'description',
			content: 'Welcome to Remix on Cloudflare!',
		},
	];
};

const BookMarkSchema = z.object({
	title: z
		.string({
			required_error: 'Title is required',
		})
		.max(20, "Title can't be too long"),
	href: z.string().url('Must be a valid URL'),
	description: z.string().optional(),
});

export async function loader({ request, context }: LoaderFunctionArgs) {
	await SessionStorage.requireUser(context, request);
	let data = await SessionStorage.readUser(context, request);

	let db = drizzle(context.env.DB, {
		schema,
	});

	const batchResponse = await db.batch([
		db.select().from(schema.users),
		db.select().from(schema.newsletters),
		db.select().from(schema.guestBook),
		db.select().from(schema.bookmarks),
	]);

	if (data?.type != 'nees') {
		throw new Response('Unauthorized', {
			status: 401,
			statusText: 'Opps! You are not nees!',
			cf: { cacheTtl: 0 },
		});
	}

	return json({ data, batchResponse });
}

export default function Dashboard() {
	const data = useLoaderData<typeof loader>();
	const isPending = useIsPending();

	const lastResult = useActionData<typeof action>();

	const [form, fields] = useForm({
		id: 'bookmark',
		constraint: getZodConstraint(BookMarkSchema),
		lastResult: lastResult?.submission,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: BookMarkSchema });
		},
		shouldValidate: 'onSubmit',
		// shouldRevalidate: 'onInput',
	});

	return (
		<main className="w-full">
			<h1 className="text-3xl font-bold">Dashboard</h1>
			<h2>Welcome {data.data?.name?.split(' ')[0]}</h2>
			<br />

			<Card>
				<CardHeader>
					<h2 className="text-2xl font-bold">Analytics</h2>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-4 gap-4">
						<Card>
							<CardHeader className="flex items-center justify-center">
								<h3 className="mb-2">Total User</h3>

								<h2 className="text-6xl font-bold leading-9">
									{data.batchResponse[0].length.toString().padStart(2, '0')}
								</h2>
							</CardHeader>
							<CardContent></CardContent>
						</Card>
						<Card>
							<CardHeader className="flex items-center justify-center">
								<h3 className="mb-2">Subscription</h3>

								<h2 className="text-6xl font-bold leading-9">
									{data.batchResponse[1].length.toString().padStart(2, '0')}
								</h2>
							</CardHeader>
							<CardContent></CardContent>
						</Card>
						<Card>
							<CardHeader className="flex items-center justify-center">
								<h3 className="mb-2">GuestCount</h3>

								<h2 className="text-6xl font-bold leading-9">
									{data.batchResponse[2].length.toString().padStart(2, '0')}
								</h2>
							</CardHeader>
							<CardContent></CardContent>
						</Card>
						<Card>
							<CardHeader className="flex items-center justify-center">
								<h3 className="mb-2">PostShares</h3>

								<h2 className="text-6xl font-bold leading-9">
									{data.batchResponse[3].length.toString().padStart(2, '0')}
								</h2>
							</CardHeader>
							<CardContent></CardContent>
						</Card>
					</div>
				</CardContent>
			</Card>
			<br />
			<Card>
				<CardHeader>
					<h2 className="text-2xl font-bold">Add Bookmark</h2>
				</CardHeader>
				<CardContent>
					<Form
						method="POST"
						{...getFormProps(form)}
						className="flex min-w-[50vw] flex-col gap-3"
					>
						<HoneypotInputs />
						<Input
							placeholder="Enter title"
							className="w-full"
							{...getInputProps(fields.title, { type: 'text' })}
						/>
						<Input
							placeholder="Enter a link of bookmark"
							{...getInputProps(fields.href, { type: 'url' })}
						/>
						<Input
							{...getInputProps(fields.description, { type: 'text' })}
							placeholder="Enter short description (optional)"
						/>
						<input type="hidden" name="_intent" value="bookmark" />
						<Button disabled={isPending} type="submit">
							{isPending ? 'Loading...' : 'Send Message'}
						</Button>
						{form.allErrors && JSON.stringify(form.allErrors)}
					</Form>
				</CardContent>
			</Card>
			<br />

			{/* <img src={user.avatar} alt={`Avatar of ${user.name}`} /> */}
			{/* <Link to="/auth/logout">Logout</Link> */}
		</main>
	);
}

export async function action({ request, context }: ActionFunctionArgs) {
	let formData = await request.formData();

	// checkHoneypot(formData);
	// await SessionStorage.requireAnonymous(context, request);
	const submission = await parseWithZod(formData, {
		schema: intent =>
			BookMarkSchema.transform(async (data, ctx) => {
				if (intent !== null) return { ...data, session: null };

				const session = await SessionStorage.readUser(context, request);

				// if (session?.type != 'nees') {
				// 	ctx.addIssue({
				// 		code: z.ZodIssueCode.custom,
				// 		params: { message: 'You must be logged in to post' },
				// 		path: ['session'],
				// 		message: 'You must be logged in to post',
				// 	});
				// 	return z.NEVER;
				// }

				return { ...data, session };
			}),
		async: true,
	});

	if (submission.status !== 'success' || !submission.value.session) {
		return json(
			{
				submission: submission.reply({
					// resetForm: true,
				}),
			},
			{
				status: 400,
			},
		);
	}

	let db = drizzle(context.env.DB, {
		schema,
	});

	await db.insert(schema.bookmarks).values({
		title: submission.value.title!,
		href: submission.value.href!,
		description: submission.value.description,
		featured: 'true',
		author: submission.value.session.email ?? 'anonymous',
	});

	return json({ submission });
}
