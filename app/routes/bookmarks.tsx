import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
	unstable_parseMultipartFormData,
	unstable_createMemoryUploadHandler,
	MetaFunction,
} from '@remix-run/cloudflare';
import {
	ClientActionFunctionArgs,
	Form,
	Link,
	useActionData,
	useLoaderData,
} from '@remix-run/react';
import { desc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { bookmarks } from '~/drizzle/schema.server';
import { parseBookmarks } from '~/utils';
import { MetaCreator } from '~/utils/meta';
import { Highlight } from './_landing.about/route';

export const meta: MetaFunction<typeof loader> = ({
	data,
	matches,
	location,
}) => {
	const url = new URL('https://nischal-dahal.com.np');

	const metadata = MetaCreator({
		title: `Bookmarks of Nischal Dahal`,
		description: `Bookmarks of Nischal dahal, links that he reads, likes and shares.`,
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

export async function loader({ context }: LoaderFunctionArgs) {
	const db = drizzle(context.env.DB);

	const data = await db.select().from(bookmarks).orderBy(desc(bookmarks.id));

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
		<div className="min-w-[60vw]">
			<br />

			<h1 className="text-3xl font-bold">Bookmarks</h1>
			<h2 className="text-xl ">Links that I read and liked.</h2>

			{/* <Form method="POST" encType="multipart/form-data">
				<input name="bmrk" type="file" accept=".html" />
				<input type="submit" />
			</Form>

			<h2>Size {actionData?.filesize}</h2>
			<div className="flex flex-col gap-2">
				{actionData?.parsedBookmark.map((item, index) => (
					<a key={index} {...(item.url ? { href: item.url } : {})}>
						{item.title}{' '}
					</a>
				))}
			</div> */}

			<div className="mt-10 flex w-full flex-col gap-3 *:border-zinc-200/5 lg:max-w-[60%]">
				{/* <div>
					<a href="" target="_blank" rel="noreferrer">
						<span className="font-nunito font-semibold hover:underline">
							Kubernetes vs Koyeb
						</span>
						<br />
						<small className="font-sans font-normal text-zinc-600 dark:text-zinc-400	">
							First glance to compare the Koyeb Serverless Platform to
							Kubernetes.
						</small>
					</a>
				</div> */}

				{data.map(data => {
					return (
						<div key={data.id}>
							<a href={data.href} target="_blank" rel="noreferrer">
								<span className="font-nunito font-semibold hover:underline">
									{data.title}
								</span>
								<br />
								{data.description && (
									<small className="font-sans font-normal text-zinc-600 dark:text-zinc-400">
										{data.description}
									</small>
								)}
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
}
