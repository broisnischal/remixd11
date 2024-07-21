import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import { getPosts } from '~/.server/posts';
import { Post } from '~/components/post';

export const loader = async () => json(await getPosts());

export default function Component() {
	const posts = useLoaderData<typeof loader>();
	console.log(posts.length);

	return (
		<div className="">
			<ul className="space-y-8">
				{posts.map(post => (
					<li key={post.slug}>
						<Post {...post} />
					</li>
				))}
			</ul>
		</div>
	);
}
