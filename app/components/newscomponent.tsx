import { History } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { format } from 'timeago.js';

export default function NewsComponent({
	...props
}: {
	date: string;
	title: string;
	body: string;
	image?: string[];
	alt?: string;
	width?: number;
}) {
	return (
		<div className="group relative py-10 pl-8 sm:pl-32">
			<div className=" font-atkinson text-xl font-bold  sm:mb-0">
				{props.title}
			</div>

			<div className="mb-1 flex flex-col items-start before:absolute before:left-2 before:h-full before:-translate-x-1/2 before:translate-y-3 before:self-start before:bg-[#d1d1d1] before:px-px after:absolute after:left-2 after:box-content after:h-2 after:w-2 after:-translate-x-1/2 after:translate-y-1.5 after:rounded-full after:border-4 after:border-slate-50    after:bg-[#d1d1d1] group-last:before:hidden dark:before:bg-[#3d3d3d]   dark:after:bg-[#3d3d3d] sm:flex-row sm:before:left-0 sm:before:ml-[6.5rem] sm:after:left-0 sm:after:ml-[6.5rem]">
				<time className="-left-8 mb-3 inline-flex h-6 w-28 translate-y-0.5 items-center  justify-center  whitespace-nowrap  rounded-full bg-[#3d3d3d]/50 text-xs font-semibold text-white sm:absolute sm:mb-0">
					<History className="mr-1" size={15} />
					{format(props.date)}
				</time>

				{props.alt && <div className=" secondary text-sm ">{props.alt}</div>}
			</div>

			{props.image ? (
				props.image.length > 0 ? (
					<div className="w-full">
						<p>{props.body}</p>
						<div className="mt-2 flex w-full gap-4">
							{props.image.map((item, index) => (
								<img
									key={index}
									className={twMerge(
										'aspect-square  rounded border bg-gray-200',
										props.width ? `w-[100px]` : 'w-[200px]',
									)}
									src={item}
									alt="test"
								/>
							))}
						</div>
					</div>
				) : (
					<p>{props.body}</p>
				)
			) : (
				<p>{props.body}</p>
			)}
		</div>
	);
}
