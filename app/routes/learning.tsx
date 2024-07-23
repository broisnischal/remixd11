import { Outlet } from '@remix-run/react';

export default function Component() {
	return (
		<div>
			<div className="prose dark:prose-invert lg:prose-xl prose-h1:text-3xl">
				<Outlet />
			</div>
		</div>
	);
}
