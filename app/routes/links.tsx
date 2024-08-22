import {
	ArrowTopRightIcon,
	DiscordLogoIcon,
	GitHubLogoIcon,
	InstagramLogoIcon,
	LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { Link } from '@remix-run/react';
import { RssIcon, YoutubeIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';

export default function Page() {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<h1 className="text-3xl font-bold">Links</h1>
			<p>Quicklinks to my social platforms and projects.</p>
			<br />
			<div className="flex flex-wrap items-center justify-center gap-4">
				<div className="flex items-center justify-between gap-4 rounded-md border bg-[#f6f6f6]  px-4 py-2 dark:bg-[#191919] md:w-[400px]">
					<div className="flex items-center gap-4">
						<Link
							aria-label="Github"
							target="_blank"
							to="https://github.com/broisnischal"
						>
							<GitHubLogoIcon width={30} height={30} />
						</Link>
						<div className="mr-2">
							<h1>Github</h1>
							<p className="secondary">Building software and tools.</p>{' '}
						</div>
					</div>
					<Link
						aria-label="Github"
						target="_blank"
						to="https://github.com/broisnischal"
					>
						<Button variant={'outline'} className="gap-2">
							<ArrowTopRightIcon />
							<span>Visit</span>
						</Button>
					</Link>
				</div>
				<div className="flex items-center justify-between gap-4 rounded-md border bg-[#f6f6f6]  px-4 py-2 dark:bg-[#191919] md:w-[400px]">
					<div className="flex items-center gap-4">
						<DiscordLogoIcon width={30} height={30} />
						<div className="mr-2">
							<h1>Discord</h1>
							<p className="secondary">For help and discussion.</p>
						</div>
					</div>
					<Link
						aria-label="Github"
						target="_blank"
						to="https://github.com/broisnischal"
					>
						<Button variant={'outline'} className="gap-2">
							<ArrowTopRightIcon />
							<span>Join</span>
						</Button>
					</Link>
				</div>
				<div className="flex items-center justify-between gap-4 rounded-md border bg-[#f6f6f6]  px-4 py-2 dark:bg-[#191919] md:w-[400px]">
					<div className="flex items-center gap-4">
						<InstagramLogoIcon width={30} height={30} />
						<div className="mr-2">
							<h1>Instagram</h1>
							<p className="secondary">Updates and postings.</p>
						</div>
					</div>
					<Link
						aria-label="Github"
						target="_blank"
						to="https://instagram.com/broisnees"
					>
						<Button variant={'outline'} className="gap-2">
							{/* <ArrowTopRightIcon /> */}
							<span>Follow</span>
						</Button>
					</Link>
				</div>
				<div className="flex items-center justify-between gap-4 rounded-md border bg-[#f6f6f6]  px-4 py-2 dark:bg-[#191919] md:w-[400px]">
					<div className="flex items-center gap-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="23"
							height="23"
							fill="none"
							viewBox="0 0 1200 1227"
						>
							<path
								// fill="#000 dark:#fff"
								className="fill-black dark:fill-white"
								d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
							/>
						</svg>
						<div className="mr-2">
							<h1>X</h1>
							<p className="secondary">Sharing what I'm working on.</p>
						</div>
					</div>
					<Link
						aria-label="Github"
						target="_blank"
						to="https://x.com/broisnees"
					>
						<Button variant={'outline'} className="gap-2">
							{/* <ArrowTopRightIcon /> */}
							<span>Follow</span>
						</Button>
					</Link>
				</div>
				<div className="flex items-center justify-between gap-4 rounded-md border bg-[#f6f6f6]  px-4 py-2 dark:bg-[#191919] md:w-[400px]">
					<div className="flex items-center gap-4">
						<LinkedInLogoIcon width={30} height={30} />
						<div className="mr-2">
							<h1>LinkedIn</h1>
							<p className="secondary">Sharing progess & experience.</p>
						</div>
					</div>
					<Link
						aria-label="Github"
						target="_blank"
						to="https://linkedin.com/in/neeswebservices"
					>
						<Button variant={'outline'} className="gap-2">
							{/* <ArrowTopRightIcon /> */}
							<span>Check</span>
						</Button>
					</Link>
				</div>
				<div className="flex items-center justify-between gap-4 rounded-md border bg-[#f6f6f6]  px-4 py-2 dark:bg-[#191919] md:w-[400px]">
					<div className="flex items-center gap-4">
						<RssIcon width={30} height={30} />
						<div className="mr-2">
							<h1>Blog Rss</h1>
							<p className="secondary">Subscribe to my blog.</p>
						</div>
					</div>
					<Link
						aria-label="Github"
						target="_blank"
						to="https://nischal-dahal.com.np/blogs/rss"
					>
						<Button variant={'outline'} className="gap-2">
							<ArrowTopRightIcon />
							<span>Feed</span>
						</Button>
					</Link>
				</div>
				<div className="flex items-center justify-between gap-4 rounded-md border bg-[#f6f6f6]  px-4 py-2 dark:bg-[#191919] md:w-[400px]">
					<div className="flex items-center gap-4">
						<Link
							aria-label="Github"
							target="_blank"
							to="https://github.com/broisnischal"
						>
							<YoutubeIcon width={30} height={30} />
						</Link>
						<div className="mr-2">
							<h1>Youtube</h1>
							<p className="secondary">Athestic contents.</p>
						</div>
					</div>
					<Button variant={'outline'} className="gap-2">
						<ArrowTopRightIcon />
						<span>SUB</span>
					</Button>
				</div>
				<div className="flex items-center justify-between gap-4 rounded-md border bg-[#f6f6f6]  px-4 py-2 dark:bg-[#191919] md:w-[400px]">
					<div className="flex items-center gap-4">
						<Link
							aria-label="Github"
							target="_blank"
							to="https://github.com/broisnischal"
						>
							<YoutubeIcon width={30} height={30} />
						</Link>
						<div className="mr-2">
							<h1>Youtube</h1>
							<p className="secondary">Athestic content.</p>
						</div>
					</div>
					<Button variant={'outline'} className="gap-2">
						<ArrowTopRightIcon />
						<span>SUB</span>
					</Button>
				</div>
				{/* 
				<Link
					aria-label="LinkedIn"
					target="_blank"
					to="https://www.linkedin.com/in/neeswebservices/"
				></Link> */}
				{/* <a href="/feed.json" aria-label="RSS" target="_blank"></a> */}
			</div>
			<br />
			<p className="secondary">
				Reach me directly at{' '}
				<a
					className="text-primary underline"
					href="mailto:info@nischal-dahal.com.np"
				>
					info@nischal-dahal.com.np
				</a>{' '}
				or check out my{' '}
				<a
					className="text-primary underline"
					href="https://orcid.org/0009-0007-8445-2408/print"
				>
					orcid
				</a>{' '}
				profile.
			</p>
			{/* Alternatively press Ctrl/Cmd + K to search.. */}
			{/* <small className="text-center">
				<br /> Made with{' '}
				<Link target="_blank" className="underline" to="https://remix.run">
					Remix
				</Link>{' '}
				❤️
			</small> */}
		</div>
	);
}
