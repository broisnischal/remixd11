import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from '~/components/ui/context-menu';

// import { Redis } from '@upstash/redis';

import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Badge } from '~/components/ui/badge';
import { TextHighlight } from '~/components/ui/highlight';

import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MetaCreator } from '~/utils/meta';

const slugs = [
	'typescript',
	'javascript',
	'dart',
	'java',
	'react',
	'flutter',
	'android',
	'html5',
	'css3',
	'nodedotjs',
	'express',
	'nextdotjs',
	'prisma',
	'amazonaws',
	'postgresql',
	'firebase',
	'nginx',
	'vercel',
	'testinglibrary',
	'jest',
	'cypress',
	'docker',
	'git',
	'jira',
	'github',
	'gitlab',
	'visualstudiocode',
	'androidstudio',
	'sonarqube',
	'figma',
];

export const meta: MetaFunction<typeof loader> = ({ location, data }) => {
	const url = new URL('https://nischal-dahal.com.np');

	const metadata = MetaCreator({
		title: 'Nischal Dahal | Broisnees ',
		description:
			'an 18-year-old Developer, Creator, and Designer from Nepal, Crafting enchanting web experiences that seamlessly blend form and function. On mission to develop software that not only performs flawlessly but also delights users with its intuitive design and thoughtful details.',
		image: '/ogimg.png',
		url: `${url.origin}${location.pathname}`,
		others: [
			{
				name: 'author',
				content: 'Nischal Dahal',
			},
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
				'@type': 'WebPage',
				name: 'Nischal Dahal | Broisnees ',
				description: 'Developer, Creator, Editor, and Designer.',
				mainEntity: [
					{
						'@type': 'Blog',
						name: 'Blog',
						url: `${url.origin}/blog`,
						description: 'Collection of blog posts',
					},
					{
						'@type': 'Overview',
						name: 'Developer Experience',
						url: `${url.origin}/overview`,
						description: 'Showcase of development skills and experience',
					},
					{
						'@type': 'Bookmarks',
						name: 'Bookmarks',
						url: `${url.origin}/bookmarks`,
						description: 'Detailed narrative of the Heroku experience',
					},
					{
						'@type': 'Guestbook',
						name: 'Work',
						url: 'https://nischal-dahal.com.np/guestbook',
						description: 'Portfolio of completed work and projects',
					},
				],
				publisher: {
					'@type': 'Organization',
					name: 'Nischal Dahal',
					logo: {
						'@type': 'ImageObject',
						url: `${url.origin}/images/og.png`,
					},
				},
				breadcrumb: {
					'@type': 'BreadcrumbList',
					itemListElement: [
						{
							'@type': 'ListItem',
							position: 1,
							name: 'Home',
							item: `${url.origin}`,
						},
						{
							'@type': 'ListItem',
							position: 2,
							name: 'Blog',
							item: `${url.origin}/blog`,
						},
						{
							'@type': 'ListItem',
							position: 3,
							name: 'Developer Experience',
							item: `${url.origin}/overview`,
						},
						{
							'@type': 'ListItem',
							position: 4,
							name: 'Newsletter',
							item: `${url.origin}/newsletter`,
						},
						{
							'@type': 'ListItem',
							position: 5,
							name: 'Learning',
							item: `${url.origin}/learning/year`,
						},
					],
				},
			},
		},
	];
};

export const loader = async (args: LoaderFunctionArgs) => {
	// const kafka = new Kafka({
	// 	url: args.context.env.UPSTASH_KAFKA_REST_URL,
	// 	username: args.context.env.UPSTASH_KAFKA_REST_USERNAME,
	// 	password: args.context.env.UPSTASH_KAFKA_REST_PASSWORD,
	// });

	// const p = kafka.producer();
	// const message = { hello: 'world' }; // Objects will get serialized using `JSON.stringify`
	// const response = await p.produce('TOPIC', message);
	// console.log(response);
	// const response2 = await p.produce('TOPIC', message, {
	// 	partition: 1,
	// 	timestamp: 4567,
	// 	key: 'KEY',
	// 	headers: [{ key: 'TRACE-ID', value: '32h67jk' }],
	// });

	// getting the ip can be different depending on your hosting provider

	// const posts = await getPosts();

	// const ratelimit = new Ratelimit({
	// 	redis: Redis.fromEnv(args.context.env),
	// 	limiter: Ratelimit.fixedWindow(10, '60 s'),
	// 	enableProtection: true,
	// 	analytics: true,
	// });

	// const ip =
	// 	args.request.headers.get('X-Forwarded-For') ??
	// 	args.request.headers.get('x-real-ip');

	// const identifier = ip ?? 'global';

	// const { success, limit, remaining, reset } =
	// 	await ratelimit.limit(identifier);

	// const response = await axios.get('https://codeium.com/profile/broisnischal', {
	// 	headers: {
	// 		'Cache-Control': 'public, max-age=86400, immutable',
	// 		// 'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
	// 	},
	// });

	// const $ = load(response.data);
	// const svgContent = $('svg.h-full.w-full').parent().html();

	return json(
		{
			// success,
			// svgContent,
			// posts,
			// limit,
			// remaining,
			// reset,
			// identifier,
			// url: args.context.env.UPSTASH_REDIS_REST_URL,
			// token: args.context.env.UPSTASH_REDIS_REST_TOKEN,
		},
		{
			headers: {
				// 'X-RateLimit-Limit': limit.toString(),
				// 'X-RateLimit-Remaining': remaining.toString(),
				// 'X-RateLimit-Reset': reset.toString(),
			},
		},
	);
	// return json({
	// 	url: args.context.env.UPSTASH_REDIS_REST_URL,
	// 	token: args.context.env.UPSTASH_REDIS_REST_TOKEN,
	// });

	// const ratelimit = new Ratelimit({
	// 	redis: new Redis({
	// 		url: args.context.env.UPSTASH_REDIS_REST_URL,
	// 		token: args.context.env.UPSTASH_REDIS_REST_TOKEN,
	// 	}),
	// 	limiter: Ratelimit.fixedWindow(10, '60 s'),
	// 	analytics: true,
	// });

	// 	const markdown = `
	// 	# Learning about the code

	// Remix timte

	// \`\`\`ts

	// import { json } from '@remix-run/cloudflare';

	// export const loader = async () => {
	//     return json({ hello: 'world' });
	// };

	// export default function Index() {
	//     return <div>hello</div>;
	// }

	// \`\`\`
	// `;

	// 	return json({ content: parse(markdown) });
};

