import { Link, Outlet } from '@remix-run/react';
import Hr from '~/components/hr';

const donedays = 2;

export async function loader() {
	const modules = import.meta.glob('../routes/framer+/*.tsx', { eager: true });

	const build = await import('virtual:remix/server-build');

	const posts = Object.entries(modules).map(([file, post]) => {
		let id = file.replace('../', '').replace(/\.mdx$/, '');
		let slug = build.routes[id].path;
		if (slug === undefined) throw new Error(`No route for ${id}`);

		return {
			slug,
		};
	});

	return {};
}

export default function Page() {
	// let doingDay = new Date().getDate();
	let doingDay = donedays + 1;

	return (
		<div>
			<h1 className="text-3xl font-bold">50 Day of Framer Motion</h1>
			<small>
				Learning framer without <strong>animations.dev</strong> Course, but
				through docs and opensourse community.
			</small>
			{/* <Hr /> */}
			<br />
			<br />

			<div className="flex w-[60vw] flex-wrap gap-3 overflow-x-scroll ">
				{Array.from({ length: 50 }).map((_, i) =>
					donedays > i ? (
						<Link key={i} to={donedays > i ? `/framer/day${i + 1}` : `/framer`}>
							<div
								className={`grid aspect-square w-20 place-content-center rounded-lg border-2 p-5 text-center ${
									i === doingDay - 1
										? 'bg-zinc-800/20 dark:bg-zinc-300'
										: 'hover:bg-slate-200 dark:hover:bg-slate-300/5'
								}
                            `}
							>
								{i + 1}
							</div>
						</Link>
					) : (
						<div
							className={`grid aspect-square w-20 cursor-no-drop place-content-center rounded-lg border-2 p-5 text-center ${
								i === doingDay - 1
									? 'bg-zinc-800/20 dark:bg-zinc-800/45'
									: 'hover:bg-slate-200 dark:hover:bg-slate-300/5'
							}
                                `}
						>
							{i + 1}
						</div>
					),
				)}
			</div>
		</div>
	);
}
