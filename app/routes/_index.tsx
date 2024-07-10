import { parse } from '~/services/markdoc.server';
import { json } from '@remix-run/cloudflare';
import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import {
	Link,
	unstable_useViewTransitionState,
	useLoaderData,
} from '@remix-run/react';
import { Ratelimit } from '@upstash/ratelimit';
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
		limiter: Ratelimit.fixedWindow(10, '60 m'),
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
		<div className="flex w-[60%] flex-col items-start justify-normal gap-3">
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

			{/* <h2>Featured Blogs</h2>
			{data.posts.map(post => (
				<p key={post.slug}>
					<Link to={'/blog/' + post.slug + ''}>{post.frontmatter.title}</Link>
				</p>
			))} */}

			<h1 className="text-3xl font-bold dark:text-zinc-100">
				hey, I'm Nischal 👋
			</h1>

			<Badge>Software Engineer</Badge>

			<p>
				I'm Nischal Dahal! I've got over 5 years of experiences in development.
				I'm all about embracing new challenges and learning opportunities. Let's
				build something awesome together! I continue to improve myself every
				day.
			</p>

			<ul>
				<li>I ❤️ Remix.</li>
				<li>
					<TextHighlight>Code</TextHighlight>
				</li>
			</ul>

			{/* <Markdown content={data.content} /> */}
		</div>
	);
}

// function NavImage({ src, alt, id }: { src: string; alt: string; id: number }) {
// 	const to = `/images/${idx}`;
// 	const vt = unstable_useViewTransitionState(href);
// 	return (
// 		<Link to={to} unstable_viewTransition>
// 			<img
// 				src={src}
// 				alt={alt}
// 				style={{
// 					viewTransitionName: vt ? 'image-expand' : '',
// 				}}
// 			/>
// 		</Link>
// 	);
// }
