import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './app/drizzle/schema.server.ts',
	dialect: 'sqlite',
	verbose: true,
	out: './app/drizzle/migrations',
	strict: true,
});
