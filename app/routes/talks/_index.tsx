import { MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';
import { MetaCreator } from '~/utils/meta';

export const meta: MetaFunction = () => {
	return MetaCreator({
		title: 'Presentations | Nischal Dahal',
		description:
			"Explore Nischal Dahal's presentations and talks on API Architecture, Testing, Scaling, and System Design.",
		image: '/ogimg.png',
		url: 'https://nischal-dahal.com.np/talks',
	});
};

export default function Talks() {
	return (
		<div>
			<h1 className="mb-8 text-2xl font-bold">Presentations</h1>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<div className="flex flex-col gap-2">
						<div className="flex w-fit flex-col gap-2 rounded-md border p-6">
							<Link
								to={'https://dahal-nischal.com.np/'}
								target="_blank"
								className="flex flex-col gap-2"
							>
								<h3 className=" font-bold">
									API Architecture, Testing, Scaling & System Design
								</h3>

								<img
									className="w-[400px] rounded-md"
									src="https://github.com/broisnischal/bucket/blob/main/Screenshot%202024-09-15%20at%2019.50.56.png?raw=true"
									alt=""
								/>
								<div className="flex flex-row justify-between">
									<p className="secondary text-sm">
										AITC International, Sept 2024
									</p>
									<p className="secondary text-sm">Bhaktapur, Nepal</p>
								</div>
								{/* <p className="text-sm text-gray-300">
                A talk about API design and system design.
              </p> */}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
