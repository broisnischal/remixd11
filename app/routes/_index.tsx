import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { Await, defer, Link, useLoaderData } from '@remix-run/react';
import { Badge } from '~/components/ui/badge';

import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Suspense } from 'react';
import { HiDocumentText } from 'react-icons/hi';
import { getPosts } from '~/.server/posts';
import { ConnectButton } from '~/components/ui-library/tailwindbutton';
import { MetaCreator } from '~/utils/meta';

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

	const posts = getPosts().then(posts =>
		posts
			.filter(post => post.frontmatter.featured === true)
			.filter(post => post.frontmatter.published)
			.sort(
				(a, b) =>
					new Date(b.frontmatter.published).getTime() -
					new Date(a.frontmatter.published).getTime(),
			)
			.slice(0, 10),
	);

	// const featuredPosts = posts.filter(post => post.frontmatter.featured);

	// return json(
	// 	{
	// 		posts,
	// 		// success,
	// 		// svgContent,
	// 		// posts,
	// 		// limit,
	// 		// remaining,
	// 		// reset,
	// 		// identifier,
	// 		// url: args.context.env.UPSTASH_REDIS_REST_URL,
	// 		// token: args.context.env.UPSTASH_REDIS_REST_TOKEN,
	// 	},
	// 	{
	// 		headers: {
	// 			// 'X-RateLimit-Limit': limit.toString(),
	// 			// 'X-RateLimit-Remaining': remaining.toString(),
	// 			// 'X-RateLimit-Reset': reset.toString(),
	// 		},
	// 	},
	// );
	return defer({ posts });
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
	const { posts } = useLoaderData<typeof loader>();

	return (
		<div className="m-auto w-full">
			<div
				className="m-auto flex flex-col items-center
			 justify-center gap-8 md:flex-col"
			>
				<img
					src="/qr.png"
					className=" w-[150px] rounded-lg border shadow-sm"
					alt=""
				/>
				<div className="flex flex-col items-center justify-center  gap-2">
					<h1 className="text-3xl font-bold dark:text-zinc-100">
						Hey there, I'm Nischal.
					</h1>
					<h3 className="secondary text-center xl:max-w-[70%]">
						I'm a full stack engineer with a focus on serverless architectures,
						android development, user experience, and product development.
					</h3>
				</div>
			</div>
			<br />
			<div className="m-auto flex flex-col items-center justify-center gap-2 md:flex-row">
				<Link
					target="_blank"
					to="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=neeswebservices"
				>
					<ConnectButton>
						<div className="flex items-center justify-center gap-2">
							<LinkedInLogoIcon /> Follow on LinkedIn
						</div>
					</ConnectButton>
				</Link>
				<Link target="_blank" to="https://github.com/broisnischal">
					<ConnectButton>
						<div className="flex items-center justify-center gap-2">
							<GitHubLogoIcon /> Connect on Github
						</div>
					</ConnectButton>
				</Link>
				<Link
					target="_blank"
					to={
						'https://github.com/broisnischal/broisnischal/blob/main/resume.pdf'
					}
				>
					<ConnectButton>
						<div className="flex items-center justify-center gap-2">
							<HiDocumentText /> View Resume
						</div>
					</ConnectButton>
				</Link>
			</div>
			<br />
			<br />
			<div className="flex flex-col items-start gap-4">
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
												<div className="div h-[150px] rounded-md bg-white dark:bg-[#eee]">
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
			</div>
			<br />
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
