import { Outlet } from '@remix-run/react';

export default function Component() {
	return (
		<div>
			<div className=" prose dark:prose-invert lg:prose-xl prose-strong:rounded-md prose-strong:bg-secondary prose-strong:px-2 prose-strong:py-1 prose-img:rounded-md ">
				<Outlet />
			</div>
		</div>
	);
}
