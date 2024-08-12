import moment from 'moment';
import { Badge } from './ui/badge';
import Hr from './hr';
import { KBD } from './KBD';

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
	keywords?: string[];
}) {
	return (
		<>
			<div className="flex flex-col items-center justify-center ">
				<h2 className="balanced text-center text-6xl font-bold  ">{title}</h2>

				<small className="secondary mb-2">
					{moment(date).format('MMM Do YYYY')} | {readingTime} min | {author}
				</small>
				<div className="flex flex-wrap items-center gap-3">
					{tags?.map((item, i) => (
						// <Badge key={i + 1} className="rounded-md" variant={'outline'}>
						<KBD key={i + 1}>{item}</KBD>
						// </Badge>
					))}
				</div>
				<br />
				<Hr />
			</div>
		</>
	);
}
