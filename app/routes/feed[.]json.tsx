import { Response } from '@cloudflare/workers-types';
import { json, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getPosts, PostMeta } from '~/.server/posts';

export async function loader({ request, context }: LoaderFunctionArgs) {
	const url = new URL(request.url);

	const posts = await getPosts();

	const list = posts.reduce((acc, post) => {
		acc.push({
			id: `${post.slug}`,
			url: `https://${url.host}/${post.slug}`,
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
			'A running log of announcements, projects and accomplishments.',
		next_url: 'https://bret.io/2017.json',
		icon: 'https://bret.io/icon-512x512.png',
		author: {
			name: 'Nischal Dahal',
			url: `https://x.com/broisnees`,
			avatar:
				'https://gravatar.com/avatar/8d8b82740cb7ca994449cccd1dfdef5f?size=512',
		},
		items: [...list],
	});
}
