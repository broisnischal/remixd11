import moment from 'moment';
import { Badge } from './ui/badge';

export default function PostHeading({
	title,
	readingTime,
	tags,
	date,
	author,
}: {
	title: string;
	readingTime: string;
	tags: string[];
	date: string;
	author?: string;
}) {
	return (
		<>
			<div>
				<h2 className="text-sm font-bold leading-none">{title}</h2>

				<p className="text-sm text-zinc-500 dark:text-gray-200">
					Published on {moment(date).format('MMMM Do YYYY')} with {readingTime}{' '}
					minutes reading time by {author}
				</p>
				<div className="flex flex-wrap items-center gap-1">
					{tags?.map((item, i) => (
						<Badge key={i + 1} className="rounded-md" variant={'secondary'}>
							{item}
						</Badge>
					))}
				</div>
			</div>
		</>
	);
}
