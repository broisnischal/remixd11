// type MetaCreator = <T extends Record<string, unknown>[]>(args: T) => T | T[];

import { MetaFunction } from '@remix-run/cloudflare';

type MetaItems = {
	title: string;
	description?: string;
	image?: string;
	url?: string;
	keywords?: string[];
	others?: ReturnType<MetaFunction>;
};

type MetaCreator = (args: MetaItems) => ReturnType<MetaFunction>;

export const MetaCreator: MetaCreator = arg => {
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
	];

	if (arg.image) {
		meta.push({
			property: 'og:image',
			content: arg.image,
		});
		meta.push({
			property: 'twitter:image',
			content: arg.image,
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
