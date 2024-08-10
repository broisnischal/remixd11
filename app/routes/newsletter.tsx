import {
	Form,
	Link,
	useActionData,
	useFetcher,
	useLoaderData,
} from '@remix-run/react';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis/cloudflare';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/cloudflare';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { z } from 'zod';
import Hr from '~/components/hr';
import { newsletters } from '~/drizzle/schema.server';
import { useIsPending } from '~/lib/misc';
import { SessionStorage } from '~/services/session.server';
import { MetaCreator } from '~/utils/meta';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
// import SubscribeEmail from '~/template/subscribe-email';
import { render } from '@react-email/render';
import { checkHoneypot } from '~/services/honeypot.server';

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

	const ratelimit = new Ratelimit({
		redis: Redis.fromEnv(context.env),
		limiter: Ratelimit.fixedWindow(4, '1 d'),
		enableProtection: true,
		analytics: true,
	});

	const ip =
		request.headers.get('X-Forwarded-For') ?? request.headers.get('x-real-ip');

	const identifier = ip ?? 'global';

	checkHoneypot(formData);

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
						message: 'Too many request, please try again later.',
					});
					return z.NEVER;
				}

				return { ...data, session, success, limit, remaining, reset };
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

	const res = await fetch('https://api.useplunk.com/v1/track', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${context.env.PLUNK_API_KEY}`,
		},
		body: JSON.stringify({
			event: 'subscribed',
			email: submission.value.email,
			subscribed: false,
			created_at: new Date().toISOString(),
		}),
	}).then(async res => {
		const body = (await res.json()) satisfies {
			success: boolean;
			contact: string;
			event: string;
			timestamp: string;
		};

		const url = new URL(request.url);

		console.log(url);

		const options = {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${context.env.PLUNK_SECRET_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				to: submission.value.email,
				subject: 'Please verify your email',
				body: `<a href='https://${url.host}/verify-subscription/${body.contact}'>Click here</a> to verify your email`,
				// subscribed: false,
				// headers: {},
			}),
		};

		await fetch('https://api.useplunk.com/v1/send', options)
			.then(response => response.json())
			.then(response => console.log(response))
			.catch(err => console.error(err));
	});

	// const body = (await res.json()) satisfies {
	// 	success: boolean;
	// 	contact: string;
	// 	event: string;
	// 	timestamp: string;
	// };

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

	// if (lastResult) {
	// 	// @ts-ignore
	// 	if (lastResult.plunk) {

	// 	}
	// }

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
				<p className="mt-2 w-full text-left text-gray-500 dark:text-gray-400">
					Stay tuned and get notified when I publish something new and
					unsubscribe at any time.{' '}
					<Link className="underline underline-offset-2" to="/terms">
						Terms & Conditions
					</Link>
				</p>

				<Hr />

				<div className="mt-2 flex flex-col gap-4">
					<p className="secondary text-xl ">
						About once per month, I send an email with:
					</p>
					<ul className="secondary ml-10 list-disc">
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
