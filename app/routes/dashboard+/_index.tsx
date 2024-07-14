import {
	json,
	type MetaFunction,
	type LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import { drizzle } from 'drizzle-orm/d1';
import { SessionStorage } from '~/services/session.server';
import * as schema from '../../drizzle/schema.server';

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
	let user = await SessionStorage.requireUser(context, request);

	// const db = drizzle(context.env.DB, {
	// 	schema: schema,
	// });

	// await db
	// 	.insert(schema.bookmarks)
	// 	.values({
	// 		title: 'Hello World',
	// 		href: 'https://testing',
	// 		author: 'asdf',
	// 		featured: 'true',
	// 	})
	// 	.execute();

	return json(user);
}

export default function Dashboard() {
	const user = useLoaderData<typeof loader>();
	return (
		<main>
			<h1>Dashboard</h1>
			<h2>Welcome {user.name}</h2>
			<img src={user.avatar} alt={`Avatar of ${user.name}`} />
			<Link to="/auth/logout">Logout</Link>
		</main>
	);
}
