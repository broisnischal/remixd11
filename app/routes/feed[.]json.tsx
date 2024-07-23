import { Response } from '@cloudflare/workers-types';
import { json, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getPosts, PostMeta } from '~/.server/posts';

export async function loader({ request, context }: LoaderFunctionArgs) {
	const url = new URL(request.url);

	const posts = await getPosts();

	const list = posts.reduce((acc, post) => {
		acc.push({
			id: `${post.slug}`,
			url: `https://${url.host}/blog/${post.slug}`,
			title: post.frontmatter.title,
			content_text: post.frontmatter.description,
			date_published: post.frontmatter.published,
		});
		return acc;
	}, [] as any[]);

	return json({
		version: 'https://jsonfeed.org/version/1',
		title: 'nischal-dahal.com.np',
		home_page_url: `https://${url.host}`,
		feed_url: `https://${url.host}/feed.json`,
		description:
			'Nischal Dahal is a full-stack developer and a founder of nischal-dahal.com.np',
		next_url: 'https://bret.io/2017.json',
		icon: 'https://avatars.githubusercontent.com/u/98168009?v=4',
		author: {
			name: 'Nischal Dahal',
			url: `https://x.com/broisnees`,
			avatar: 'https://avatars.githubusercontent.com/u/98168009?v=4',
		},
		items: [...list],
	});
}
