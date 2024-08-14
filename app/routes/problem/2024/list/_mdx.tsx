import { Outlet } from '@remix-run/react';

export default function Page() {
	return (
		<h1>
			mdx
			<Outlet />
		</h1>
	);
}
