import { MetaFunction } from '@remix-run/cloudflare';
import moment from 'moment';
import { useEffect, useState } from 'react';
import NewsComponent from '~/components/newscomponent';
import { MetaCreator } from '~/utils/meta';

export const meta: MetaFunction = ({ data, matches, location }) => {
	const url = new URL('https://nischal-dahal.com.np');

	const metadata = MetaCreator({
		title: `Nischal Dahal | Death timeline `,
		description: `Nischal Dahal's death timeline, from ${currentAge} to ${expectedAge}.`,
		image: '/ogimg.png',
		url: `${url.origin}${location.pathname}`,
		others: [
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

const currentAge = 18;
const expectedAge = 65;
const weeksPerYear = 52;
const totalWeeks = expectedAge * weeksPerYear;

const weeksLived = currentAge * weeksPerYear;

const birthDate = moment().subtract(currentAge, 'years');

interface Memory {
	weekIndex: number;
	description: string;
}

const memories: Memory[] = [
	{ weekIndex: 800, description: 'Started loving technology.' },
	{ weekIndex: 884, description: 'Graduated from high school' },
	// Add more memories as needed
];

// const getWeekClass = (weekIndex: number) => {
// 	const currentWeek = weeksLived; // This can be more dynamic based on current date
// 	if (weekIndex < currentWeek) {
// 		return 'bg-[#30a14e] ';
// 	} else if (weekIndex === currentWeek) {
// 		return 'bg-red-400';
// 	} else {
// 		return 'bg-slate-100/20 ';
// 	}
// };

const getWeekClass = (weekIndex: number) => {
	const currentWeek = weeksLived; // This can be more dynamic based on current date
	const memory = memories.find(m => m.weekIndex === weekIndex);

	if (memory) {
		return 'bg-[#5d5d5d]'; // Special background for weeks with memory
	} else if (weekIndex < currentWeek) {
		return 'bg-[#888888] dark:bg-[#3d3d3d]';
	} else if (weekIndex === currentWeek) {
		return 'bg-[#6d6d6d] dark:bg-[#e7e7e7]';
	} else {
		return 'bg-[#e7e7e7] dark:bg-[#000000]';
	}
};

const getDateForWeek = (weekIndex: number) => {
	return birthDate.clone().add(weekIndex, 'weeks').format('MMMM Do YYYY');
};

export default function Page() {
	// let current_age = 18;
	// let expected_age = 65;
	// let weeks_per_year = 52;

	// const total_weeks = expected_age * weeks_per_year;
	// const weeks_lived = current_age * weeks_per_year;
	// const remaining_weeks = (expected_age - current_age) * weeks_per_year;

	const [time, setTime] = useState(new Date());
	const [hoveredMemory, setHoveredMemory] = useState<string | null>(null);
	const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const handleMouseEnter = (
		event: React.MouseEvent<HTMLDivElement>,
		memory: Memory,
	) => {
		setHoveredMemory(memory.description);
		setPopupPosition({ top: event.clientY, left: event.clientX });
	};

	const handleMouseLeave = () => {
		setHoveredMemory(null);
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<h1 className="mb-4 text-2xl font-semibold">Timeline of my death</h1>
				<p>
					<span>🚀 </span>
					<span>{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</span>
					{/* <br />
				<span>
					<small> {moment().add(weeksLived, 'weeks').fromNow()}</small>
				</span> */}
				</p>
			</div>

			<div className="grid grid-flow-row-dense grid-cols-[repeat(52,1fr)] gap-1">
				{Array.from({ length: totalWeeks }).map((_, i) => {
					const memory = memories.find(m => m.weekIndex === i);
					return (
						<div
							key={i}
							className={`h-[10px] w-[10px] ${getWeekClass(i)}`}
						></div>
					);
				})}
			</div>

			{/* <p className="my-2 text-zinc-700 dark:text-zinc-100">
				<br />
				This is my weeks of life, where green represents weeks that i lived.
			</p> */}

			<h2 className="text-xl">Weeks lived: {weeksLived}</h2>

			<div className="m-auto my-24 w-[90%] ">
				<h2 className="text-3xl font-bold">🫧 Life Journey</h2>

				{dummyValue.map((item, index) => (
					<NewsComponent key={index} {...item} />
				))}
			</div>
		</div>
	);
}

// interface PopupProps {
// 	memory: string | null;
// 	position: { top: number; left: number };
// }

// const Popup: React.FC<PopupProps> = ({ memory, position }) => {
// 	if (!memory) return null;

// 	return (
// 		<div
// 			className="absolute rounded border bg-white px-3 text-[12px] text-black shadow-lg"
// 			style={{ top: position.top, left: position.left }}
// 		>
// 			{memory}
// 		</div>
// 	);
// };

interface Events {
	date: string;
	title: string;
	body: string;
	alt?: string;
	image?: string[];
	width?: number;
}

const dummyValue: Events[] = [
	{
		date: '2022-05-15',
		title: 'Started full time as Software Engineer	',
		body: 'Landed my first job at AITC International, where I worked on various backend technologies and honed my skills.',
		// image: ['https://picsum.photos/200/300'],
	},
	{
		date: '2022-05-20',
		title: 'Graduated from high school',
		body: 'Graduated from high school in 2022. I am currently pursuing my Masters in Computer Science.	',
		// image: ['https://picsum.photos/200/300?random=1'],
	},
	{
		date: '2021-01-20',
		title: 'Shifted to Kathmandu',
		body: 'Shifted to Kathmandu, to further continue my education and journey.',
		image: ['me.jpg'],
		width: 100,
		alt: 'Pictured clicked when having launch at Mude.',
	},
	{
		date: '2022-01-01',
		title: 'Founded Routine of Nepal Technology',
		body: 'Founded and worked on the RONT, as content creator and digital influencer.',
		alt: 'Some of the images of the RONT',
		image: [
			'https://nischaldahal.vercel.app/_next/image?url=%2Fdesigns%2Fcode.jpg&w=3840&q=75',
			'https://nischaldahal.vercel.app/_next/image?url=%2Fdesigns%2Fd43.jpg&w=3840&q=75',
		],
	},

	{
		date: '2016-01-01',
		title: 'Techonology Worm',
		body: 'Started involving in techonology, with experties and keen to learning, and being creative, learning about Editing, Game Development, Web development, and more.',
	},
	{
		date: '2006-03-17',
		title: 'Borned',
		body: ' Borned in Mainapokhari, Dolakha.',
		// image: ['https://picsum.photos/200/300?random=1'],
	},
];
