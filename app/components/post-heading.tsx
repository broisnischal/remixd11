import moment from 'moment';
import { Badge } from './ui/badge';
import Hr from './hr';
import { KBD } from './KBD';
import { Link } from '@remix-run/react';
import { ArrowLeft } from 'lucide-react';
import { Highlight } from '~/routes/_landing.about/route';

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
			<div className="flex flex-col gap-1 ">
				<h2 className="font-sans">{title}</h2>
				<div className=" flex flex-wrap items-center gap-2">
					{tags?.map((item, i) => (
						<Highlight className="font-reader lowercase">{item}</Highlight>
					))}
				</div>

				<small className="mb-2 flex h-[40px] items-center gap-2 text-primary">
					{moment(date).format('MMM Do YYYY')} | {readingTime} min read |
					Written by{' '}
					<img
						src="https://avatars.githubusercontent.com/u/98168009?v=4"
						className="aspect-square w-5 rounded-full"
					/>{' '}
					<a
						href="https://x.com/broisnees"
						className="no-underline"
						target="_blank"
					>
						<span className="font-mono">{author}</span>
					</a>
				</small>

				{/* <Link
					className="items-center self-start font-avenir text-sm font-normal no-underline"
					to={'/blog'}
				>
					<ArrowLeft className="h-5 w-5" />
				</Link>
				<br /> */}
			</div>
		</>
	);
}
