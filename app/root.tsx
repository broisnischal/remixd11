import type {
	ActionFunctionArgs,
	LinksFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/cloudflare';

import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import {
	Await,
	defer,
	Form,
	Link,
	Links,
	Meta,
	NavLink,
	Outlet,
	redirect,
	Scripts,
	ScrollRestoration,
	useActionData,
	useLoaderData,
	useLocation,
	useSubmit,
} from '@remix-run/react';
import clsx from 'clsx';
import * as React from 'react';

import { Redis } from '@upstash/redis/cloudflare';
import { ArrowUp, Mails } from 'lucide-react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import {
	PreventFlashOnWrongTheme,
	ThemeProvider,
	useTheme,
} from 'remix-themes';
import ProgessBar from './components/global-progess';
import Hr from './components/hr';
import { ConnectButton } from './components/ui-library/tailwindbutton';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Search } from './routes/search';
import { SessionStorage } from './services/session.server';
import { themeSessionResolver } from './session.server';
import styles from './tailwind.css?url';
import { MetaCreator } from './utils/meta';
import { ModeToggle } from './components/toggle-mode';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction<typeof loader> = ({ location, data }) => {
	const url = new URL('https://nischal-dahal.com.np');

	const metadata = MetaCreator({
		title:
			'Nischal Dahal | Broisnees - Software Engineer & Full Stack Developer | Designer | Learner  ',
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
			// {
			// 	httpEquiv: 'Content-Security-Policy',
			// },
		],
	});

	return [
		...metadata,
		{
			'script:ld+json': {
				'@context': 'https://schema.org',
				'@type': 'Person',
				name: 'Nischal Dahal | Broisnees ',
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
				blogPosts: {
					'@type': 'Blog',
					name: 'Nischal Dahal Blog',
					numberOfPosts: 5,
					audience: {
						'@type': 'Audience',
						audienceSize: 500,
					},
				},
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

				// mainEntity: [
				// 	{
				// 		'@type': 'Blog',
				// 		name: 'Blog',
				// 		url: `${url.origin}/blog`,
				// 		description: 'Collection of blog posts',
				// 	},
				// 	{
				// 		'@type': 'Overview',
				// 		name: 'Developer Experience',
				// 		url: `${url.origin}/overview`,
				// 		description: 'Showcase of development skills and experience',
				// 	},
				// 	{
				// 		'@type': 'Bookmarks',
				// 		name: 'Bookmarks',
				// 		url: `${url.origin}/bookmarks`,
				// 		description: 'Detailed narrative of the Heroku experience',
				// 	},
				// 	{
				// 		'@type': 'Guestbook',
				// 		name: 'Work',
				// 		url: 'https://nischal-dahal.com.np/guestbook',
				// 		description: 'Portfolio of completed work and projects',
				// 	},
				// ],
				// publisher: {
				// 	'@type': 'Organization',
				// 	name: 'Nischal Dahal',
				// 	logo: {
				// 		'@type': 'ImageObject',
				// 		url: `${url.origin}/images/og.png`,
				// 	},
				// },
				// breadcrumb: {
				// 	'@type': 'BreadcrumbList',
				// 	itemListElement: [
				// 		{
				// 			'@type': 'ListItem',
				// 			position: 1,
				// 			name: 'Home',
				// 			item: `${url.origin}`,
				// 		},
				// 		{
				// 			'@type': 'ListItem',
				// 			position: 2,
				// 			name: 'Blog',
				// 			item: `${url.origin}/blog`,
				// 		},
				// 		{
				// 			'@type': 'ListItem',
				// 			position: 3,
				// 			name: 'Developer Experience',
				// 			item: `${url.origin}/overview`,
				// 		},
				// 		{
				// 			'@type': 'ListItem',
				// 			position: 4,
				// 			name: 'Newsletter',
				// 			item: `${url.origin}/newsletter`,
				// 		},
				// 		{
				// 			'@type': 'ListItem',
				// 			position: 5,
				// 			name: 'Learning',
				// 			item: `${url.origin}/learning/year`,
				// 		},
				// 	],
				// },
			},
		},
		// { name: 'viewport', content: 'width=device-width, initial-scale=1' },
	];
};

export const link: LinksFunction = () => {
	return [
		{
			rel: 'icon',
			href: 'https://avatars.githubusercontent.com/u/98168009?v=4',
		},
	];
};

