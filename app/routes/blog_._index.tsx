import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { getPosts } from '~/.server/posts';
import Hr from '~/components/hr';
import { Post } from '~/components/post';
import { MetaCreator } from '~/utils/meta';

export async function loader({ request }: LoaderFunctionArgs) {
	const posts = await getPosts();

	const url = new URL(request.url);
	const search = url.searchParams.get('q');

	if (search) {
		return json({
			posts: posts
				.filter(post =>
					post.frontmatter.title.toLowerCase().includes(search.toLowerCase()),
				)
				.sort((a, b) => {
					if (!a.frontmatter.published) return 1;
					if (!b.frontmatter.published) return -1;

					const aDate = new Date(a.frontmatter.published);
					const bDate = new Date(b.frontmatter.published);

					if (aDate > bDate) return -1;
					if (aDate < bDate) return 1;

					return 0;
				}),
			search,
		});
	}

	return json({ posts, search });
}

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
				name: 'keywords',
				content:
					data && data.posts.map(post => post.frontmatter.keywords).join(', '),
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
					description: `List of blogs written by Nischal Dahal, ${data && data.posts.length} posts, ${data && data.posts.map(post => post.frontmatter.title).join(', ')}`,
					jobTitle: 'Full Stack Developer',
					telephone: '+977 9741844523',
					genderName: 'male',
					nationality: 'Nepal',
					address: 'Kathmandu, Nepal',
					url: `${url.origin}${location.pathname}`,
					mainEntity: [
						data?.posts.map(post => {
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
	const { posts, search } = useLoaderData<typeof loader>();

	const [allposts, setAllPosts] = useState(posts);

	const nonRepetitiveTags = posts
		.map(post => post.frontmatter.tags)
		.flat()
		.filter((tag, i, arr) => arr.indexOf(tag) === i)
		.filter(tag => tag !== undefined);

	const repetitiveTags = posts
		.map(post => post.frontmatter.tags)
		.flat()
		.filter(tag => tag !== undefined)
		.reduce(
			(acc, tag) => {
				const existingTag = acc.find(t => t.tag === tag);
				if (existingTag) {
					existingTag.count++;
				} else {
					acc.push({ tag, count: 1 });
				}
				return acc;
			},
			[] as { tag: string; count: number }[],
		)
		.filter(tagObj => tagObj.count > 1) // Filter only the repetitive tags
		.map(tagObj => tagObj.tag); // Optionally, just return the tag names

	const tags =
		repetitiveTags.length > 10
			? repetitiveTags.slice(0, 12)
			: [
					...repetitiveTags,
					...nonRepetitiveTags
						.filter(tag => !repetitiveTags.includes(tag))
						.slice(0, 12 - repetitiveTags.length),
				];

	const tousetag = tags.map(tag => ({
		tag,
		active: false,
	}));

	const [activeTag, setActiveTag] = useState(tousetag);

	const handleChange = ({ tag, active }: { tag: string; active: boolean }) => {
		if (tag === '') return;

		setActiveTag(
			tousetag.map(t => ({
				...t,
				// t.active ||
				active: t.tag === tag,
			})),
		);
		const filteredPosts = posts.filter(
			post =>
				(post.frontmatter.tags && post.frontmatter.tags?.includes(tag)) ||
				activeTag.every(t => t.tag === tag),
		);

		setAllPosts(filteredPosts);
	};

	return (
		<div className="">
			<div className="tags flex flex-wrap gap-2">
				<input className="border" type="text" />
				{activeTag &&
					activeTag.map((tag, i) => (
						<button
							key={i}
							className={twMerge(
								'tag rounded-md border bg-secondary px-2 text-sm font-medium lowercase',
								tag.active && 'bg-black text-white',
							)}
							onClick={() => {
								handleChange({
									tag: tag.tag,
									active: false,
								});

								setActiveTag(
									activeTag.map(t => ({
										...t,
										active: t.active || t.tag === tag.tag,
									})),
								);
							}}
						>
							# {tag.tag}
						</button>
					))}
				{/* <button
					className={twMerge(
						'tag rounded-md border bg-secondary px-2 text-sm font-medium lowercase',
					)}
					onClick={() => {}}
				>
					x
				</button> */}
			</div>
			<Hr />
			<ul className="space-y-14 ">
				{allposts.map((post, i) => (
					<div key={i}>
						<li key={i} className="">
							<Post key={post.slug} {...post} />
						</li>
					</div>
				))}
			</ul>
		</div>
	);
}
