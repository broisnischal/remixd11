import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

import { xml } from 'remix-utils/responses';
import { getPosts } from '~/.server/posts';

// import { Article } from '~/models/article.server';
import { RSS } from '~/modules/rss.server';
// import { Logger } from '~/modules/logger.server';
// import { database } from '~/services/db.server';

export async function loader({ request, context }: LoaderFunctionArgs) {
	// void new Logger(context).http(request);
	const url = new URL(request.url);

	// let db = database(context.db);
	// let articles = await Article.list({ db });

	let posts = await getPosts();

	let rss = new RSS({
		title: 'Blogs by Nischal Dahal',
		description: 'The complete list of articles wrote by @broisnees.',
		link: 'https://nischal-dahal.com.np/blogs.rss',
	});

	for (let article of posts) {
		// let link = new URL(`/blog/${article.slug}`, ).toString();
		let link = `${url.host}/blog/${article.slug}`;
		rss.addItem({
			guid: article.slug,
			title: article.slug.replace(/-/g, ' '),
			description: `${article.frontmatter.description}\n<a href="${link}">Read it on the web</a>`,
			link,
			pubDate: new Date(article.frontmatter.published).toUTCString(),
		});
	}

	return xml(rss.toString());
}
