import {
	vitePlugin as remix,
	cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev';
import { defineConfig } from 'vite';

import mdx from '@mdx-js/rollup';
import rehypePrettyCode, { Options } from 'rehype-pretty-code';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import rehypeShiki from '@shikijs/rehype';
import { getLoadContext } from './load-context';

export default defineConfig({
	plugins: [
		remixCloudflareDevProxy({ getLoadContext }),
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			rehypePlugins: [rehypePrettyCode, rehypeShiki],
		}),
		// markdown({
		// 	mode: [Mode.MARKDOWN, Mode.REACT, Mode.TOC],
		// }),
		svgr(),
		remix({
			future: {
				unstable_singleFetch: true,
			},
		}),
		tsconfigPaths(),
	],
	server: {},
});
