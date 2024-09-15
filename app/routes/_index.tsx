import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { Await, defer, Link, useLoaderData } from '@remix-run/react';
import { Badge } from '~/components/ui/badge';

import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import { Suspense } from 'react';
import { HiDocumentText } from 'react-icons/hi';
import { getPosts } from '~/.server/posts';
import { ConnectButton } from '~/components/ui-library/tailwindbutton';
import { MetaCreator } from '~/utils/meta';
import { FaConnectdevelop } from 'react-icons/fa';

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

interface Artist {
	name: string;
}

interface Track {
	name: string;
	artists: Artist[];
}

interface SpotifyApiResponse {
	items: Track[];
}

async function fetchWebApi<T>(
	endpoint: string,
	method: string,
	token: string,
	body?: any,
): Promise<T> {
	const res = await fetch(`https://api.spotify.com/${endpoint}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		method,
		body: body ? JSON.stringify(body) : undefined,
	});
	return await res.json();
}

const client_id = 'b387058b297a40de99bbcce45a2b3e97';
const client_secret = '552f9d1e44bf4a55b82a8f460e8ae9bf';

const getAccessToken = async () => {
	const tokenEndpoint = 'https://accounts.spotify.com/api/token';

	const headers = {
		Authorization: 'Basic ' + btoa(`${client_id}:${client_secret}`),
		'Content-Type': 'application/x-www-form-urlencoded',
	};

	const body = new URLSearchParams({
		client_id: client_id,
		grant_type: 'client_credentials',
		code: 'user-read-currently-playing',
		redirect_uri: 'http://localhost:3000',
	});
	console.log(body.toString());

	try {
		const response = await fetch(tokenEndpoint, {
			method: 'POST',
			headers: headers,
			body: body.toString(),
		});
		const data: any = await response.json();
		if (response.ok) {
			return data.access_token;
		} else {
			throw new Error(data.error_description || 'Failed to fetch access token');
		}
	} catch (error) {
		console.error('Error fetching access token:', error);
	}
};

export async function loader(args: LoaderFunctionArgs) {
	// const NOW_PLAYING_ENDPOINT = 'v1/me/player/currently-playing';

	// const token = await getAccessToken();

	// console.log(token);

	// const newplaying = await fetchWebApi<SpotifyApiResponse>(
	// 	NOW_PLAYING_ENDPOINT,
	// 	'GET',
	// 	token,
	// );

	// console.log(newplaying);

	// console.log(
	// 	topTracks.map(
	// 		({ name, artists }) =>
	// 			`${name} by ${artists.map(artist => artist.name).join(', ')}`,
	// 	),
	// );

	// Step 3: Return the track information as JSON
	// if (nowPlayingResponse.status === 200 && nowPlayingResponse.data) {
	// 	const track = nowPlayingResponse.data.item;
	// 	return json({
	// 		name: track.name,
	// 		artists: track.artists.map((artist: any) => artist.name).join(', '),
	// 		album: track.album.name,
	// 		albumArt: track.album.images[0].url,
	// 	});
	// } else {
	// 	return json({ message: 'No music is currently playing.' });
	// }

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
			<br />
			<div className="flex flex-col items-center md:flex-row">
				<div>
					<img
						src="/qr.png"
						className="hidden w-[150px] rounded-lg border bg-transparent shadow-sm saturate-0 filter md:w-[150px] xl:w-[160px]"
						alt=""
					/>
				</div>
				<div className="flex flex-col gap-2">
					<h1 className=" text-3xl font-bold dark:text-zinc-100">
						Hey, I'm Nischal Dahal,
					</h1>
					<h3 className="w-full">
						I'm a full-stack engineer focusing on serverless architectures,
						android development, user experience, and product development.{' '}
						<Link to={'/about'} className="underline underline-offset-2">
							brief intro?
						</Link>
					</h3>
					<div className="mt-4 flex flex-row flex-wrap gap-2">
						<Link
							target="_blank"
							to="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=neeswebservices"
						>
							<ConnectButton
								className="rounded-md"
								focuscolor="via-blue-400/90"
							>
								<div className="flex items-center justify-center gap-2">
									<LinkedInLogoIcon /> Connect
								</div>
							</ConnectButton>
						</Link>

						<Link target="_blank" to="https://github.com/broisnischal">
							<ConnectButton className="rounded-md">
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
							<ConnectButton className="rounded-md" focuscolor="via-yellow-400">
								<div className="flex items-center justify-center gap-2">
									<HiDocumentText /> MyResume
								</div>
							</ConnectButton>
						</Link>
						<Link target="_blank" to="https://dly.to/oYeNtLdx9va">
							<ConnectButton
								className="rounded-md"
								focuscolor="via-blue-400/90"
							>
								<div className="flex items-center justify-center gap-2">
									<FaConnectdevelop />
									Join
								</div>
							</ConnectButton>
						</Link>
					</div>
				</div>
			</div>

			<div className="my-10 flex flex-col gap-3">
				<h3 className="font-bold">
					Learn <span className="text-purple-500">together</span>, Grow
					<span className="text-purple-500"> together</span>!
				</h3>

				<p>
					Join our <b>discord</b> server to learn together, grow together and
					help each other out!
				</p>
				<p>
					I upload content and shorts, sharing tech knowledge, tips and tricks,
					product reviews and more!
				</p>
			</div>

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
