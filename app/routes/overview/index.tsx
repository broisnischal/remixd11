import { json, Link, useLoaderData } from '@remix-run/react';
import { VscVscode, VscFolder } from 'react-icons/vsc';
import { GrDocumentConfig } from 'react-icons/gr';
import { GitBranch } from 'lucide-react';
import { IconType } from 'react-icons/lib';
import axios from 'axios';
import { load } from 'cheerio';
import { ContributionBox } from '~/components/contribution';
import { ConnectButton } from '~/components/ui-library/tailwindbutton';
import { SiNeovim } from 'react-icons/si';
import { FaGitAlt } from 'react-icons/fa';
import { SiEslint } from 'react-icons/si';
import { MdOutlineKeyboardCommandKey } from 'react-icons/md';
import { MdOutlineTerminal } from 'react-icons/md';
import { SiTmux } from 'react-icons/si';
import { FaDocker } from 'react-icons/fa';
import { SiPrettier } from 'react-icons/si';
import { SiEditorconfig } from 'react-icons/si';
import { RiFlutterFill } from 'react-icons/ri';

import AvatarCircles from '~/components/magicui/avatar-circles';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useState } from 'react';
import { MetaFunction } from '@remix-run/cloudflare';
import { MetaCreator } from '~/utils/meta';

