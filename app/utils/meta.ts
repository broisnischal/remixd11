// type MetaCreator = <T extends Record<string, unknown>[]>(args: T) => T | T[];

import { MetaFunction } from '@remix-run/cloudflare';

type MetaItems = {
	title: string;
	description?: string;
	image?: string;
	generateimage?: boolean;
	url?: string;
	keywords?: string[];
	others?: ReturnType<MetaFunction>;
};

type MetaCreator = (args: MetaItems) => ReturnType<MetaFunction>;

export const MetaCreator: MetaCreator = arg => {
	// const alreadyExistsMetaAuthor = arg.others?.some(
	// 	meta => meta.name === 'author',
	// );

	const meta: ReturnType<MetaFunction> = [
		{
			title: arg.title,
		},
		{
			property: 'og:title',
			content: arg.title,
		},
		{
			property: 'twitter:title',
			content: arg.title,
		},
		{
			property: 'twitter:card',
			content: 'summary_large_image',
		},
		{
			property: 'twitter:site',
			content: 'Nischal Dahal | broisnees',
		},
		{
			property: 'twitter:description',
			content: arg.description,
		},
		{
			property: 'og:type',
			content: 'website',
		},
		{
			property: 'og:site_name',
			content: 'Nischal Dahal | broisnees',
		},
		{
			property: 'og:locale',
			content: 'en_US',
		},
		{
			name: 'keywords',
			content: arg.keywords?.join(', '),
		},
		{
			name: 'author',
			content: 'Nischal Dahal',
		},

		// {
		// 	property: 'og:updated_time',
		// 	content: new Date().toISOString(),
		// },
		// ...(!alreadyExistsMetaAuthor
		// 	? [
		// 			{
		// 				name: 'author',
		// 				content: 'Nischal Dahal',
		// 			},
		// 		]
		// 	: []),
	];

	if (arg.image && !arg.generateimage) {
		meta.push({
			property: 'og:image',
			content: arg.image,
		});
		meta.push({
			property: 'twitter:image',
			content: arg.image,
		});
	}

	if (arg.generateimage) {
		meta.push({
			property: 'og:image',
			content: `https://nischal-dahal.com.np/resources/og-image?title=${arg.title}`,
		});
		meta.push({
			property: 'twitter:image',
			content: `https://nischal-dahal.com.np/resources/og-image?title=${arg.title}`,
		});
	}

	if (arg.description) {
		meta.push({
			name: 'description',
			content: arg.description,
		});
	}

	if (arg.url) {
		meta.push({
			property: 'og:url',
			content: arg.url,
		});

		meta.push({
			property: 'twitter:url',
			content: arg.url,
		});
	}

	if (arg.others) {
		meta.push(...arg.others);
	}

	return meta;
};
