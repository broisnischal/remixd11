import { Outlet } from '@remix-run/react';

export default function Component() {
	return (
		<div className="flex justify-center ">
			<div className="prose py-10 dark:prose-invert lg:prose-xl">
				<Outlet />
			</div>
		</div>
		// <div className="prose p-10">
		// 	<Outlet />
		// </div>
	);
}
