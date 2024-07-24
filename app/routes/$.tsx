import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
	return [
		{
			title: 'Page not found | Nischal Dahal',
		},

		{
			name: 'description',
			content:
				'Page not found, please try again | Nischal Dahal, Broisnischal, Software Developer',
		},
		{
			tagName: 'meta',
			property: 'nofollow',
		},
	];
};

export async function loader({ context }: LoaderFunctionArgs) {
	return new Response(null, {
		status: 404,
	});
}

export default function Page() {
	return (
		<div className="flex min-h-52 flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">Opps, you ran into Saturn! 🪐</h1>
			<h2 className="font-semibold">
				We can't 🕒 Time Travel, right now! go{' '}
				<Link className="font-normal underline" to={'/'}>
					Earth?
				</Link>{' '}
			</h2>
		</div>
	);
}
