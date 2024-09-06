import { twMerge } from 'tailwind-merge';
import Hr from '~/components/hr';
import { KBD } from '~/components/KBD';
import { useEffect } from 'react';

import { Link } from '@remix-run/react';
// global.d.ts
declare global {
	namespace JSX {
		interface IntrinsicElements {
			'codersrank-portfolio': React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				username: string;
				// add other attributes you might need here
			};

			'codersrank-skills-chart': React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				username: string;
				labels?: boolean;
				legend?: boolean;
				tooltip?: boolean;
				// add other attributes you might need here
			};
		}
	}
}

// register web component as <codersrank-skills-chart> element

export default function Page() {
	return (
		<div className="flex flex-col gap-8">
			<h1 className="text-center font-bricolage text-4xl font-bold">
				Am i human? 💩
			</h1>
			{/* <Hr /> */}
			<div className="flex flex-col gap-8 md:flex-row">
				<div className="hidden  ">
					<a href="https://dly.to/oYeNtLdx9va">
						<img
							width={2000}
							className="rounded-3xl border"
							src="https://api.daily.dev/devcards/v2/3Q1RK2pWVdw7exQHPKmL2.png?r=34v&type=default"
							alt="Nischal Dahal's Dev Card"
						/>
					</a>
				</div>
				<div>
					<p className="text-[18px] first-letter:text-3xl">
						Hello, my name is{' '}
						<Highlight className="text-xl">Nischal Dahal</Highlight> . I was
						born on March 17, 2006. I am a versatile software engineer with
						expertise in full stack development and experience leading teams. My
						passions include programming, cutting-edge gadgets, and adventuring
						adventures.
					</p>
					<br />
					<p className=" text-[18px]">
						As a firm believer in transhumanism, I envision a future where
						technology alleviates human suffering and fosters a more harmonious
						world. I maintain a healthy lifestyle, free of bad habits, and am
						currently unmarried without children also single. In the long term,
						I aspire to contribute to innovative projects and initiatives that
						push the boundaries of technology, making a lasting impact on
						society and the world at large.
					</p>
				</div>
			</div>
			<br />
			{/* <img
				src="/qr.png"
				style={{ transform: rotation }}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				className="mx-auto w-1/2 transform-gpu rounded-2xl border shadow-xl transition-transform duration-200 ease-out"
				alt=""
			/> */}
			<br />
			{/* <Link to="https://profile.codersrank.io/user/broisnischal">
				<img
					src="https://cr-skills-chart-widget.azurewebsites.net/api/api?username=broisnischal"
					alt=""
					className="bg-transparent dark:hidden"
				/>
			</Link> */}
			{/* <div
				className="badge-base LI-profile-badge"
				data-locale="en_US"
				data-size="large"
				data-theme="dark"
				data-type="VERTICAL"
				data-vanity="neeswebservices"
				data-version="v1"
			>
				<a
					className="badge-base__link LI-simple-link"
					href="https://np.linkedin.com/in/neeswebservices?trk=profile-badge"
				>
					Nischal Dahal 
				</a>
			</div> */}
			<div>
				<h1 className="mb-4 font-bricolage text-3xl font-bold">Analytics</h1>

				<codersrank-skills-chart
					username="broisnischal"
					labels
					legend
					tooltip
				></codersrank-skills-chart>
			</div>
			<div>
				<h1 className="mb-4 font-bricolage text-3xl font-bold">Workings</h1>
				<codersrank-portfolio
					username="broisnischal"
					// logos
				></codersrank-portfolio>
			</div>
			<div className="flex flex-col gap-6 text-[18px]">
				<h1 className="mb-4 font-bricolage text-3xl font-bold">
					🎉 Expected working conditions
				</h1>
				<p className="">
					I am eager to continue <KBD>advancing</KBD> my IT career, focusing on
					development, and full-stack development. I am open to relocation,
					flexible work schedules, and remote work opportunities also onsite
					available on country or out of country.
				</p>
				<p>
					I value the chance to demonstrate initiative and influence the outcome
					of projects. I am enthusiastic about attending <KBD>meetups</KBD>,
					contributing to <KBD>open-source projects</KBD>, and actively
					participating in the Flutter community, web community and more.{' '}
				</p>{' '}
				<strong className="font-avenir text-red-500">
					Please note that I am not interested in working for enforcement
					agencies, dictators, or companies that contradict transhumanist values
					or cause harm to people.
				</strong>
			</div>
			<br />
			<div className="div flex flex-col gap-3">
				<h1 className="mb-2 font-bricolage text-3xl font-bold">
					💼 Experiences
				</h1>
				<Hr />
				<div className="experiences flex flex-col gap-14">
					{experiences.map((experience, i) => (
						<Experience
							key={i}
							image={experience.image}
							company={experience.company}
							headline={experience.headline}
							items={experience.items}
						/>
					))}
				</div>
			</div>
			<br />
			<div className="div flex flex-col gap-3">
				<h1 className="mb-2 font-bricolage text-3xl font-bold">💬 Languages</h1>
				<Hr />
				<ul className="flex flex-col gap-3">
					<li className="flex items-center gap-3">
						<Highlight>Nepali</Highlight> ( Native )
					</li>
					<li className="flex items-center gap-3">
						{' '}
						<Highlight>Hindi</Highlight> ( Fluent )
					</li>
					<li className="flex items-center gap-3">
						<Highlight>English</Highlight> ( Professional working )
					</li>
					<li className="flex items-center gap-3">
						<Highlight>Spanish</Highlight> ( Basic )
					</li>
				</ul>
			</div>
			<br />
		</div>
	);
}

