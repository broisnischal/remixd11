import { Link } from '@remix-run/react';
import { GoSponsorTiers } from 'react-icons/go';
import { SiGithubsponsors } from 'react-icons/si';
import { ConnectButton } from '~/components/ui-library/tailwindbutton';
import { Button } from '~/components/ui/button';

export default function Page() {
	return (
		<div className="flex flex-col gap-2">
			<h1 className="font-mono text-4xl font-bold">Sponsor</h1>
			<p className="text-balance font-reader">
				Your sponsorship will help me to continue to create and share content
				that you or others can use for free.
			</p>
			<br />
			{/* <img
				src="https://ko-fi.com/streamalerts/goaloverlay/sa_390dc74c-6a48-4c6f-9098-036e86e234f7.png"
				alt=""
			/> */}
			<div className="div">
				<iframe
					id="kofiframe"
					className="border"
					src="https://ko-fi.com/nischaldahal/?hidefeed=true&widget=true&embed=true&preview=true"
					style={{
						borderRadius: '1rem',
						height: '500px',
						background: 'transparent',
					}}
					height={712}
					title="nischaldahal"
				></iframe>
			</div>
			<br />
			{/* <Link
				target="_blank"
				// className="self-center"
				to={'https://ko-fi.com/nischaldahal'}
			>
				<Button variant="outline" size={'lg'} className="flex gap-2">
					<SiGithubsponsors /> <span>Sponsor</span>
				</Button>
			</Link> */}

			<br />
		</div>
	);
}
