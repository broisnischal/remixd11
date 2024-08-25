import { load } from 'cheerio';
import satori from 'satori';
import { getFont } from './resources+/og-image';
// import satori from 'satori';
// import { getFont } from './resources+/og-image';

export async function loader() {
	const response = await fetch('https://codeium.com/profile/broisnischal', {
		headers: {
			// 'Cache-Control': 'public, max-age=86400, immutable',
			'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
		},
	});

	const data = await response.text();

	const $ = load(data);

	const svgContent = $('svg.h-full.w-full').parent().html();

	// const svg = await satori(svgContent, {
	// 	width: 800,
	// 	height: 600,
	// 	fonts: await Promise.all([
	// 		getFont('Inter'),
	// 		getFont('Playfair Display'),
	// 	]).then(fonts => fonts.flat()),
	// });

	return new Response(svgContent, {
		headers: {
			'Content-Type': 'image/svg+xml',
		},
	});
}
