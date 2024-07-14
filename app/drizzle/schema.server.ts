import {
	integer,
	sqliteTable,
	text,
	uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
	'users',
	{
		id: integer('id').primaryKey(),
		email: text('email').notNull().unique(),
		type: text('type', {
			enum: ['user', 'admin', 'nees'],
		})
			.notNull()
			.default('user'),
		provider: text('provider').notNull(),
		providerId: text('providerId').notNull(),
	},
	table => {
		return {
			emailIndex: uniqueIndex('emailIndex').on(table.email),
			// provider_providerId: uniqueIndex('provider_providerId').on(table.provider, table.providerId),
		};
	},
);

export const newsletters = sqliteTable('newsletter', {
	id: integer('id').primaryKey(),
	email: text('email').notNull(),
	verified: integer('verified').notNull(),
	// createdAt: real('createdAt').notNull(),
});

export const bookmarks = sqliteTable('bookmarks', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	href: text('href').notNull(),
	featured: text('featured').notNull(),
	author: text('author').notNull(),
});

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	body: text('body').notNull(),
});
