import { Form, Link, useFetcher } from '@remix-run/react';
import { Button } from '../components/ui/button';
import { z } from 'zod';
import { useForm } from '@conform-to/react';
import { Input } from '../components/ui/input';
import { ActionFunctionArgs, json } from '@remix-run/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import { newsletters } from '~/drizzle/schema.server';
import { eq } from 'drizzle-orm';

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
	const email = formData.get('email') as string;

	console.log(email);
	const db = drizzle(context.env.DB);

	const existing = await db
		.select()
		.from(newsletters)
		.where(eq(newsletters.email, email))
		.execute();

	if (existing.length > 0) {
		return json({ message: 'Already Subscribed!' }, { status: 409 });
	}

	await db.insert(newsletters).values({ email, verified: 1 }).execute();
	return json({ message: 'Subscribed Successfully!' }, { status: 201 });
}

export default function NewsLetter() {
	const newsletter = useFetcher();

	const isSubmitting = newsletter.formData?.get('_intent') === 'subscribe';

	// const [form, fields] = useForm({
	// 	id: 'user',
	// 	// onValidate({ formData }) {
	// 	// 	// return parse(formData, { schema: subscribeSchema });
	// 	// },
	// 	shouldValidate: 'onSubmit',
	// });

	return (
		<div className="">
			{/* <div className="flex  flex-col gap-3 ">
				<h2 className="text-4xl font-bold">Newsletter</h2>
				<p className="max-w-[350px] text-balance">
					We are working hard to create this among you, all Developers. Stay
					Tuned for the latest releases and features.
				</p>
			</div> */}
			<div className="mt-10 flex   w-full max-w-full flex-col gap-6 ">
				<h3 className="text-4xl font-bold"> Subscribe to Newsletter</h3>

				<div className="flex flex-col gap-3">
					<newsletter.Form
						className="flex items-center justify-center gap-2 dark:bg-black dark:text-zinc-100 "
						method="POST"
					>
						<Input
							type="email"
							name="email"
							className="min-w-[30vw]"
							placeholder="Suscribe to our newsletter"
						/>

						<input type="hidden" name="_intent" value="subscribe" />
						<Button disabled={isSubmitting} type="submit" variant="outline">
							{isSubmitting ? 'Loading...' : 'Subscribe'}
						</Button>
					</newsletter.Form>
					{/* <div className="text-[14px] text-red-400">{fields.email.errors}</div> */}
				</div>
				<p className="w-full text-left text-xs text-gray-500 dark:text-gray-400">
					Get notified when I publish something new and unsubscribe at any time.{' '}
					<Link className="underline underline-offset-2" to="/terms">
						Terms & Conditions
					</Link>
				</p>
			</div>
		</div>
	);
}
