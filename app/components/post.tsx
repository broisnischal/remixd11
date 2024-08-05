import { Link } from '@remix-run/react';
import { PostMeta } from '~/.server/posts';
import { format } from 'timeago.js';
import moment from 'moment';
import { Badge } from './ui/badge';

export const Post = ({ slug, frontmatter }: PostMeta) => {
	return (
		<article className="flex flex-col gap-1 space-y-1">
			{/* <p className="font-inter text-sm text-zinc-500">
				{moment(frontmatter.published).format('MMMM Do YYYY')}
			</p> */}
			<time
				className="block text-sm text-gray-600 dark:text-white/60"
				dateTime={frontmatter.published}
			>
				<small>
					Published {format(frontmatter.published.replace(/-/g, '/'), 'en_US')}
				</small>
			</time>

			<Link to={`/blog/${slug.split('/').pop()}`}>
				<h3 className="text-xl font-bold leading-tight hover:underline">
					{frontmatter.title}
				</h3>
			</Link>
			<p className="secondary">{frontmatter.description}</p>
			<div className="flex flex-wrap gap-2">
				{frontmatter.tags?.map((item, i) => (
					<Badge key={i} variant={'outline'}>
						{item}
					</Badge>
				))}
			</div>
		</article>
	);
};
