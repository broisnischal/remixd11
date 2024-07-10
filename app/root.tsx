import type {
	LinksFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/cloudflare';
import clsx from 'clsx';
import {
	PreventFlashOnWrongTheme,
	ThemeProvider,
	useTheme,
} from 'remix-themes';
import {
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useLoaderData,
	useLocation,
	useRouteError,
} from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import ProgessBar from './components/global-progess';
import styles from './tailwind.css?url';
import { themeSessionResolver } from './session.server';
import { ModeToggle } from './components/toggle-mode';

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
		<NavLink className={({ isActive }) => (isActive ? 'active' : '')} to={to}>
			{children}
		</NavLink>
	);
};

const NavBar = () => {
	return (
		<nav className="flex items-center gap-5">
			<RouteLink to={'/'}>home</RouteLink>
			<RouteLink to={'/cat/guides'}>guides</RouteLink>
			<RouteLink to={'/learning/year'}>learning</RouteLink>
			<RouteLink to={'/projects'}>projects</RouteLink>
			<RouteLink to={'/blog'}>blogs</RouteLink>
			<RouteLink to={'/thought'}>thoughts</RouteLink>
			<RouteLink to={'/guestbook'}>guestbook</RouteLink>
			<RouteLink to={'/career'}>career</RouteLink>
			<RouteLink to={'/newsletter'}>newsletter</RouteLink>
			{/* <RouteLink to={'/subscribe'}>subscribe</RouteLink> */}
			{/* <RouteLink to={'/contact'}>contact</RouteLink> */}
			<ModeToggle />
		</nav>
	);
};

const Footer = () => {
	return (
		<div>
			{/* <NewsLetter /> */}
			{/* <h2>Copyright © 2022 Nischal Dahal</h2> */}
			<h1>
				Developed by <a href="https://nischaldahal.com">Nischal</a>
			</h1>
		</div>
	);
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div id="main">
			<ProgessBar />
			<div className="m-auto my-10 flex min-h-[80vh] max-w-[70vw] flex-col items-start justify-between">
				<div className="main">
					<NavBar />
					<AnimatePresence mode="popLayout">
						<motion.div
							key={useLocation().pathname}
							variants={{
								initial: { opacity: 0, y: -10 },
								animate: { opacity: 1, y: 0 },
								exit: { opacity: 1, y: 10 },
							}}
							transition={{ duration: 0.2 }}
							initial="initial"
							animate="animate"
						>
							<div className="my-[2rem]">{children}</div>
						</motion.div>
					</AnimatePresence>
				</div>
				<Footer />
			</div>
		</div>
	);
};

// Return the theme from the session storage using the loader
export async function loader({ request }: LoaderFunctionArgs) {
	const { getTheme } = await themeSessionResolver(request);
	return {
		theme: getTheme(),
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

export function ErrorLayout({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div
			className="m-auto my-10 flex max-w-[80vw] flex-col items-start justify-between dark:bg-black dark:text-white"
			style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.6' }}
			// className=""
		>
			<div className="main">
				<NavBar />
				<AnimatePresence mode="popLayout">
					<motion.div
						key={useLocation().pathname}
						variants={{
							initial: { opacity: 0, y: -10 },
							animate: { opacity: 1, y: 0 },
							exit: { opacity: 1, y: 10 },
						}}
						transition={{ duration: 0.2 }}
						initial="initial"
						animate="animate"
					>
						<div className="my-[2rem]">
							<h1>{title}</h1>
							<p>{description}</p>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
			<Footer />
		</div>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	// Log the error to the console
	console.error(error);

	if (isRouteErrorResponse(error)) {
		const title = `${error.status} ${error.statusText}`;

		let message;
		switch (error.status) {
			case 401:
				message =
					'Oops! Looks like you tried to visit a page that you do not have access to.';
				break;
			case 404:
				message =
					'Oops! Looks like you tried to visit a page that does not exist.';
				break;
			default:
				message = JSON.stringify(error.data, null, 2);
				break;
		}

		return (
			// <Document title={title}>
			<ErrorLayout title={title} description={message} />
			// </Document>
		);
	}

	return (
		// <Document title="Error!">
		<div>
			{/* @ts-expect-error */}
			<h1>Unexpected error</h1> <p>{error.message}</p>
		</div>
		// </Document>
	);
}
