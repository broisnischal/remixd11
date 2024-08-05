import {
	Form,
	Link,
	useActionData,
	useFetcher,
	useLoaderData,
} from '@remix-run/react';
import { Button } from '../components/ui/button';
import { z } from 'zod';
import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { Input } from '../components/ui/input';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import { newsletters } from '~/drizzle/schema.server';
import { eq } from 'drizzle-orm';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import { SessionStorage } from '~/services/session.server';
import { useIsPending } from '~/lib/misc';
import { MetaCreator } from '~/utils/meta';

export const meta: MetaFunction<typeof loader> = ({
	data,
	matches,
	location,
}) => {
	const url = new URL('https://nischal-dahal.com.np');

	const metadata = MetaCreator({
		title: `Nischal Dahal | Guestbook `,
		description: `Subscribe to Nischal Dahal's newsletter, to get latest updates about cool stuffs`,
		image: '/ogimg.png',
		url: `${url.origin}${location.pathname}`,
		others: [
			{
				tagName: 'link',
				rel: 'canonical',
				href: `${url.origin}${location.pathname}`,
			},
			{
				tagName: 'link',
				rel: 'icon',
				href: 'https://avatars.githubusercontent.com/u/98168009?v=4',
			},
		],
	});

	return [...metadata];
};

const subscribeSchema = z.object({
	email: z
		.string({
			required_error: 'Please provide your email.',
		})
		.email({
			message: 'Please enter a valid email address.',
		}),
});

export async function action({ request, context }: ActionFunctionArgs) {
	const formData = await request.formData();

	const db = drizzle(context.env.DB);

	const submission = await parseWithZod(formData, {
		schema: intent =>
			subscribeSchema.transform(async (data, ctx) => {
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

				const existing = await db
					.select()
					.from(newsletters)
					.where(eq(newsletters.email, data.email))
					.execute();

				if (existing.length > 0) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						params: { message: 'Already Subscribed!' },
						path: ['email'],
						message: 'User is already subscribed.',
					});
					return z.NEVER;
				}

				return { ...data, session };
			}),
		async: true,
	});

	if (submission.status !== 'success') {
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

	// console.log(email);

	await db
		.insert(newsletters)
		.values({ email: submission.value.email, verified: 1 })
		.execute();
	return json(
		{ message: 'Subscribed Successfully!', submission },
		{ status: 201 },
	);
}

export async function loader({ context, request }: LoaderFunctionArgs) {
	let user = await SessionStorage.readUser(context, request);
	if (!user) return json(null);

	return json({
		user,
	});
}

export default function NewsLetter() {
	const newsletter = useFetcher();
	let data = useLoaderData<typeof loader>();
	const isPending = useIsPending();

	const isSubmitting = newsletter.formData?.get('_intent') === 'subscribe';

	let lastResult = useActionData<typeof action>();

	const [form, fields] = useForm({
		id: 'newsletter',
		constraint: getZodConstraint(subscribeSchema),
		lastResult: lastResult?.submission,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: subscribeSchema });
		},
		shouldValidate: 'onSubmit',
		// shouldRevalidate: 'onInput',
	});

	return (
		<div>
			{/* <div className="flex  flex-col gap-3 ">
				<h2 className="text-4xl font-bold">Newsletter</h2>
				<p className="max-w-[350px] text-balance">
					We are working hard to create this among you, all Developers. Stay
					Tuned for the latest releases and features.
				</p>
			</div> */}
			<div>
				<h3 className="mb-4 text-4xl font-bold"> Subscribe to Newsletter</h3>

				<div className="flex flex-col items-start justify-center gap-2">
					<Form
						className="flex flex-col items-start justify-center gap-2   md:flex-row "
						method="POST"
						{...getFormProps(form)}
					>
						<Input
							className="min-w-[300px] md:min-w-[500px]"
							placeholder="Suscribe to our newsletter"
							{...getInputProps(fields.email, { type: 'email' })}
						/>
						<input type="hidden" name="_intent" value="subscribe" />
						<Button disabled={isSubmitting} type="submit" variant="outline">
							{isSubmitting ? 'Loading...' : 'Subscribe'}
						</Button>
					</Form>

					{fields.email.errors && fields.email.errors.length > 0 && (
						<p className="text-sm text-red-500">{fields.email.errors[0]}</p>
					)}

					<Form className="flex  gap-2 " method="POST" {...getFormProps(form)}>
						<Input
							className="hidden"
							readOnly
							value={data?.user.email}
							name="email"
							// {...getInputProps(fields.email, {
							// 	type: 'email',
							// })}
						/>
						{data?.user.email && (
							<Button disabled={isSubmitting} type="submit" variant="outline">
								{isSubmitting ? 'Loading...' : 'Subscribe via Github Email'}
							</Button>
						)}
					</Form>
				</div>
				<p className="mt-2 w-full text-left text-xs text-gray-500 dark:text-gray-400">
					Stay tuned and get notified when I publish something new and
					unsubscribe at any time.{' '}
					<Link className="underline underline-offset-2" to="/terms">
						Terms & Conditions
					</Link>
				</p>

				<br />
				<div className="flex flex-col gap-4">
					<h3 className=" font-bold">
						About once per month, I send an email with:
					</h3>
					<ul className="ml-10 list-disc">
						<li>New guides and tutorials</li>
						<li>New features</li>
						<li>Announcements</li>
						<li>Cool new libraries and packages</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
