import { redirect } from '@remix-run/cloudflare';

export async function loader() {
	return redirect(
		'https://github.com/broisnischal/broisnischal/blob/main/resume.pdf',
	);
}
