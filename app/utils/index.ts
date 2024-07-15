import fs from 'fs';
import * as cheerio from 'cheerio';
import { writeToPath } from 'fast-csv';
import { z } from 'zod';

export const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
	if (values.length !== 1)
		throw new Error('Found non unique or inexistent value');
	return values[0]!;
};

interface Bookmark {
	title: string;
	url: string | undefined;
}

export const parseBookmarks = (fileContent: string): Bookmark[] => {
	const $ = cheerio.load(fileContent);

	const bookmarks: Bookmark[] = [];
	$('a').each((index, element) => {
		const title = $(element).text();
		const url = $(element).attr('href');
		bookmarks.push({
			title,
			url,
		});
	});

	return bookmarks;
};

// export const parseBookmarks = (htmlFile: string): Bookmark[] => {
// 	const html = fs.readFileSync(htmlFile, 'utf-8');
// 	const $ = cheerio.load(html);

// 	const bookmarks: Bookmark[] = [];
// 	$('a').each((index, element) => {
// 		const title = $(element).text();
// 		const url = $(element).attr('href');
// 		bookmarks.push({ Title: title, URL: url });
// 	});

// 	return bookmarks;
// };

// export const exportToCsv = (bookmarks: Bookmark[], csvFile: string): void => {
// 	const ws = fs.createWriteStream(csvFile);
// 	writeToPath(ws, csvFile, {
// 		headers: ['Title', 'URL'],
// 		includeEndRowDelimiter: true,
// 		rowDelimiter: '\n',
// 	});
// 	bookmarks.forEach(bookmark => {
// 		ws.write(`${bookmark.Title},${bookmark.URL}\n`);
// 	});
// 	ws.end();
// };

interface Profanity {
	isProfanity: boolean;
	score: number;
}

const profanitySchema = z.object({
	isProfanity: z.boolean(),
	score: z.number(),
});

export async function useProfanity(message: string): Promise<Profanity> {
	const res = await fetch('https://vector.profanity.dev', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ message }),
	});
	const data = await res.json();

	return profanitySchema.parse(data);
}

// const res = await fetch('https://vector.profanity.dev', {
// 	method: 'POST',
// 	headers: { 'Content-Type': 'application/json' },
// 	body: JSON.stringify({ message: formData.get('message') }),
// });

// const data = await res.json();
