import {
	json,
	type MetaFunction,
	type LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { drizzle } from 'drizzle-orm/d1';
import { SessionStorage } from '~/services/session.server';
import * as schema from '../../drizzle/schema.server';
import { Auth } from '~/services/auth.server';
import { requireUser } from '~/services/auth.utils.server';

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
		<main>
			<h1>Dashboard</h1>
			<h2>
				Welcome {user.data?.email} {user.data?.name}
			</h2>

			{user.data?.type}
			{/* <img src={user.avatar} alt={`Avatar of ${user.name}`} /> */}
			<Link to="/auth/logout">Logout</Link>
		</main>
	);
}
