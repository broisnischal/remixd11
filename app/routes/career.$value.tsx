import { useParams } from '@remix-run/react';

export default function Page() {
	return (
		<div>
			<h1>Career for {useParams().value}</h1>
		</div>
	);
}
