import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Hr from '~/components/hr';
import { KBD } from '~/components/KBD';

export default function Page() {
	const [rotation, setRotation] = useState('0');

	const handleMouseMove = (e: React.MouseEvent) => {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const angleX = (y - centerY) / 10;
		const angleY = (centerX - x) / 10;

		setRotation(`rotateX(${angleX}deg) rotateY(${angleY}deg)`);
	};

	const handleMouseLeave = () => {
		setRotation('rotateX(0deg) rotateY(0deg)');
	};

	return (
		<div className="flex flex-col gap-8">
			<br />
			<h1 className="text-center text-4xl font-bold"> About Me 🐈‍</h1>
			<Hr />
			<div className="flex gap-8">
				<div className="w-[1500px]">
					<a href="https://dly.to/oYeNtLdx9va">
						<img
							src="https://api.daily.dev/devcards/v2/3Q1RK2pWVdw7exQHPKmL2.png?r=34v&type=default"
							alt="Nischal Dahal's Dev Card"
						/>
					</a>
				</div>
				<div>
					<p className="text-[18px]">
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

			<div className="flex flex-col gap-6 text-[18px]">
				<h1 className="text-3xl font-bold">🎉 Expected working conditions</h1>
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
					<strong>
						Please note that I am not interested in working for enforcement
						agencies, dictators, or companies that contradict transhumanist
						values or cause harm to people.
					</strong>
				</p>{' '}
			</div>

			<br />

			<div className="div flex flex-col gap-3">
				<h1 className="text-3xl font-bold">💬 Languages</h1>
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

			<div className="div flex flex-col gap-3">
				<h1 className="text-3xl font-bold">💼 Experiences</h1>
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
			<br />
			<MySetup />
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
				'font-inconsolata w-fit rounded-md border-[1px] border-zinc-300 bg-zinc-200/40 px-2 text-sm dark:border-zinc-500 dark:bg-zinc-200/10',
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
			<h1 className="text-3xl font-bold">🧰 My Setup</h1>

			<br />
			<p>
				As a developer and tech lover in general, I use a lot of physical and
				digital stuff on a daily basis. These things serve many purposes. They
				bring me enjoyment, connect me to other people, and serve as tools that
				help me create software.
			</p>

			<Hr />
			<div className="flex flex-col gap-10">
				<div className="item flex flex-col gap-3">
					<h2 className="font-atkinson text-xl font-bold">Development</h2>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-3 font-semibold">
							ESP32 : <Highlight>ESP32-C3 DevKitC V2 | NodeMCU</Highlight>
						</li>
						<li className="flex items-center gap-3 font-semibold">
							RaspberryPi : <Highlight> Raspberry Pi Pico</Highlight>
						</li>
						<li className="flex items-center gap-3 font-semibold">
							Arduino : <Highlight>Arduino Uno</Highlight>
						</li>

						<li className="flex items-center gap-3 font-semibold">
							Development Kit : <Highlight>NXP LPC55S28</Highlight>
						</li>
					</ul>
				</div>
				<div className="item flex flex-col gap-3">
					<h2 className="font-atkinson text-xl font-bold">Parts</h2>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-3 font-semibold">
							SSD : <Highlight>Samsung 980 PRO SSD 2TB</Highlight>
						</li>
						<li className="flex items-center gap-3 font-semibold">
							FAN : <Highlight>Arctic Liquid Freezer II 360</Highlight>
						</li>
					</ul>
				</div>
				<div className="item flex flex-col gap-3">
					<h2 className="font-atkinson text-xl font-bold">Periphery</h2>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-3 font-semibold">
							Earbud : <Highlight>Nothing Ear 2</Highlight>
						</li>
						<li className="flex items-center gap-3 font-semibold">
							Keyboard : <Highlight>Reddragon K810</Highlight>
						</li>
						<li className="flex items-center gap-3 font-semibold">
							Microphone : <Highlight>N/A</Highlight>
						</li>
						<li className="flex items-center gap-3 font-semibold">
							Mouse : <Highlight>Razer Mouse Basilisk V3 Pro</Highlight>
						</li>
						<li className="flex items-center gap-3 font-semibold">
							Chair : <Highlight>Noblechair Hero Black</Highlight>
						</li>
						<li className="flex items-center gap-3 font-semibold">
							Webcam : <Highlight> Logitech C922 Pro Stream 1080p</Highlight>
						</li>
					</ul>
				</div>
				<div className="item flex flex-col gap-3">
					<h2 className="font-atkinson text-xl font-bold">Portable</h2>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-3 font-semibold">
							Laptop : <Highlight>Macbook Pro M3 18GB 14" 512GB</Highlight>
						</li>
						<li className="flex items-center gap-3 font-semibold">
							Phone : <Highlight>Nothing Phone 1 256GB/8GB</Highlight>
						</li>
						<li className="flex items-center gap-3 font-semibold">
							Watch : <Highlight>Watch Pro 2</Highlight>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
