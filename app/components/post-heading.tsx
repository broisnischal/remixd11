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
			<div>
				<h2 className="text-3xl	 font-bold ">{title}</h2>

				<p className="secondary text-sm">
					Published on {moment(date).format('MMMM Do YYYY')} with {readingTime}{' '}
					minutes reading time by {author}
				</p>
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
