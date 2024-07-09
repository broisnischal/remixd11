import { Outlet } from '@remix-run/react';

export default function Page() {
	return (
		<div>
			<h1>COncert</h1>

			<Outlet />
		</div>
	);
}
