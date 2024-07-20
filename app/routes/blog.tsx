import { Outlet } from '@remix-run/react';

export default function Component() {
	return (
		<div className="flex w-full justify-center ">
			<br />
			<div className=" prose max-w-[90vw] py-10 dark:prose-invert lg:prose-xl prose-strong:rounded-md prose-strong:bg-secondary prose-strong:px-2 prose-strong:py-1 prose-img:rounded-md lg:max-w-[60vw]">
				<Outlet />
			</div>
		</div>
	);
}