export default function Index() {
	const data = useLoaderData<typeof loader>();

	return (
		<div>
			<div className="flex flex-col items-start  gap-3">
				{/* <Link to={'/image'} unstable_viewTransition>
				<img
				src={
					'https://oyster.ignimgs.com/mediawiki/apis.ign.com/the-legend-of-zelda-breath-of-the-wild-2/3/38/Link2.png'
					}
					// alt={alt}
					style={{
						viewTransitionName: 'revert-layer',
						width: '10%',
						}}
						/>
						</Link> */}

				{/* <Link to="/signup">signup</Link> */}

				{/* {data.success ? (
				<div>
				<p style={{ color: 'green' }}>success</p>
				</div>
				) : (
					<h1>You are being rate limited.</h1>
					)} */}
				{/* <img
						className="aspect-square w-10 rounded-full"
						src="/profile.jpg"
						alt=""
					/> */}

				<h1 className="text-3xl font-bold dark:text-zinc-100">
					hey, I'm Nischal 👋
				</h1>

				<div className="flex gap-1">
					<Badge variant={'outline'}>Software Engineer</Badge>
					<Badge variant={'secondary'}>18</Badge>
				</div>

				<div className="flex  flex-col items-start gap-4 ">
					{/* <div className="desc flex w-[80%] flex-col items-start gap-4"> */}
					<p>
						an 18-year-old prodigy from Nepal, Crafting enchanting web
						experiences that seamlessly blend form and function. On mission to
						develop software that not only performs flawlessly but also delights
						users with its intuitive design and thoughtful details.
					</p>

					<div className="flex items-center justify-center gap-2 text-sm">
						{['typescript', 'flutter', 'zig', 'rust', 'go'].map(
							(item, index) => (
								<TextHighlight key={index}>{item}</TextHighlight>
							),
						)}
					</div>

					<p>
						Driven by an insatiable curiosity, I constantly refine my craft
						through hands-on coding and in-depth research. Each project is an
						opportunity to push boundaries and create something truly
						remarkable.
					</p>

					<p>
						Journey in the tech realm is defined by a relentless pursuit of
						excellence, crafting sophisticated systems that drive the future.
					</p>
					{/* </div> */}
					{/* <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden bg-background px-20  ">
						<IconCloud iconSlugs={slugs} />
					</div> */}
				</div>
				<div className="flex items-center justify-center gap-5">
					<Link
						to="mailto:info@nischal-dahal.com.np"
						className="flex items-center  gap-2"
					>
						<ArrowTopRightIcon /> Mail
					</Link>
					<Link to="/chat" className="flex items-center  gap-2">
						<ArrowTopRightIcon /> Chat
					</Link>
					<a href="/blogs/rss" className="flex items-center  gap-2">
						<ArrowTopRightIcon /> Blog RSS
					</a>

					{/* <a href="/blogs/rss" className="flex items-center  gap-2">
						<ArrowTopRightIcon /> MyBookmarks RSS
					</a> */}
				</div>
				{/* 
				<ul className="font-semibold">
					<li>I ❤️ Remix.</li>
					<li>I am a Typescript Mini Wizard 🚀</li>
					<li>I am Android Developer 📱</li>
					<li>I love IOT 👾</li>
				</ul> */}

				{/* <Markdown content={data.content} /> */}
			</div>
			<br />
			{/* <hr />	 */}
			{/* <div className="mr-auto flex w-full flex-col items-end gap-3">
				<h2 className="text-2xl font-semibold">Contents</h2>
				<div>
					{data.posts.map(post => (
						<p className="text-right text-sm" key={post.slug}>
							<Link to={'/blog/' + post.slug + ''}>
								{post.frontmatter.title}
							</Link>
						</p>
					))}
				</div>
			</div>
			<br />
			<hr />
			<br /> */}

			{/* <div className=" hidden flex-col dark:flex">
				<h1 className="mb-4 text-2xl font-bold">Don't code, Just Use AI</h1>

				<div
					className="min-w-[100%]"
					dangerouslySetInnerHTML={{ __html: data.svgContent! }}
				></div>
			</div> */}

			{/* <h2 className="mb-4 text-xl font-bold">Design Works</h2>


			<Gallery
				images={[
					'https://nischaldahal.vercel.app/_next/image?url=%2Fdesigns%2Fd48.png&w=3840&q=75',
					'https://nischaldahal.vercel.app/_next/image?url=%2Fdesigns%2Fd5.png&w=3840&q=75',
					'https://nischaldahal.vercel.app/_next/image?url=%2Fdesigns%2Fd28.png&w=3840&q=75',
					'https://nischaldahal.vercel.app/_next/image?url=%2Fdesigns%2Fcode.jpg&w=3840&q=75',
					'https://nischaldahal.vercel.app/_next/image?url=%2Fdesigns%2Fd8.jpg&w=3840&q=75',
					'https://nischaldahal.vercel.app/_next/image?url=%2Fdesigns%2Fd30.jpg&w=3840&q=75',
					'https://res.cloudinary.com/dacp0r5b7/image/upload/v1663755037/works/neeswallpaper_fojhum.png',
					'https://res.cloudinary.com/dacp0r5b7/image/upload/v1663755016/works/wallpaper1_nceg92.jpg',
				]}
			/> */}
			<div>
				<h1 className="mb-4 text-2xl font-bold">Favourite Dev Stack</h1>

				<div className="flex flex-wrap gap-2 md:max-w-[70%]">
					{[
						{
							name: 'Remix',
							svg: (
								<svg
									viewBox="0 0 256 297"
									width="12"
									height="12"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M141.675 0C218.047 0 256 36.35 256 94.414c0 43.43-26.707 71.753-62.785 76.474 30.455 6.137 48.259 23.604 51.54 58.065l.474 6.337.415 5.924.358 5.542.249 4.179.267 4.93.138 2.814.198 4.47.159 4.222.079 2.427.107 3.888.092 4.446.033 2.148.06 6.226.02 6.496v3.885h-78.758l.004-1.62.028-3.147.047-3.065.136-7.424.035-2.489.027-3.902-.004-2.496-.023-2.617-.032-2.054-.064-2.876-.094-3.05-.125-3.242-.16-3.455-.096-1.813-.16-2.833-.186-2.976-.287-4.204-.247-3.342a116.56 116.56 0 0 0-.247-3.02l-.202-1.934c-2.6-22.827-11.655-32.157-27.163-35.269l-1.307-.245a60.184 60.184 0 0 0-2.704-.408l-1.397-.164c-.236-.025-.472-.05-.71-.073l-1.442-.127-1.471-.103-1.502-.081-1.514-.058-1.544-.039-1.574-.018L0 198.74V136.9h127.62c2.086 0 4.108-.04 6.066-.12l1.936-.095 1.893-.122 1.85-.15c.305-.028.608-.056.909-.086l1.785-.193a86.3 86.3 0 0 0 3.442-.475l1.657-.28c20.709-3.755 31.063-14.749 31.063-36.2 0-24.075-16.867-38.666-50.602-38.666H0V0h141.675ZM83.276 250.785c10.333 0 14.657 5.738 16.197 11.23l.203.79.167.782.109.617.046.306.078.603.058.59.023.29.031.569.01.278.008.54v29.507H0v-46.102h83.276Z"
										fill="#ffff"
										fillRule="nonzero"
									/>
								</svg>
							),
						},
						{
							name: 'Typescript',
							svg: (
								<svg
									viewBox="0 0 256 256"
									width="12"
									height="12"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="xMidYMid"
								>
									<path
										d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
										fill="#3178C6"
									/>
									<path
										d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z"
										fill="#FFF"
									/>
								</svg>
							),
						},
						{
							name: 'Framer Motion',
							svg: (
								<svg
									viewBox="0 0 256 384"
									width="12"
									height="12"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="xMidYMid"
								>
									<path
										fill="#fff"
										d="M0 0h256v128H128L0 0Zm0 128h128l128 128H128v128L0 256V128Z"
									/>
								</svg>
							),
						},
						{
							name: 'Tailwind',
							svg: (
								<svg
									viewBox="0 0 256 154"
									width="12"
									height="12"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="xMidYMid"
								>
									<defs>
										<linearGradient
											x1="-2.778%"
											y1="32%"
											x2="100%"
											y2="67.556%"
											id="gradient"
										>
											<stop stopColor="#2298BD" offset="0%"></stop>
											<stop stopColor="#0ED7B5" offset="100%"></stop>
										</linearGradient>
									</defs>
									<path
										d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0ZM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.543 95.725 76.8 64 76.8Z"
										fill="url(#gradient)"
									></path>
								</svg>
							),
						},
						{
							name: 'Drizzle',
							svg: (
								<svg
									viewBox="0 0 256 299"
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="12"
									preserveAspectRatio="xMidYMid"
								>
									<defs>
										<linearGradient
											id="a"
											x1="31.047%"
											x2="68.957%"
											y1="11.705%"
											y2="88.303%"
										>
											<stop offset="0%" stopColor="#FF00A0" />
											<stop offset="100%" stopColor="#9600FF" />
										</linearGradient>
									</defs>
									<path
										fill="url(#a)"
										d="m128 78.568 71.101 39.375v-15.787L128 62.872c-10.575 5.852-61.684 34.103-71.101 39.284 8.747 4.846 100.602 55.589 156.434 86.43v15.726C205.745 208.518 128 251.46 128 251.46a76502.912 76502.912 0 0 1-85.333-47.147v-47.146L128 204.312l14.232-7.862-113.798-62.842v78.598L128 267.185c9.813-5.425 92.282-50.987 99.535-55.01v-31.42L85.333 102.155 128 78.568ZM28.434 86.43v31.452l142.202 78.598-42.666 23.589-71.101-39.376v15.787l71.1 39.284c10.576-5.852 61.684-34.103 71.101-39.284-8.746-4.846-100.571-55.589-156.403-86.461V94.293C50.255 90.088 128 47.147 128 47.147a76501.239 76501.239 0 0 0 85.333 47.146v47.147L128 94.293l-14.232 7.863 113.767 62.873V86.43L128 31.421c-9.844 5.455-92.282 51.017-99.566 55.01ZM128 0 0 70.735v157.166l128 70.735 128-70.705V70.735L128 0Zm113.737 220.038L128 282.91 14.232 220.038V78.598L128 15.726l113.768 62.872-.03 141.44Z"
									/>
								</svg>
							),
						},
						{
							name: 'Turso',
							svg: (
								<svg
									fill="none"
									height="12"
									viewBox="0 0 201 170"
									width="12"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="m100.055 170c-2.1901 0-18.2001-12.8-21.3001-16.45-2.44 3.73-6.44 7.96-6.44 7.96-11.05-5.57-25.17-20.06-27.83-25.13-2.62-5-12.13-62.58-12.39-79.3-.34-9.41 5.85-28.49 67.9601-28.49 62.11 0 68.29 19.08 67.96 28.49-.25 16.72-9.76 74.3-12.39 79.3-2.66 5.07-16.78 19.56-27.83 25.13 0 0-4-4.23-6.44-7.96-3.1 3.65-19.11 16.45-21.3 16.45z"
										fill="#1ebca1"
									/>
									<path
										d="m100.055 132.92c-20.7301 0-33.9601-10.95-33.9601-10.95l1.91-26.67-21.75-1.94-3.91-31.55h115.4301l-3.91 31.55-21.75 1.94 1.91 26.67s-13.23 10.95-33.96 10.95z"
										fill="#183134"
									/>
									<path
										d="m121.535 75.79 78.52-27.18c-4.67-27.94-29.16-48.61-29.16-48.61v30.78l-14.54 3.75-9.11-10.97-7.8 15.34-39.38 10.16-39.3801-10.16-7.8-15.34-9.11 10.97-14.54-3.75v-30.78s-24.50997 20.67-29.1799684 48.61l78.5199684 27.18-2.8 37.39c6.7 1.7 13.75 3.39 24.2801 3.39 10.53 0 17.57-1.69 24.27-3.39l-2.8-37.39z"
										fill="#4ff8d2"
									/>
								</svg>
							),
						},
						{
							name: 'Bun',
							svg: (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 70">
									<path d="M71.09 20.74c-.16-.17-.33-.34-.5-.5s-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5-.33-.34-.5-.5A26.46 26.46 0 0 1 75.5 35.7c0 16.57-16.82 30.05-37.5 30.05-11.58 0-21.94-4.23-28.83-10.86l.5.5.5.5.5.5.5.5.5.5.5.5.5.5C19.55 65.3 30.14 69.75 42 69.75c20.68 0 37.5-13.48 37.5-30 0-7.06-3.04-13.75-8.41-19.01Z" />
									<path d="M73 35.7c0 15.21-15.67 27.54-35 27.54S3 50.91 3 35.7C3 26.27 9 17.94 18.22 13S33.18 3 38 3s8.94 4.13 19.78 10C67 17.94 73 26.27 73 35.7Z" />
									<path
										data-name="Bottom Shadow"
										d="M73 35.7a21.67 21.67 0 0 0-.8-5.78c-2.73 33.3-43.35 34.9-59.32 24.94A40 40 0 0 0 38 63.24c19.3 0 35-12.35 35-27.54Z"
									/>
									<path
										data-name="Light Shine"
										d="M24.53 11.17C29 8.49 34.94 3.46 40.78 3.45A9.29 9.29 0 0 0 38 3c-2.42 0-5 1.25-8.25 3.13-1.13.66-2.3 1.39-3.54 2.15-2.33 1.44-5 3.07-8 4.7C8.69 18.13 3 26.62 3 35.7v1.19c6.06-21.41 17.07-23.04 21.53-25.72Z"
									/>
									<path d="M35.12 5.53A16.41 16.41 0 0 1 29.49 18c-.28.25-.06.73.3.59 3.37-1.31 7.92-5.23 6-13.14-.08-.45-.67-.33-.67.08Zm2.27 0A16.24 16.24 0 0 1 39 19c-.12.35.31.65.55.36 2.19-2.8 4.1-8.36-1.62-14.36-.29-.26-.74.14-.54.49Zm2.76-.17A16.42 16.42 0 0 1 47 17.12a.33.33 0 0 0 .65.11c.92-3.49.4-9.44-7.17-12.53-.4-.16-.66.38-.33.62Zm-18.46 10.4a16.94 16.94 0 0 0 10.47-9c.18-.36.75-.22.66.18-1.73 8-7.52 9.67-11.12 9.45-.38.01-.37-.52-.01-.63Z" />
									<path d="M38 65.75C17.32 65.75.5 52.27.5 35.7c0-10 6.18-19.33 16.53-24.92 3-1.6 5.57-3.21 7.86-4.62 1.26-.78 2.45-1.51 3.6-2.19C32 1.89 35 .5 38 .5s5.62 1.2 8.9 3.14c1 .57 2 1.19 3.07 1.87 2.49 1.54 5.3 3.28 9 5.27C69.32 16.37 75.5 25.69 75.5 35.7c0 16.57-16.82 30.05-37.5 30.05ZM38 3c-2.42 0-5 1.25-8.25 3.13-1.13.66-2.3 1.39-3.54 2.15-2.33 1.44-5 3.07-8 4.7C8.69 18.13 3 26.62 3 35.7c0 15.19 15.7 27.55 35 27.55S73 50.89 73 35.7c0-9.08-5.69-17.57-15.22-22.7-3.78-2-6.73-3.88-9.12-5.36-1.09-.67-2.09-1.29-3-1.84C42.63 4 40.42 3 38 3Z" />
									<g>
										<path
											d="M45.05 43a8.93 8.93 0 0 1-2.92 4.71 6.81 6.81 0 0 1-4 1.88A6.84 6.84 0 0 1 34 47.71 8.93 8.93 0 0 1 31.12 43a.72.72 0 0 1 .8-.81h12.34a.72.72 0 0 1 .79.81Z"
											data-name="Background"
										/>
										<path
											data-name="Background"
											d="M34 47.79a6.91 6.91 0 0 0 4.12 1.9 6.91 6.91 0 0 0 4.11-1.9 10.63 10.63 0 0 0 1-1.07 6.83 6.83 0 0 0-4.9-2.31 6.15 6.15 0 0 0-5 2.78c.23.21.43.41.67.6Z"
										/>
										<path
											data-name="Outline"
											d="M34.16 47a5.36 5.36 0 0 1 4.19-2.08 6 6 0 0 1 4 1.69c.23-.25.45-.51.66-.77a7 7 0 0 0-4.71-1.93 6.36 6.36 0 0 0-4.89 2.36 9.53 9.53 0 0 0 .75.73Z"
										/>
										<path
											data-name="Outline"
											d="M38.09 50.19a7.42 7.42 0 0 1-4.45-2 9.52 9.52 0 0 1-3.11-5.05 1.2 1.2 0 0 1 .26-1 1.41 1.41 0 0 1 1.13-.51h12.34a1.44 1.44 0 0 1 1.13.51 1.19 1.19 0 0 1 .25 1 9.52 9.52 0 0 1-3.11 5.05 7.42 7.42 0 0 1-4.44 2Zm-6.17-7.4c-.16 0-.2.07-.21.09a8.29 8.29 0 0 0 2.73 4.37A6.23 6.23 0 0 0 38.09 49a6.28 6.28 0 0 0 3.65-1.73 8.3 8.3 0 0 0 2.72-4.37.21.21 0 0 0-.2-.09Z"
										/>
									</g>
									<g>
										<ellipse
											data-name="Right Blush"
											cx="53.22"
											cy="40.18"
											rx="5.85"
											ry="3.44"
										/>
										<ellipse
											data-name="Left Bluch"
											cx="22.95"
											cy="40.18"
											rx="5.85"
											ry="3.44"
										/>
										<path d="M25.7 38.8a5.51 5.51 0 1 0-5.5-5.51 5.51 5.51 0 0 0 5.5 5.51Zm24.77 0A5.51 5.51 0 1 0 45 33.29a5.5 5.5 0 0 0 5.47 5.51Z" />
										<path d="M24 33.64a2.07 2.07 0 1 0-2.06-2.07A2.07 2.07 0 0 0 24 33.64Zm24.77 0a2.07 2.07 0 1 0-2.06-2.07 2.07 2.07 0 0 0 2.04 2.07Z" />
									</g>
								</svg>
							),
						},
						{
							name: 'Zod',
							svg: (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									width="12"
									height="12"
									viewBox="0 0 256 203"
								>
									<defs>
										<filter
											id="a"
											width="105.2%"
											height="106.5%"
											x="-2.2%"
											y="-2.8%"
											filterUnits="objectBoundingBox"
										>
											<feOffset
												dx="1"
												dy="1"
												in="SourceAlpha"
												result="shadowOffsetOuter1"
											/>
											<feGaussianBlur
												in="shadowOffsetOuter1"
												result="shadowBlurOuter1"
												stdDeviation="2"
											/>
											<feColorMatrix
												in="shadowBlurOuter1"
												values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.36 0"
											/>
										</filter>
										<path
											id="b"
											d="M200.42 0H53.63L0 53.355l121.76 146.624 9.714-10.9L252 53.857 200.42 0Zm-5.362 12.562 39.84 41.6-112.8 126.558L17 54.162l41.815-41.6h136.243Z"
										/>
									</defs>
									<path
										fill="#18253F"
										d="M60.816 14.033h136.278l39.933 41.69-112.989 126.554L18.957 55.724z"
									/>
									<path
										fill="#274D82"
										d="M151.427 152.386H98.013l-24.124-29.534 68.364-.002.002-4.19h39.078z"
									/>
									<path
										fill="#274D82"
										d="m225.56 43.834-147.382 85.09-19.226-24.051 114.099-65.877-2.096-3.631 30.391-17.546zM146.596 14.075 35.93 77.968 18.719 56.483l74.095-42.78z"
									/>
									<g transform="translate(2 1.51)">
										<use xlinkHref="#b" filter="url(#a)" />
										<use xlinkHref="#b" fill="#3068B7" />
									</g>
								</svg>
							),
						},
						{
							name: 'Astro',
							svg: (
								<svg
									viewBox="0 0 256 366"
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="12"
									preserveAspectRatio="xMidYMid"
								>
									<path
										fill="#fff"
										d="M182.022 9.147c2.982 3.702 4.502 8.697 7.543 18.687L256 246.074a276.467 276.467 0 0 0-79.426-26.891L133.318 73.008a5.63 5.63 0 0 0-10.802.017L79.784 219.11A276.453 276.453 0 0 0 0 246.04L66.76 27.783c3.051-9.972 4.577-14.959 7.559-18.654a24.541 24.541 0 0 1 9.946-7.358C88.67 0 93.885 0 104.314 0h47.683c10.443 0 15.664 0 20.074 1.774a24.545 24.545 0 0 1 9.95 7.373Z"
									/>
									<path
										fill="#FF5D01"
										d="M189.972 256.46c-10.952 9.364-32.812 15.751-57.992 15.751-30.904 0-56.807-9.621-63.68-22.56-2.458 7.415-3.009 15.903-3.009 21.324 0 0-1.619 26.623 16.898 45.14 0-9.615 7.795-17.41 17.41-17.41 16.48 0 16.46 14.378 16.446 26.043l-.001 1.041c0 17.705 10.82 32.883 26.21 39.28a35.685 35.685 0 0 1-3.588-15.647c0-16.886 9.913-23.173 21.435-30.48 9.167-5.814 19.353-12.274 26.372-25.232a47.588 47.588 0 0 0 5.742-22.735c0-5.06-.786-9.938-2.243-14.516Z"
									/>
								</svg>
							),
						},
						{
							name: 'Supabase',
							svg: (
								<svg
									viewBox="0 0 109 113"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
										fill="url(#paint0_linear)"
									/>
									<path
										d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
										fill="url(#paint1_linear)"
										fillOpacity="0.2"
									/>
									<path
										d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
										fill="#3ECF8E"
									/>
									<defs>
										<linearGradient
											id="paint0_linear"
											x1="53.9738"
											y1="54.974"
											x2="94.1635"
											y2="71.8295"
											gradientUnits="userSpaceOnUse"
										>
											<stop stopColor="#249361" />
											<stop offset="1" stopColor="#3ECF8E" />
										</linearGradient>
										<linearGradient
											id="paint1_linear"
											x1="36.1558"
											y1="30.578"
											x2="54.4844"
											y2="65.0806"
											gradientUnits="userSpaceOnUse"
										>
											<stop />
											<stop offset="1" stopOpacity="0" />
										</linearGradient>
									</defs>
								</svg>
							),
						},
						{
							name: 'Vite',
							svg: (
								<svg
									viewBox="0 0 256 234"
									width="12"
									height="12"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="xMidYMid"
								>
									<path
										d="m192.115 70.808-61.2 88.488a5.27 5.27 0 0 1-2.673 2.002 5.285 5.285 0 0 1-3.343-.005 5.25 5.25 0 0 1-2.66-2.01 5.214 5.214 0 0 1-.903-3.203l2.45-48.854-39.543-8.386a5.256 5.256 0 0 1-2.292-1.118 5.222 5.222 0 0 1-1.83-4.581 5.226 5.226 0 0 1 .895-2.383L142.218 2.27a5.279 5.279 0 0 1 6.016-1.996 5.243 5.243 0 0 1 2.66 2.01c.643.942.96 2.066.903 3.203l-2.45 48.855 39.542 8.386a5.262 5.262 0 0 1 2.293 1.117 5.21 5.21 0 0 1 1.829 4.582 5.212 5.212 0 0 1-.896 2.382Z"
										fill="#FCC72B"
									/>
									<path
										d="M128.025 233.537a12.356 12.356 0 0 1-8.763-3.63l-57.828-57.823a12.389 12.389 0 0 1 .023-17.5 12.394 12.394 0 0 1 17.5-.024l49.068 49.061L234.917 96.733a12.39 12.39 0 0 1 17.523 17.524l-115.655 115.65a12.343 12.343 0 0 1-8.76 3.63Z"
										fill="#729B1B"
									/>
									<path
										d="M127.975 233.537a12.356 12.356 0 0 0 8.763-3.63l57.828-57.823a12.385 12.385 0 0 0 3.605-8.754 12.395 12.395 0 0 0-12.375-12.376 12.4 12.4 0 0 0-8.755 3.606l-49.066 49.061L21.082 96.733a12.392 12.392 0 0 0-17.524 17.524l115.656 115.65a12.347 12.347 0 0 0 8.76 3.63Z"
										fillOpacity=".5"
										fill="#729B1B"
									/>
								</svg>
							),
						},
						{
							name: 'Trigger Dev',
						},
						{
							name: 'Tensorflow',
							svg: (
								<svg
									width="12"
									height="12"
									viewBox="-9 0 274 274"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									xmlnsXlink="http://www.w3.org/1999/xlink"
									preserveAspectRatio="xMidYMid"
								>
									<g>
										<path
											d="M145.726081,42.0651946 L145.726081,84.1347419 L218.586952,126.204312 L218.586952,84.1347419 L145.726081,42.0651946 Z M-1.98726454e-07,84.1347419 L-1.98726454e-07,126.204312 L36.4304238,147.234755 L36.4304238,105.169527 L-1.98726454e-07,84.1347419 Z M109.291294,105.169527 L72.8608701,126.204312 L72.8608701,252.404316 L109.291294,273.439101 L109.291294,189.304303 L145.726081,210.339088 L145.726081,168.26954 L109.291294,147.234755 L109.291294,105.169527 Z"
											fill="#E55B2D"
										></path>
										<path
											d="M145.726081,42.0651946 L36.4304238,105.169527 L36.4304238,147.234755 L109.291294,105.169527 L109.291294,147.234755 L145.726081,126.204312 L145.726081,42.0651946 Z M255.021717,63.0999794 L218.586952,84.1347419 L218.586952,126.204312 L255.021717,105.169527 L255.021717,63.0999794 Z M182.156505,147.234755 L145.726081,168.26954 L145.726081,210.339088 L182.156505,189.304303 L182.156505,147.234755 Z M145.726081,210.339088 L109.291294,189.304303 L109.291294,273.439101 L145.726081,252.404316 L145.726081,210.339088 Z"
											fill="#ED8E24"
										></path>
										<path
											d="M145.726081,-3.41864288e-05 L-1.98726454e-07,84.1347419 L36.4304238,105.169527 L145.726081,42.0651946 L218.586952,84.1347419 L255.021717,63.0999794 L145.726081,-3.41864288e-05 Z M145.726081,126.204312 L109.291294,147.234755 L145.726081,168.26954 L182.156505,147.234755 L145.726081,126.204312 Z"
											fill="#F8BF3C"
										></path>
									</g>
								</svg>
							),
						},
						{
							name: 'Resend',
							svg: (
								<svg
									width="14"
									height="14"
									viewBox="0 0 600 600"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M186 447.471V154H318.062C336.788 154 353.697 158.053 368.79 166.158C384.163 174.263 396.181 185.443 404.845 199.698C413.51 213.672 417.842 229.604 417.842 247.491C417.842 265.938 413.51 282.568 404.845 297.381C396.181 311.915 384.302 323.375 369.209 331.759C354.117 340.144 337.067 344.337 318.062 344.337H253.917V447.471H186ZM348.667 447.471L274.041 314.99L346.99 304.509L430 447.471H348.667ZM253.917 289.835H311.773C319.04 289.835 325.329 288.298 330.639 285.223C336.229 281.869 340.421 277.258 343.216 271.388C346.291 265.519 347.828 258.811 347.828 251.265C347.828 243.718 346.151 237.15 342.797 231.56C339.443 225.691 334.552 221.219 328.124 218.144C321.975 215.07 314.428 213.533 305.484 213.533H253.917V289.835Z"
										fill="white"
									/>
								</svg>
							),
						},
						{
							name: 'SvelteKit',
							svg: (
								<svg
									viewBox="0 0 256 308"
									width="12"
									height="12"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="xMidYMid"
								>
									<path
										d="M239.682 40.707C211.113-.182 154.69-12.301 113.895 13.69L42.247 59.356a82.198 82.198 0 0 0-37.135 55.056 86.566 86.566 0 0 0 8.536 55.576 82.425 82.425 0 0 0-12.296 30.719 87.596 87.596 0 0 0 14.964 66.244c28.574 40.893 84.997 53.007 125.787 27.016l71.648-45.664a82.182 82.182 0 0 0 37.135-55.057 86.601 86.601 0 0 0-8.53-55.577 82.409 82.409 0 0 0 12.29-30.718 87.573 87.573 0 0 0-14.963-66.244"
										fill="#FF3E00"
									/>
									<path
										d="M106.889 270.841c-23.102 6.007-47.497-3.036-61.103-22.648a52.685 52.685 0 0 1-9.003-39.85 49.978 49.978 0 0 1 1.713-6.693l1.35-4.115 3.671 2.697a92.447 92.447 0 0 0 28.036 14.007l2.663.808-.245 2.659a16.067 16.067 0 0 0 2.89 10.656 17.143 17.143 0 0 0 18.397 6.828 15.786 15.786 0 0 0 4.403-1.935l71.67-45.672a14.922 14.922 0 0 0 6.734-9.977 15.923 15.923 0 0 0-2.713-12.011 17.156 17.156 0 0 0-18.404-6.832 15.78 15.78 0 0 0-4.396 1.933l-27.35 17.434a52.298 52.298 0 0 1-14.553 6.391c-23.101 6.007-47.497-3.036-61.101-22.649a52.681 52.681 0 0 1-9.004-39.849 49.428 49.428 0 0 1 22.34-33.114l71.664-45.677a52.218 52.218 0 0 1 14.563-6.398c23.101-6.007 47.497 3.036 61.101 22.648a52.685 52.685 0 0 1 9.004 39.85 50.559 50.559 0 0 1-1.713 6.692l-1.35 4.116-3.67-2.693a92.373 92.373 0 0 0-28.037-14.013l-2.664-.809.246-2.658a16.099 16.099 0 0 0-2.89-10.656 17.143 17.143 0 0 0-18.398-6.828 15.786 15.786 0 0 0-4.402 1.935l-71.67 45.674a14.898 14.898 0 0 0-6.73 9.975 15.9 15.9 0 0 0 2.709 12.012 17.156 17.156 0 0 0 18.404 6.832 15.841 15.841 0 0 0 4.402-1.935l27.345-17.427a52.147 52.147 0 0 1 14.552-6.397c23.101-6.006 47.497 3.037 61.102 22.65a52.681 52.681 0 0 1 9.003 39.848 49.453 49.453 0 0 1-22.34 33.12l-71.664 45.673a52.218 52.218 0 0 1-14.563 6.398"
										fill="#FFF"
									/>
								</svg>
							),
						},
						{
							name: 'React Query',
							svg: (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="xMidYMid"
									viewBox="0 0 256 230"
									width="12"
									height="12"
								>
									<path
										d="m158 142.5-5 8.5a8.3 8.3 0 0 1-7.1 4.2h-37.6c-3 0-5.7-1.6-7.2-4.2l-5-8.5H158Zm13.7-23.9-8.6 15H91l-8.7-15h89.3Zm-8.3-23.3 8.3 14.5H82.4l8.4-14.5h72.6Zm-17.5-22c3 0 5.7 1.5 7.2 4l5.2 9.1H95.9l5.2-9a8.3 8.3 0 0 1 7.2-4.2h37.6Z"
										fill="#00435B"
									/>
									<path
										d="M53.5 69.3c-4.1-20.3-5-35.8-2.3-47a30.2 30.2 0 0 1 9-16.1A25.5 25.5 0 0 1 77.4 0c11 0 22.6 5 35 14.6 5 3.9 10.2 8.6 15.7 14l1.4-1.5C145 13.4 158 4.9 169.1 1.6c6.6-2 12.7-2.2 18.4-.3 6 2 10.7 6.2 14 12 5.5 9.5 7 22 5 37.6-1 6.3-2.4 13.2-4.4 20.7.8 0 1.5.2 2.3.5 19.5 6.4 33.3 13.4 41.7 21.4 5 4.7 8.2 10 9.4 15.8 1.3 6.1 0 12.3-3.3 18.1-5.5 9.5-15.6 17-30 23-5.8 2.4-12.4 4.6-19.7 6.6l.8 2.3c4.1 20.3 5 35.7 2.3 47a30.2 30.2 0 0 1-9 16.1 25.5 25.5 0 0 1-17.3 6.2c-11 0-22.6-5-35-14.6-5-4-10.4-8.7-15.9-14.2-.5.9-1.2 1.7-2 2.4C111 216 98 224.4 86.9 227.7c-6.6 2-12.7 2.2-18.4.3-6-2-10.7-6.2-14-12-5.5-9.5-7-22-5-37.6 1-6.5 2.5-13.7 4.6-21.5-.8 0-1.7-.2-2.5-.5C32.1 149.9 18.3 143 9.9 135c-5-4.7-8.2-10-9.4-15.8-1.3-6.2 0-12.3 3.3-18.1 5.5-9.6 15.6-17.1 30-23 6-2.5 12.8-4.8 20.4-6.8l-.7-2Z"
										fill="#002B3B"
									/>
									<path
										d="M189.6 161.3c2-.3 3.8 1 4.3 2.8v.2l.2 1c6.7 35.3 2 53-14.2 53-15.8 0-36-15.1-60.4-45.2a3.7 3.7 0 0 1 2.8-6H123.7a354 354 0 0 0 66-5.8Zm-111-26.6h.1l.7 1.2a358 358 0 0 0 38.4 54.5 3.7 3.7 0 0 1-.3 5.1v.1l-1 .7c-27.2 23.4-45 28-53.2 14-8-13.7-5-38.7 8.8-75a3.7 3.7 0 0 1 6.5-.6Zm124.9-52h.1l1 .3c33.7 11.7 46.6 24.6 38.5 38.7-8 13.7-31 23.7-69 30a3.7 3.7 0 0 1-3.9-5.5A359.6 359.6 0 0 0 199 84.9a3.7 3.7 0 0 1 4.4-2.3h.1Zm-119-6c1.7 1 2.3 3.3 1.3 5A359.6 359.6 0 0 0 57 143a3.7 3.7 0 0 1-4.5 2.3h-.1l-1-.4c-33.7-11.7-46.6-24.6-38.5-38.6 8-13.8 31-23.8 69-30 1-.2 1.8 0 2.5.4ZM192.6 19c8 13.7 5 38.7-8.8 75a3.7 3.7 0 0 1-6.5.6h-.1l-.7-1.2a358 358 0 0 0-38.4-54.5 3.7 3.7 0 0 1 .3-5.1v-.1l1-.7c27.2-23.4 45-28 53.2-14ZM77.4 10.6c15.9 0 36 15 60.4 45.1a3.7 3.7 0 0 1-2.7 6h-1.4a354 354 0 0 0-66 5.8c-2 .3-3.8-.9-4.2-2.8v-.1l-.2-1.1c-6.7-35.3-2-53 14.1-53Z"
										fill="#FF4154"
									/>
									<path
										d="M111.3 73.7h31.6c4.6 0 8.9 2.4 11.2 6.4l15.8 27.7c2.3 4 2.3 8.8 0 12.8l-15.8 27.6c-2.3 4-6.6 6.5-11.2 6.5h-31.6c-4.6 0-8.9-2.5-11.2-6.5l-15.8-27.6c-2.3-4-2.3-8.9 0-12.8L100 80c2.3-4 6.6-6.4 11.2-6.4ZM138 82c4.6 0 8.8 2.5 11.1 6.5l11.1 19.3c2.3 4 2.3 8.8 0 12.8l-11 19.3c-2.4 4-6.6 6.5-11.2 6.5h-22c-4.6 0-8.9-2.5-11.2-6.5l-11-19.3c-2.3-4-2.3-8.9 0-12.8l11-19.3c2.3-4 6.6-6.5 11.2-6.5h22Zm-5.2 9.1h-11.6c-4.6 0-8.9 2.5-11.2 6.5l-5.8 10.2c-2.3 4-2.3 8.8 0 12.8l5.8 10.2c2.3 4 6.6 6.4 11.2 6.4h11.6c4.6 0 8.8-2.4 11.1-6.4l5.9-10.2c2.3-4 2.3-8.9 0-12.8L144 97.6c-2.3-4-6.5-6.5-11.1-6.5Zm-5 8.8c4.6 0 8.8 2.4 11.1 6.4l.9 1.5c2.3 4 2.3 8.8 0 12.8l-.9 1.5c-2.3 4-6.5 6.4-11.1 6.4h-1.6c-4.6 0-8.9-2.4-11.2-6.4l-.8-1.5c-2.3-4-2.3-8.9 0-12.8l.8-1.5c2.3-4 6.6-6.4 11.2-6.4h1.6Zm-.8 8.6a5.7 5.7 0 1 0 0 11.4 5.7 5.7 0 1 0 0-11.4Zm-46.5 5.7h10.3"
										fill="#FFD94C"
									/>
								</svg>
							),
						},
						// {
						// 	name: 'SwiftUI',
						// 	svg: (
						// 		<svg
						// 			xmlns="http://www.w3.org/2000/svg"
						// 			preserveAspectRatio="xMidYMid"
						// 			viewBox="0 0 256 256"
						// 			width={12}
						// 			height={12}
						// 		>
						// 			<linearGradient
						// 				id="a"
						// 				gradientUnits="userSpaceOnUse"
						// 				x1="-1845.5"
						// 				y1="1255.6"
						// 				x2="-1797.1"
						// 				y2="981.3"
						// 				gradientTransform="rotate(180 -846.6 623.3)"
						// 			>
						// 				<stop offset="0" contentStyleType="stopColor:#faae42" />
						// 				<stop offset="1" contentStyleType="stopColor:#ef3e31" />
						// 			</linearGradient>
						// 			<path
						// 				fill="url(#a)"
						// 				d="M56.9 0h141.8a56.5 56.5 0 0 1 57.4 59.1V197.4a56.6 56.6 0 0 1-57.5 58.6l-144.2-.1a57 57 0 0 1-54-56.8V56.9A56.8 56.8 0 0 1 53.7.2c1-.2 2.1-.2 3.2-.2z"
						// 			/>
						// 			<linearGradient
						// 				id="b"
						// 				gradientUnits="userSpaceOnUse"
						// 				x1="130.6"
						// 				y1="4.1"
						// 				x2="95.2"
						// 				y2="204.9"
						// 			>
						// 				<stop offset="0" contentStyleType="stopColor:#e39f3a" />
						// 				<stop offset="1" contentStyleType="stopColor:#d33929" />
						// 			</linearGradient>
						// 			<path
						// 				fill="url(#b)"
						// 				d="M216 209.4a39 39 0 0 0-11.6-11.9c-4-2.7-8.7-4.4-13.5-4.6-3.4-.2-6.8.4-10 1.6a65.2 65.2 0 0 0-9.3 4.3c-3.5 1.8-7 3.6-10.7 5.1-4.4 1.8-9 3.2-13.7 4.2a89 89 0 0 1-17.8 1.4 120.3 120.3 0 0 1-77.2-30 145.4 145.4 0 0 1-22.8-25.1 46.6 46.6 0 0 1-3-4.7L0 121.2V56.7A56.6 56.6 0 0 1 56.6 0h50.5l37.4 38c84.4 57.4 57.1 120.7 57.1 120.7s24 27 14.4 50.7z"
						// 			/>
						// 			<path
						// 				fill="#FFF"
						// 				d="M144.7 38c84.4 57.4 57.1 120.7 57.1 120.7s24 27.1 14.3 50.8c0 0-9.9-16.6-26.5-16.6-16 0-25.4 16.6-57.6 16.6-71.7 0-105.6-59.9-105.6-59.9C91 192.1 135.1 162 135.1 162c-29.1-16.9-91-97.7-91-97.7 53.9 45.9 77.2 58 77.2 58-13.9-11.5-52.9-67.7-52.9-67.7 31.2 31.6 93.2 75.7 93.2 75.7C179.2 81.5 144.7 38 144.7 38z"
						// 			/>
						// 		</svg>
						// 	),
						// },
						{
							name: 'Flutter',
							svg: (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="xMidYMid"
									viewBox="0 0 256 317"
									height="12"
									width="12"
								>
									<defs>
										<linearGradient
											x1="4%"
											y1="27%"
											x2="75.9%"
											y2="52.9%"
											id="a"
										>
											<stop offset="0%" />
											<stop stopOpacity="0" offset="100%" />
										</linearGradient>
									</defs>
									<path
										fill="#47C5FB"
										d="M158 0 0 158l49 48L255 0zM157 145l-85 85 49 50 49-49 85-86z"
									/>
									<path fill="#00569E" d="m121 280 37 37h97l-85-86z" />
									<path fill="#00B5F8" d="m72 230 48-48 50 49-49 49z" />
									<path
										fillOpacity=".8"
										fill="url(#a)"
										d="m121 280 41-14 4-31z"
									/>
								</svg>
							),
						},
					].map((item, index) => (
						<Badge
							variant={'outline'}
							className="flex items-center justify-center gap-2"
							key={index}
						>
							<div className="hidden dark:block">{item.svg}</div>
							{item.name}
						</Badge>
					))}
				</div>
			</div>
			<br />

			<div className="flex flex-wrap items-center gap-2">
				<h1 className="mb-2 font-nunito ">Software I use Everyday :</h1>
				{[
					'Raycast',
					'Figma',
					'Arc',
					'NotchNook',
					'Zed',
					'Adobes',
					'Charles',
				].map((item, index) => (
					<Badge
						variant={'outline'}
						className="flex items-center justify-center gap-2"
						key={index}
					>
						{item}
					</Badge>
				))}
			</div>
			<br />
			<Link className="flex items-center " to={'/framer'}>
				50 Day Framer Motion Challange
			</Link>
		</div>
	);
}

