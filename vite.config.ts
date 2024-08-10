import mdx from '@mdx-js/rollup';
import {
	vitePlugin as remix,
	cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from '@remix-run/dev';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeMeta from 'rehype-meta';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypePrism from 'rehype-prism';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { flatRoutes } from 'remix-flat-routes';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { getLoadContext } from './load-context';

export default defineConfig({
	plugins: [
		remixCloudflareDevProxy({ getLoadContext }),
		mdx({
			remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
			rehypePlugins: [
				// rehypeAutolinkHeadings,
				rehypeSlug,
				rehypeMeta,
				[rehypePrism, { autolinker: true }],
				// [remarkToc, { ordered: true, tight: false }],
				[
					rehypePrettyCode,
					{
						// theme: 'material-theme-darker',
						theme: 'vesper', // dark-plus
					},
				],
				[rehypePrism, { plugins: ['line-numbers'] }],
			],
		}),
		remix({
			future: {
				// unstable_lazyRouteDiscovery: true,
				// unstable_singleFetch: true,
			},
			// ssr: true,
			routes(defineRoutes) {
				return flatRoutes('routes', defineRoutes);
			},
		}),
		tsconfigPaths(),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				},
			},
		},
		minify: 'terser',
		cssMinify: true,
		ssr: true,
		chunkSizeWarningLimit: 600, // Adjust chunk size warning limit as needed
	},
});

// import mdx from '@mdx-js/rollup';
// import {
// 	vitePlugin as remix,
// 	cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
// } from '@remix-run/dev';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import rehypeMeta from 'rehype-meta';
// import rehypePrettyCode from 'rehype-pretty-code';
// import rehypePrism from 'rehype-prism';
// import rehypeSlug from 'rehype-slug';
// import remarkFrontmatter from 'remark-frontmatter';
// import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
// import { flatRoutes } from 'remix-flat-routes';
// import { defineConfig } from 'vite';
// // import svgr from 'vite-plugin-svgr';

// import remarkToc from 'remark-toc';
// // import remarkMermaid from 'remark-mermaidjs';

// import tsconfigPaths from 'vite-tsconfig-paths';

// // import 'prismjs/themes/prism-coy.css';
// // import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// // import remarkParse from 'remark-parse';
// // import remarkRehype from 'remark-rehype';

// import { getLoadContext } from './load-context';

// import { BundledTheme } from 'shiki';

// // const code = await codeToHtml('console.log("Hello World")', {
// // 	lang: 'ts',
// // 	theme: 'vitesse-light',
// // 	transformers: [
// // 		transformerCopyButton({
// // 			visibility: 'always',
// // 			feedbackDuration: 3_000,
// // 		}),
// // 	],
// // });
// // import { postProcess, preProcess } from '~/lib/rehype-pre-raw';

// // import mdxMermaid from 'mdx-mermaid';
// // import { Mermaid } from 'mdx-mermaid/lib/Mermaid';
// // import { Mermaid } from 'mdx-mermaid/Mermaid';

// import remarkGfm from 'remark-gfm';
// // import remarkMath from 'remark-math';

// let dark: BundledTheme = 'dark-plus';
// let light: BundledTheme = 'light-plus';

// export default defineConfig({
// 	plugins: [
// 		remixCloudflareDevProxy({ getLoadContext }),
// 		mdx({
// 			remarkPlugins: [
// 				remarkFrontmatter,
// 				remarkMdxFrontmatter,
// 				remarkGfm,
// 				// remarkMath,
// 			],
// 			remarkRehypeOptions: {
// 				// clobberPrefix: 'mdx',
// 			},

// 			rehypePlugins: [
// 				rehypeAutolinkHeadings,
// 				rehypeSlug,
// 				rehypeMeta,
// 				[
// 					rehypePrism,
// 					{
// 						autolinker: true,
// 					},
// 				],
// 				[remarkToc, { ordered: true, tight: false }],

// 				// rehypePrettyCode,
// 				[
// 					rehypePrettyCode,
// 					{
// 						theme: dark,
// 						// transformers: [
// 						// 	transformerCopyButton({
// 						// 		visibility: 'always',
// 						// 		successIcon: '✅',
// 						// 		feedbackDuration: 3_000,
// 						// 	}),
// 						// ],
// 						// theme: {
// 						// 	dark: 'one-dark-pro',
// 						// 	light: 'github-light',
// 						// },
// 						// The rest of the rehypePrettyCode config
// 					},
// 				],
// 				// rehypeStringify,
// 				// () => tree => {
// 				// 	visit(tree, node => {
// 				// 		if (node?.type === 'element' && node?.tagName === 'pre') {
// 				// 			const [codeEl] = node.children;

// 				// 			if (codeEl.tagName !== 'code') return;

// 				// 			node.raw = codeEl.children?.[0].value;
// 				// 		}
// 				// 	});
// 				// },
// 				// () => tree => {
// 				// 	visit(tree, node => {
// 				// 		if (node?.type === 'element' && node?.tagName === 'div') {
// 				// 			if (!('data-rehype-pretty-code-fragment' in node.properties)) {
// 				// 				return;
// 				// 			}

// 				// 			for (const child of node.children) {
// 				// 				if (child.tagName === 'pre') {
// 				// 					child.properties['raw'] = node.raw;
// 				// 				}
// 				// 			}
// 				// 		}
// 				// 	});
// 				// },
// 				[rehypePrism, { plugins: ['line-numbers'] }],

// 				// [mdxMermaid.default, { output: 'svg' }],
// 			],
// 		}),
// 		// vitePluginUnified({
// 		// 	directory: './app',
// 		// 	transform: {
// 		// 		async defaultTransformer(content, context) {
// 		// 			return await unified().process(content);
// 		// 		},
// 		// 	},
// 		// }),
// 		// svgr(),

// 		remix({
// 			future: {
// 				unstable_lazyRouteDiscovery: true,
// 				unstable_singleFetch: true,
// 				// v3_fetcherPersist: true,
// 				// v3_relativeSplatPath: true,
// 				// v3_throwAbortReason: true,
// 			},
// 			ssr: true,
// 			routes(defineRoutes) {
// 				return flatRoutes('routes', defineRoutes);
// 			},
// 		}),

// 		tsconfigPaths(),
// 	],
// 	// server: {},
// });
