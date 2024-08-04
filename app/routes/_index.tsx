import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { json, Link, useLoaderData } from '@remix-run/react';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { Badge } from '~/components/ui/badge';
import { TextHighlight } from '~/components/ui/highlight';

import { MetaCreator } from '~/utils/meta';
import { getPosts } from '~/.server/posts';
import { _ } from 'node_modules/@upstash/redis/zmscore-80635339';
import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import moment from 'moment';
import Hr from '~/components/hr';
import { Button } from '~/components/ui/button';
import { RouteLink } from '~/root';

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

export async function loader(args: LoaderFunctionArgs) {
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

	const posts = await getPosts();

	const featuredPosts = posts.filter(post => post.frontmatter.featured);

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
			featuredPosts,
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
}
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
// };

export default function Index() {
	const { featuredPosts } = useLoaderData<typeof loader>();

	return (
		<div>
			<br />
			<div className="flex flex-col items-start  gap-4">
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

				<h1 className="text-3xl font-bold leading-3 dark:text-zinc-100">
					Nischal Dahal
				</h1>
				<h3>
					I'm a software developer from Nepal. I work at AITC as Software
					Engineer. <br /> I love to build things.
				</h3>
				<div className="flex flex-wrap gap-4">
					<Link
						className="font-nunito font-bold lowercase underline"
						to="/timeline"
					>
						my life Timeline
					</Link>
					<Link
						className="font-nunito font-bold lowercase underline"
						to="/framer"
					>
						50 days of Framer
					</Link>
					<Link
						className="font-nunito font-bold lowercase underline"
						to="/learning/year"
					>
						Learning Projects
					</Link>
				</div>
				{/* 
				<div className="flex gap-1">
					<Badge variant={'outline'}>Software Engineer</Badge>
					<Badge variant={'secondary'}>18</Badge>
				</div> */}

				{/* <div className="flex  flex-col items-start gap-4 "> */}
				{/* <div className="desc flex w-[80%] flex-col items-start gap-4"> */}

				{/* <div className="flex items-center justify-center gap-2 text-sm">
						{['typescript', 'flutter', 'zig', 'rust', 'go'].map(
							(item, index) => (
								<TextHighlight key={index}>{item}</TextHighlight>
							),
						)}
					</div> */}
				{/* 
					<p>
						Driven by an insatiable curiosity, I constantly refine my craft
						through hands-on coding and in-depth research. Each project is an
						opportunity to push boundaries and create something truly
						remarkable.
					</p>

					<p>
						Journey in the tech realm is defined by a relentless pursuit of
						excellence, crafting sophisticated systems that drive the future.
					</p> */}
				{/* </div> */}
				{/* <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden bg-background px-20  ">
						<IconCloud iconSlugs={slugs} />
					</div> */}
				{/* </div>s */}
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
			<Hr />
			<br />

			{/* <hr />	 */}
			<div className="flex flex-col items-start gap-10">
				{featuredPosts.map(post => (
					<Link
						key={post.slug}
						className="group"
						to={'/blog/' + post.slug + ''}
					>
						<div className="flex flex-col items-start gap-1">
							<p className="font-inter text-sm text-zinc-500">
								{moment(post.frontmatter.published).format('MMMM Do YYYY')}
							</p>

							<h1 className="font-poppins text-[1.2rem] font-bold capitalize tracking-wide group-hover:underline">
								{post.frontmatter.title}
							</h1>

							<p className="rounded-md font-normal" key={post.slug}>
								{post.frontmatter.description}
							</p>

							<div className="flex flex-wrap gap-1">
								{post.frontmatter.tags?.map((item, i) => (
									<Badge key={i} variant={'outline'}>
										{item}
									</Badge>
								))}
							</div>
						</div>
					</Link>
				))}
			</div>
			<br />
			<Link to="/blog">
				<Button className="self-center" variant={'outline'}>
					Read more
				</Button>
			</Link>

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
			<br />

			{/* <Link className="flex items-center " to={'/framer'}>
				50 Day Framer Motion Challange
			</Link>
			<br />
			<Link
				className="flex items-center "
				target="_blank"
				to={'https://blog.nischal-dahal.com.np/blog'}
			>
				Turn on Blog Mode?
			</Link> */}
		</div>
	);
}

