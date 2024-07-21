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
import { RssIcon } from 'lucide-react';

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
		<nav className="mt-8 flex items-center justify-center gap-3 px-4 md:px-0">
			<div className="mr-auto flex flex-row flex-wrap items-center gap-1 md:gap-5">
				<RouteLink to={'/'}>home</RouteLink>
				<RouteLink to={'/learning/year'}>learning</RouteLink>
				<RouteLink to={'/blog'}>blogs</RouteLink>
				<RouteLink to={'/guestbook'}>guestbook</RouteLink>
				<RouteLink to={'/overview'}>overview</RouteLink>
				<RouteLink to={'/bookmarks'}>bookmarks</RouteLink>
				<RouteLink to={'/hire'}>hire me</RouteLink>
				<RouteLink to={'/newsletter'}>newsletter</RouteLink>
				{data.user?.type == 'nees' && (
					<RouteLink to={'/dashboard'}>Dashboard</RouteLink>
				)}

				{/* <RouteLink to={'/cat/guides'}>guides</RouteLink> */}
				{/* <RouteLink to={'/projects'}>projects</RouteLink> */}
				{/* <RouteLink to={'/thought'}>thoughts</RouteLink> */}
				{/* <RouteLink to={'/career'}>projects</RouteLink> */}
				{/* <RouteLink to={'/canvas'}>canvas</RouteLink> */}
				{data.user?.id && <Link to="/auth/logout">Logout</Link>}
			</div>
			<div className="flex flex-col items-center justify-center gap-3 md:flex-row">
				<Search />
				<ModeToggle />
			</div>
		</nav>
	);
};

const Footer = () => {
	return (
		<div className="m-auto my-16">
			<div className=" flex items-center justify-center gap-4">
				<Link to="https://github.com/broisnischal">
					<GitHubLogoIcon width={30} height={30} />
				</Link>

				<Link to="https://discord.gg/@broisnees">
					<DiscordLogoIcon width={30} height={30} />
				</Link>

				<Link to="https://instagram.com/broisnees">
					<InstagramLogoIcon width={30} height={30} />
				</Link>
				<Link to="https://twitter.com/broisnees">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="25"
						height="25"
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
				<Link to="/feed.json">
					<RssIcon width={30} height={30} />
				</Link>
			</div>
		</div>
	);
};

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col">
			<ProgessBar />
			<NavBar />
			<div className="my-[2rem] min-h-[60vh] px-5 md:px-0">
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
						{children}
					</motion.div>
				</AnimatePresence>
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
					<link
						href="https://fonts.googleapis.com/css?family=Inter:100,200,300,regular,500,600,700,800,900"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Nunito:200,300,regular,500,600,700,800,900,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic"
						rel="stylesheet"
					/>
					<React.Suspense>
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
					</React.Suspense>
					<meta charSet="utf-8" />
					<meta
						name="google-site-verification"
						content="edGz_5Jr5VsLbGpxvQ3AZBAKtuEyNBgc_qtdthOPJKU"
					/>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
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
						margin: 0,
						// width: 'calc(100vw - 1rem)',
					}}
					className=""
				>
					<div className="mx-auto max-w-screen-sm sm:max-w-screen-md lg:max-w-screen-lg ">
						<Layout children={<Outlet />} />
					</div>
					<Clap count={data.count} />
					<ScrollRestoration />
					<Scripts />
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
