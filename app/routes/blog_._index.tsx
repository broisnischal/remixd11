import { json, MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

import { getPosts } from '~/.server/posts';
import Hr from '~/components/hr';
import { Post } from '~/components/post';
import { MetaCreator } from '~/utils/meta';

export const loader = async () => json(await getPosts());

export const meta: MetaFunction<typeof loader> = ({
	data,
	matches,
	location,
}) => {
	const url = new URL('https://nischal-dahal.com.np');

	const metadata = MetaCreator({
		title: `Nischal Dahal | Blogs `,
		description: 'List of blogs written by Nischal Dahal.',
		image: '/ogimg.png',
		url: `${url.origin}${location.pathname}`,
		others: [
			{
				name: 'author',
				content: 'Nischal Dahal',
			},
			{
				name: 'keywords',
				content: data && data.map(post => post.frontmatter.title).join(', '),
			},
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
			{
				'script:ld+json': {
					'@context': 'https://schema.org',
					'@type': 'WebPage',
					name: 'Blogs by Nischal Dahal | broisnees ',
					description: `List of blogs written by Nischal Dahal, ${data && data.length} posts, ${data && data.map(post => post.frontmatter.title).join(', ')}`,
					jobTitle: 'Full Stack Developer',
					telephone: '+977 9741844523',
					genderName: 'male',
					nationality: 'Nepal',
					address: 'Kathmandu, Nepal',
					url: `${url.origin}${location.pathname}`,
					mainEntity: [
						data?.map(post => {
							return {
								'@type': 'Blog',
								// '@type': 'Article',
								name: post.frontmatter.title,
								url: `${url.origin}${post.slug}`,
								description: post.frontmatter.description,
							};
						}),
					],
				},
			},
			{
				tagName: 'meta',
				name: 'robots',
				content: 'index, follow',
			},
		],
	});

	return [...metadata];
};

export default function Component() {
	const posts = useLoaderData<typeof loader>();

	return (
		<div className="">
			<ul className="space-y-10">
				{posts.map(post => (
					<>
						<li key={post.slug}>
							<Post {...post} />
						</li>
						{/* <Hr /> */}
					</>
				))}
			</ul>
		</div>
	);
}
