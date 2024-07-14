// import { Authenticator } from 'remix-auth';
// import gitHubStrategy from './providers/github.server';
// import { sessionStorage } from '~/utils/auth.session.server';

// const authenticator = new Authenticator(sessionStorage);

// authenticator.use(gitHubStrategy, 'github');
// // authenticator.use(linkedInStratedy, 'linkedin');

// export default authenticator;

import { Authenticator } from 'remix-auth';
import { GitHubStrategy } from 'remix-auth-github';
import {
	AppLoadContext,
	createCookieSessionStorage,
	SessionStorage,
} from '@remix-run/cloudflare';
import { users } from '~/drizzle/schema.server';
import { drizzle } from 'drizzle-orm/d1';
import { eq, InferModelFromColumns } from 'drizzle-orm';
import * as schema from '../drizzle/schema.server';
import { getLoadContext } from 'load-context';

type User = typeof users.$inferSelect;

export class Auth {
	protected authenticator: Authenticator;
	protected sessionStorage: SessionStorage;

	public authenticate: Authenticator['authenticate'];
	public isAuthenticated: Authenticator['isAuthenticated'];

	constructor(context: AppLoadContext) {
		this.sessionStorage = createCookieSessionStorage({
			cookie: {
				name: 'sdx:auth',
				path: '/',
				maxAge: 60 * 60 * 24 * 365, // 1 year
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				secrets: [context.env.COOKIE_SESSION_SECRET],
			},
		});

		this.authenticator = new Authenticator(this.sessionStorage);

		this.authenticator.use(
			new GitHubStrategy(
				{
					clientID: context.env.GITHUB_CLIENT_ID,
					clientSecret: context.env.GITHUB_CLIENT_SECRET,
					callbackURL: '/auth/github/callback',
				},
				async ({ accessToken, profile }) => {
					const db = drizzle(context.env.DB, {
						schema: schema,
					});

					const { provider, id, emails, _json } = profile;
					// getLoadContext(context.);

					console.log(provider, id, emails, _json);

					const { login, avatar_url, name } = _json;

					let [u] = await db
						.select()
						.from(users)
						.where(eq(schema.users.email, emails[0].value))
						.execute();

					if (u) {
						console.log('alredy a user');
						return u;
					} else {
						let user = await db
							.insert(users)
							.values({
								email: emails[0].value,
								type: 'user',
								provider,
								providerId: id,
							})
							.execute();

						let [single] = await db
							.select()
							.from(users)
							.where(eq(schema.users.email, emails[0].value))
							.execute();

						console.log('new a user');

						return single;
					}
				},
			),
			'github',
		);

		this.authenticate = this.authenticator.authenticate.bind(
			this.authenticator,
		);

		this.isAuthenticated = this.authenticator.isAuthenticated.bind(
			this.authenticator,
		);
	}

	public async clear(request: Request) {
		let session = await this.sessionStorage.getSession(
			request.headers.get('cookie'),
		);
		return this.sessionStorage.destroySession(session);
	}
}
