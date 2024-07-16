import { GitHubLogoIcon } from '@radix-ui/react-icons';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import {
	ClientActionFunctionArgs,
	Form,
	useActionData,
	useFetcher,
	useLoaderData,
} from '@remix-run/react';
import { HoneypotInputs } from 'remix-utils/honeypot/react';

// import { } from '@conform-to/react';
import { drizzle } from 'drizzle-orm/d1';
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { SessionStorage } from '~/services/session.server';
import * as schema from '../drizzle/schema.server';
import { z } from 'zod';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { checkHoneypot } from '~/services/honeypot.server';
import { useIsPending } from '~/lib/misc';
import { useProfanity } from '~/utils';
import { desc } from 'drizzle-orm';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis/cloudflare';

const GuestBookSchema = z.object({
	message: z
		.string({
			required_error: 'Message is required',
		})
		.min(15, "Message can't be too short"),
	// .refine(async msg => {
	// 	const data = await useProfanity(msg);
	// 	console.log('value');
	// 	console.log(data);
	// 	console.log('value');
	// 	// return ().isProfanity;
	// 	return data.isProfanity;
	// }, "Message can't contain profanity"),
});

export async function loader({ request, context }: LoaderFunctionArgs) {
	// await SessionStorage.requireUser(context, request);
	let data = await SessionStorage.returnUser(context, request);

	// if (data?.type != 'nees') {
	// 	throw new Response('Unauthorized', {
	// 		status: 401,
	// 		statusText: 'Unauthorized',
	// 		cf: { cacheTtl: 0 },
	// 	});
	// }

	const db = drizzle(context.env.DB, {
		schema,
	});

	// let guestbooks = (await db.query.guestBook.findMany()).reverse().limit(5);
	let guestbooks = await db
		.select()
		.from(schema.guestBook)
		.orderBy(desc(schema.guestBook.id))
		.limit(30)
		.offset(0);

	return json({ data, guestbooks });
}

export async function action({ request, context }: ActionFunctionArgs) {
	let formData = await request.formData();

	const ratelimit = new Ratelimit({
		redis: Redis.fromEnv(context.env),
		limiter: Ratelimit.fixedWindow(10, '60 m'),
		enableProtection: true,
		analytics: true,
	});

	const ip =
		request.headers.get('X-Forwarded-For') ?? request.headers.get('x-real-ip');

	const identifier = ip ?? 'global';

	// checkHoneypot(formData);
	// await SessionStorage.requireAnonymous(context, request);
	const submission = await parseWithZod(formData, {
		schema: intent =>
			GuestBookSchema.transform(async (data, ctx) => {
				if (intent !== null) return { ...data, session: null };

				const session = await SessionStorage.readUser(context, request);

				if (!session) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'You must be logged in to post',
					});
					return z.NEVER;
				}

				if ((await useProfanity(data.message)).isProfanity) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['message'],
						params: {
							type: 'profanity',
						},
						message: "Message can't contain profanity.",
					});
					return z.NEVER;
				}

				const { success, limit, remaining, reset } =
					await ratelimit.limit(identifier);

				if (!success) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['message'],
						params: {
							type: 'rateLimit',
							limit,
							remaining,
							reset,
						},
						message: 'Too many messages. Try again later.',
					});
					return z.NEVER;
				}

				return { ...data, session, limit, remaining, reset };
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
				// headers: {
				// 	'X-RateLimit-Limit': limit.toString(),
				// 	'X-RateLimit-Remaining': remaining.toString(),
				// 	'X-RateLimit-Reset': reset.toString(),
				// },
			},
		);
	}

	const { message, limit, remaining, reset } = submission.value;

	let db = drizzle(context.env.DB, {
		schema,
	});

	await db.insert(schema.guestBook).values({
		message: message,
		authorId: submission.value.session.id!,
		email: submission.value.session.email!,
		name: submission.value.session.name!,
	});

	return json(
		{ submission },
		{
			headers: {
				'X-RateLimit-Limit': limit.toString(),
				'X-RateLimit-Remaining': remaining.toString(),
				'X-RateLimit-Reset': reset.toString(),
			},
		},
	);
}
export default function Page() {
	const { data, guestbooks } = useLoaderData<typeof loader>();
	const isPending = useIsPending();
	const lastResult = useActionData<typeof action>();

	// let isSubmitting = fetcher.state !== 'idle';

	const [form, fields] = useForm({
		id: 'guestbook',
		constraint: getZodConstraint(GuestBookSchema),
		lastResult: lastResult?.submission,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: GuestBookSchema });
		},
		shouldValidate: 'onSubmit',
		// shouldRevalidate: 'onInput',
	});

	return (
		<div>
			<br />
			<h1 className="text-3xl font-bold">Sign My Guestbook</h1>
			<br />
			{data?.id ? (
				<Form method="POST" className="w-[50vw]" {...getFormProps(form)}>
					<HoneypotInputs />
					<div className="flex gap-4">
						<Input
							// type="text"
							// name="message"
							// {...conform.input(fields.title)}
							className="min-w-[30vw]"
							placeholder="Leave your kind message..."
							aria-invalid={fields.message.errorId ? true : undefined}
							aria-describedby={fields.message.errorId}
							{...getInputProps(fields.message, { type: 'text' })}
							{...{
								autoFocus: true,
								autoComplete: 'off',
							}}
						/>

						<input type="hidden" name="_intent" value="guestbook" />
						<Button disabled={isPending} type="submit" variant="outline">
							{isPending ? 'Loading...' : 'Send Message'}
						</Button>
					</div>
					{fields.message.errors ? (
						<p id={fields.message.errorId} className="mt-2 text-red-500">
							{fields.message.errors[0]}
						</p>
					) : (
						''
					)}
				</Form>
			) : (
				<Form action="/auth/github" method="POST">
					<Button
						type="submit"
						className="flex items-center justify-center gap-3"
						variant="outline"
					>
						<GitHubLogoIcon /> Sign in with GitHub
					</Button>
				</Form>
			)}

			<ul className="mt-4 flex flex-col gap-3">
				{guestbooks.map(i => (
					<li key={i.id}>
						<strong>{i.name} : </strong> {i.message}
					</li>
				))}
			</ul>

			{/* {JSON.stringify(lastResult, null, 2)} */}
		</div>
	);
}

// export async function clientAction({
// 	request,
// 	serverAction,
// }: ClientActionFunctionArgs) {
// 	let formData = await request.formData();
// 	// validateFormData(formData);
// 	return await serverAction<typeof action>();
// }
