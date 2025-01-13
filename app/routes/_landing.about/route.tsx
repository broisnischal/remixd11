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
			<h1 className=" font-bricolage text-4xl font-bold">Am i human? 💩</h1>
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
					<p className="text-[18px]">
						Hello, my name is Nischal Dahal. I was born on March 17, 2006. I am
						a versatile software engineer with expertise in full stack
						development and experience leading teams. My passions include
						programming, cutting-edge gadgets, and adventuring adventures.
					</p>
					<br />
					<p className=" text-[18px]">
						As a firm believer in transhumanism, I envision a future where
						technology alleviates human suffering and fosters a more harmonious
						world. I maintain a healthy lifestyle, free of bad habits, and am
						currently unmarried and single. In the long term, I aspire to
						contribute to innovative projects and initiatives that push the
						boundaries of technology, making a lasting impact on society and the
						world at large.
					</p>

					<br />
					<h2 className="text-2xl font-bold">What defines me best?</h2>
					<p className="text-[18px]">
						I love to publish npm packages, jsr packages, create vscode
						extension, flutter packages, make figma plugin, prisma extension,
						loves to do type challanges, create ai stuffs, create content and
						shorts videos, using aws for fun loves deployment and coolify, loves
						creating and learn core concepts, with Rust, Go, zig! Learning AI
						and ML in free time.
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
				<h1 className=" font-bricolage text-3xl font-bold">💼 Experiences</h1>
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
				<ul className="flex flex-col gap-1">
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
				title: 'Full stack Developer | Software Engineer',
				desc: '',
				languages: [
					'Flutter',
					'Rust',
					'Python',
					'Dart',
					'TypeScript',
					'Kotlin',
				],
			},
		],
	},
	{
		company: 'Routine of Nepal Technology',
		image:
			'https://digitalgandaki.com/wp-content/uploads/2022/12/FB_IMG_1672128647897.jpg',
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
		image:
			'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSqvol4HRBHfwbi_hSF9AZWgA-xpiywKL8hg&s',
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
				<div className="flex aspect-square w-[70px] items-center justify-center rounded-lg border-2 bg-white p-1">
					<img
						className="w-[50px] object-cover object-center"
						src={val.image}
						alt=""
					/>
				</div>
			)}
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-bold">{val.company}</h1>
				<small className="text-sm text-zinc-500">{val.headline}</small>

				{val.items.map((item, i) => (
					<div key={i} className="items flex w-full flex-col gap-1">
						<h1>{item.title}</h1>
						<p className="">{item.desc}</p>
						<div className="languages mt-2 flex flex-wrap items-center gap-3">
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
				'w-fit rounded-md border-[1px] border-zinc-300 bg-zinc-200/40 px-2 font-inconsolataπ text-sm dark:border-zinc-500 dark:bg-zinc-200/10',
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
			<p className="font-bricolage text-[1.2rem]">
				As a developer and tech enthusiasts in general, I use a lot of physical
				and digital stuff on a daily basis. These things serve many purposes.
				They bring me enjoyment, connect me to other people, and serve as tools
				that help me create software, and content.
			</p>

			<br />

			<div className="flex flex-col gap-10">
				<div className="item flex flex-col gap-3">
					<h2 className="font-atkinson text-xl font-bold">Development</h2>
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
				<div className="item flex  flex-col gap-3">
					<h2 className="font-atkinson text-xl font-bold">Periphery</h2>
					<ul className="flex flex-col gap-2 font-sans [&>li>span>a]:underline [&>li]:font-avenir">
						<li className="flex items-center gap-3">
							Earbud :{' '}
							<Highlight>
								<Link
									className="underline"
									to={'https://intl.nothing.tech/products/ear-2'}
								>
									Nothing Ear 2
								</Link>
							</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Keyboard :{' '}
							<Highlight>
								<Link
									to={
										'https://www.amazon.com/Redragon-Keyboard-Mechanical-Software-Supported/dp/B09BVCVTBC'
									}
								>
									Reddragon K617
								</Link>{' '}
							</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Microphone :{' '}
							<Highlight>
								<Link
									to={
										'https://samsontech.com/products/microphones/usb-microphones/c01upro/'
									}
								>
									Samsontech C01U Pro
								</Link>
							</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Headset :{' '}
							<Highlight>
								<Link
									to={
										'https://www.redragonzone.com/collections/headset/products/h510-zeus-x-rgb-wireless-gaming-headset'
									}
								>
									Redragon H510
								</Link>
							</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Mouse :{' '}
							<Highlight>
								<Link
									to={
										'https://www.razer.com/gaming-mice/razer-deathadder-v2-x-hyperspeed'
									}
								>
									Razer Deathadder V2
								</Link>
							</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Chair :{' '}
							<Highlight>
								<Link
									to={
										'https://www.avinyastore.com/product/ergonomics-office-chair-s121'
									}
								>
									Ergonomic S121T
								</Link>
							</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Webcam : <Highlight> N/A</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Desk :{' '}
							<Highlight>
								{' '}
								<Link to={'https://www.instagram.com/p/C2JjnddNqPc/?hl=en'}>
									Pirka
								</Link>{' '}
							</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Polishing Cloth :{' '}
							<Highlight>
								{' '}
								<Link
									to={
										'https://www.apple.com/in/shop/product/MW693ZM/A/polishing-cloth'
									}
								>
									Apple Polishing Cloth
								</Link>{' '}
							</Highlight>
						</li>
					</ul>
				</div>
				<div className="item flex flex-col gap-3">
					<h2 className="font-atkinson text-xl font-bold">Portable</h2>
					<ul className="flex flex-col gap-3">
						<li className="flex items-center gap-3">
							Laptop :{' '}
							<Highlight>
								<Link to={'https://www.apple.com/shop/buy-mac/macbook-pro'}>
									Macbook Pro M3 18GB 14" 512GB
								</Link>
							</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Phone : <Highlight>Nothing Phone 1 256GB/12GB</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Phone 2: <Highlight>Poco X6 5G</Highlight>
						</li>
						<li className="flex items-center gap-3">
							Phone Cover :{' '}
							<Highlight>
								<Link
									to={
										'https://www.flipkart.com/spigen-ultra-hybrid-back-cover-nothing-phone-1/p/itm37b7af96c7029?pid=ACCGHYGPQA7FPG8S&lid=LSTACCGHYGPQA7FPG8S3POHVU&marketplace=FLIPKART&q=spigen+nothing&store=tyy&srno=s_1_8&otracker=search&otracker1=search&fm=organic&iid=6ea97bd4-9180-495a-9de1-6577c4fbc6d6.ACCGHYGPQA7FPG8S.SEARCH&ppt=hp&ppn=homepage&ssid=n3ljfmyy2o0000001730883510300&qH=26b381f6e5fda5d6'
									}
								>
									Spigen Ultra Hybrid
								</Link>
							</Highlight>
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
