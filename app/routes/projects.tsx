import { json } from '@remix-run/cloudflare';

export async function loader() {
	await new Promise(r => setTimeout(r, 1000));

	return json({});
}

export default function Projects() {
	return (
		<div>
			<h1>Projects</h1>
		</div>
	);
}
