import { Link, Outlet } from '@remix-run/react';

export default function Page() {
	return (
		<div>
			<h2>2024</h2>
			<Outlet />

			{/* <ul>
                <li>
                    <Link to={'test'}>responsive not working</Link>

                </li>
                <li>

                    <Link to={'rust'}>docker user permission</Link>
                </li>
            </ul> */}
		</div>
	);
}
