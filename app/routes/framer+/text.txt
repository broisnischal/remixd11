import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { useState } from 'react';
import {
	startOfYear,
	startOfMonth,
	endOfMonth,
	subDays,
	addDays,
	endOfYear,
	eachDayOfInterval,
	format,
	getDay,
	formatDate,
} from 'date-fns';
import { useDrag } from '@use-gesture/react';

// Define the type for a single day object
interface Day {
	day: string;
	month: string;
	year: string;
	weekday: number; // Sunday: 0, Monday: 1, ..., Saturday: 6
}

type YearCalendar = Record<string, Day[]>;

const generateYearCalendarByMonthWithWeeks = (year: number): YearCalendar => {
	const yearCalendar: YearCalendar = {};

	for (let month = 0; month < 12; month++) {
		const startDate = startOfMonth(new Date(year, month));
		const endDate = endOfMonth(new Date(year, month));

		const firstDayOfMonth = getDay(startDate);
		const lastDayOfMonth = getDay(endDate);

		// Days to add from previous month to complete the week
		const startWeekPadding = subDays(startDate, firstDayOfMonth);

		// Days to add from next month to complete the week
		// const endWeekPadding = addDays(endDate, 6 - lastDayOfMonth);
		const endWeekPadding = endDate;

		const daysInMonthInterval = eachDayOfInterval({
			start: startWeekPadding,
			end: endWeekPadding,
		});

		const daysInMonth = daysInMonthInterval.map(date => {
			const inCurrentMonth = date.getMonth() === month;

			return {
				day: format(date, 'dd'),
				month: format(date, 'MM'),
				year: format(date, 'yyyy'),
				weekday: getDay(date), // 0 (Sunday) to 6 (Saturday)
				inCurrentMonth,
			} as Day;
		});

		const monthKey = format(startDate, 'MM');
		yearCalendar[monthKey] = daysInMonth;
	}

	return yearCalendar;
};

export default function Page() {
	const [isOpen, setIsOpen] = useState(false);
	const currentYear = new Date().getFullYear();
	const calendarByMonth = generateYearCalendarByMonthWithWeeks(currentYear);
	console.log(calendarByMonth);
	const [calendar, setCalendar] = useState(
		generateYearCalendarByMonthWithWeeks(currentYear),
	);

	interface Notification {
		id: string;
		content: string;
	}

	const messages: Notification[] = [
		{ id: '1', content: 'Message 1' },
		{ id: '2', content: 'Message 2' },
		{ id: '3', content: 'Message 3' },
	];

	const bind = useDrag(({ down, movement: [mx, my] }) => {
		if (!down) {
			if (Math.abs(mx) > Math.abs(my)) {
				if (mx > 0) {
					console.log('Dragged Right');
				} else {
					console.log('Dragged Left');
				}
			} else {
				if (my > 0) {
					console.log('Dragged Down');
				} else {
					console.log('Dragged Up');
				}
			}
		}
	});

	const daysofweek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	const [message, setMessage] = useState<Notification[]>([...messages]);

	console.log(calendarByMonth);

	const cucrrentMonth = format(new Date(), 'MM');

	return (
		<div>
			<h1>Day 1 Challange</h1>
			<div className="div flex select-none items-center justify-center">
				<MotionConfig transition={{ duration: 0.3, type: 'spring', bounce: 0 }}>
					{Object.entries(calendar).map(
						([month, days]) =>
							month === cucrrentMonth && (
								<motion.div
									// key={month}
									layout
									className="flex aspect-square items-center justify-center rounded-lg border-2 p-5 "
								>
									{/* <h1>{month}</h1> */}
									<div {...bind()} className="grid grid-cols-7  gap-2">
										{daysofweek.map(day => (
											<motion.div
												key={day}
												layout
												className={` ${day === 'Sun' ? '' : ''}`}
											>
												<h2
													className={`aspect-square text-center tracking-tight text-slate-400`}
												>
													{day.slice(0, 1)}
												</h2>
											</motion.div>
										))}
										{days.map(day => (
											<motion.div
												key={day.day}
												layout
												className={` ${day.weekday === 0 ? '' : ''} grid h-[2rem] w-[2rem] place-content-center  `}
											>
												<div className="h-[10px] w-[10px] rounded-full bg-slate-200"></div>

												{/* <h2 className={`aspect-square tracking-tight`}>
													{day.day}
												</h2> */}
											</motion.div>
										))}
									</div>
								</motion.div>
							),
					)}

					{/* <motion.div className="w-1/3 rounded-lg bg-slate-50 p-5 ">
						<h1>Main</h1>

						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Praesentium, doloremque.
						</p>
						<AnimatePresence mode="popLayout">
							<div className="flex font-bold">
								<motion.h2 layoutId="h2-layout" className={`tracking-tight`}>
									Rabbit R1
								</motion.h2>

								{isOpen && (
									<motion.h2 layoutId="h2-layout" className={` text-center`}>
										Rabbit R1
									</motion.h2>
								)}
							</div>
						</AnimatePresence>
						<button onClick={() => setIsOpen(!isOpen)}>View Details</button>
					</motion.div> */}

					{/* <AnimatePresence>
						{isOpen && (
							<motion.div
								key="modal"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							/>
						)}
					</AnimatePresence> */}
				</MotionConfig>
				{/* <button
					onClick={() =>
						setMessage([...message, { id: '4', content: 'Message 4' }])
					}
				>
					Add Notification
				</button> */}
			</div>
			{/* <Notifications messages={message} /> */}
		</div>
	);
}

// export const Notifications = ({
// 	messages,
// }: {
// 	messages: { id: string; content: string }[];
// }) => (
// 	<AnimatePresence>
// 		{messages.map(({ id, content }) => (
// 			<motion.li
// 				key={id}
// 				animate={{ opacity: 1, zoom: 1 }}
// 				transition={{ duration: 0.3, type: 'spring', bounce: 0 }}
// 				exit={{ opacity: 0 }}
// 			>
// 				{content}
// 			</motion.li>
// 		))}
// 	</AnimatePresence>
// );
