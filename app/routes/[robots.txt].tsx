export const loader = () => {
	const url = new URL('https://nischal-dahal.com.np');

	let host = url.host;

	const robotText = `
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /auth/signin
Sitemap: https://${host}/sitemap.xml`;

	return new Response(robotText, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain',
		},
	});
};
