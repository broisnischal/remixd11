import { Link } from '@remix-run/react';
import { PostMeta } from '~/.server/posts';
import moment from 'moment';
import { Badge } from './ui/badge';

export const Post = ({ slug, frontmatter }: PostMeta) => {
	return (
		<Link prefetch="viewport" to={`/blog/${slug.split('/').pop()}`}>
			<article className="flex flex-col gap-2 rounded-md ">
				{/* bg-[#eee] dark:bg-[#0f0f0f] */}
				{frontmatter.image && (
					<div className="h-[180px] rounded-md border ">
						<img
							src={frontmatter.image}
							className="h-full w-[100%] rounded-sm object-cover"
							alt=""
						/>
					</div>
				)}
				{/* <time
					className="block text-sm text-gray-600 dark:text-white/60"
					dateTime={frontmatter.published}
				>
					Published {moment(frontmatter.published).format('MMMM Do YYYY')}
				</time> */}
				<h3 className="">{frontmatter.title}</h3>
				<p className="secondary text-sm">
					{frontmatter.description.slice(0, 100) + '...'}
				</p>
				<div className="flex flex-wrap gap-2">
					{frontmatter.tags?.map((item, i) => (
						<Badge key={i} className="rounded-md" variant={'outline'}>
							{item}
						</Badge>
					))}
				</div>
			</article>
		</Link>
	);
};
