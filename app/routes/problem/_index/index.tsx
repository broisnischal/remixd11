import { Link } from '@remix-run/react';

export default function Page() {
	return (
		<>
			<h1>List of problems that i encountered</h1>
			<div className="flex flex-col gap-3">
				<Link to={'/problem/2024/list'}>2024</Link>
				<Link to={'/problem/2023'}>2023 list</Link>
			</div>
		</>
	);
}
