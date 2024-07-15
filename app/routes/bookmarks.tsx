import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	unstable_parseMultipartFormData,
	unstable_createMemoryUploadHandler,
} from '@remix-run/cloudflare';
import {
	ClientActionFunctionArgs,
	Form,
	Link,
	useActionData,
	useLoaderData,
} from '@remix-run/react';
import { drizzle } from 'drizzle-orm/d1';
import { bookmarks } from '~/drizzle/schema.server';
import { parseBookmarks } from '~/utils';

export async function loader({ context }: LoaderFunctionArgs) {
	const db = drizzle(context.env.DB);

	const data = await db.select().from(bookmarks);

	return json({
		data: data,
	});
}

export async function action({ request }: ActionFunctionArgs) {
	const filesize = Number(request.headers.get('Content-Length'));

	const formData = await unstable_parseMultipartFormData(
		request,
		unstable_createMemoryUploadHandler({
			filter(args) {
				return args.contentType?.startsWith('text/html');
			},
		}),
	);

	const file = formData.get('bmrk') as File;

	const filecontent = await file.text();

	const parsedBookmark = parseBookmarks(filecontent);

	return json({
		filesize,
		parsedBookmark,
	});
}
export default function Page() {
	const { data } = useLoaderData<typeof loader>();

	const actionData = useActionData<typeof action>();

	return (
		<div>
			<h1>Bookmarks</h1>
			<h2>Links that I read and liked.</h2>

			<Form method="POST" encType="multipart/form-data">
				<input name="bmrk" type="file" accept=".html" />
				<input type="submit" />
			</Form>

			<h2>Size {actionData?.filesize}</h2>
			{actionData?.parsedBookmark.map((item, index) => (
				<a key={index} {...(item.url ? { href: item.url } : {})}>
					{item.title}{' '}
				</a>
			))}

			<div className="mt-10 flex flex-col gap-3">
				{data.map(data => {
					return (
						<div key={data.id}>
							<a href={data.href}>{data.title}</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}
