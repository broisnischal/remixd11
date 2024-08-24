import { createCookieSessionStorage } from '@remix-run/cloudflare';

const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '_auth',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: [process.env.SESSION_SECRET!],
		secure: process.env.NODE_ENV === 'production',
	},
});

export { sessionStorage };
