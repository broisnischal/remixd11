import { Link } from '@remix-run/react';
import { PostMeta } from '~/.server/posts';
import moment from 'moment';
import { Badge } from './ui/badge';

export const Post = ({ slug, frontmatter }: PostMeta) => {
	return (
		<Link
			prefetch="viewport"
			className=""
			to={`/blog/${slug.split('/').pop()}`}
		>
			<article className=" group flex w-full flex-col">
				<h3 className="font-sans underline-offset-4 opacity-80 group-[&:hover]:opacity-100">
					<span className="">{frontmatter.title}</span>
				</h3>
				<p className="secondary font-reader text-sm">
					{frontmatter.description.slice(0, 300) + ''}
				</p>
				<div className="mt-2 flex flex-wrap gap-2">
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