export const RouteLink = ({
	to,
	children,
}: {
	to: string;
	children: React.ReactNode;
}) => {
	return (
		<NavLink
			prefetch="intent"
			className={({ isActive }) =>
				isActive
					? 'active font-bricolage font-semibold md:text-[16px]'
					: 'font-bricolage md:text-[16px]'
			}
			to={to}
		>
			{children}
		</NavLink>
	);
};

const NavBar = () => {
	const data = useLoaderData<typeof loader>();

	const [isOpen, setIsOpen] = React.useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<nav className=" top-0 z-[998] hidden w-full py-10 md:flex">
				<div className="m-auto flex items-center justify-between overflow-hidden py-1">
					<div className=" flex gap-4">
						<div className="flex gap-6">
							<RouteLink to={'/'}>home</RouteLink>
							<RouteLink to={'/blog'}>contents</RouteLink>
							<RouteLink to={'/guestbook'}>guestbook</RouteLink>
							<RouteLink to={'/overview'}>overview</RouteLink>
							<RouteLink to={'/bookmarks'}>bookmarks</RouteLink>
							<RouteLink to={'/hire'}>hireme</RouteLink>
							<RouteLink to={'/newsletter'}>newsletter</RouteLink>
							<RouteLink to={'/links'}>links</RouteLink>
						</div>
						{/* <RouteLink to={'/cat/guides'}>guides</RouteLink> */}
						{/* <RouteLink to={'/projects'}>projects</RouteLink> */}
						{/* <RouteLink to={'/thought'}>thoughts</RouteLink> */}
						{/* <RouteLink to={'/career'}>projects</RouteLink> */}
						{/* <RouteLink to={'/canvas'}>canvas</RouteLink> */}
						<React.Suspense>
							<Await resolve={data.user}>
								{user => (
									<>
										{user?.type == 'nees' && (
											<RouteLink to={'/dashboard'}>Dashboard</RouteLink>
										)}
										{user?.id && <Link to="/auth/logout">Logout</Link>}
									</>
								)}
							</Await>
						</React.Suspense>
					</div>
					<div className="ml-5 flex flex-col items-center justify-center gap-3 md:flex-row">
						<ModeToggle />
					</div>
				</div>
			</nav>
			<nav className=" m-auto  mt-8  w-[90%] items-center justify-center gap-3 md:hidden">
				<div className="fixed right-[24px] top-[24px] z-[999]">
					<ModeToggle />
					<Search />
				</div>
				<div className="flex w-full items-center justify-center">
					<div className="mt-6 flex flex-row flex-wrap items-center justify-center gap-2 ">
						<RouteLink to={'/'}>home</RouteLink>
						<RouteLink to={'/blog'}>contents</RouteLink>
						<RouteLink to={'/guestbook'}>guestbook</RouteLink>
						<RouteLink to={'/overview'}>overview</RouteLink>
						<RouteLink to={'/bookmarks'}>bookmarks</RouteLink>
						<RouteLink to={'/hire'}>hireme</RouteLink>
						<RouteLink to={'/newsletter'}>newsletter</RouteLink>
						<RouteLink to={'/links'}>links</RouteLink>

						{/* <RouteLink to={'/cat/guides'}>guides</RouteLink> */}
						{/* <RouteLink to={'/projects'}>projects</RouteLink> */}
						{/* <RouteLink to={'/thought'}>thoughts</RouteLink> */}
						{/* <RouteLink to={'/career'}>projects</RouteLink> */}
						{/* <RouteLink to={'/canvas'}>canvas</RouteLink> */}
						<React.Suspense>
							<Await resolve={data.user}>
								{user => (
									<>
										{user?.type == 'nees' && (
											<RouteLink to={'/dashboard'}>Dashboard</RouteLink>
										)}
										{user?.id && <Link to="/auth/logout">Logout</Link>}
									</>
								)}
							</Await>
						</React.Suspense>
					</div>
				</div>
			</nav>
		</>
	);
};

