import { Form, Link, useFetcher } from '@remix-run/react';
import { Button } from './ui/button';
import { z } from 'zod';
import { useForm } from '@conform-to/react';
import { Input } from './ui/input';

const subscribeSchema = z.object({
	email: z
		.string({
			required_error: 'Please provide your email.',
		})
		.email({
			message: 'Please enter a valid email address.',
		}),
});

export function NewsLetter() {
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
		<div className="m-auto flex flex-col items-start justify-evenly lg:flex-row lg:items-center">
			{/* <div className="flex  flex-col gap-3 ">
				<h2 className="text-4xl font-bold">Newsletter</h2>
				<p className="max-w-[350px] text-balance">
					We are working hard to create this among you, all Developers. Stay
					Tuned for the latest releases and features.
				</p>
			</div> */}
			<div className="flex w-full max-w-full flex-col gap-3 lg:max-w-fit ">
				<h3 className="text-4xl font-bold">Newsletter</h3>

				<div className="flex flex-col gap-3">
					<newsletter.Form
						className="flex items-center justify-center gap-2 dark:bg-black dark:text-zinc-100 "
						method="POST"
					>
						<Input
							type="email"
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
					Sign up to get notified when we launch.
					<Link className="underline underline-offset-2" to="/terms">
						Terms & Conditions
					</Link>
				</p>
			</div>
		</div>
	);
}
