import type { LoaderFunctionArgs } from '@remix-run/cloudflare';
import type { SatoriOptions } from 'satori';
import satori from 'satori';
// import { Resvg } from '@resvg/resvg-js';
import { twMerge } from 'tailwind-merge';
import invariant from 'tiny-invariant';

declare module 'react' {
	interface HTMLAttributes<T> {
		tw?: string;
	}
}

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);

	const titleInput = url.searchParams.get('title');
	invariant(titleInput, 'title is required');
	const title = decodeURIComponent(titleInput);

	const descriptionInput = url.searchParams.get('description');
	const description = decodeURIComponent(descriptionInput || '');
	const dateInput = url.searchParams.get('date');
	const date = new Date(decodeURIComponent(dateInput || '')).toLocaleDateString(
		'en-US',
		{
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		},
	);

	let imageResponse: ArrayBuffer | null = null;

	const imgInput = url.searchParams.get('img') || 'null';
	if (imgInput !== 'null') {
		const img = new URL(decodeURIComponent(imgInput), url.origin);
		if (!url.searchParams.get('source')) {
			// Prevent recursive loop if some clown tries to pass this generator as an image source.
			img.searchParams.set('source', 'og');

			// Fetch the image separately because we can't run two instances of Satori at once
			// Letting Satori fetch the image would hang indefinitely
			imageResponse = await fetch(img.toString()).then(r => r.arrayBuffer());
		}
	}

	if (imageResponse) {
		return satoriResponse(
			<FeaturedImage title={title} img={imageResponse} date={date} />,
		);
	}

	return satoriResponse(
		<DefaultImage title={title} description={description} date={date} />,
	);
}

function TitleSection({
	title,
	description,
	date,
}: {
	title: string;
	description: string;
	date: string;
}) {
	const titleSize = title.length < 40 ? 'text-[3rem]' : 'text-[4rem]';

	return (
		<div tw="flex justify-center items-center h-full w-full mx-auto">
			<div tw="flex flex-col w-full  text-center items-center mx-auto">
				<h2
					tw={`${titleSize} text-black font-bold leading-tight tracking-tight mb-0`}
				>
					{title
						.replace('-', ' ')
						.split(' ')
						.map(word => word[0]?.toUpperCase() + word.slice(1))
						// .slice(0, 3)
						.join(' ')
						.trim()}
				</h2>

				{description && (
					<h2 className="text-3xl uppercase " tw="font-bold text-blue-600">
						{description
							.replace('-', ' ')
							.split(' ')
							.map(word => word[0]?.toUpperCase() + word.slice(1))
							.slice(0, 3)
							.join(' ')
							.trim()}
					</h2>
				)}
			</div>
		</div>
	);
}

function DefaultImage({
	title,
	description,
	date,
}: {
	title: string;
	description: string;
	date: string;
}) {
	const descriptionSize = description.length < 80 ? 'text-2xl' : 'text-xl';

	return (
		<div tw="h-full flex flex-col bg-transparent px-8 relative text-2xl">
			<TitleSection description={description} title={title} date={date} />

			<p tw="text-center w-full flex items-center justify-center font-poppins text-3xl font-bold">
				A blog by Nischal Dahal
			</p>

			{/* <h2>Nischal Dahal</h2> */}

			{/* <BrowserSection className="border border-neutral-100 bg-white shadow">
				<div tw="flex flex-col w-full px-16 py-8 text-center items-center max-w-2xl mx-auto">
					<p
						tw={`text-neutral-700 ${descriptionSize} mb-12`}
						style={{ lineHeight: '2rem' }}
					>
						{description}
					</p>

					<div tw="flex justify-between items-end">
						<div tw="flex">
							<img
								tw="w-16 rounded-full"
								src="https://jacobparis.com/images/jacob.png"
								alt=""
							/>
							<div tw="flex flex-col px-4 py-1 text-base">
								<span tw="font-bold mb-1"> Jacob Paris </span>
								<span tw="text-neutral-500"> @jacobmparis </span>
							</div>
						</div>
					</div>
				</div>
			</BrowserSection> */}
		</div>
	);
}

function FeaturedImage({
	title,
	img,
	date,
}: {
	title: string;
	img: ArrayBuffer | Buffer | string;
	date: string;
}) {
	return (
		<div tw="h-full flex flex-col bg-neutral-800 pt-16 px-8 relative text-2xl">
			<div style={{ width: '1136px' }}>{/* 1200px - 64px (px-8) */}</div>

			<TitleSection description={''} title={title} date={date} />
		</div>
	);
}

async function satoriResponse(jsx: JSX.Element) {
	const svg = await satori(jsx, {
		width: 800,
		height: 600,
		fonts: await Promise.all([
			getFont('Inter'),
			getFont('Playfair Display'),
		]).then(fonts => fonts.flat()),
	});

	try {
		return new Response(svg, {
			headers: {
				// 'Content-Type': 'image/png',
				'Content-Type': 'image/svg+xml',
			},
		});
	} catch (error) {
		if (
			typeof error === 'object' &&
			error &&
			'message' in error &&
			typeof error.message === 'string'
		) {
			return new Response(error.message, {
				status: 500,
				headers: {
					'Content-Type': 'text/plain',
				},
			});
		}
	}
}

export async function getFont(
	font: string,
	weights = [400, 500, 600, 700],
	text = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\!@#$%^&*()_+-=<>?[]{}|;:,.`\'’"–—',
) {
	const css = await fetch(
		`https://fonts.googleapis.com/css2?family=${font}:wght@${weights.join(
			';',
		)}&text=${encodeURIComponent(text)}`,
		{
			headers: {
				// Make sure it returns TTF.
				'User-Agent':
					'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
			},
		},
	).then(response => response.text());

	const resource = css.matchAll(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/g,
	);

	return Promise.all(
		[...resource]
			.map(match => match[1])
			.map(url => fetch(url).then(response => response.arrayBuffer()))
			.map(async (buffer, i) => ({
				name: font,
				style: 'normal',
				weight: weights[i],
				data: await buffer,
			})),
	) as Promise<SatoriOptions['fonts']>;
}
