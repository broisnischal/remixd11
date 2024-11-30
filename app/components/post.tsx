import { Link } from '@remix-run/react';
import { PostMeta } from '~/.server/posts';
import moment from 'moment';
import { Badge } from './ui/badge';

export const Post = ({ slug, frontmatter }: PostMeta) => {
	return (
		<Link prefetch="viewport" to={`/blog/${slug.split('/').pop()}`}>
			<article className=" flex w-full flex-col gap-2">
				<h3 className="font-sans">
					<span className="">{frontmatter.title}</span>
				</h3>
				<p className="secondary font-reader text-sm">
					{frontmatter.description.slice(0, 300) + ''}
				</p>
				<div className="flex flex-wrap gap-2">
					{frontmatter.tags?.map((item, i) => (
						<Badge
							key={i}
							className="flex items-center justify-center rounded-md border font-mono "
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
