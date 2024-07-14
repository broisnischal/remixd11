import {
	vitePlugin as remix,
	cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import svgr from 'vite-plugin-svgr';
import { flatRoutes } from 'remix-flat-routes';

import tsconfigPaths from 'vite-tsconfig-paths';

import { getLoadContext } from './load-context';

export default defineConfig({
	plugins: [
		remixCloudflareDevProxy({ getLoadContext }),
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			rehypePlugins: [rehypePrettyCode],
		}),
		svgr(),

		remix({
			future: {
				unstable_singleFetch: true,
				// v3_fetcherPersist: true,
				// v3_relativeSplatPath: true,
				// v3_throwAbortReason: true,
			},
			routes(defineRoutes) {
				return flatRoutes('routes', defineRoutes);
			},
		}),

		tsconfigPaths(),
	],
	// server: {},
});
