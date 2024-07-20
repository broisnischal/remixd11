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

export const meta: MetaFunction = () => {
	return [
		{ title: 'Nischal Dahal | broisnees' },
		{
			property: 'og:title',
			content: 'Nischal Dahal | broisnees',
		},
		{
			name: 'description',
			content:
				'Nischal Dahal | broisnees, a blog by Nischal Dahal (https://nees.pages.dev) and the Personal Portfolio of Nischal Dahal',
		},
		{
			'script:ld+json': {
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Blog',
						item: 'https://www.nees.pages.com/blog',
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: 'Learning',
						item: 'https://www.nees.pages.com/learning/year',
					},
				],
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
		<div className="w-[90vw]">
			{/* <Claps /> */}
			<br />
			<br />
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

				<div className="flex  flex-col items-start gap-4 lg:max-w-[70%]">
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
						<ArrowTopRightIcon /> RSS
					</a>
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

			<div className="flex flex-col">
				<h1 className="mb-4 font-semibold">Learning</h1>
				<Link className="flex items-center gap-2" to={'/framer'}>
					Framer Motion <HiOutlineDotsHorizontal />
				</Link>
			</div>
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