const Footer = () => {
	return (
		<div className="secondary m-auto my-10 flex min-h-[5vh] w-full max-w-[90%] flex-col items-center justify-center gap-2 text-sm">
			<div className="flex w-full items-center  justify-evenly">
				<h2 className="font-bricolage text-xl font-bold text-primary ">
					Nischal Dahal
				</h2>
				<Link to={'/newsletter'}>
					<ConnectButton>
						<div className="flex items-center justify-center gap-2 ">
							<Mails size={18} /> Newsletter
						</div>
					</ConnectButton>
				</Link>
			</div>
			<br />
			<Hr />
			<br />
			<br />
			<div className="top flex flex-col items-center gap-2 md:flex-row">
				broisnees © {new Date().getFullYear()}
				{' - '}
				<div className="flex gap-2">
					<Link className="text-[1rem] text-primary" to={'/setup'}>
						setup
					</Link>
					|
					<Link className="text-[1rem] text-primary" to={'/stack'}>
						stacks
					</Link>
					|
					<Link className="text-[1rem] text-primary" to={'/about'}>
						about
					</Link>
					|
					<Link className="text-[1rem] text-primary" to={'/links'}>
						connect
					</Link>
				</div>
			</div>
			<div className="flex w-[90%] flex-wrap justify-center gap-4 ">
				<Link
					className="text-sm underline"
					to="https://codeium.com/profile/broisnischal"
					target="_blank"
				>
					MyCodeium
				</Link>
				<Link
					className="  underline"
					to="https://dly.to/oYeNtLdx9va"
					target="_blank"
				>
					DailyDev
				</Link>
				<Link className=" underline" to="/timeline">
					Timeline
				</Link>
				|
				<Link
					className="underline"
					to={'https://nischal-dahal.com.np/blogs/rss'}
				>
					Blog RSS
				</Link>
			</div>
		</div>
		// <div className="m-auto mt-10 flex flex-col items-center justify-center gap-6">
		// 	<div className="flex flex-col ">
		// 		{/* <h2 className="text-center text-xl font-bold">Check me out</h2> */}
		// 		<div className=" flex items-center justify-center gap-6">
		// 			<Link
		// 				aria-label="Github"
		// 				target="_blank"
		// 				to="https://github.com/broisnischal"
		// 			>
		// 				<GitHubLogoIcon width={30} height={30} />
		// 			</Link>

		// 			<Link
		// 				aria-label="Discord"
		// 				target="_blank"
		// 				to="https://discord.gg/@broisnees"
		// 			>
		// 				<DiscordLogoIcon width={30} height={30} />
		// 			</Link>

		// 			<Link
		// 				aria-label="Instagram"
		// 				target="_blank"
		// 				to="https://instagram.com/broisnees"
		// 			>
		// 				<InstagramLogoIcon width={30} height={30} />
		// 			</Link>
		// 			<Link
		// 				aria-label="Twitter"
		// 				target="_blank"
		// 				to="https://twitter.com/broisnees"
		// 			>
		// 				<svg
		// 					xmlns="http://www.w3.org/2000/svg"
		// 					width="23"
		// 					height="23"
		// 					fill="none"
		// 					viewBox="0 0 1200 1227"
		// 				>
		// 					<path
		// 						// fill="#000 dark:#fff"
		// 						className="fill-black dark:fill-white"
		// 						d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
		// 					/>
		// 				</svg>
		// 			</Link>
		// 			<Link
		// 				aria-label="LinkedIn"
		// 				target="_blank"
		// 				to="https://www.linkedin.com/in/neeswebservices/"
		// 			>
		// 				<LinkedInLogoIcon width={30} height={30} />
		// 			</Link>
		// 			<a href="/feed.json" aria-label="RSS" target="_blank">
		// 				<RssIcon width={30} height={30} />
		// 			</a>
		// 		</div>
		// 	</div>
		// 	<div className="flex items-center justify-center gap-5">
		// 		<Link
		// 			to="mailto:info@nischal-dahal.com.np"
		// 			className="flex items-center gap-2 font-normal"
		// 		>
		// 			<ArrowTopRightIcon /> Mail
		// 		</Link>

		// 		<Link to="/about" className="flex items-center  gap-2 font-normal">
		// 			<ArrowTopRightIcon /> About
		// 		</Link>
		// 		<Link to="/chat" className="flex items-center  gap-2 font-normal">
		// 			<ArrowTopRightIcon /> Chat
		// 		</Link>
		// 		<a href="/blogs/rss" className="flex items-center  gap-2 font-normal">
		// 			<ArrowTopRightIcon /> Blog RSS
		// 		</a>

		// 		{/* <a href="/blogs/rss" className="flex items-center  gap-2">
		// 				<ArrowTopRightIcon /> MyBookmarks RSS
		// 			</a> */}
		// 	</div>
		// 	<small className="text-center">
		// 		Alternatively press Ctrl/Cmd + K to search.. <br /> Nischal Dahal | Made
		// 		with{' '}
		// 		<Link target="_blank" className="underline" to="https://remix.run">
		// 			Remix
		// 		</Link>{' '}
		// 		❤️
		// 	</small>
		// 	<br />
		// </div>
	);
};

