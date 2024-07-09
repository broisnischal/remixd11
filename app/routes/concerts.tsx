import { Outlet } from '@remix-run/react';

export default function Page() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<h1>COncert</h1>
			<div className="my-[2rem]">
				<Outlet />
			</div>
			<div>
				<h1>Side bar</h1>
			</div>
		</div>
	);
}