// const Gallery = ({ images }: { images: string[] }) => {
// 	return (
// 		// [&>div>img]:grayscale
// 		<div className="[*]:h-full group:hover:[&>*]:opacity-75 grid h-[100vh] grid-cols-6 gap-4 *:border-[1px]  ">
// 			<ContextMenu>
// 				<ContextMenuTrigger className="border-1 col-span-3 overflow-hidden rounded-md bg-slate-400">
// 					<div className=" h-full w-full overflow-hidden">
// 						<img
// 							src={images[1]}
// 							alt="image"
// 							className=" h-full w-full object-cover object-center"
// 						/>
// 					</div>
// 				</ContextMenuTrigger>
// 				<ContextMenuContent>
// 					<ContextMenuItem
// 						onClick={() => {
// 							const imageUrl = images[1];
// 							const link = document.createElement('a');
// 							link.href = imageUrl;
// 							link.target = '_blank';
// 							link.download = 'downloaded-image.jpg';
// 							document.body.appendChild(link);
// 							link.click();
// 							document.body.removeChild(link);
// 						}}
// 					>
// 						Download
// 					</ContextMenuItem>
// 					<ContextMenuItem>Share</ContextMenuItem>
// 					{/* <ContextMenuItem>Team</ContextMenuItem> */}
// 					{/* <ContextMenuItem>Subscription</ContextMenuItem> */}
// 				</ContextMenuContent>
// 			</ContextMenu>

// 			<div className="border-1 col-span-1  overflow-hidden rounded-md bg-slate-400">
// 				<img
// 					src={images[2]}
// 					alt="image"
// 					className=" h-full w-full object-cover object-center"
// 				/>
// 			</div>
// 			<div className="border-1 col-span-2 overflow-hidden rounded-md bg-slate-400">
// 				<img
// 					src={images[3]}
// 					alt="image"
// 					className=" h-full w-full object-cover object-center"
// 				/>
// 			</div>
// 			<div className="border-1 col-span-2 overflow-hidden rounded-md bg-slate-400">
// 				<img
// 					src={images[4]}
// 					alt="image"
// 					className=" h-full w-full object-cover object-center"
// 				/>
// 			</div>
// 			<div className="border-1 col-span-3  overflow-hidden rounded-md bg-slate-400">
// 				<img
// 					src={images[0]}
// 					alt="image"
// 					className=" h-full w-full object-cover object-center"
// 				/>
// 			</div>
// 			<div className="border-1 col-span-1  overflow-hidden rounded-md bg-slate-400">
// 				<img
// 					src={images[5]}
// 					alt="image"
// 					className=" object-fit h-full w-full object-center"
// 				/>
// 			</div>
// 			<div className="border-1 col-span-3  overflow-hidden rounded-md bg-slate-400">
// 				<img
// 					src={images[6]}
// 					alt="image"
// 					className=" h-full w-full object-cover object-center"
// 				/>
// 			</div>
// 			<div className="border-1 col-span-3  overflow-hidden rounded-md bg-slate-400">
// 				<img
// 					src={images[7]}
// 					alt="image"
// 					className=" h-full w-full object-cover object-center"
// 				/>
// 			</div>

// 			{/* <div className="border-1 col-span-5 row-span-1 overflow-hidden rounded-md bg-slate-400">
// 				<img
// 					src={images[1]}
// 					alt="image"
// 					className=" h-full w-full object-cover object-center"
// 				/>
// 			</div>
// 			<div className="border-1 col-span-5 row-span-1 overflow-hidden rounded-md bg-slate-400">
// 				<img
// 					src={images[3]}
// 					alt="image"
// 					className=" h-full w-full object-cover object-center"
// 				/>
// 			</div> */}

// 			{/* {images.map((image, index) => (
// 				<img
// 					src={image}
// 					className={`col-span-2 row-span-${(index % 4) + 1}`}
// 					alt="image" className='object-cove h-full w-full object-center"'
// 					key={image}
// 				/>
// 			))} */}
// 		</div>
// 	);
// }; // [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] [grid-template-rows:masonry]

export function SoftwareTools() {
	return (
		<div className="flex flex-wrap items-center gap-2">
			<h1 className="mb-1 font-nunito ">Software Tools :</h1>
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
