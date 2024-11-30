import { json, Link, Outlet, useLocation } from '@remix-run/react';
import { ArrowLeft, Mails } from 'lucide-react';
import { ConnectButton } from '~/components/ui-library/tailwindbutton';
import { Octokit as createOctokit, Octokit } from '@octokit/rest';

import {
	LinkedinIcon,
	LinkedinShareButton,
	RedditIcon,
	RedditShareButton,
	TwitterShareButton,
	XIcon,
} from 'react-share';
import { SiGithubsponsors } from 'react-icons/si';
import { LoaderFunctionArgs } from '@remix-run/cloudflare';

export async function loader({ context }: LoaderFunctionArgs) {
	const octokit = new Octokit({
		auth: context.env.GITHUB_CLIENT_SECRET,
	});

	return json({});
}

export default function Component() {
	const location = useLocation();

	let shareurl = 'https://nischal-dahal.com.np' + location.pathname;

	let title = 'Check out this article by Nischal Dahal.';

	// const value = useOutletContext();
	// const vla = useOutlet();

	return (
		<div className="w-full">
			<div
				className="prose-h5:text-md prose prose-zinc max-w-none dark:prose-invert lg:prose-xl prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-xl prose-h4:text-lg prose-h6:text-sm prose-p:font-reader prose-strong:rounded-md prose-strong:border prose-strong:px-2 prose-strong:py-1 prose-strong:text-sm prose-strong:font-semibold prose-code:rounded-md prose-code:font-mono  prose-table:overflow-x-auto prose-img:rounded-md"
				// 	className=" prose-code:font-inconsolata prose:w-[100%] prose prose-zinc dark:prose-invert lg:prose-xl prose-p:font-atkinson prose-strong:rounded-md prose-strong:border prose-strong:px-2 prose-strong:py-1 prose-strong:text-sm prose-strong:font-semibold  prose-code:rounded-md prose-code:text-sm prose-table:overflow-x-auto
				// prose-img:rounded-md"
			>
				<Outlet />
			</div>
			<br />
			<br />
			<br />
			<br />

			<br />
			<div className="share flex flex-col justify-center gap-3">
				<p className="mr-1 font-mono text-2xl font-bold">Share this article!</p>
				<div className="share flex flex-wrap gap-5">
					<TwitterShareButton
						url={shareurl}
						title={title}
						className="Demo__some-network__share-button"
					>
						<XIcon
							className="rounded-full border-[1px] border-zinc-500/50"
							size={52}
							round
						/>
					</TwitterShareButton>
					<LinkedinShareButton
						url={shareurl}
						title={title}
						about={title}
						className="Demo__some-network__share-button"
					>
						<LinkedinIcon size={52} round />
					</LinkedinShareButton>

					<RedditShareButton
						url={shareurl}
						title={title}
						windowWidth={660}
						windowHeight={460}
						className="Demo__some-network__share-button"
					>
						<RedditIcon size={52} round />
					</RedditShareButton>
				</div>
			</div>
			<br />
			<div>
				<h4 className="flex flex-wrap gap-2  font-bricolage  text-xl">
					Did this help? Consider{' '}
					<Link className="flex items-center gap-2 underline " to={'/sponsor'}>
						<SiGithubsponsors /> sponsoring{' '}
					</Link>{' '}
					me!{' '}
				</h4>
			</div>
			<br />
			<div className=" prose dark:prose-invert lg:prose-xl prose-p:font-mono prose-img:rounded-md ">
				<div className="flex flex-col  justify-center">
					<h2 className=" text-2xl font-bold">Thanks for reading!</h2>
					<p className=" font-poppins text-[15px]">
						If you found this useful, check out my{' '}
						<Link to={'/blog'}>other articles</Link> and my YouTube Channel
						where I cover a lot of the same topics but in video format. & If you
						don't want to miss future article and updates similar to this do
						subscribe to my newsletter.
					</p>
					<Link to={'/newsletter'}>
						<ConnectButton>
							<div className="flex items-center justify-center gap-2 p-2 text-[14px]">
								<Mails size={18} /> Subscribe my newsletter?
							</div>
						</ConnectButton>
					</Link>{' '}
					<br />
				</div>
			</div>
		</div>
	);
}

// const components = {
// 	toc: props => <div className="toc">{props.children}</div>,
// };

// export function MyPage({ children }: { children: React.ReactNode }) {
// 	return (
// 		<MDXProvider components={components}>
// 			<div className="content-container">
// 				<div className="toc-container">
// 					<h2>Table of Contents</h2>
// 					<toc />
// 				</div>
// 				<div className="main-content">{children}</div>
// 			</div>
// 		</MDXProvider>
// 	);
// }
