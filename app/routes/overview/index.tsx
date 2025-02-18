import { json, Link, useLoaderData } from '@remix-run/react';
// import axios from 'axios';
import { GitBranch } from 'lucide-react';
import { FaDocker, FaGitAlt } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { MdOutlineKeyboardCommandKey, MdOutlineTerminal } from 'react-icons/md';
import { RiFlutterFill } from 'react-icons/ri';
import {
	SiEditorconfig,
	SiEslint,
	SiNeovim,
	SiPrettier,
	SiTmux,
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { ContributionBox } from '~/components/contribution';
import { ConnectButton } from '~/components/ui-library/tailwindbutton';

import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { MetaFunction } from '@remix-run/cloudflare';
import AvatarCircles from '~/components/magicui/avatar-circles';
import { MetaCreator } from '~/utils/meta';

export const meta: MetaFunction = ({ location }) => {
	const url = new URL('https://nischal-dahal.com.np');

	const metadata = MetaCreator({
		title: 'Overview | Nischal Dahal - Projects, Configs and Contributions',
		description:
			'Nischal Dahal | list of project, configs and my contributions are listed out here.',
		image: '/ogimg.png',
		url: `${url.origin}${location.pathname}`,
		others: [
			{
				name: 'keywords',
				content:
					'Nischal, Dahal, Nischal Dahal, Nepal Developer, Broisnees, neeswebservices, nees, best developer, best programmer, from nepal',
			},
			{
				tagName: 'link',
				rel: 'canonical',
				href: `${url.origin}${location.pathname}`,
			},
			{
				tagName: 'link',
				rel: 'icon',
				href: 'https://avatars.githubusercontent.com/u/98168009?v=4',
			},
		],
	});

	return [...metadata];
};

interface Repo {
	name: string;
	html_url: string;
	description: string | null;
	stargazers_count: number;
}

interface RepoData {
	title: string;
	url: string;
	description: string | null;
	stars: number;
}

export async function loader() {
	type Level = 0 | 1 | 2 | 3 | 4;

	// const data = await axios.get<{
	// 	total: {
	// 		lastYear: number;
	// 		thisYear: number;
	// 	};
	// 	contributions: {
	// 		date: string;
	// 		count: number;
	// 		level: Level;
	// 	}[];
	// }>(`https://github-contributions-api.jogruber.de/v4/broisnischal?y=last`);

	// const repos = await fetchLatestRepos('broisnischal', 9);

	const response = await fetch(
		'https://github-contributions-api.jogruber.de/v4/broisnischal?y=last',
	);
	const data: {
		total: {
			lastYear: number;
			thisYear: number;
		};
		contributions: {
			date: string;
			count: number;
			level: Level;
		}[];
	} = await response.json();

	return json({ contributions: data.contributions });
}

export default function Overview() {
	const { contributions } = useLoaderData<typeof loader>();

	return (
		<div className="m-auto flex flex-col gap-8  md:max-w-[70vw]">
			<div>
				<h1 className="mb-5 font-bricolage text-3xl font-bold">Projects</h1>
				<div className="flex items-start gap-2 text-start">
					<div className="grid grid-cols-1 gap-2 *:border-[1px] lg:grid-cols-2 xl:grid-cols-3 ">
						{projectdata.map((project, index) => (
							<div key={index} className="single w-full rounded-md px-6 py-4">
								<Link className="font-bricolage text-xl" to={project.url}>
									{project.name}
								</Link>

								<p className="mt-1 font-bricolage text-sm">
									{project.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<br />
			<div className="w-full ">
				<h1 className="mb-5 font-bricolage text-3xl font-bold">
					Configurations
				</h1>
				{/* grid w-full grid-cols-1 gap-3  sm:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] xl:[grid-template-columns:repeat(3,minmax(0,1fr))] */}

				<div className="&>*:w-full m-auto flex flex-wrap gap-2">
					{configData.map(config => {
						return (
							<MyConfig
								key={config.title}
								icon={config.icon}
								title={config.title}
								link={config.link}
								description={config.description}
								subicon={config.subicon}
							/>
						);
					})}
				</div>
			</div>
			<br />
			<div className="flex flex-col gap-3">
				<h1 className="mb-5 font-bricolage text-4xl font-bold">Sponsors</h1>

				<AvatarCircles numPeople={11} avatarUrls={avatarUrls} />

				<small className="flex gap-2">
					Dummy, and Comming Soon.
					<Link className="underline" to="/sponsor">
						Sponsor
					</Link>
				</small>
			</div>
			<br />

			{/* <div className=" github  hidden w-full flex-col  lg:flex lg:w-full">
				<h1 className="mb-2 font-bricolage text-3xl font-bold">
					Contributions
				</h1>
				<div className="flex w-fit flex-col">
					<div className="relative grid grid-flow-col grid-rows-[repeat(7,1fr)] place-content-center gap-[3px] place-self-center p-2">
						{contributions.map((item, index) => (
							<ContributionBox
								item={item}
								className="aspect-square xl:h-[9px] xl:w-[9px]"
								key={index}
							/>
						))}
					</div>
				</div>
				<br />
				<Link to="https://github.com/broisnischal">
					<ConnectButton>
						<div className="flex items-center justify-center gap-2">
							<GitHubLogoIcon /> Connect on Github
						</div>
					</ConnectButton>
				</Link>
			</div> */}

			<br />
		</div>
	);
}

type MyConfig = {
	icon: IconType;
	title: string;
	link: string;
	description: string;
	subicon: any;
};

export function MyConfig({
	icon,
	title,
	link,
	description,
	subicon,
}: MyConfig) {
	return (
		<Link title={title} to={link} key={link} target="_blank">
			<div className="aspect-square flex-col rounded-sm border border-secondary/40 p-2 transition-all hover:-translate-y-1 hover:scale-110 hover:border-secondary ">
				{icon({ size: 20 })}
			</div>
		</Link>
	);
}

export let configData: MyConfig[] = [
	{
		icon: SiNeovim,
		title: 'Neovim',
		link: 'https://github.com/broisnischal/vimconf',
		description: 'Neovim config i use commonly in daily base.',
		subicon: null,
	},
	{
		icon: FaGitAlt,
		title: 'Git',
		link: 'https://gist.github.com/broisnischal/19ae40c86ef5fecee8771f3895a0c84f',
		description: 'Git config i use commonly in daily base.',
		subicon: GitBranch,
	},
	{
		icon: VscVscode,
		title: 'Settings VSCode',
		link: 'https://gist.github.com/broisnischal/e530cee85ab2ef4c14944bcd24544bda',
		description: 'VSCode settings, and how i configure it for daily use.',
		subicon: GitBranch,
	},
	{
		icon: SiEslint,
		title: 'ESlint/Biome',
		link: '',
		description: 'ESlint config i use commonly in daily base.',
		subicon: GitBranch,
	},
	{
		icon: MdOutlineKeyboardCommandKey,
		title: 'Keybinding',
		link: 'https://gist.github.com/broisnischal/a0490b77957760b2d7351392c626ec57',
		description: 'Keybinding where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: MdOutlineTerminal,
		title: 'Bash RC',
		link: 'https://gist.github.com/broisnischal/ceebb7c9ecbdbc4a1a2095c314c3fbfb',
		description: 'BashRC where it helps to be fast.',
		subicon: GitBranch,
	},

	{
		icon: SiTmux,
		title: 'TMUX',
		link: 'https://gist.github.com/broisnischal/3a75ae382b28ecb75ba2b2353cbfd2e7',
		description: 'Tmux where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: FaDocker,
		title: 'Docker',
		link: '',
		description: 'Docker where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: SiPrettier,
		title: 'Prettier',
		link: 'https://gist.github.com/broisnischal/f1582660ef9fe6a2cdbd34c0a14e8085',
		description: 'prettier where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: SiEditorconfig,
		title: 'Editorconfig',
		link: 'https://gist.github.com/broisnischal/5d2b1d46bca9ae771cbb0627cec82623',
		description: 'Editorconfig where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: MdOutlineTerminal,
		title: 'ZSH RC',
		link: 'https://gist.github.com/broisnischal/e4976d57c5b37f05d3e88aa5a37a48f6',
		description: 'ZSH where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: RiFlutterFill,
		title: 'Flutter',
		link: '',
		description: 'Flutter config where it helps to be fast.',
		subicon: GitBranch,
	},
];

const avatarUrls = [
	'https://avatars.githubusercontent.com/u/16860528',
	'https://avatars.githubusercontent.com/u/20110627',
	'https://avatars.githubusercontent.com/u/106103625',
	'https://avatars.githubusercontent.com/u/59228569',
];

const projectdata: {
	name: string;
	url: string;
	description: string;
}[] = [
	{
		name: 'Assetize',
		url: 'https://github.com/broisnischal/assetize.git',
		description:
			'Assetify an autocomplete for your images, videos, fonts, and more.',
	},
	{
		name: 'Prisma Fns',
		url: 'https://github.com/broisnischal/prisma-fns',
		description:
			'A revolutionary utility extension for seamless Prisma integration.',
	},
	{
		name: 'My Resume',
		url: 'https://github.com/broisnischal/myresume.git',
		description: 'A resume that is built for developers.',
	},
	{
		name: 'Bookmark',
		url: 'https://github.com/broisnischal/bookmark.git',
		description:
			'VSCode Extension that lets you bookmark your important files and folders, working like pinning the item.',
	},
	{
		name: 'Figma Generator',
		url: 'https://github.com/broisnischal/flutter-color-constant',
		description:
			'Figma plugin for Tailwind CSS configuration, ARB Intl files, color constants, and exporting all assets.',
	},
	{
		name: 'Prisma Type Generator',
		url: 'https://github.com/broisnischal/prisma-type-generator',
		description:
			'A Prisma type and interface generator, for better developer experience.',
	},
];
