import type {
	LinksFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/cloudflare';
import * as React from 'react';
import {
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	json,
	useLoaderData,
	useLocation,
	useRouteError,
} from '@remix-run/react';
import styles from './tailwind.css?url';

import { AnimatePresence, motion } from 'framer-motion';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction = () => {
	return [
		{ charset: 'utf-8' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ title: 'remix-cloudlfare-template' },
	];
};

// export function loader({ context }: LoaderFunctionArgs) {
// 	const menus: Menu[] = [
// 		{
// 			title: 'Docs',
// 			links: [
// 				{
// 					title: 'Overview',
// 					to: '/',
// 				},
// 			],
// 		},
// 		{
// 			title: 'Useful links',
// 			links: [
// 				{
// 					title: 'GitHub',
// 					to: `https://github.com/${context.env.GITHUB_OWNER}/${context.env.GITHUB_REPO}`,
// 				},
// 				{
// 					title: 'Remix docs',
// 					to: 'https://remix.run/docs',
// 				},
// 				{
// 					title: 'Cloudflare docs',
// 					to: 'https://developers.cloudflare.com/pages',
// 				},
// 			],
// 		},
// 	];

// 	return json({
// 		menus,
// 	});
// }

export default function App() {
	// const { menus } = useLoaderData<typeof loader>();

	return (
		<Document>
			{/* <Layout menus={menus}> */}
			<Outlet />
			{/* </Layout> */}
		</Document>
	);
}

function Document({
	children,
	title,
}: {
	children: React.ReactNode;
	title?: string;
}) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				{title ? <title>{title}</title> : null}
				<Meta />
				<Links />
			</head>
			<body style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.6' }}>
				<div>
					<Link to={'/cat/tesitn'}>Cat</Link>
					<Link to={'/cat/sandes'}>Tes</Link>
					<Link to={'/cat/sandesdsf'}>Learnign</Link>
				</div>
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
						{children}
					</motion.div>
				</AnimatePresence>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

// export function ErrorBoundary() {
// 	const error = useRouteError();

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
// 			<Document title={title}>
// 				<ErrorLayout title={title} description={message} />
// 			</Document>
// 		);
// 	}

// 	return (
// 		<Document title="Error!">

// <div>			<h1>Unexpected error</h1>		<p>{error.message}</p></div>		</Document>
// 	);
// }
