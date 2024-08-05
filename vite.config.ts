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
import rehypePrism from 'rehype-prism';

import tsconfigPaths from 'vite-tsconfig-paths';

// import 'prismjs/themes/prism-coy.css';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import { vitePluginUnified } from 'vite-plugin-unified';
import { unified } from 'unified';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';

import { getLoadContext } from './load-context';
import { visit } from 'unist-util-visit';
import { transformerCopyButton } from '@rehype-pretty/transformers';

import { BundledTheme, codeToHtml } from 'shiki';

// const code = await codeToHtml('console.log("Hello World")', {
// 	lang: 'ts',
// 	theme: 'vitesse-light',
// 	transformers: [
// 		transformerCopyButton({
// 			visibility: 'always',
// 			feedbackDuration: 3_000,
// 		}),
// 	],
// });
// import { postProcess, preProcess } from '~/lib/rehype-pre-raw';

let theme: BundledTheme = 'vitesse-dark';

export default defineConfig({
	plugins: [
		remixCloudflareDevProxy({ getLoadContext }),
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
			remarkRehypeOptions: {
				// clobberPrefix: 'mdx',
			},

			rehypePlugins: [
				rehypePrettyCode,
				rehypePrism,
				// rehypePrettyCode,
				[
					rehypePrettyCode,
					{
						theme: theme,
						transformers: [
							// transformerCopyButton({
							// 	visibility: 'hover',
							// 	feedbackDuration: 2_000,
							// 	successIcon: '👍',
							// 	// copyIcon: '📋'	,
							// }),
						],
						// theme: {
						// 	dark: 'one-dark-pro',
						// 	light: 'github-light',
						// },
						// The rest of the rehypePrettyCode config
					},
				],
				rehypeStringify,
				() => tree => {
					visit(tree, node => {
						if (node?.type === 'element' && node?.tagName === 'pre') {
							const [codeEl] = node.children;

							if (codeEl.tagName !== 'code') return;

							node.raw = codeEl.children?.[0].value;
						}
					});
				},
				() => tree => {
					visit(tree, node => {
						if (node?.type === 'element' && node?.tagName === 'div') {
							if (!('data-rehype-pretty-code-fragment' in node.properties)) {
								return;
							}

							for (const child of node.children) {
								if (child.tagName === 'pre') {
									child.properties['raw'] = node.raw;
								}
							}
						}
					});
				},
				[rehypePrism, { plugins: ['line-numbers'] }],
			],
		}),
		// vitePluginUnified({
		// 	directory: './app',
		// 	transform: {
		// 		async defaultTransformer(content, context) {
		// 			return await unified().process(content);
		// 		},
		// 	},
		// }),
		svgr(),

		remix({
			future: {
				unstable_singleFetch: true,
				// v3_fetcherPersist: true,
				// v3_relativeSplatPath: true,
				// v3_throwAbortReason: true,
			},
			ssr: true,

			routes(defineRoutes) {
				return flatRoutes('routes', defineRoutes);
			},
		}),

		tsconfigPaths(),
	],
	// server: {},
});
