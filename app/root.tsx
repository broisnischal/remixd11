import type {
	ActionFunctionArgs,
	LinksFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/cloudflare';

// import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

import {
	Await,
	defer,
	Form,
	isRouteErrorResponse,
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
	useRouteError,
	useSubmit,
} from '@remix-run/react';
import clsx from 'clsx';
import * as React from 'react';

import { Redis } from '@upstash/redis/cloudflare';
import {
	ArrowUp,
	Bell,
	GithubIcon,
	LayoutDashboard,
	LogOut,
	Mails,
	Star,
} from 'lucide-react';
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
import { AnimatePresence, motion } from 'framer-motion';
import {
	MdAnnouncement,
	MdNotificationAdd,
	MdNotificationImportant,
	MdNotifications,
} from 'react-icons/md';
import { ProfileHeader } from './components/profile-header';

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
	blank,
}: {
	to: string;
	children: React.ReactNode;
	blank?: boolean;
}) => {
	return (
		<NavLink
			prefetch="intent"
			className={({ isActive }) =>
				isActive ? 'active md:text-[16px]' : 'md:text-[17px]'
			}
			to={to}
			target={blank ? '_blank' : '_self'}
		>
			{children}
		</NavLink>
	);
};

const NavBar = () => {
	const data = useLoaderData<typeof loader>();

	return (
		<>
			<nav className=" m-auto mb-10 flex items-center justify-between  py-4">
				{/* <RouteLink to={'/'}	>Nischal Inc.</RouteLink> */}

				<Link to={'/'}>
					<h1 className="text-xl font-bold">broisnees</h1>
				</Link>
				<div className=" flex items-center justify-between">
					<div className=" flex items-center justify-between gap-4 ">
						<div className="flex gap-5 ">
							{/* <RouteLink to={'/blog'}>blog</RouteLink> */}
							{/* <RouteLink to={'/guestbook'}>guestbook</RouteLink> */}
							{/* <RouteLink to={'/overview'}>info</RouteLink> */}
							{/* <RouteLink to={'/bookmarks'}>bmrks</RouteLink> */}
							{/* <RouteLink to={'/newsletter'}>newsletter</RouteLink> */}
							{/* <RouteLink to={'/talks'}>talks</RouteLink> */}
							{/* <RouteLink to={'/chat'}>chat</RouteLink> */}
							{/* <RouteLink to={'/hire'}>hireme</RouteLink> */}
							{/* <RouteLink to={'/links'}>links</RouteLink> */}
						</div>
						{/* <RouteLink to={'/cat/guides'}>guides</RouteLink> */}
						{/* <RouteLink to={'/projects'}>projects</RouteLink> */}
						{/* <RouteLink to={'/thought'}>thoughts</RouteLink> */}
						{/* <RouteLink to={'/canvas'}>canvas</RouteLink> */}
					</div>
				</div>
				<div className="flex items-center justify-center gap-4">
					<ModeToggle />

					{/* <Announcement /> */}
					{/* <GithubStars /> */}
					<React.Suspense>
						<Await resolve={data.user}>
							{user => (
								<>
									{user?.type === 'nees' && (
										<RouteLink to={'/dashboard'}>
											<Button variant="outline" size="icon">
												<LayoutDashboard size={16} />
											</Button>
										</RouteLink>
									)}
									{user?.id && (
										<Link to="/auth/logout">
											<Button variant="outline" size="icon">
												<LogOut size={16} />
											</Button>
										</Link>
									)}
								</>
							)}
						</Await>
					</React.Suspense>
				</div>
			</nav>
		</>
	);
};

export function GithubStars() {
	return (
		<Button variant="outline" size="icon" asChild className="gap-2">
			<Link
				to="https://github.com/broisnischal"
				target="_blank"
				className="flex items-center"
			>
				<Star size={16} />
			</Link>
		</Button>
	);
}

export function Announcement() {
	return (
		<Button variant="outline" size="icon" asChild className="">
			<Link to="/announcement" className="flex items-center">
				<Bell size={16} />
			</Link>
		</Button>
	);
}

const Footer = () => {
	return (
		<div className="flex min-h-[5vh] flex-col gap-2 pt-20">
			<hr />
			<br />
			<div className="flex flex-wrap gap-2 font-poppins">
				<RouteLink to={'/links'}>links</RouteLink>|
				<RouteLink to={'/blog'}>blogs</RouteLink>|
				{/* <RouteLink to={'/about'}>about</RouteLink>| */}
				{/* <RouteLink to={'/setup'}>setup</RouteLink>| */}
				{/* <RouteLink to={'/stack'}>stacks</RouteLink>| */}
				{/* <RouteLink to={'/hire'}>hire</RouteLink>| */}
				{/* <RouteLink to={'/timeline'}>timeline</RouteLink>| */}
				<RouteLink blank to={'https://ko-fi.com/nischaldahal'}>
					donate
				</RouteLink>
			</div>
			<div className="secondary flex flex-wrap gap-3 font-nunito">
				{/* <Link
					className="text-sm underline underline-offset-2"
					to="https://codeium.com/profile/broisnischal"
					target="_blank"
				>
					codeium
				</Link> */}
				<Link
					className="text-sm underline underline-offset-2"
					to="https://dly.to/oYeNtLdx9va"
					target="_blank"
				>
					daily dev
				</Link>
				<Link
					className="text-sm underline underline-offset-2"
					to={'https://nischal-dahal.com.np/blogs/rss'}
				>
					RSS
				</Link>
				{/* <Link
					className="text-sm underline underline-offset-2"
					to={'https://nischal-dahal.com.np/sitemap.xml'}
				>
					sitemap
				</Link> */}
				<Link className="text-sm underline underline-offset-2" to="/terms">
					terms & conditions
				</Link>
			</div>
		</div>
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
	return (
		<div className="flex flex-col">
			<ProgessBar />
			<div className=" mx-auto my-12 !mt-6 max-w-[600px] px-4 antialiased">
				<NavBar />
				{children}
				<Footer />
			</div>
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
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6430477215422762"
					crossOrigin="anonymous"
				></script>
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
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
					rel="stylesheet"
				></link>

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
					lineHeight: '1.6',
					margin: 0,
					// fontFamily: 'Geist',
				}}
			>
				{/* <WebsiteBanner /> */}
				{/* <Search /> */}
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
				{/* <ScrollToTopButton /> */}
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
				<pre>{error.stack}</pre>
				{/* import.meta.env.DEV && */}
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
					<ArrowUp size={20} />
				</button>
			)}
		</>
	);
}
