import type { LoaderFunctionArgs } from '@remix-run/cloudflare';

import { xml } from 'remix-utils/responses';
import { getPosts } from '~/.server/posts';

// import { Article } from '~/models/article.server';
// import { Like } from '~/models/like.server';
import { Sitemap } from '~/modules/sitemap.server';
// import { database } from '~/services/db.server';

export async function loader({ request, context }: LoaderFunctionArgs) {
	let url = new URL(request.url);
	url.pathname = '';

	// let db = database(context.db);
	let sitemap = new Sitemap();

	let [blogs] = await Promise.all([
		getPosts(),
		// Tutorial.list({ db }),
		// Like.list({ db }),
	]);

	// let lastArticleDate = blogs.at(0)?.createdAt ?? new Date();
	// let lastTutorialDate = tutorials.at(0)?.createdAt ?? new Date();
	// let lastBookmarkDate = bookmarks.at(0)?.createdAt ?? new Date();

	// let lastPostDate = new Date(
	// 	Math.max(
	// 		lastArticleDate.getTime(),
	// 		lastTutorialDate.getTime(),
	// 		lastBookmarkDate.getTime(),
	// 	),
	// );

	sitemap.append(new URL('/', url), new Date());
	sitemap.append(new URL('/blog', url), new Date());
	sitemap.append(new URL('/guestbook', url), new Date());
	sitemap.append(new URL('/bookmarks', url), new Date());
	sitemap.append(new URL('/overview', url), new Date());
	sitemap.append(new URL('/hire', url), new Date());
	sitemap.append(new URL('/newsletter', url), new Date());
	sitemap.append(new URL('/chat', url), new Date());
	sitemap.append(new URL('/learning/year', url), new Date());
	// sitemap.append(new URL('/blogs', url), lastArticleDate);
	// sitemap.append(new URL('/tutorials', url), lastTutorialDate);
	// sitemap.append(new URL('/bookmarks', url), lastBookmarkDate);

	for (let blog of blogs) {
		sitemap.append(
			new URL(`/blog/${blog.slug}`, url),
			new Date(blog.frontmatter.published),
		);
	}

	// for (let tutorial of tutorials) {
	// 	sitemap.append(new URL(tutorial.pathname, url), tutorial.createdAt);
	// }

	return xml(sitemap.toString());
}
