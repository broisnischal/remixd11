import { parse } from '~/services/markdoc.server';
import { json } from '@remix-run/cloudflare';
import type {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/cloudflare';
import {
	Form,
	Link,
	unstable_useViewTransitionState,
	useLoaderData,
	useSubmit,
} from '@remix-run/react';
import Lottie from 'lottie-react';
import HeartAnimation from '../assets/lottie/heart.json';
import { Ratelimit } from '@upstash/ratelimit';
import { GoHeart, GoHeartFill } from 'react-icons/go';

// import { Redis } from '@upstash/redis';
import { Redis } from '@upstash/redis/cloudflare';

import { Markdown } from '~/components';
import fs from 'fs';
import Motion from '~/components/motion';
import { Kafka } from '@upstash/kafka';
import { Button } from '~/components/ui/button';
import { getPosts } from '~/.server/posts';
import { Badge } from '~/components/ui/badge';
import { TextHighlight } from '~/components/ui/highlight';
import { Check, Heart, HeartPulseIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { HandIcon } from '@radix-ui/react-icons';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Very cool app | Remix' },
		{
			property: 'og:title',
			content: 'Very cool app',
		},
		{
			name: 'description',
			content: 'This app is the best',
		},
		{
			'script:ld+json': {
				'@context': 'https://schema.org',
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: 'https://www.example.com/',
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: 'Category',
						item: 'https://www.example.com/category',
					},
					{
						'@type': 'ListItem',
						position: 3,
						name: 'Subcategory',
						item: 'https://www.example.com/category/subcategory',
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

	const posts = await getPosts();

	const ratelimit = new Ratelimit({
		redis: Redis.fromEnv(args.context.env),
		limiter: Ratelimit.fixedWindow(10, '60 s'),
		enableProtection: true,
		analytics: true,
	});

	const ip =
		args.request.headers.get('X-Forwarded-For') ??
		args.request.headers.get('x-real-ip');

	const identifier = ip ?? 'global';

	const { success, limit, remaining, reset } =
		await ratelimit.limit(identifier);

	return json(
		{
			success,
			posts,
			limit,
			remaining,
			reset,
			identifier,
			url: args.context.env.UPSTASH_REDIS_REST_URL,
			token: args.context.env.UPSTASH_REDIS_REST_TOKEN,
		},
		{
			headers: {
				'X-RateLimit-Limit': limit.toString(),
				'X-RateLimit-Remaining': remaining.toString(),
				'X-RateLimit-Reset': reset.toString(),
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
			{/* <Claps /> */}

			<div className="flex w-[60%] flex-col items-start justify-normal gap-8">
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
				<div className="flex items-end gap-4">
					<img
						className="aspect-square w-12 rounded-full"
						src="/profile.jpg"
						alt=""
					/>

					<h1 className="text-3xl font-bold dark:text-zinc-100">
						hey, I'm Nischal 👋
					</h1>
				</div>

				<div className="flex gap-3">
					<Badge variant={'outline'}>Software Engineer</Badge>
					<Badge variant={'secondary'}>18</Badge>
				</div>

				<p>
					I'm Nischal Dahal! I've got over 5 years of experiences in
					development. I'm all about embracing new challenges and learning
					opportunities. Let's build something awesome together! I continue to
					improve myself every day.
				</p>

				<div className="flex items-center justify-center gap-2 text-sm">
					Currently :
					{['typescript', 'flutter', 'zig', 'rust', 'go'].map((item, index) => (
						<TextHighlight key={index}>{item}</TextHighlight>
					))}
				</div>

				<ul className="font-semibold">
					<li>I ❤️ Remix.</li>
					<li>I am a Typescript Mini Wizard 🚀</li>
					<li>I am Android Developer 📱</li>
					<li>I love IOT 👾</li>
				</ul>

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
			{/* <Gallery
				images={[
					'https://images.pexels.com/photos/9551192/pexels-photo-9551192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
					'https://images.pexels.com/photos/25568965/pexels-photo-25568965/free-photo-of-a-woman-in-a-leopard-print-dress-and-cowboy-hat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
					'https://images.pexels.com/photos/26926216/pexels-photo-26926216/free-photo-of-a-hand-holding-a-flower-with-the-words-how-to-grow-frangipani.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
					'https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
				]}
			/> */}
		</div>
	);
}

const Gallery = ({ images }: { images: string[] }) => {
	return (
		<div className="grid  grid-cols-10 grid-rows-1 gap-4">
			<div className="border-1 col-span-6 row-span-1 overflow-hidden rounded-md bg-slate-400">
				<img
					src={images[0]}
					alt="image"
					className=" h-full w-full object-cover object-center"
				/>
			</div>
			<div className="border-1 col-span-4 row-span-1 overflow-hidden rounded-md bg-slate-400">
				<img
					src={images[1]}
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
