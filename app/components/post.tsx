import { Link } from '@remix-run/react';
import { PostMeta } from '~/.server/posts';
import { format } from 'timeago.js';
import moment from 'moment';
import { Badge } from './ui/badge';

export const Post = ({ slug, frontmatter }: PostMeta) => {
	return (
		<article className="space-y-1">
			{/* <p className="font-inter text-sm text-zinc-500">
				{moment(frontmatter.published).format('MMMM Do YYYY')}
			</p> */}
			<time
				className="block text-sm text-gray-600 dark:text-white/60"
				dateTime={frontmatter.published}
			>
				Published {format(frontmatter.published.replace(/-/g, '/'), 'en_US')}
			</time>

			<Link to={`/blog/${slug.split('/').pop()}`}>
				<h3 className="text-xl font-bold hover:underline">
					{frontmatter.title}
				</h3>
			</Link>
			<p className="text-gray-600 dark:text-gray-200">
				{frontmatter.description}
			</p>

			<div className="flex flex-wrap gap-1">
				{frontmatter.tags?.map(item => (
					<Badge className="rounded-md" variant={'secondary'}>
						{item}
					</Badge>
				))}
			</div>
		</article>
	);
};
