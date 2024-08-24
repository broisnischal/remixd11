import moment from 'moment';
import { Badge } from './ui/badge';
import Hr from './hr';
import { KBD } from './KBD';
import { Link } from '@remix-run/react';
import { ArrowLeft } from 'lucide-react';

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
			<div className="flex flex-col items-center gap-2  ">
				<h2 className="balanced text-center font-bricolage text-2xl font-semibold  ">
					{title}
				</h2>

				<small className="secondary mb-2 font-avenir">
					{moment(date).format('MMM Do YYYY')} | {readingTime} min | {author}
				</small>
				<div className="flex flex-wrap items-center gap-3">
					{tags?.map((item, i) => (
						<KBD className="font-bricolage lowercase" key={i + 1}>
							{item}
						</KBD>
					))}
				</div>
				<Link
					className="items-center self-start font-avenir text-sm font-normal no-underline"
					to={'/blog'}
				>
					<ArrowLeft className="h-5 w-5" />
				</Link>
				<br />
			</div>
		</>
	);
}
