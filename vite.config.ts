import {
	vitePlugin as remix,
	cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev';
import { defineConfig } from 'vite';

import tsconfigPaths from 'vite-tsconfig-paths';
import { getLoadContext } from './load-context';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypePrettyCode from 'rehype-pretty-code';
import { Mode, plugin as markdown } from 'vite-plugin-markdown';

export default defineConfig({
	plugins: [
		remixCloudflareDevProxy({ getLoadContext }),
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			rehypePlugins: [rehypePrettyCode],
		}),
		// markdown({
		// 	mode: [Mode.MARKDOWN, Mode.REACT, Mode.TOC],
		// }),
		remix({
			future: {
				unstable_singleFetch: true,
			},
		}),
		tsconfigPaths(),
	],
	server: {},
});
