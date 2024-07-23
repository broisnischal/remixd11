import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare';

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const title = url.searchParams.get('title');
	const description = url.searchParams.get('description');
	const jsx = (
		<div>
			<h1> {title} </h1>
			<p> {description} </p>
		</div>
	);

	return json({ jsx, title, description });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	const ogUrl = new URL('https://www.example.com/social-preview.png');
	ogUrl.searchParams.set('title', data?.title || 'Nischal Dahal');
	ogUrl.searchParams.set(
		'description',
		data?.description || 'Nischal | Image generation',
	);
	return [
		{ title: 'Website title' },
		{
			property: 'og:image',
			content: ogUrl.toString(),
		},
	];
};

declare module 'react' {
	interface HTMLAttributes<T> {
		tw?: string;
	}
}