export function WebsiteBanner() {
	return (
		<div className="flex flex-col items-center justify-center gap-5 border-b-[1px] py-1">
			<p>
				<small>
					Site is under developement, Mobile version may have some issues.
				</small>
			</p>
		</div>
	);
}

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [isClient, setIsClient] = React.useState(false);

	React.useEffect(() => {
		// This will only run on the client side
		setIsClient(true);
	}, []);

	return (
		<div className="flex flex-col">
			<ProgessBar />
			<NavBar />
			<div className="mainwidth mx-auto my-[2.5rem] min-h-[45vh]">
				{/* {isClient ? (
					<AnimatePresence mode="sync">
						<motion.div
							key={useLocation().pathname}
							variants={{
								initial: { opacity: 0, y: -20 },
								animate: { opacity: 1, y: 0 },
								exit: { opacity: 1, y: 0 },
							}}
							transition={{ duration: 0.4, ease: 'anticipate' }}
							initial="initial"
							animate="animate"
						>
							{children}
						</motion.div>
					</AnimatePresence>
				) : (
					<>{children}</>
				)} */}
				<>{children}</>
			</div>
			<Footer />
		</div>
	);
};

// Return the theme from the session storage using the loader
export async function loader({ request, context }: LoaderFunctionArgs) {
	const { getTheme } = await themeSessionResolver(request);
	let data = SessionStorage.returnUser(context, request);
	const redis = Redis.fromEnv(context.env);
	const count = redis.get('counter');

	// return {
	// 	theme: getTheme(),
	// 	count: count || 0,
	// 	user: data,
	// };

	return defer({
		theme: getTheme(),
		count: count || 0,
		user: data,
	});
}

// export default function App() {
// 	// const { menus } = useLoaderData<typeof loader>();

// 	return (
// 		<ument>
// 			<Layout children={<Outlet />} />
// 		</Document>
// 	);
// }

export default function AppWithProviders() {
	const data = useLoaderData<typeof loader>();

	// const [isClient, setIsClient] = React.useState(false);

	// React.useEffect(() => {
	// 	if (typeof window !== 'undefined') {
	// 		setIsClient(true);
	// 	}
	// }, []);

	return (
		<ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
			<App />
		</ThemeProvider>
	);
}

export function App() {
	const data = useLoaderData<typeof loader>();
	const [theme] = useTheme();

	return (
		<html lang="en" className={clsx(theme)}>
			<head>
				<meta charSet="UTF-8" />
				<meta
					name="google-site-verification"
					content="edGz_5Jr5VsLbGpxvQ3AZBAKtuEyNBgc_qtdthOPJKU"
				/>
				<meta
					name="color-scheme"
					content={theme === 'light' ? 'light' : 'dark'}
				/>
				{/* <link rel="alternate" type="application/rss+xml" href="/srss" /> */}
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="MobileOptimized" content="320" />
				<meta name="pagename" content="Nischal Dahal" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
				<meta name="mobile-web-app-capable" content="yes" />
				<link
					href="https://fonts.googleapis.com/css?family=Atkinson+Hyperlegible:regular,italic,700,700italic"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.googleapis.com/css?family=Bricolage+Grotesque:200,300,regular,500,600,700,800"
					rel="stylesheet"
				/>

				<link
					href="https://fonts.googleapis.com/css?family=Inconsolata:200,300,regular,500,600,700,800,900"
					rel="stylesheet"
				/>
				<Meta />
				<Links />
				<script
					async
					suppressHydrationWarning
					src="https://www.googletagmanager.com/gtag/js?id=G-L2HXER3J9C"
				></script>
				<script src="https://unpkg.com/@codersrank/portfolio@0.9.10/codersrank-portfolio.min.js"></script>
				<script src="https://unpkg.com/@codersrank/skills-chart@0.9.21/codersrank-skills-chart.min.js"></script>
				<script
					src="https://platform.linkedin.com/badges/js/profile.js"
					async
					defer
					type="text/javascript"
				></script>

				<script
					suppressHydrationWarning
					dangerouslySetInnerHTML={{
						__html: ` window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-L2HXER3J9C');`,
					}}
				/>
				<PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
			</head>
			<body
				style={{
					fontFamily: 'system-ui, sans-serif',
					lineHeight: '1.6',
					margin: 0,
				}}
			>
				{/* <WebsiteBanner /> */}
				<Search />

				<Layout children={<Outlet />} />
				{/* <React.Suspense>
					<Await resolve={data.count}>
						{count => <Clap count={count as number} />}
					</Await>
				</React.Suspense> */}
				<ScrollRestoration
					getKey={location => {
						return location.pathname;
					}}
				/>
				<ScrollToTopButton />
				<Scripts />
			</body>
		</html>
	);
}

