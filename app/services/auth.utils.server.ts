import { AppLoadContext } from '@remix-run/cloudflare';
import { redirect } from '@remix-run/node';
import { users } from '~/drizzle/schema.server';
import { Auth } from './auth.server';

export async function requireUser(
	request: Request,
	context: AppLoadContext,
	returnTo = '/auth/login',
): Promise<typeof users.$inferSelect | null> {
	// const user = new Auth(context).getUser(request);
	const auth = new Auth(context);

	const data = (await auth.isAuthenticated(request, {
		// failureRedirect: '/auth/login',
		// successRedirect
	})) as unknown as typeof users.$inferSelect;

	// const data = new Auth(context).isAuthenticated(request, {
	// 	failureRedirect: '/auth/login',
	// 	// successRedirect
	// }) as unknown as typeof users.$inferSelect;

	if (!data) throw redirect(returnTo);

	return data;
}

// export async function retriveUser(
// 	request: Request,
// 	context: AppLoadContext,
// ): Promise<typeof users.$inferSelect | null> {
// 	const user = new Auth(context).getUser(request);

// 	if (!user) return null;

// }
// export async function verifyUser(request: Request, type: UserType) {
// 	const user = (await authenticator.isAuthenticated(request, {
// 		failureRedirect: '/auth/login',
// 	})) as User;

// 	if (user.usertype !== type) {
// 		throw redirect('/auth/login');
// 	}
// 	return user;
// }
