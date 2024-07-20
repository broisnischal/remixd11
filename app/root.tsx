import type {
	ActionFunctionArgs,
	LinksFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/cloudflare';
import X from '~/assets/x.svg?react';

import {
	Form,
	Link,
	Links,
	LiveReload,
	Meta,
	NavLink,
	Outlet,
	redirect,
	Scripts,
	ScrollRestoration,
	useActionData,
	useLoaderData,
	useLocation,
	useNavigation,
	useSubmit,
} from '@remix-run/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import {
	GitHubLogoIcon,
	TwitterLogoIcon,
	DiscordLogoIcon,
	InstagramLogoIcon,
} from '@radix-ui/react-icons';

import {
	PreventFlashOnWrongTheme,
	ThemeProvider,
	useTheme,
} from 'remix-themes';
import ProgessBar from './components/global-progess';
import { ModeToggle } from './components/toggle-mode';
import { themeSessionResolver } from './session.server';
import styles from './tailwind.css?url';
import { SessionStorage } from './services/session.server';
import { Search } from './routes/search';
import { Redis } from '@upstash/redis/cloudflare';
import { Badge } from './components/ui/badge';
import { GoHeart, GoHeartFill } from 'react-icons/go';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
	return [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ title: 'Nischal Dahal' },
		{ name: 'description', content: 'Nischal Dahal' },
	];
};

const RouteLink = ({
	to,
	children,
}: {
	to: string;
	children: React.ReactNode;
}) => {
	return (
		<NavLink
			prefetch="intent"
			className={({ isActive }) => (isActive ? 'active' : '')}
			to={to}
		>
			{children}
		</NavLink>
	);
};

const NavBar = () => {
	const data = useLoaderData<typeof loader>();

	return (
		<nav className="m-auto flex w-[90vw] flex-row flex-wrap lg:mt-8 lg:flex lg:max-w-[70vw]">
			<div className="mr-auto flex flex-row flex-wrap items-center gap-5">
				<RouteLink to={'/'}>home</RouteLink>
				{/* <RouteLink to={'/cat/guides'}>guides</RouteLink> */}
				<RouteLink to={'/learning/year'}>learning</RouteLink>
				{/* <RouteLink to={'/projects'}>projects</RouteLink> */}
				<RouteLink to={'/blog'}>blogs</RouteLink>
				{/* <RouteLink to={'/thought'}>thoughts</RouteLink> */}
				<RouteLink to={'/guestbook'}>guestbook</RouteLink>
				<RouteLink to={'/overview'}>overview</RouteLink>
				{/* <RouteLink to={'/career'}>projects</RouteLink> */}
				<RouteLink to={'/bookmarks'}>bookmarks</RouteLink>
				{/* <RouteLink to={'/canvas'}>canvas</RouteLink> */}
				<RouteLink to={'/hire'}>hire me</RouteLink>
				<RouteLink to={'/newsletter'}>newsletter</RouteLink>
				{data.user?.type == 'nees' && (
					<RouteLink to={'/dashboard'}>Dashboard</RouteLink>
				)}
				{data.user?.id && <Link to="/auth/logout">Logout</Link>}
			</div>
			<div>
				<ModeToggle />
			</div>
		</nav>
	);
};

const Footer = () => {
	return (
		<div className="m-auto mb-16 flex w-full flex-col items-center justify-center gap-2 lg:max-w-[70vw] lg:items-start">
			{/* <NewsLetter /> */}
			{/* <h2>Copyright © 2022 Nischal Dahal</h2> */}
			{/* <div className="flex w-full">
				<h2 className="w-full self-center">
					Developed by <a href="https://x.com/broisnees">Nischal</a>
				</h2>
				<h3 className="w-full text-right text-[12px] ">
					© {new Date().getFullYear()} Nischal Dahal. All rights reserved.
				</h3>
			</div> */}
			<div className=" flex items-center justify-center gap-4">
				<Link to="https://github.com/broisnischal">
					<GitHubLogoIcon width={20} height={20} />
				</Link>

				<Link to="https://discord.gg/@broisnees">
					<DiscordLogoIcon width={20} height={20} />
				</Link>

				<Link to="https://instagram.com/broisnees">
					<InstagramLogoIcon width={20} height={20} />
				</Link>
				<Link to="https://twitter.com/broisnees" className="w-[20px] ">
					<svg
						className=" h-[16px] w-[16px]"
						xmlns="http://www.w3.org/2000/svg"
						width="1200"
						height="1227"
						fill="none"
						viewBox="0 0 1200 1227"
					>
						<path
							// fill="#000 dark:#fff"
							className="fill-black dark:fill-white"
							d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
						/>
					</svg>
				</Link>
			</div>
		</div>
	);
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div id="main m-auto">
			<ProgessBar />
			<NavBar />
			<div className="m-auto flex min-h-[70vh] max-w-[90vw] flex-col items-start justify-between lg:max-w-[70vw]">
				<div className="main">
					<AnimatePresence mode="popLayout">
						<motion.div
							key={useLocation().pathname}
							variants={{
								initial: { opacity: 0, y: -30 },
								animate: { opacity: 1, y: 0 },
								exit: { opacity: 1, y: 30 },
							}}
							transition={{ duration: 0.5, ease: 'anticipate' }}
							initial="initial"
							animate="animate"
						>
							<div className="my-[2rem]">{children}</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</div>
			<Footer />
		</div>
	);
};