export const meta: MetaFunction = () => {
	const url = new URL('https://nischal-dahal.com.np');

	const metadata = MetaCreator({
		title: 'Nischal Dahal | Broisnees ',
		description:
			'Nischal Dahal | list of project, configs and my contributions are listed out here.',
		image: '/ogimg.png',
		url: `${url.origin}${location.pathname}`,
		others: [
			{
				name: 'author',
				content: 'Nischal Dahal',
			},
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

export async function loader() {
	type Level = 0 | 1 | 2 | 3 | 4;

	const data = await axios.get<{
		total: {
			lastYear: number;
			thisYear: number;
		};
		contributions: {
			date: string;
			count: number;
			level: Level;
		}[];
	}>(`https://github-contributions-api.jogruber.de/v4/broisnischal?y=last`);

	return json({ contributions: data.data.contributions });
}

export default function Overview() {
	const { contributions } = useLoaderData<typeof loader>();

	return (
		<div className="m-auto flex flex-col gap-4 md:max-w-[70vw]">
			<div>
				<h1 className="mb-3 text-3xl font-bold">Projects</h1>
				<div className="items-sta flex gap-9">
					{/* <VscVscode size={100} /> */}

					<div className="grid grid-cols-1 place-content-center gap-4 *:border-[1px] lg:grid-cols-2 xl:grid-cols-3 ">
						<div className="single rounded-lg p-3">
							<Link to="ms">Milliseconds</Link>
							<p>
								A vscode extension that prompts user their option to insert
								millisecond
							</p>
						</div>
						<div className="single rounded-lg p-3">
							<Link to="ms">Assetize</Link>
							<p>
								Assetify an autocomplete for your images, videos, fonts, and
								more.
							</p>
						</div>
						<div className="single rounded-lg p-3">
							<Link to="ms">Prisma</Link>
							<p>
								a revolutionary utility extension for seamless Prisma
								integration.
							</p>
						</div>
						<div className="single rounded-lg p-3">
							<Link to="ms">My Resume</Link>
							<p>a resume that is built for developers,</p>
						</div>
						<div className="single rounded-lg p-3">
							<Link to="ms">Bookmark</Link>
							<p>
								Vscode Extension that let's you bookmark your important files,
								and folder and works like pinning the item.
							</p>
						</div>
						<div className="single rounded-lg p-3">
							<Link to="ms">Figma Generator</Link>
							<p>
								Figma plugin streamlines the process of generating code for
								Tailwind CSS configuration, ARB Intl files, color constants, and
								exporting all assets.
							</p>
						</div>
						<div className="single rounded-lg p-3">
							<Link to="ms">Prisma Type Generator</Link>
							<p>A prisma type and interface generator. 🚀</p>
						</div>
						<div className="single rounded-lg p-3">
							<Link to="ms">Auto Select URL</Link>
							<p>
								Extension let's you automatically select the whole block of the
								url without having to select manually.🚀
							</p>
						</div>
						<div className="single rounded-lg p-3">
							<Link to="ms">React CHATGPT Text</Link>
							<p>
								A typewriter, which generates the type effect like the ChatGPT
								website's like AI typing, with thinking.
							</p>
						</div>
					</div>
				</div>
			</div>

			<br />
			<div className="w-full ">
				<h1 className="mb-3 text-3xl font-bold">Configs</h1>
				{/* <GrDocumentConfig size={50} className="opacity-10" /> */}

				{/* <div className="grid grid-cols-3 gap-4 *:border-[1px] ">
						<div className="single rounded-lg p-3">
							<div className="flex gap-2">
								<GitBranch size={20} /> <Link to="ms">Git</Link>
							</div>
							<p>Git config i use commonly in daily base.</p>
						</div>
					</div> */}
				<div className="grid w-full grid-cols-1 gap-3  sm:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] xl:[grid-template-columns:repeat(3,minmax(0,1fr))]">
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
			<div className="sposor">
				<h1 className="mb-3 text-3xl font-bold">Sponsors</h1>

				{/* <p className="text-xl font-bold">Coming Soon...</p> */}
				<AvatarCircles numPeople={11} avatarUrls={avatarUrls} />

				<small className="flex gap-2">
					Dummy, and Comming Soon.
					<Link to="https://github.com/sponsors/broisnischal">Sponsor</Link>
				</small>
			</div>
			<br />

			<div className=" github hidden w-full flex-col items-center justify-center overflow-scroll lg:flex lg:w-full">
				<h1 className="text-3xl font-bold">My Contribution</h1>
				<div className="flex w-fit flex-col">
					<br />
					<br />
					<div className="relative grid grid-flow-col grid-rows-[repeat(7,1fr)] place-content-center gap-[3px] place-self-center p-2">
						{contributions.map((item, index) => (
							<ContributionBox
								item={item}
								className="aspect-square xl:h-[11px] xl:w-[11px]"
								key={index}
							/>
						))}
					</div>
				</div>
				<br />
				<Link to="https://github.com/broisnischal">
					<ConnectButton>Connect on Github</ConnectButton>
				</Link>
			</div>

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

function MyConfig({ icon, title, link, description, subicon }: MyConfig) {
	const [isOpen, setIsOpen] = useState(false);

	const [isSubmitting, setIsSubmitting] = useState(false);

	const onClickHandler = () => setIsOpen(!isOpen);

	const onSubmitHandler = async () => {
		setIsSubmitting(true);

		await new Promise(resolve => setTimeout(resolve, 3000));

		setIsSubmitting(false);
		await new Promise(resolve => setTimeout(resolve, 500));
		setIsOpen(false);
	};

	return (
		<>
			<div className="flex w-full flex-col border-[1px] p-3 ">
				<div className="flex items-center gap-4">
					{icon({ size: 20 })}
					{/* <button onClick={onClickHandler}>{title}</button> */}
					<Link to={link}>{title}</Link>
				</div>
				<div>
					<p>{description}</p>
				</div>
			</div>
		</>
	);
}

let configData: MyConfig[] = [
	{
		icon: SiNeovim,
		title: 'Neovim',
		link: 'aksdjlf',
		description: 'Neovim config i use commonly in daily base.',
		subicon: null,
	},
	{
		icon: FaGitAlt,
		title: 'Git',
		link: 'git',
		description: 'Git config i use commonly in daily base.',
		subicon: GitBranch,
	},
	{
		icon: VscVscode,
		title: 'VSC',
		link: 'git',
		description: 'VSCode settings, and how i configure it for daily use.',
		subicon: GitBranch,
	},
	{
		icon: SiEslint,
		title: 'ESlint',
		link: 'git',
		description: 'ESlint config i use commonly in daily base.',
		subicon: GitBranch,
	},
	{
		icon: MdOutlineKeyboardCommandKey,
		title: 'Keybinding',
		link: 'git',
		description: 'Keybinding where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: MdOutlineTerminal,
		title: 'Bash RC',
		link: 'git',
		description: 'BashRC where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: MdOutlineTerminal,
		title: 'ZSH RC',
		link: 'git',
		description: 'ZSH where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: SiTmux,
		title: 'TMUX',
		link: 'git',
		description: 'Tmux where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: FaDocker,
		title: 'Docker',
		link: 'git',
		description: 'Docker where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: SiPrettier,
		title: 'Prettier',
		link: 'git',
		description: 'prettier where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: SiEditorconfig,
		title: 'Editorconfig',
		link: 'editor',
		description: 'Editorconfig where it helps to be fast.',
		subicon: GitBranch,
	},
	{
		icon: RiFlutterFill,
		title: 'Flutter',
		link: 'editor',
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
