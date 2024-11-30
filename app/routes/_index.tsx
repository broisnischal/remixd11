import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { Await, defer, json, Link, useLoaderData } from '@remix-run/react';
import { Badge } from '~/components/ui/badge';

import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Suspense } from 'react';
import { HiDocumentText } from 'react-icons/hi';
import { getPosts } from '~/.server/posts';
import { ConnectButton } from '~/components/ui-library/tailwindbutton';
import { MetaCreator } from '~/utils/meta';
import {
	FaConfluence,
	FaConnectdevelop,
	FaHeart,
	FaKissWinkHeart,
} from 'react-icons/fa';
import { configData, MyConfig } from './overview';
import { Post } from '~/components/post';
import moment from 'moment';

// const slugs = [
// 	'typescript',
// 	'javascript',
// 	'dart',
// 	'java',
// 	'react',
// 	'flutter',
// 	'android',
// 	'html5',
// 	'css3',
// 	'nodedotjs',
// 	'express',
// 	'nextdotjs',
// 	'prisma',
// 	'amazonaws',
// 	'postgresql',
// 	'firebase',
// 	'nginx',
// 	'vercel',
// 	'testinglibrary',
// 	'jest',
// 	'cypress',
// 	'docker',
// 	'git',
// 	'jira',
// 	'github',
// 	'gitlab',
// 	'visualstudiocode',
// 	'androidstudio',
// 	'sonarqube',
// 	'figma',
// ];

