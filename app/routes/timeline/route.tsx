import { MetaFunction } from '@remix-run/cloudflare';
import moment from 'moment';
import { useEffect, useState } from 'react';
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
				name: 'author',
				content: 'Nischal Dahal',
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
		return 'dark:bg-white bg-black border border-black dark:border-white'; // Special background for weeks with memory
	} else if (weekIndex < currentWeek) {
		return 'bg-[#30a14e] ';
	} else if (weekIndex === currentWeek) {
		return 'bg-red-400';
	} else {
		return 'bg-slate-400/50 dark:bg-slate-100/20 ';
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
		<div>
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

			<div className="grid grid-cols-[repeat(52,1fr)] gap-1">
				{Array.from({ length: totalWeeks }).map((_, i) => {
					const memory = memories.find(m => m.weekIndex === i);
					return (
						<div
							key={i}
							className={`h-2 w-2 ${getWeekClass(i)}`}
							onMouseEnter={
								memory ? e => handleMouseEnter(e, memory) : undefined
							}
							onMouseLeave={handleMouseLeave}
						></div>
					);
				})}
			</div>
			<Popup memory={hoveredMemory} position={popupPosition} />

			<p className="my-2 text-zinc-700 dark:text-zinc-100">
				<small>Weeks lived: {weeksLived}</small>
				<br />
				This is my weeks of life, where green represents weeks that i lived.
			</p>
		</div>
	);
}

interface PopupProps {
	memory: string | null;
	position: { top: number; left: number };
}

const Popup: React.FC<PopupProps> = ({ memory, position }) => {
	if (!memory) return null;

	return (
		<div
			className="absolute rounded border bg-white px-3 text-[12px] text-black shadow-lg"
			style={{ top: position.top, left: position.left }}
		>
			{memory}
		</div>
	);
};
