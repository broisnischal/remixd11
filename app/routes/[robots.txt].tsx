export const loader = () => {
	const url = new URL('https://nees.pages.dev');

	let host = url.host;

	const robotText = `User-agent: Googlebot
Disallow: /nogooglebot/
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /auth/login$
Sitemap: https://${host}/sitemap.xml`;

	return new Response(robotText, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain',
		},
	});
};
