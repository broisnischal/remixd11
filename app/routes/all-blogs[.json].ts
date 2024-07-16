import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { json } from '@remix-run/react';
import { getPosts } from '../.server/posts';

export async function loader({ context: { env } }: LoaderFunctionArgs) {
	const posts = await getPosts();

	return json(posts, {
		headers: {
			'Cache-Control': `public, max-age=${60 * 60 * 24}`,
		},
	});
}
