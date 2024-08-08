import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/react';
import { getPosts } from '../.server/posts';

export async function loader({ context: { env } }: LoaderFunctionArgs) {
	const posts = await getPosts();

	return json(posts, {
		// 'Cache-Control': `public, max-age=${60 * 60 * 24}`,
		headers: {
			'Cache-Control': `public, s-maxage=60, stale-while-revalidate=${60 * 60}`,
		},
	});
}
