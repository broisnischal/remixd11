import {
	Link,
	Outlet,
	useLocation,
	useOutlet,
	useOutletContext,
} from '@remix-run/react';
import { ArrowLeft, ArrowRight, HandHelping, Mails } from 'lucide-react';
import moment from 'moment';
import { ConnectButton } from '~/components/ui-library/tailwindbutton';
import { MDXProvider } from '@mdx-js/react';

import { Clap } from '~/root';
import {
	EmailIcon,
	LinkedinIcon,
	LinkedinShareButton,
	RedditIcon,
	RedditShareButton,
	TwitterShareButton,
	XIcon,
} from 'react-share';
import MyMDXProvider from '~/lib/mdx';

export default function Component() {
	const location = useLocation();

	let shareurl = 'https://nischal-dahal.com.np' + location.pathname;
	let title = 'Check out this article by Nischal Dahal.';
	// const value = useOutletContext();
	// const vla = useOutlet();

	return (
		<div>
			<Link to={'/blog'}>
				<div className="flex items-center gap-2 opacity-60">
					<ArrowLeft className="h-5 w-5" /> Back
				</div>
			</Link>
			<div className="prose prose-zinc dark:prose-invert lg:prose-xl prose-p:font-atkinson prose-strong:rounded-md prose-strong:bg-secondary prose-strong:px-2 prose-strong:py-1 prose-strong:font-inconsolata prose-code:rounded-md  prose-code:font-inconsolata prose-img:rounded-md   ">
				<Outlet />
			</div>
			<br />
			<br />
			<br />
			<br />
			<div className="share flex flex-col items-center justify-center gap-2 md:flex-row">
				<p className="mr-1 text-center font-poppins text-[18px] font-bold">
					Share this article on your socials...
				</p>

				<HandHelping />

				<div className="share flex flex-wrap gap-3">
					<TwitterShareButton
						url={shareurl}
						title={title}
						className="Demo__some-network__share-button"
					>
						<XIcon
							className="rounded-full border-[1px] border-zinc-500/50"
							size={32}
							round
						/>
					</TwitterShareButton>
					<LinkedinShareButton
						url={shareurl}
						title={title}
						about={title}
						className="Demo__some-network__share-button"
					>
						<LinkedinIcon size={32} round />
					</LinkedinShareButton>

					<RedditShareButton
						url={shareurl}
						title={title}
						windowWidth={660}
						windowHeight={460}
						className="Demo__some-network__share-button"
					>
						<RedditIcon size={32} round />
					</RedditShareButton>
				</div>
			</div>
			<br />
			<br />
			<div className=" prose dark:prose-invert lg:prose-xl prose-p:font-atkinson prose-strong:rounded-md prose-strong:bg-secondary prose-strong:px-2 prose-strong:py-1 prose-img:rounded-md ">
				<div className="flex flex-col items-center justify-center">
					<h2 className=" text-2xl font-bold">Thanks for reading!</h2>
					<p className="text-center">
						If you found this useful, check out my{' '}
						<Link to={'/blog'}>other articles</Link> and my YouTube Channel
						where I cover a lot of the same topics but in video format.
					</p>
					<Link to={'/newsletter'}>
						<ConnectButton>
							<div className="flex items-center justify-center gap-2">
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
