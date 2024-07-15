import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { ClientActionFunctionArgs, useLoaderData } from '@remix-run/react';
import { drizzle } from 'drizzle-orm/d1';
import { bookmarks } from '~/drizzle/schema.server';

export async function loader({ context }: LoaderFunctionArgs) {
	const db = drizzle(context.env.DB);

	const data = await db.select().from(bookmarks);

	return json({
		data: data,
	});
}

export default function Page() {
	const { data } = useLoaderData<typeof loader>();

	return (
		<div>
			<h1>Bookmarks</h1>
			<h2>Links that I read and liked.</h2>

			<div className="mt-10 flex flex-col gap-3">
				{data.map(data => {
					return (
						<div>
							<a href={data.href}>{data.title}</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}
