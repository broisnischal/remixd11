import { redirect, type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { Auth } from '~/services/auth.server';
import { SessionStorage } from '~/services/session.server';

export async function loader({ request, params, context }: LoaderFunctionArgs) {
	// let location = new URL(request);
	// location.pathname = '/auth/login';
	// location.searchParams.set('redirect', location.pathname);
	// location.searchParams.set('provider', params.provider);

	let provider = params.provider as string;
	let auth = new Auth(context);
	let user = await auth.authenticate(provider, request, {
		failureRedirect: '/auth/login',
	});

	let sessionStorage = new SessionStorage(context);

	let session = await sessionStorage.read(request.headers.get('cookie'));

	session.set('user', user);

	let headers = new Headers();

	console.log(request);

	headers.append('Set-Cookie', await sessionStorage.commit(session));
	headers.append('Set-Cookie', await auth.clear(request));

	throw redirect('/guestbook', { headers });
}
