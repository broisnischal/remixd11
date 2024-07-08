import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const resources = sqliteTable('resources', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	href: text('href').notNull(),
});

const user = sqliteTable('users', {
	id: integer('id').primaryKey(),
	username: text('username').notNull(),
	password: text('password').notNull(),
});

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	body: text('body').notNull(),
});

export const users = user;
