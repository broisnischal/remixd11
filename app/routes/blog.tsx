import { Link, Outlet, useLocation } from '@remix-run/react';
import { ArrowLeft, HandHelping, Mails } from 'lucide-react';
import { ConnectButton } from '~/components/ui-library/tailwindbutton';

import {
	LinkedinIcon,
	LinkedinShareButton,
	RedditIcon,
	RedditShareButton,
	TwitterShareButton,
	XIcon,
} from 'react-share';

export default function Component() {
	const location = useLocation();

	let shareurl = 'https://nischal-dahal.com.np' + location.pathname;

	let title = 'Check out this article by Nischal Dahal.';

	// const value = useOutletContext();
	// const vla = useOutlet();

	return (
		<div className="w-full">
			<Link to={'/blog'}>
				<div className="flex items-center gap-2 opacity-60">
					<ArrowLeft className="h-5 w-5" /> Back
				</div>
			</Link>
			{/* dummy test */}
			<br />

			<div
				className="prose-code:font-inconsolata prose prose-zinc max-w-none dark:prose-invert lg:prose-xl prose-p:font-avenir prose-strong:rounded-md prose-strong:border prose-strong:px-2 prose-strong:py-1 prose-strong:text-sm prose-strong:font-semibold prose-code:rounded-md prose-code:text-sm prose-table:overflow-x-auto prose-img:rounded-md"
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
			<div className="share flex flex-col items-center justify-center gap-3">
				<p className="mr-1 text-center font-poppins text-3xl font-bold">
					Share this article
				</p>
				<p className="text-center font-bricolage text-[16px] ">
					I hope you learned something new, and I wish you
					<br /> all the best, Happy reading.
				</p>
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
			<br />
			<br />
			<br />
			<br />
			<div className=" prose m-auto dark:prose-invert lg:prose-xl prose-p:font-atkinson prose-img:rounded-md ">
				<div className="flex flex-col items-center justify-center">
					<h2 className=" text-2xl font-bold">Thanks for reading!</h2>
					<p className="text-center font-poppins">
						If you found this useful, check out my{' '}
						<Link to={'/blog'}>other articles</Link> and my YouTube Channel
						where I cover a lot of the same topics but in video format. & If you
						don't want to miss future article and updates similar to this do
						subscribe to my newsletter.
					</p>
					<Link to={'/newsletter'}>
						<ConnectButton>
							<div className="flex items-center justify-center gap-2 p-2 text-[14px]">
								<Mails size={18} /> Subscribe to my newsletter?
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