export async function action({ context, request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const redirectTo = (formData.get('redirectTo') as string) || '/';

	const redis = Redis.fromEnv(context.env);

	const count = await redis.incr('counter');

	// return {
	// 	count,
	// };
	return redirect(redirectTo, {
		headers: {
			'X-Count': count.toString(),
		},
	});
}

export function Clap({ count }: { count: number }) {
	const [voted, setVoted] = React.useState(false);
	const data = useLoaderData<typeof loader>();
	const actiondata = useActionData<typeof action>();
	const submit = useSubmit();
	const animationRef = React.useRef<any>(null);
	const location = useLocation();

	const ref = React.useRef<HTMLFormElement>(null);

	return (
		<div className="fixed inset-x-0 bottom-0 left-4 mb-4">
			<Badge
				variant={'outline'}
				className="rounded-lg bg-[#fff] dark:bg-[#121212]"
			>
				<Form
					ref={ref}
					method="POST"
					className="py-1"
					onSubmit={e => {
						e.preventDefault();
						submit(e.currentTarget, {
							replace: false,
							preventScrollReset: true,
						});
						setVoted(true);
						ref.current?.reset();
						animationRef.current.play();
					}}
				>
					<input type="hidden" name="redirectTo" value={location.pathname} />
					<button
						// type="submit"
						disabled={voted}
						// onClick={() => setVoted(true)}
						className="flex items-center justify-center"
					>
						{voted ? (
							<GoHeartFill size={18} className="" />
						) : (
							<GoHeart size={18} className="" />
						)}
						<h1 className="ml-1 w-min select-none text-sm">{count}</h1>
					</button>
					{/* <button>
						<HandIcon className="h-6 w-6" />
					</button> */}
				</Form>
			</Badge>
		</div>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<div
				className="flex w-[90vw] flex-col items-center justify-center"
				style={{
					fontFamily: 'system-ui, sans-serif',
					lineHeight: '1.6',
					margin: 20,

					// width: 'calc(100vw - 1rem)',
				}}
			>
				<h1>
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p>
			</div>
		);
	} else if (error instanceof Error) {
		return (
			<div
				className="flex w-[90vw] flex-col items-center justify-center"
				style={{
					fontFamily: 'system-ui, sans-serif',
					lineHeight: '1.6',
					margin: 20,
					// width: 'calc(100vw - 1rem)',
				}}
			>
				<h1>Error</h1>
				<p>{error.message}</p>
				<pre>{import.meta.env.DEV && error.stack}</pre>
				<pre>{error.stack}</pre>
			</div>
		);
	} else {
		return (
			<h1
				style={{
					fontFamily: 'system-ui, sans-serif',
					lineHeight: '1.6',
					margin: 0,
					// width: 'calc(100vw - 1rem)',
				}}
			>
				Unknown Error
			</h1>
		);
	}
}

function ScrollToTopButton() {
	const [showScrollToTopButton, setShowScrollToTopButton] =
		React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 400) {
				setShowScrollToTopButton(true);
			} else {
				setShowScrollToTopButton(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			{showScrollToTopButton && (
				<button
					type="button"
					className="fixed bottom-4 right-4 z-10  p-1 text-[#6d6d6d]"
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				>
					<ArrowUp />
				</button>
			)}
		</>
	);
}
