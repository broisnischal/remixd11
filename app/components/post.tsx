import { Link } from '@remix-run/react';
import { PostMeta } from '~/.server/posts';
import moment from 'moment';
import { Badge } from './ui/badge';

export const Post = ({ slug, frontmatter }: PostMeta) => {
	return (
		<Link prefetch="viewport" to={`/blog/${slug.split('/').pop()}`}>
			<article className="flex w-full flex-col">
				<h3 className="font-bricolage hover:underline">
					{' '}
					{/* {moment(frontmatter.published).format('MMM Do, YYYY')}{' '} */}
					<span className="">{frontmatter.title}</span>
				</h3>
				<p className="secondary mb-2 text-sm">
					{frontmatter.description.slice(0, 300) + ''}
				</p>

				<div className="flex flex-wrap gap-2">
					{frontmatter.tags?.map((item, i) => (
						<Badge
							key={i}
							className="flex items-center justify-center rounded-md border "
							variant={'outline'}
						>
							{item}
						</Badge>
					))}
				</div>
			</article>
		</Link>
	);
};
