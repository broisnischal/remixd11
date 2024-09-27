import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import Fuse from 'fuse.js';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { getPosts } from '~/.server/posts';
import { Post } from '~/components/post';
import { MetaCreator } from '~/utils/meta';

export async function loader({ request }: LoaderFunctionArgs) {
	const posts = await getPosts();

	const url = new URL(request.url);
	const search = url.searchParams.get('q');

	const fuse = new Fuse(posts, {
		shouldSort: true,
		threshold: 0.6,
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
		return json({
			posts: fuse.search(search).map(({ item }) => item),
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
		<div className="">
			<Form
				method="GET"
				onChange={event => {
					submit(event.currentTarget, {
						// replace: true,
						unstable_flushSync: true,
						unstable_viewTransition: true,
						preventScrollReset: true,
						// navigate: true,
					});

					setAllPosts(posts);
					// setActiveTag(tousetag);
				}}
			>
				{/* <input
					id="search"
					type="text"
					name="q"
					onChange={event => {
						if (event.currentTarget.value === '') {
							setAllPosts(posts);
						}
					}}
					placeholder="Search "
					defaultValue={search || ''}
					className="w-min min-w-[300px] rounded-md border px-2 py-1 placeholder:text-sm"
				/> */}
				<div className="flex flex-col">
					<div className=" flex h-full w-full items-center gap-4 rounded-full border px-5 py-2 lg:max-w-full">
						<SearchIcon size={16} />
						<input
							id="search"
							name="q"
							type="text"
							onChange={event => {
								if (event.currentTarget.value === '') {
									setAllPosts(posts);
								}
							}}
							defaultValue={search || ''}
							placeholder="Search for posts, problems or tags..."
							className="w-full bg-transparent focus:outline-none"
						/>
					</div>
					{/* {allposts.length > 0 && search ? (
						<>
							<p className="text-sm">{allposts.length} results</p>
						</>
					) : (
						<>
							<p className="text-sm"></p>
						</>
					)} */}
				</div>
			</Form>
			<br />
			<div className="tags m-auto flex flex-wrap gap-2">
				{/* <input className="border" type="text" /> */}
				{activeTag &&
					(activeTag.length <= 0 ? (
						<>
							<h2>No search matches the tags</h2>
						</>
					) : (
						activeTag.map((tag, i) => (
							<button
								key={i}
								className={twMerge(
									'tag rounded-md border bg-secondary px-2 text-sm lowercase',
									tag.active && 'border-white bg-black text-white',
								)}
								// disabled={search ? true : false}
								onClick={() => {
									!tag.active
										? handleChange({
												tag: tag.tag,
												active: !tag.active,
											})
										: search
											? null
											: setAllPosts(posts);

									setActiveTag(
										activeTag.map(t => ({
											...t,
											// t.tag === tag.tag
											active:
												t.active == false
													? t.tag == tag.tag
														? true
														: false
													: false,
										})),
									);
								}}
							>
								# {tag.tag}
							</button>
						))
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
			<br />
			<br />
			<div className="flex flex-wrap gap-14">
				{allposts.length <= 0 ? (
					<>No posts found</>
				) : (
					allposts.map((post, i) => (
						<div
							key={i}
							className="min-w-full"
							// rounded-lg  border  bg-zinc-50 p-2 dark:bg-transparent
						>
							<Post key={post.slug} {...post} />
						</div>
					))
				)}
			</div>
		</div>
	);
}