const Gallery = ({ images }: { images: string[] }) => {
	return (
		// [&>div>img]:grayscale
		<div className="[*]:h-full group:hover:[&>*]:opacity-75 grid h-[100vh] grid-cols-6 gap-4 *:border-[1px]  ">
			<ContextMenu>
				<ContextMenuTrigger className="border-1 col-span-3 overflow-hidden rounded-md bg-slate-400">
					<div className=" h-full w-full overflow-hidden">
						<img
							src={images[1]}
							alt="image"
							className=" h-full w-full object-cover object-center"
						/>
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem
						onClick={() => {
							const imageUrl = images[1];
							const link = document.createElement('a');
							link.href = imageUrl;
							link.target = '_blank';
							link.download = 'downloaded-image.jpg';
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
						}}
					>
						Download
					</ContextMenuItem>
					<ContextMenuItem>Share</ContextMenuItem>
					{/* <ContextMenuItem>Team</ContextMenuItem> */}
					{/* <ContextMenuItem>Subscription</ContextMenuItem> */}
				</ContextMenuContent>
			</ContextMenu>

			<div className="border-1 col-span-1  overflow-hidden rounded-md bg-slate-400">
				<img
					src={images[2]}
					alt="image"
					className=" h-full w-full object-cover object-center"
				/>
			</div>
			<div className="border-1 col-span-2 overflow-hidden rounded-md bg-slate-400">
				<img
					src={images[3]}
					alt="image"
					className=" h-full w-full object-cover object-center"
				/>
			</div>
			<div className="border-1 col-span-2 overflow-hidden rounded-md bg-slate-400">
				<img
					src={images[4]}
					alt="image"
					className=" h-full w-full object-cover object-center"
				/>
			</div>
			<div className="border-1 col-span-3  overflow-hidden rounded-md bg-slate-400">
				<img
					src={images[0]}
					alt="image"
					className=" h-full w-full object-cover object-center"
				/>
			</div>
			<div className="border-1 col-span-1  overflow-hidden rounded-md bg-slate-400">
				<img
					src={images[5]}
					alt="image"
					className=" object-fit h-full w-full object-center"
				/>
			</div>
			<div className="border-1 col-span-3  overflow-hidden rounded-md bg-slate-400">
				<img
					src={images[6]}
					alt="image"
					className=" h-full w-full object-cover object-center"
				/>
			</div>
			<div className="border-1 col-span-3  overflow-hidden rounded-md bg-slate-400">
				<img
					src={images[7]}
					alt="image"
					className=" h-full w-full object-cover object-center"
				/>
			</div>

			{/* <div className="border-1 col-span-5 row-span-1 overflow-hidden rounded-md bg-slate-400">
				<img
					src={images[1]}
					alt="image"
					className=" h-full w-full object-cover object-center"
				/>
			</div>
			<div className="border-1 col-span-5 row-span-1 overflow-hidden rounded-md bg-slate-400">
				<img
					src={images[3]}
					alt="image"
					className=" h-full w-full object-cover object-center"
				/>
			</div> */}

			{/* {images.map((image, index) => (
				<img
					src={image}
					className={`col-span-2 row-span-${(index % 4) + 1}`}
					alt="image" className='object-cove h-full w-full object-center"'
					key={image}
				/>
			))} */}
		</div>
	);
}; // [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] [grid-template-rows:masonry]