interface Experience {
	company: string;
	headline: string;
	image?: string;
	items: ExperienceItem[];
}

type ExperienceItem = {
	title: string;
	desc: string;
	languages: string[];
};

const experiences: Experience[] = [
	{
		company: 'AITC International',
		image:
			'https://rest.techbehemoths.com/storage/images/users/main/company-avatar-664d7a2f302be-x2.png',
		headline: 'June 2022 - Present . Onsite',
		items: [
			{
				title: 'Flutter Lead Software Engineer',
				desc: 'Developed a cross platform flutter application.',
				languages: ['Flutter', 'Dart', 'TypeScript', 'Kotlin'],
			},
		],
	},
	{
		company: 'Routine of Nepal Technology',
		// image:
		// 	'https://rest.techbehemoths.com/storage/images/users/main/company-avatar-664d7a2f302be-x2.png',
		headline: 'July 2021 - May 2022 . Remote',
		items: [
			{
				title: 'Full stack developer',
				desc: 'Creation of a cross-platform marketplace truck drivers application for use internally within the company.',
				languages: [
					'GraphQL',
					'Docker',
					'Flutter',
					'Dart',
					'TypeScript',
					'Kotlin',
				],
			},
		],
	},
	{
		company: 'Vrit Technologies',
		// image:
		// 	'https://rest.techbehemoths.com/storage/images/users/main/company-avatar-664d7a2f302be-x2.png',
		headline: 'July 2020 - May 2021 . Remote',
		items: [
			{
				title: 'Digital Creator & Graphic Designer',
				desc: 'Creation of posts, and graphics that are used in social medias.',
				languages: ['Photoshop', 'Illusustrator', 'After Effect', 'Blender'],
			},
		],
	},
];

function Experience(val: Experience) {
	return (
		<div className="flex items-start gap-4 ">
			{val.image && (
				<img
					className="aspect-square w-[50px] rounded-lg"
					src={val.image}
					alt=""
				/>
			)}
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-bold">{val.company}</h1>
				<small className="text-sm text-zinc-500">{val.headline}</small>

				{val.items.map((item, i) => (
					<div key={i} className="items flex w-full flex-col gap-1">
						<h1>{item.title}</h1>
						<p className="">{item.desc}</p>
						<div className="languages flex flex-wrap items-center gap-3">
							{item.languages.map((item, index) => (
								<Highlight key={index}>{item}</Highlight>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export function Highlight({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<span
			className={twMerge(
				'font-inconsolata w-fit rounded-md border-[1px] border-zinc-300 bg-zinc-200/40 px-2 text-sm text-sm dark:border-zinc-500 dark:bg-zinc-200/10',
				className,
			)}
		>
			{children}
		</span>
	);
}

export function MySetup() {
	return (
		<div>
			<h1 className="mb-2 font-bricolage text-3xl font-bold">🧰 My Setup</h1>

			<br />
			<p>
				As a developer and tech lover in general, I use a lot of physical and
				digital stuff on a daily basis. These things serve many purposes. They
				bring me enjoyment, connect me to other people, and serve as tools that
				help me create software.
			</p>

			<br />

			<div className="flex flex-col gap-10">
				<div className="item flex flex-col gap-3">
					<h2 className="font-atkinson text-xl">Development</h2>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-3">
							ESP32 : <Highlight>ESP32-C3 DevKitC V2 | NodeMCU</Highlight>
						</li>
						<li className="flex items-center gap-3">
							RaspberryPi : <Highlight> Raspberry Pi Pico</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Arduino : <Highlight>Arduino Uno</Highlight>
						</li>

						<li className="flex items-center gap-3">
							Development Kit : <Highlight>NXP LPC55S28</Highlight>
						</li>
					</ul>
				</div>
				<div className="item flex flex-col gap-3">
					<h2 className="font-atkinson text-xl font-bold">Parts</h2>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-3">
							SSD : <Highlight>Samsung 980 PRO SSD 2TB</Highlight>
						</li>
						<li className="flex items-center gap-3">
							FAN : <Highlight>Arctic Liquid Freezer II 360</Highlight>
						</li>
					</ul>
				</div>
				<div className="item flex flex-col gap-3">
					<h2 className="font-atkinson text-xl font-bold">Periphery</h2>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-3">
							Earbud : <Highlight>Nothing Ear 2</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Keyboard : <Highlight>Reddragon K810</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Microphone : <Highlight>N/A</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Mouse : <Highlight>Razer Mouse Basilisk V3 Pro</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Chair : <Highlight>Noblechair Hero Black</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Webcam : <Highlight> Logitech C922 Pro</Highlight>
						</li>
					</ul>
				</div>
				<div className="item flex flex-col gap-3">
					<h2 className="font-atkinson text-xl font-bold">Portable</h2>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-3">
							Laptop : <Highlight>Macbook Pro M3 18GB 14" 512GB</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Phone : <Highlight>Nothing Phone 1 256GB/8GB</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Watch : <Highlight>Watch Pro 2</Highlight>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
