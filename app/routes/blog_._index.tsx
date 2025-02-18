import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { Form, Link, useLoaderData, useSubmit } from '@remix-run/react';
import Fuse from 'fuse.js';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { getPosts } from '~/.server/posts';
import Hr from '~/components/hr';
import { Post } from '~/components/post';
import { MetaCreator } from '~/utils/meta';
import { getServerTiming } from '~/utils/timing-server';

export async function loader({ request }: LoaderFunctionArgs) {
	const { time, getServerTimingHeader } = getServerTiming();

	const posts = await time('contentListData', () => getPosts());

	const url = new URL(request.url);
	const search = url.searchParams.get('q');

	// if (search && search?.length <= 2)
	// 	return json({ posts }, { headers: getServerTimingHeader() });

	const fuse = new Fuse(posts, {
		shouldSort: true,
		threshold: 0.3,
		keys: [
			'title',
			'extract',
			'frontmatter.tags',
			'frontmatter.title',
			'frontmatter.keywords',
			'frontmatter.description',
		],
	});

	if (search && search?.length > 1) {
		return json(
			{
				posts: await time('data', () =>
					fuse.search(search).map(({ item }) => item),
				),
				search,
			},
			{ headers: getServerTimingHeader() },
		);
	}

	return json({ posts, search }, { headers: getServerTimingHeader() });
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
	const submit = useSubmit();

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
		<div className="flex flex-wrap gap-y-12">
			{allposts.length <= 0 ? (
				<>No posts found</>
			) : (
				Object.entries(
					allposts.reduce(
						(acc, post) => {
							const year = new Date(post.frontmatter.published).getFullYear();
							return {
								...acc,
								[year]: [...(acc[year] || []), post],
							};
						},
						{} as Record<number, typeof allposts>,
					),
				)
					.sort(([a], [b]) => Number(b) - Number(a))
					.map(([year, posts]) => (
						<div key={year} className="min-w-full">
							<h2 className="mb-4 font-poppins text-xl font-extrabold text-zinc-800 dark:text-gray-300">
								{year}
							</h2>
							<div className="flex flex-col gap-4">
								{posts.map(item => (
									<Link className="" key={item.slug} to={item.slug}>
										<h1 className="font-avenir font-bold text-blue-950 hover:underline dark:text-gray-300">
											{item.frontmatter.title}
										</h1>
									</Link>
								))}
							</div>
						</div>
					))
			)}
		</div>
	);
}