export const meta: MetaFunction = ({ location }) => {
	const url = new URL('https://nischal-dahal.com.np');

	const metadata = MetaCreator({
		title:
			'Nischal Dahal | Broisnees - Software Engineer & Full Stack Developer | Designer | Learner',
		description:
			'an 18-year-old Developer, Creator, and Designer from Nepal, mostly like RUST, Typescript, Go, I love Crafting enchanting web experiences that seamlessly blend form and function. Best developer in Nepal.',
		image: '/ogimg.png',
		url: `${url.origin}${location.pathname}`,
		others: [
			{
				name: 'keywords',
				content:
					'Nischal, Dahal, Nischal Dahal, Nepal Developer, Broisnees, neeswebservices, nees, best developer, best programmer, from nepal',
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
		],
	});

	return [
		...metadata,
		{
			'script:ld+json': {
				'@context': 'https://schema.org',
				'@type': 'Person',
				name: 'Nischal Dahal ( broisnees )',
				description:
					"I'm a full stack engineer with a focus on serverless architectures,android development, user experience, and product development.",
				url: `${url.origin}`,
				jobTitle: 'Software Engineer and Educator',
				sameAs: [
					'https://dahal-nischal.com.np',
					'https://twitter.com/broisnees',
					'https://github.com/broisnischal',
					'https://www.linkedin.com/in/broisnees/',
				],
				address: 'Kathmandu, Nepal',
				birthPlace: 'Mainapokhari, Dolakha',
				email: 'info@nischal-dahal.com.np',
				gender: 'Male',
				givenName: 'Nischal',
				height: 5.8,
				nationality: 'Nepal',
				image: 'https://avatars.githubusercontent.com/u/98168009?v=4',
				alternateName: 'nees',
				mainEntity: [
					{
						'@type': 'Blog',
						name: 'Nischal Dahal Blogs',
						url: 'https://nischal-dahal.com.np/blog',
						description:
							"Join 6.61k people who have read Nischal's 20 articles on various web development topics",
						blogPost: [
							{
								'@type': 'BlogPosting',
								url: 'https://nischal-dahal.com.np/blog/deploy-bun-elysia-drizzle-flyio-with-wildcard-domain',
							},
							{
								'@type': 'BlogPosting',
								url: 'https://nischal-dahal.com.np/blog/database-design-part-first',
							},
						],
					},
				],
			},
		},
	];
};

export async function loader() {
	const blogs = await getPosts();

	return json({
		blogs,
	});
}

export default function Index() {
	const { blogs } = useLoaderData<typeof loader>();

	return (
		<div className="">
			<div className="flex flex-col gap-8 font-sans">
				<p className=" ">
					I'm a <i className="font-atkinson">Senior Software Engineer </i>
					focusing on serverless architecture, android development, user
					experience, and product development. I am not Stack biased and am
					always open to learning new technologies.
				</p>

				<p className="">
					As a firm believer in transhumanism, I envision a future where
					technology alleviates human suffering and fosters a more harmonious
					world.
				</p>

				<div className="rounded border border-secondary bg-zinc-300/10 px-4 py-2 dark:bg-[#3d3d3d]/20">
					<p className="font-avenir">
						I am not interested in working for enforcement agencies, dictators,
						or companies that contradict transhumanist values or cause harm to
						people.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<span className="font-bold">QuickLinks</span>
					<div>
						<Link to={'/bookmarks'}>
							<span className="font-mono capitalize italic">bookmarks </span> -
							Links to content I liked, sometimes with my commentary.
						</Link>
					</div>
					<div>
						<Link to={'/guestbook'}>
							<span className="font-mono capitalize italic">guestbook </span> -
							appreciation, information, wisdom, anything that is good or bad.
						</Link>
					</div>
					<div>
						<Link to={'/newsletter'}>
							<span className="font-mono capitalize italic">newsletter</span> -
							Subscribe to my newsletter.
						</Link>
					</div>
					<div>
						<Link to={'/talks'}>
							<span className="font-mono capitalize italic">talks</span> -
							Presentations and Talks I've given and attended in the past and
							future.
						</Link>
					</div>
					<div>
						<Link to={'/chat'}>
							<span className="font-mono capitalize italic">chat</span> - Chat
							with me.
						</Link>
					</div>
				</div>

				<div className="flex flex-col gap-2">
					<h1>
						As a developer, I use this as my general toolset, and
						configurations.
					</h1>
					<div className="&>*:w-full flex gap-2">
						{configData.map(config => {
							return (
								<MyConfig
									key={config.title}
									icon={config.icon}
									title={config.title}
									link={config.link}
									description={config.description}
									subicon={config.subicon}
								/>
							);
						})}
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<h1>
						<span className="italic">Writing</span>
					</h1>
					<ul className="list-inside">
						{blogs
							.filter(b => b.frontmatter.featured)
							.map(blog => {
								return (
									<li>
										<Link
											className="flex items-center gap-2"
											to={`/blog/${blog.slug.split('/').pop()}`}
											prefetch="intent"
										>
											-{' '}
											<p className="font-reader text-sm">
												{blog.frontmatter.title}
											</p>
										</Link>
									</li>
								);
							})}
					</ul>
				</div>

				{/* <Link to={'/about'} className="underline underline-offset-2">
							brief intro?
						</Link> */}

				{/* <div className=" flex flex-row flex-wrap gap-2">
						<Link
							target="_blank"
							to="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=neeswebservices"
						>
							<ConnectButton className="" focuscolor="via-blue-400/90">
								<div className="flex items-center justify-center gap-2">
									<LinkedInLogoIcon /> Connect
								</div>
							</ConnectButton>
						</Link>

						<Link target="_blank" to="https://github.com/broisnischal">
							<ConnectButton className="">
								<div className="flex items-center justify-center gap-2">
									<GitHubLogoIcon /> Follow
								</div>
							</ConnectButton>
						</Link>
						<Link
							target="_blank"
							to={
								'https://github.com/broisnischal/broisnischal/blob/main/resume.pdf'
							}
						>
							<ConnectButton className="" focuscolor="via-yellow-400">
								<div className="flex items-center justify-center gap-2">
									<HiDocumentText /> Resume
								</div>
							</ConnectButton>
						</Link>
						<Link target="_blank" to="https://dly.to/oYeNtLdx9va">
							<ConnectButton className="" focuscolor="via-blue-400/90">
								<div className="flex items-center justify-center gap-2">
									<FaConfluence />
									Daily Dev
								</div>
							</ConnectButton>
						</Link>
						<Link target="_blank" to="https://ko-fi.com/Z8Z712ZDYP">
							<ConnectButton
								className="rounded-md"
								focuscolor="via-blue-400/90"
							>
								<div className="flex items-center justify-center gap-2">
									<FaHeart />
									Sponsor
								</div>
							</ConnectButton>
						</Link>
					</div> */}
			</div>
			<br />
			{/* <div className="my-8 flex flex-col gap-3">
				<p></p>

				<p>
					Currently <b>focused</b> on :{' '}
					<b>rust | go | zig | typescript | dart</b>
				</p>
			</div> */}

			{/* <div className="my-10 flex flex-col ">
				<h2 className="text-3xl font-bold">Learn together, Grow Together</h2>
			</div> */}
			{/* <h2 className="text-left text-gray-500 xl:text-xl">
				I value the chance to demonstrate initiative and influence the outcome
				of projects. I am enthusiastic about attending meetups, contributing to
				open-source projects, and actively participating in the Flutter
				community, web community and more.
			</h2> */}
			{/* <div className="flex flex-wrap items-center justify-center gap-4	 ">
				<iframe
					title="Spotify Embed: Recommendation Playlist "
					src={`https://open.spotify.com/embed/playlist/2A2M2HnXJTbt2V0XJ6BJ0P?utm_source=generator&theme=0`}
					height="100%"
					style={{ height: '360px', minWidth: '90%' }}
					className="flex-1 rounded-2xl border md:hidden "
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					// loading="lazy"
				/>
				<iframe
					title="Spotify Embed: Recommendation Playlist "
					src={`https://open.spotify.com/embed/playlist/2A2M2HnXJTbt2V0XJ6BJ0P?utm_source=generator&theme=0`}
					// height="100%"
					style={{ minHeight: '360px', minWidth: '360px' }}
					className="hidden flex-1 rounded-2xl border md:block "
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					// loading="lazy"
				/>
				<div className="quote flex h-[360px] w-[360px] flex-1 flex-col items-center  justify-center rounded-2xl border bg-slate-50 p-10 dark:bg-zinc-900">
					<p className="font-bricolage text-2xl">
						If you spend your time chasing butterflies, they'll fly away. But if
						you spend time making a beautiful garden, the butterflies will come.
					</p>
					<br />
					<br />
					<span>- Don't chase, attract"</span>
				</div>
			</div> */}
			{/* <div className="flex flex-col items-start ">
				<h1 className="w-full font-bricolage text-sm">Featured Posts</h1>
				<div className="m-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 ">
					<Suspense fallback={<div>Loading...</div>}>
						<Await resolve={posts}>
							{posts =>
								posts.slice(0, 6).map((post, index) => (
									<Link
										key={post.slug}
										className="group"
										to={'/blog/' + post.slug + ''}
									>
										{post.frontmatter.image ? (
											<div>
												<div className="div h-[150px] rounded-md bg-white dark:hidden">
													<img
														className="h-full w-full rounded-md border object-cover object-center"
														src={post.frontmatter.image}
														alt=""
													/>
												</div>
												<h1 className="mt-2 font-bricolage text-sm capitalize leading-tight  tracking-wide text-zinc-600 dark:text-zinc-300 ">
													{post.frontmatter.title}
												</h1>
											</div>
										) : (
											<div className="flex h-full min-h-[100px] w-full flex-col items-start gap-2 border-[.5px]">
												<h1 className="m-auto max-w-[80%] text-center text-sm capitalize  leading-tight tracking-wide ">
													{post.frontmatter.title}
												</h1>
											</div>
										)}
									</Link>
								))
							}
						</Await>
					</Suspense>
				</div>
			</div> */}
		</div>
	);
}

export function SoftwareTools() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<h1 className="mb-1 font-nunito ">I love :</h1>
			{['Raycast', 'Figma', 'Arc', 'NotchNook', 'Zed', 'Adobes', 'Charles'].map(
				(item, index) => (
					<Badge
						variant={'outline'}
						className="flex items-center justify-center gap-2"
						key={index}
					>
						{item}
					</Badge>
				),
			)}
		</div>
	);
}
