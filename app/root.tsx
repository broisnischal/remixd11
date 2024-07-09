import type {
	ActionFunctionArgs,
	LinksFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/cloudflare';
import * as React from 'react';
import {
	Link,
	Links,
	Meta,
	NavLink,
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
import ProgessBar from './components/global-progess';
import { NewsLetter } from './components/newsletter';
import { drizzle } from 'drizzle-orm/d1';
import { newsletter } from './drizzle/schema.server';

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
export async function action({ request, context }: ActionFunctionArgs) {
	const formData = await request.formData();
	const email = formData.get('email') as string;
	const db = drizzle(context.env.DB);
	await db.insert(newsletter).values({ email }).execute();
	return json({ message: 'Subscribed Successfully!' }, { status: 201 });
}

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
		<nav className="flex gap-5">
			<RouteLink to={'/'}>home</RouteLink>
			<RouteLink to={'/cat/guides'}>guides</RouteLink>
			<RouteLink to={'/learning/year'}>learning</RouteLink>
			<RouteLink to={'/projects'}>projects</RouteLink>
			<RouteLink to={'/blog'}>blogs</RouteLink>
			<RouteLink to={'/thought'}>thoughts</RouteLink>
			<RouteLink to={'/guestbook'}>guestbook</RouteLink>
			<RouteLink to={'/career'}>career</RouteLink>
			{/* <RouteLink to={'/subscribe'}>subscribe</RouteLink> */}
			{/* <RouteLink to={'/contact'}>contact</RouteLink> */}
		</nav>
	);
};

const Footer = () => {
	return (
		<div>
			<NewsLetter />
			{/* <h2>Copyright © 2022 Nischal Dahal</h2> */}
		</div>
	);
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
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

export default function App() {
	// const { menus } = useLoaderData<typeof loader>();

	return (
		<Document>
			<Layout children={<Outlet />} />
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
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function ErrorLayout({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="m-auto my-10 flex max-w-[80vw] flex-col items-start justify-between">
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
			<Document title={title}>
				<ErrorLayout title={title} description={message} />
			</Document>
		);
	}

	return (
		<Document title="Error!">
			<div>
				{/* @ts-expect-error */}
				<h1>Unexpected error</h1> <p>{error.message}</p>
			</div>{' '}
		</Document>
	);
}
