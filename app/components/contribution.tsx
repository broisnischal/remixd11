import { cn } from '~/lib/utils';
import { twMerge } from 'tailwind-merge';
import moment from 'moment';

interface IndividualContributionProps {
	className?: string;
	item: {
		date: string;
		count: number;
		level: number;
	};
}

export const ContributionBox = ({
	className,
	item: { date, count, level },
}: IndividualContributionProps) => {
	const isStartOfMonth = date.endsWith('-01');
	const monthNameShort = isStartOfMonth
		? new Date(date).toLocaleString('en', { month: 'short' })
		: '';

	return (
		<div className="">
			<div
				className={cn(
					' group relative h-[10px] w-[10px] cursor-auto rounded-[2px] outline-offset-[-1px]  [outline:1px_solid_#1b1f230f]  ',
					level === 0 && 'bg-[#ebedf0] dark:bg-[#161b22]',
					level === 1 && 'bg-[#9be9a8] dark:bg-[#0e4429]',
					level === 2 && 'bg-[#40c463] dark:bg-[#006d32]',
					level === 3 && 'bg-[#30a14e] dark:bg-[#26a641]',
					level === 4 && 'bg-[#216e39] dark:bg-[#39d353]',
					className,
				)}
			>
				<div
					className={twMerge(
						`absolute left-[50%] top-[-35px] z-10 hidden translate-x-[-50%] cursor-pointer rounded-[3px] bg-secondary px-1 py-1 text-center text-sm group-hover:flex group-hover:items-center group-hover:justify-center ${
							count === 0 ? 'min-w-[200px]' : 'min-w-[200px]'
						}`,
					)}
				>
					{count === 0
						? `No contributions on ${moment(date).format('MMM Do')}`
						: `${count} contributions on ${moment(date).format('MMM Do')}`}
				</div>
			</div>
			<div className="absolute top-[-20px]">{monthNameShort}</div>
		</div>
	);
};

// olor-calendar-graph-day-L1-bg: ;
//     --color-calendar-graph-day-L2-bg: ;
//     --color-calendar-graph-day-L3-bg: #26a641;
//     --color-calendar-graph-day-L4-bg: #39d353;
