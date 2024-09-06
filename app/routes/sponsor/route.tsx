import { Link } from '@remix-run/react';
import { GoSponsorTiers } from 'react-icons/go';
import { SiGithubsponsors } from 'react-icons/si';
import { ConnectButton } from '~/components/ui-library/tailwindbutton';
import { Button } from '~/components/ui/button';

export default function Page() {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-start gap-4">
				<img
					src="https://avatars.githubusercontent.com/u/98168009?v=4"
					className="w-[200px] rounded-md border bg-transparent shadow-sm saturate-50 hover:saturate-100 "
					alt=""
				/>
				<div className="flex flex-col gap-2">
					<p className="font-bricolage">
						Hello, kind stranger who wants to help an open source developer ! I
						maintain and create open source projects. I am very passionate about
						what I do and I want to continue to do so. If you find my content
						useful, please consider sponsoring me.
					</p>
					<p>
						Your sponsorship will help me to continue to create and share
						content that you or others can use for free.
					</p>
				</div>
			</div>
			<br />
			<Link
				target="_blank"
				className="self-center"
				to={'https://ko-fi.com/nischaldahal'}
			>
				<Button variant="outline" size={'lg'} className="flex gap-2">
					<SiGithubsponsors /> <span>Sponsor</span>
				</Button>
			</Link>
		</div>
	);
}
