import { Link } from '@remix-run/react';
import { PostMeta } from '~/.server/posts';
import moment from 'moment';
import { Badge } from './ui/badge';

export const Post = ({ slug, frontmatter }: PostMeta) => {
	return (
		<article className="flex flex-col gap-2">
			{/* <p className="font-inter text-sm text-zinc-500">
				{moment(frontmatter.published).format('MMMM Do YYYY')}
			</p> */}
			{/* <KBD>asdf</KBD> */}

			<Link prefetch="viewport" to={`/blog/${slug.split('/').pop()}`}>
				<time
					className="block text-sm text-gray-600 dark:text-white/60"
					dateTime={frontmatter.published}
				>
					<small>
						Published {moment(frontmatter.published).format('MMMM Do YYYY')}
					</small>
				</time>
				<h3 className="text-xl font-bold leading-tight hover:underline md:text-2xl">
					{frontmatter.title}
				</h3>
			</Link>
			<p className="secondary">
				{frontmatter.description.slice(0, 250) + '...'}
			</p>
			<div className="flex flex-wrap gap-2">
				{frontmatter.tags?.map((item, i) => (
					<Badge key={i} className="rounded-md" variant={'outline'}>
						{item}
					</Badge>
				))}
			</div>
		</article>
	);
};
