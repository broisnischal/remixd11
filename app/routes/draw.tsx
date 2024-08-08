import { Link } from '@remix-run/react';

export default function Page() {
	return (
		<div style={{ position: 'absolute', inset: 0 }}>
			<Link className="z-[999 fixed left-64 top-4" to="/">
				Go Back
			</Link>
			{/* <Tldraw /> */}
		</div>
	);
}
