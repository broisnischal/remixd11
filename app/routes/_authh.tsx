import { Outlet, useOutlet } from '@remix-run/react';

export default function Page() {
	const data = useOutlet();

	return (
		<div>
			<h1>Auth </h1>

			<Outlet />
		</div>
	);
}
