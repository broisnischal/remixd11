import { Link } from '@remix-run/react';
import { PostMeta } from '~/.server/posts';
import { format } from 'timeago.js';

export const Post = ({ slug, frontmatter }: PostMeta) => {
	return (
		<article className="space-y-2 border-l-2 p-4">
			<Link to={`/blog/${slug}`}>
				<h3 className="text-3xl font-bold">{frontmatter.title}</h3>
			</Link>
			<p className="text-gray-600 dark:text-gray-200">
				{frontmatter.description}
			</p>
			<time
				className="block text-sm text-cyan-700 "
				dateTime={frontmatter.published}
			>
				{format(frontmatter.published.replace(/-/g, '/'), 'en_US')}
			</time>
		</article>
	);
};
