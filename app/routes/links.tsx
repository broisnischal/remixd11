import { DiscordLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { Link } from '@remix-run/react';
import { CodeIcon, RssIcon } from 'lucide-react';
import { HiDocumentText } from 'react-icons/hi';
import { MdFlutterDash } from 'react-icons/md';
import { TelegramIcon, WhatsappIcon } from 'react-share';

export default function Page() {
	return (
		<div className="flex flex-col  gap-2">
			<h1 className="font-bricolage text-4xl font-bold">Links</h1>
			<p className="mb-4 font-bricolage text-[1.2rem]">
				Quicklinks to my social platforms and contacts.
			</p>
			<div className=" flex flex-wrap gap-3">
				{socialLinks.map((link, index) => (
					<Link
						aria-label={link.name}
						key={index}
						target="_blank"
						to={link.url}
					>
						<div
							key={index}
							title={link.name}
							className="flex aspect-square  w-[45px] flex-col place-items-center items-center justify-center gap-2 rounded-md border bg-[#f2f2f290] dark:bg-[#191919]  "
						>
							<div className="flex items-center justify-center">
								{link.icon}
							</div>
							{/* <p cla	ssName=" font-bricolage text-sm">{link.name}</p> */}
							{/* <Button variant={'outline'} className="gap-2">
								<ArrowTopRightIcon />
								<span>{link.action}</span>
							</Button> */}
						</div>
					</Link>
				))}
			</div>
			<p className="secondary balanced ">
				{/* Reach me directly at{' '} */}
				{/* <a
					className="text-primary underline"
					href="mailto:info@nischal-dahal.com.np"
				>
					info@nischal-dahal.com.np
				</a>{' '} */}
				{/* <a
					className="text-primary underline"
					target="_blank"
					href="https://orcid.org/0009-0007-8445-2408/print"
				>
					orcid
				</a>{' '}
				profile. */}
			</p>
			{/* <p className="secondary">
				Share a interesting project idea? Feel free to reach to
				ping@nischal.pro! */}
			{/* </p> */}
			{/* <small className="">
				<br /> Made with{' '}
				<Link target="_blank" className="underline" to="https://remix.run">
					Remix
				</Link>{' '}
				❤️
			</small> */}
		</div>
	);
}

const socialLinks: {
	name: string;
	description: string;
	url: string;
	icon: JSX.Element;
	action: string;
}[] = [
	{
		name: 'Github',
		description: 'Building software and tools.',
		url: 'https://github.com/broisnischal',
		icon: <GitHubLogoIcon width={30} height={30} />,
		action: 'Visit',
	},

	{
		name: 'Instagram',
		description: 'Updates and postings.',
		url: 'https://instagram.com/broisnees',
		icon: (
			<svg
				className="dark:fill-zinc-100"
				xmlns="http://www.w3.org/2000/svg"
				width="30"
				height="20"
				preserveAspectRatio="xMidYMid"
				viewBox="0 0 256 256"
			>
				<path
					// fill="#000"
					d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"
				/>
			</svg>
		),
		action: 'Follow',
	},
	{
		name: 'Twitter',
		description: "Sharing what I'm working on.",
		url: 'https://x.com/broisnees',
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				fill="none"
				viewBox="0 0 1200 1227"
			>
				<path
					className="fill-black dark:fill-white"
					d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
				/>
			</svg>
		),
		action: 'Follow',
	},
	{
		name: 'LinkedIn',
		description: 'Sharing progress & experience.',
		url: 'https://linkedin.com/in/neeswebservices',
		icon: (
			<svg
				width="30"
				height="20"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid"
				viewBox="0 0 256 256"
			>
				<path
					d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
					fill="#0A66C2"
				/>
			</svg>
		),
		action: 'Check',
	},
	{
		name: 'Discord',
		description: 'For help and discussion.',
		url: 'https://discordapp.com/users/1154300430755573811',
		icon: <DiscordLogoIcon width={30} height={30} />,
		action: 'Join',
	},
	{
		name: 'Orchid',
		description: 'For help and discussion.',
		url: 'https://orcid.org/0009-0007-8445-2408/print',
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="25px"
				height="25px"
				viewBox="0 0 1024 1024"
			>
				<circle
					cx="512"
					cy="512"
					r="512"
					style={{
						fill: '#fff',
					}}
				/>
				<path
					d="M373.7 709.3h-50.4V358.5h50.4v350.8zm74-350.8h136.2c129.7 0 186.7 92.7 186.7 175.5 0 90.1-70.4 175.5-186 175.5H447.7v-351zm50.4 305.6h80.2c114.3 0 140.5-86.8 140.5-130 0-70.4-44.9-130-143.1-130h-77.6v260zM381.6 285.5c0 18-14.7 33.1-33.1 33.1-18.3 0-33.1-15.1-33.1-33.1 0-18.3 14.7-33.1 33.1-33.1 18.3 0 33.1 15.1 33.1 33.1z"
					// style="fill:#fff"
				/>
			</svg>
		),
		action: 'Join',
	},
	{
		name: 'Youtube',
		description: 'Aesthetic content.',
		url: 'https://www.youtube.com/@neeswebservices',
		icon: (
			<svg
				viewBox="0 0 256 180"
				width="25"
				height="20"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid"
			>
				<path
					d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"
					fill="red"
				/>
				<path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z" />
			</svg>
		),
		action: 'SUB',
	},
	{
		name: 'Whatsapp',
		description: '+9779803104764',
		url: 'https://wa.me/9779803104764?text=Hello!%20I%20hope%20this%20message%20finds%20you%20well.%20Just%20wanted%20to%20reach%20out%20and%20say%20hi!',
		icon: <WhatsappIcon size={30} className="rounded-full" />,
		action: 'Message',
	},
	{
		name: 'Telegram',
		description: 'Telegram',
		url: 'https://t.me/broisnees',
		icon: <TelegramIcon size={30} className="rounded-full" />,
		action: 'Chat',
	},
	{
		name: 'Ko-fi',
		description: 'Kofi',
		url: 'https://ko-fi.com/nischaldahal',
		icon: (
			<img
				width="25"
				src="https://cdn.prod.website-files.com/5c14e387dab576fe667689cf/61e1116779fc0a9bd5bdbcc7_Frame%206.png"
				alt=""
			/>
		),
		action: 'Chat',
	},
	{
		name: 'Spotify',
		description: 'Spotify',
		url: 'https://open.spotify.com/user/broisnischal',
		icon: (
			<svg
				viewBox="0 0 256 256"
				width="20"
				height="25"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid"
			>
				<path
					d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128 70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007l.001-.006Zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644-30.053-18.357-67.885-22.515-112.44-12.335a7.981 7.981 0 0 1-9.552-6.007 7.968 7.968 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276 3.76 2.308 4.952 7.215 2.644 10.975Zm15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289-34.406-21.148-86.853-27.273-127.548-14.92-5.278 1.594-10.852-1.38-12.454-6.649-1.59-5.278 1.386-10.842 6.655-12.446 46.485-14.106 104.275-7.273 143.787 17.007 4.692 2.89 6.175 9.034 3.286 13.72v-.001Zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405-3.362 5.69-10.73 7.565-16.4 4.187h-.006Z"
					fill="#1ED760"
				/>
			</svg>
		),
		action: 'Listen',
	},
	{
		name: 'Patreon',
		description: 'Become a patron',
		url: 'https://patreon.com/broisnees',
		action: 'Become',
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="dark:fill-zinc-100"
				// fill="#000"
				width={20}
				height={20}
				viewBox="0 0 36 40"
			>
				<path
					// fill="#000"
					d="M35.975 11.392c0 .312.021.627-.004.937-.03.361-.082.722-.149 1.08a22.535 22.535 0 0 1-.331 1.512 8.59 8.59 0 0 1-.359 1.084c-.313.767-.66 1.518-1.117 2.21-.282.427-.57.849-.864 1.266a4.12 4.12 0 0 1-.37.431c-.225.238-.442.483-.686.695a13.5 13.5 0 0 1-1.123.905c-.356.25-.756.431-1.12.674-.404.268-.866.384-1.296.587-.384.18-.795.24-1.186.38-.498.18-1.021.222-1.531.331-.544.117-1.097.203-1.643.315-.449.09-.894.198-1.34.298-.254.056-.51.098-.756.173-.304.093-.6.214-.896.324-.201.072-.412.126-.604.219-.28.14-.544.315-.823.464-.457.242-.838.585-1.184.96-.292.32-.546.681-.8 1.036-.418.587-.706 1.244-.964 1.916-.254.657-.487 1.322-.725 1.986-.221.625-.43 1.252-.655 1.875-.197.543-.407 1.079-.618 1.615a13.447 13.447 0 0 1-1.12 2.215c-.331.531-.685 1.049-1.142 1.478-.366.343-.72.704-1.17.944-.446.24-.906.448-1.4.557a6.636 6.636 0 0 1-1.807.129c-.229-.012-.455-.075-.684-.117-.137-.026-.276-.047-.409-.089-.112-.035-.215-.097-.322-.151-.302-.147-.624-.264-.9-.448a8.802 8.802 0 0 1-.96-.776c-.554-.492-.97-1.103-1.342-1.74a13.04 13.04 0 0 1-.681-1.319c-.192-.436-.336-.893-.492-1.345a24.916 24.916 0 0 1-.34-1.063c-.092-.317-.165-.641-.243-.963-.073-.298-.15-.594-.212-.895-.112-.536-.215-1.073-.32-1.609a35.827 35.827 0 0 1-.133-.68c-.06-.34-.114-.681-.171-1.022-.044-.254-.092-.506-.13-.76-.044-.28-.08-.56-.124-.839-.036-.242-.078-.483-.112-.725-.032-.226-.06-.452-.089-.678a70.143 70.143 0 0 1-.094-.73c-.03-.236-.055-.471-.082-.707a19421 19421 0 0 1-.096-.818c-.011-.098-.023-.193-.03-.291-.034-.401-.068-.804-.1-1.208-.02-.25-.04-.501-.05-.75-.021-.39-.042-.777-.05-1.166C.01 18.46.001 17.819 0 17.18c0-.378.002-.755.027-1.13.026-.392.08-.784.122-1.176.034-.312.064-.622.105-.934.023-.175.064-.348.1-.52.092-.432.176-.863.281-1.292.076-.31.181-.61.266-.916.157-.571.393-1.11.623-1.653.106-.25.236-.49.368-.725.186-.329.366-.66.576-.97.259-.378.533-.744.823-1.098.275-.336.567-.66.873-.965.24-.24.512-.448.77-.665.254-.212.501-.433.77-.624.412-.296.835-.576 1.263-.849.249-.158.514-.294.774-.434.405-.219.81-.44 1.22-.648.26-.13.527-.244.794-.354.683-.277 1.364-.557 2.055-.816.46-.17.932-.303 1.399-.452.24-.077.475-.161.717-.229.2-.056.402-.086.604-.133.22-.05.434-.119.656-.16.299-.059.603-.1.907-.147.34-.052.679-.105 1.02-.152.139-.019.283-.02.425-.03.47-.026.944-.054 1.414-.077.188-.01.382-.051.565-.019.443.08.889.017 1.332.05.428.03.853.076 1.278.127.306.038.608.103.914.15.268.04.535.065.802.107.215.035.43.081.645.128.46.103.919.196 1.374.317.404.11.797.275 1.204.37.469.113.899.332 1.351.479.462.149.86.424 1.3.608.515.217.96.546 1.418.858.347.238.685.492 1 .77.467.41.92.836 1.356 1.28.258.26.478.564.713.85.38.464.658.993.928 1.523.215.424.393.874.537 1.329.12.373.156.774.245 1.156.098.42.096.844.073 1.27l-.012.008Z"
				></path>
			</svg>
		),
	},

	{
		name: 'Resume',
		description: 'My Resume',
		url: 'https://myresume.fly.dev/r/testingg',
		action: 'View',
		icon: <HiDocumentText size={25} />,
	},
	{
		name: 'ByteBuffer',
		description: 'Daily Dev',
		url: 'https://dly.to/oYeNtLdx9va',
		action: 'Watch',
		icon: <img src="https://docs.daily.dev/img/logo.png" width={22} />,
	},
	{
		name: 'YM Grad',
		description: 'My Graduation Video',
		url: 'https://ymgrad.com/profile/nischaldahal',
		action: 'Watch',
		icon: (
			<img
				id="uni_logo"
				alt="YMGrad logo"
				loading="lazy"
				width="20"
				height="20"
				decoding="async"
				data-nimg="1"
				src="https://ymgrad.com/static/base/logo.svg"
				// style={'color: transparent;'}
			></img>
		),
	},
	{
		name: 'Dart Pub',
		description: 'Dart Pub',
		url: 'https://pub.dev/publishers/nischal-dahal.com.np?ref=nischal-dahal.com.np',
		action: 'Visit',
		icon: (
			<svg
				viewBox="0 0 256 256"
				xmlns="http://www.w3.org/2000/svg"
				width="30"
				height="25"
				preserveAspectRatio="xMidYMid"
			>
				<defs>
					<radialGradient
						id="a"
						cx="50%"
						cy="50.002%"
						r="50.004%"
						fx="50%"
						fy="50.002%"
						gradientTransform="matrix(1 0 0 .99985 0 0)"
					>
						<stop offset="0%" stopColor="#FFF" stop-opacity=".1" />
						<stop offset="100%" stopColor="#FFF" stop-opacity="0" />
					</radialGradient>
				</defs>
				<path
					fill="#01579B"
					d="M52.209 203.791 8.413 159.995C3.218 154.67 0 147.141 0 139.782c0-3.407 1.92-8.733 3.369-11.782l40.427-84.204 8.413 159.995Z"
				/>
				<path
					fill="#40C4FF"
					d="M202.116 52.209 158.32 8.413C154.5 4.573 146.538 0 139.8 0c-5.796 0-11.48 1.167-15.15 3.369L43.815 43.796l158.301 8.413ZM104.418 256h106.111v-45.471l-79.16-25.276-72.422 25.276z"
				/>
				<path
					fill="#29B6F6"
					d="M43.796 180.209c0 13.513 1.694 16.826 8.413 23.582l6.738 6.738h151.582l-74.097-84.204-92.636-82.53V180.21Z"
				/>
				<path
					fill="#01579B"
					d="M178.534 43.777H43.796L210.529 210.51H256V106.093L202.097 52.19c-7.566-7.585-14.285-8.413-23.563-8.413Z"
				/>
				<path
					fill="#FFF"
					d="M53.903 205.466c-6.738-6.756-8.413-13.419-8.413-25.257V45.47l-1.675-1.675v136.413c-.02 11.838-.02 15.113 10.088 25.257l5.044 5.044-5.044-5.044Z"
					opacity=".2"
				/>
				<path
					fill="#263238"
					d="M254.325 104.418v104.417h-45.471l1.675 1.694H256V106.093z"
					opacity=".2"
				/>
				<path
					fill="#FFF"
					d="M202.116 52.209c-8.356-8.357-15.188-8.413-25.257-8.413H43.815l1.675 1.675h131.369c5.025 0 17.71-.847 25.257 6.738Z"
					opacity=".2"
				/>
				<path
					fill="url(#a)"
					d="m254.325 104.418-52.209-52.21L158.32 8.414C154.5 4.573 146.538 0 139.8 0c-5.796 0-11.48 1.167-15.15 3.369L43.815 43.796 3.388 128c-1.45 3.068-3.37 8.394-3.37 11.782 0 7.359 3.238 14.868 8.414 20.213l40.351 40.07c.96 1.185 2.09 2.39 3.426 3.726l1.675 1.675 5.044 5.044 43.796 43.796 1.675 1.675H210.49v-45.47h45.471V106.092l-1.637-1.675Z"
					opacity=".2"
				/>
			</svg>
		),
	},
	{
		name: 'Gist',
		description: 'giests',
		url: 'https://gist.github.com/broisnischal',
		action: 'Visit',
		icon: (
			<svg
				className="dark:fill-zinc-100"
				viewBox="0 0 256 250"
				width="30"
				height="25"
				// fill="#fff"
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMidYMid"
			>
				<path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
			</svg>
		),
	},
	{
		name: 'codersrank',
		description: 'codersrank',
		url: 'https://profile.codersrank.io/user/broisnischal/',
		action: 'Visit',
		icon: <CodeIcon width={30} height={30} />,
	},

	{
		name: 'Chess',
		description: 'Subscribe to my blog.',
		url: 'https://www.chess.com/member/broisnees',
		action: 'Feed',
		icon: (
			<img
				src="https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpkXK09k.png"
				alt=""
				width={15}
			/>
		),
	},
	{
		name: 'npmjs',
		description: 'Subscribe to my blog.',
		url: 'https://www.npmjs.com/~neeswebservice',
		action: 'Feed',
		icon: (
			<svg
				viewBox="0 0 256 256"
				version="1.1"
				width={30}
				height={30}
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				preserveAspectRatio="xMidYMid"
				fill="#000000"
			>
				<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
				<g
					id="SVGRepo_tracerCarrier"
					strokeLinecap="round"
					strokeLinejoin="round"
				></g>
				<g id="SVGRepo_iconCarrier">
					{' '}
					<g>
						{' '}
						<polygon fill="#C12127" points="0 256 0 0 256 0 256 256">
							{' '}
						</polygon>{' '}
						<polygon
							fill="#FFFFFF"
							points="48 48 208 48 208 208 176 208 176 80 128 80 128 208 48 208"
						>
							{' '}
						</polygon>{' '}
					</g>{' '}
				</g>
			</svg>
		),
	},
	{
		name: 'RSS',
		description: 'Subscribe to my blog.',
		url: 'https://nischal-dahal.com.np/blogs/rss',
		action: 'Feed',
		icon: <RssIcon width={25} height={25} />,
	},
];
// https://github.com/broisnischal/broisnischal/blob/main/resume.pdf
