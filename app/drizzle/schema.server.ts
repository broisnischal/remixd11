import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const resources = sqliteTable('resources', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	href: text('href').notNull(),
});

const user = sqliteTable('users', {
	id: integer('id').primaryKey(),
	username: text('username').notNull(),
	email: text('email').notNull(),
	password: text('password').notNull(),
	type: text('type').notNull(),
});

export const newsletter = sqliteTable('newsletter', {
	id: integer('id').primaryKey(),
	email: text('email').notNull(),
});

export const bookmarks = sqliteTable('bookmarks', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	href: text('href').notNull(),
	featured: text('featured').notNull(),
});

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	body: text('body').notNull(),
});

export const users = user;
