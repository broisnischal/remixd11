import type {
	LinksFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/cloudflare';
import X from '~/assets/x.svg?react';

import {
	Link,
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useLocation,
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

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
	return [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ title: 'Nischal Dahal' },
		{ name: 'description', content: 'Nischal Dahal Homepage' },
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
		<nav className="m-auto mt-8 flex max-w-[70vw] flex-row">
			<div className="mr-auto flex items-center gap-5">
				<RouteLink to={'/'}>home</RouteLink>
				{/* <RouteLink to={'/cat/guides'}>guides</RouteLink> */}
				<RouteLink to={'/learning/year'}>learning</RouteLink>
				{/* <RouteLink to={'/projects'}>projects</RouteLink> */}
				<RouteLink to={'/blog'}>blogs</RouteLink>
				{/* <RouteLink to={'/thought'}>thoughts</RouteLink> */}
				<RouteLink to={'/guestbook'}>guestbook</RouteLink>
				{/* <RouteLink to={'/career'}>projects</RouteLink> */}
				<RouteLink to={'/bookmarks'}>bookmarks</RouteLink>
				<RouteLink to={'/canvas'}>canvas</RouteLink>
				<RouteLink to={'/hire'}>hire me</RouteLink>
				<RouteLink to={'/newsletter'}>newsletter</RouteLink>
				{data.user?.type == 'nees' && (
					<RouteLink to={'/dashboard'}>Dashboard</RouteLink>
				)}
				{data.user?.id && <Link to="/auth/logout">Logout</Link>}
			</div>
			{/* <RouteLink to={'/subscribe'}>subscribe</RouteLink> */}
			{/* <RouteLink to={'/contact'}>contact</RouteLink> */}
			<ModeToggle />
		</nav>
	);
};

const Footer = () => {
	return (
		<div className="m-auto mb-8 flex max-w-[70vw] flex-col items-start justify-center gap-2">
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
			<div className="mt-3 flex gap-4">
				<Link to="https://github.com/broisnees">
					<GitHubLogoIcon />
				</Link>

				<Link to="https://discord.gg/broisnees">
					<DiscordLogoIcon />
				</Link>

				<Link to="https://instagram.com/broisnees">
					<InstagramLogoIcon />
				</Link>
				<Link to="https://twitter.com/broisnees">
					<svg
						className="h-[15px] w-[15px]"
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
		<div id="main">
			<ProgessBar />
			<NavBar />
			<div className="m-auto flex min-h-[70vh] max-w-[70vw] flex-col items-start justify-between">
				<div className="main">
					<AnimatePresence mode="popLayout">
						<motion.div
							key={useLocation().pathname}
							variants={{
								initial: { opacity: 0, y: -10 },
								animate: { opacity: 1, y: 0 },
								exit: { opacity: 1, y: 10 },
							}}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
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

	return {
		theme: getTheme(),
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
					style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.6' }}
				>
					<Layout children={<Outlet />} />
					<ScrollRestoration />
					<Scripts />
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
