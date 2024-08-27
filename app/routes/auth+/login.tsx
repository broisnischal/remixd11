import { GitHubLogoIcon } from '@radix-ui/react-icons';
import {
	json,
	type MetaFunction,
	redirect,
	type LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import { Form, useLocation } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { SessionStorage } from '~/services/session.server';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Login | Nischal Portfolio' },
		{
			name: 'description',
			content: 'You are welcome to my site.',
		},
	];
};

export async function loader({ request, context }: LoaderFunctionArgs) {
	let user = await SessionStorage.readUser(context, request);
	if (!user) return json(null);
	throw redirect('/');
}

export default function Login() {
	const location = useLocation();

	return (
		<div className="flex items-center justify-center">
			<Form action="/auth/github" method="POST">
				<input type="hidden" name="redirectTo" value={location.pathname} />

				<Button
					type="submit"
					className="flex items-center justify-center gap-3"
					variant="outline"
					size={'lg'}
				>
					<GitHubLogoIcon /> Sign in with GitHub
				</Button>
			</Form>
		</div>
	);
}
