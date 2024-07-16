import { Link } from '@remix-run/react';
import { PostMeta } from '~/.server/posts';
import { format } from 'timeago.js';

export const Post = ({ slug, frontmatter }: PostMeta) => {
	return (
		<article className="space-y-2 ">
			<Link to={`/blog/${slug}`}>
				<h3 className="text-3xl font-bold hover:underline">
					{frontmatter.title}
				</h3>
			</Link>
			<p className="text-gray-600 dark:text-gray-200">
				{frontmatter.description}
			</p>
			<time
				className="block text-sm text-gray-600 dark:text-white/60"
				dateTime={frontmatter.published}
			>
				{format(frontmatter.published.replace(/-/g, '/'), 'en_US')}
			</time>
		</article>
	);
};
