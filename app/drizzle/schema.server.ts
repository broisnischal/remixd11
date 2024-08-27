import { relations } from 'drizzle-orm';
import {
	blob,
	integer,
	sqliteTable,
	text,
	uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
	'users',
	{
		id: integer('id').primaryKey(),
		name: text('name').default('Anonymous'),
		email: text('email').notNull().unique(),
		avatar_url: text('avatar_url').default(
			'https://static-00.iconduck.com/assets.00/user-avatar-icon-1820x2048-mp3gzcbn.png',
		),
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

export const userRelations = relations(users, ({ many, one }) => ({
	guestBook: many(guestBook),
}));

export const guestBook = sqliteTable('guestbook', {
	id: integer('id').primaryKey(),
	name: text('name').default('Anonymous'),
	email: text('email').notNull(),
	message: text('message').notNull(),
	authorId: integer('authorId')
		.notNull()
		.references(() => users.id),
});

export const guestBookRelations = relations(guestBook, ({ many, one }) => ({
	author: one(users, {
		fields: [guestBook.authorId],
		references: [users.id],
		// relationName: 'author',
	}),
}));

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
	description: text('description').default(''),
	author: text('author').notNull(),
});

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	body: text('body').notNull(),
});

export const canvas = sqliteTable('canvas', {
	id: integer('id').primaryKey(),
	data: blob('data', {
		mode: 'json',
	}),
	textBlob: text('textBlob', {
		mode: 'json',
	}).default('{}'),
});

export const document = sqliteTable('document', {
	id: integer('id').primaryKey(),
	data: blob('data', {
		mode: 'json',
	}),
	value: text('value').notNull(),
	title: text('title').notNull(),
	hidden: integer('hidden').notNull().default(0),
});

// export const sessions = sqliteTable('sessions', {
// 	id: integer('id').primaryKey(),
// 	userId: integer('userId').notNull(),
// 	session: text('session').notNull(),
// });
