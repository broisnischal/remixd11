import {
	json,
	type MetaFunction,
	type LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { drizzle } from 'drizzle-orm/d1';
import { SessionStorage } from '~/services/session.server';
import * as schema from '../../drizzle/schema.server';
import { Auth } from '~/services/auth.server';
import { requireUser } from '~/services/auth.utils.server';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Dashboard | Remix Cloudflare D1 Auth Demo' },
		{
			name: 'description',
			content: 'Welcome to Remix on Cloudflare!',
		},
	];
};

export async function loader({ request, context }: LoaderFunctionArgs) {
	await SessionStorage.requireUser(context, request);
	let data = await SessionStorage.readUser(context, request);

	console.log(data);

	// if (data?.type != 'nees') {
	// 	throw new Response('Unauthorized', {
	// 		status: 401,
	// 		statusText: 'Unauthorized',
	// 		cf: { cacheTtl: 0 },
	// 	});
	// }

	return json({ data });
}

export default function Dashboard() {
	const user = useLoaderData<typeof loader>();
	console.log(user);

	return (
		<main className="w-full">
			<h1 className="text-3xl font-bold">Dashboard</h1>
			<h2>Welcome {user.data?.name?.split(' ')[0]}</h2>
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

								<h2 className="text-6xl font-bold leading-9">99</h2>
							</CardHeader>
							<CardContent></CardContent>
						</Card>
						<Card>
							<CardHeader className="flex items-center justify-center">
								<h3 className="mb-2">Subscription</h3>

								<h2 className="text-6xl font-bold leading-9">12</h2>
							</CardHeader>
							<CardContent></CardContent>
						</Card>
						<Card>
							<CardHeader className="flex items-center justify-center">
								<h3 className="mb-2">GuestCount</h3>

								<h2 className="text-6xl font-bold leading-9">127</h2>
							</CardHeader>
							<CardContent></CardContent>
						</Card>
						<Card>
							<CardHeader className="flex items-center justify-center">
								<h3 className="mb-2">PostShares</h3>

								<h2 className="text-6xl font-bold leading-9">29</h2>
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
					<Form className="flex min-w-[50vw] flex-col gap-3">
						<Input
							name="title"
							type="text"
							placeholder="Enter title"
							className="w-full"
						/>
						<Input
							name="href"
							type="text"
							placeholder="Enter a link of bookmark"
						/>
						<Input
							name="desc"
							type="text"
							placeholder="Enter short description (optional)"
						/>
						<Button type="submit">Submit</Button>
					</Form>
				</CardContent>
			</Card>
			<br />

			{/* <img src={user.avatar} alt={`Avatar of ${user.name}`} /> */}
			{/* <Link to="/auth/logout">Logout</Link> */}
		</main>
	);
}
