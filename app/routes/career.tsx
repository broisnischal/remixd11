import { Link, Outlet } from '@remix-run/react';

export default function Page() {
	return (
		<div className="flex gap-2">
			<ul className="flex flex-col gap-2">
				{/* <li>Framer Motion</li> */}
				<Link to="framer">Framer Motion</Link>
				<Link to="flutter">Flutter</Link>
				<Link to="remix">Remix</Link>
			</ul>
			<Outlet />
		</div>
	);
}