// Return the theme from the session storage using the loader
export async function loader({ request, context }: LoaderFunctionArgs) {
	const { getTheme } = await themeSessionResolver(request);
	let data = await SessionStorage.returnUser(context, request);

	const redis = Redis.fromEnv(context.env);

	const count = (await redis.get('counter')) as number;

	return {
		theme: getTheme(),
		count: count || 0,
		user: data,
	};
}

// export default function App() {
// 	// const { menus } = useLoaderData<typeof loader>();

// 	return (
// 		<Document>
// 			<Layout children={<Outlet />} />
// 		</Document>
// 	);
// }

export default function AppWithProviders() {
	const data = useLoaderData<typeof loader>();

	return (
		<ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
			<App />
		</ThemeProvider>
	);
}

export function App({}) {
	const data = useLoaderData<typeof loader>();
	const [theme] = useTheme();

	return (
		<ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
			<html lang="en" className={clsx(theme)}>
				<head>
					{/* <React.Suspense> */}
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=G-J1R7CN2HWC"
					></script>

					<script
						async
						dangerouslySetInnerHTML={{
							__html: `{
								 window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-J1R7CN2HWC');}`,
						}}
					></script>

					<script
						async
						dangerouslySetInnerHTML={{
							__html: `{
								(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MP2DTZJB');}`,
						}}
					></script>
					{/* </React.Suspense> */}
					<meta charSet="utf-8" />
					<meta
						name="google-site-verification"
						content="edGz_5Jr5VsLbGpxvQ3AZBAKtuEyNBgc_qtdthOPJKU"
					/>
					{/* {title ? <title>{title}</title> : null} */}
					<Meta />
					<Links />
					<PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
				</head>
				<body
					style={{
						fontFamily: 'system-ui, sans-serif',
						lineHeight: '1.6',
						width: 'calc(100vw - 1rem)',
					}}
				>
					<Layout children={<Outlet />} />
					<Search />
					<Clap count={data.count} />

					<ScrollRestoration />
					<Scripts />
					{/* <LiveReload /> */}

					<noscript>
						<iframe
							src="https://www.googletagmanager.com/ns.html?id=GTM-MP2DTZJB"
							height="0"
							width="0"
							style={{ display: 'none', visibility: 'hidden' }}
						></iframe>
					</noscript>
				</body>
			</html>
		</ThemeProvider>
	);
}

// function Document({
// 	children,
// 	title,
// }: {
// 	children: React.ReactNode;
// 	title?: string;
// }) {
// 	const [theme] = useTheme();
// 	const data = useLoaderData<typeof loader>();

// 	return (
// 		<html lang="en" className={clsx(theme)}>
// 			<head>
// 				<meta charSet="utf-8" />
// 				{title ? <title>{title}</title> : null}
// 				<Meta />
// 				<Links />
// 				<PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
// 			</head>
// 			<body
// 				className="dark:bg-black dark:text-white"
// 				style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.6' }}
// 			>
// 				{children}
// 				<ScrollRestoration />
// 				<Scripts />
// 			</body>
// 		</html>
// 	);
// }

// export function ErrorLayout({
// 	title,
// 	description,
// }: {
// 	title: string;
// 	description: string;
// }) {
// 	return (
// 		<div
// 			className="m-auto my-10 flex max-w-[80vw] flex-col items-start justify-between dark:bg-black dark:text-white"
// 			style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.6' }}
// 			// className=""
// 		>
// 			<div className="main">
// 				<NavBar />
// 				<AnimatePresence mode="popLayout">
// 					<motion.div
// 						key={useLocation().pathname}
// 						variants={{
// 							initial: { opacity: 0, y: -10 },
// 							animate: { opacity: 1, y: 0 },
// 							exit: { opacity: 1, y: 10 },
// 						}}
// 						transition={{ duration: 0.2 }}
// 						initial="initial"
// 						animate="animate"
// 					>
// 						<div className="my-[2rem]">
// 							<h1>{title}</h1>
// 							<p>{description}</p>
// 						</div>
// 					</motion.div>
// 				</AnimatePresence>
// 			</div>
// 			<Footer />
// 		</div>
// 	);
// }

// export function ErrorBoundary() {
// 	const error = useRouteError();

// 	const [theme] = useTheme();
// 	// Log the error to the console
// 	console.error(error);

// 	if (isRouteErrorResponse(error)) {
// 		const title = `${error.status} ${error.statusText}`;

// 		let message;
// 		switch (error.status) {
// 			case 401:
// 				message =
// 					'Oops! Looks like you tried to visit a page that you do not have access to.';
// 				break;
// 			case 404:
// 				message =
// 					'Oops! Looks like you tried to visit a page that does not exist.';
// 				break;
// 			default:
// 				message = JSON.stringify(error.data, null, 2);
// 				break;
// 		}

// 		return (
// 			// <Document title={title}>
// 			<ErrorLayout title={title} description={message} />
// 			// </Document>
// 		);
// 	}

// 	return (
// 		// <Document title="Error!">
// 		<ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
// 			<div>
// 				{/* @ts-expect-error */}
// 				<h1>Unexpected error</h1> <p>{error.message}</p>
// 			</div>
// 		</ThemeProvider>
// 	);
// }

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
		<div className="fixed inset-x-0 bottom-0 left-5 mb-4">
			{/* <div className="round flex cursor-pointer items-center justify-center rounded-lg px-3 py-2">
				
			</div> */}
			<Badge variant={'secondary'}>
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
