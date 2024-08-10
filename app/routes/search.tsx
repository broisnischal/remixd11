import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { flushSync } from 'react-dom';

import {
	ClientLoaderFunctionArgs,
	Link,
	useFetcher,
	useLoaderData,
	useLocation,
} from '@remix-run/react';
import localforage from 'localforage';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../components/ui/input';
import { getPosts, PostMeta } from '~/.server/posts';
// import { MovieLink } from '../blog-link'
import Fuse from 'fuse.js';
import { SearchCheckIcon, Search as SearchIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';

// Query the database on the server before the data is replicated to indexeddb
export async function loader({
	request,
	context: { env },
}: LoaderFunctionArgs) {
	let q = new URL(request.url).searchParams.get('q');
	if (!q) return [];

	q = `"${q.replace(/"/g, '""')}"`;

	let allblogs = await getPosts();

	// const featured = allblogs.filter(b => b.frontmatter.featured);

	const fuse = new Fuse(allblogs, {
		shouldSort: true,
		threshold: 0.6,
		keys: ['title', 'extract'],
	});

	//   let query = await env.DB.prepare(
	//     `SELECT id, title, extract FROM movies WHERE id IN (
	//       SELECT rowid FROM fts_movies WHERE fts_movies MATCH ?1
	//     )
	//     LIMIT 20`,
	//   )
	//     .bind(q)
	//     .all()

	//   return query.results
	return fuse.search(q).slice(0, 20);
}

// Cache the data in indexeddb for future searches
export async function clientLoader({
	serverLoader,
	request,
}: ClientLoaderFunctionArgs) {
	// before data is stored in indexeddb, it hits the server to search
	if (!memory || !memory.length) {
		console.log('cool ');
		replicateMovies();
		return serverLoader();
	}

	// after it searches it searches the data locally
	let q = new URL(request.url).searchParams.get('q')?.trim();
	if (!q) return [];

	let matches = [];

	for (let blog of memory) {
		if (blog.frontmatter.title.toLowerCase().includes(q.trim().toLowerCase())) {
			matches.push(blog);
		}
		if (matches.length >= 20) break;
	}

	if (!matches) {
		matches = (await serverLoader()) as any;
		localforage.setItem('all-blogs', matches);

		memory = matches;
	}

	return matches;
}

let memory: any;

let replicateMovies = async () => {
	// @ts-ignore
	replicateMovies = () => {};
	let cached = await localforage.getItem('all-blogs');
	if (cached) {
		memory = cached;
		return;
	}

	let response = await fetch('/all-blogs.json');
	let blogs = await response.json();
	localforage.setItem('all-blogs', blogs);
	memory = blogs;
};

export function Search() {
	let [show, setShow] = useState(false);
	let ref = useRef<HTMLInputElement | null>(null);
	const loaderData = useLoaderData<typeof loader>();

	let location = useLocation();
	let search = useFetcher<PostMeta[]>();

	useEffect(() => {
		if (show) {
			ref.current?.select();
		}
	}, [show]);

	useEffect(() => {
		setShow(false);
	}, [location]);

	// bind command + k
	useEffect(() => {
		let listener = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
				event.preventDefault();
				flushSync(() => {
					ref.current?.focus();
				});
				setShow(true);
			}
		};
		window.addEventListener('keydown', listener);
		return () => window.removeEventListener('keydown', listener);
	}, []);

	return (
		<>
			{/* <Button
				onClick={() => {
					setShow(true);
				}}
				variant={'outline'}
				aria-label="Search"
				size="icon"
			>
				<SearchIcon />
			</Button> */}
			<div
				onClick={() => {
					setShow(false);
				}}
				hidden={!show}
				className="fixed left-0 top-0 z-20 m-auto h-full w-full overflow-hidden bg-secondary-foreground/60 dark:bg-black/80"
			>
				<div
					className="absolute left-1/2 top-[40vh] z-20  h-[40vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md border bg-background  dark:bg-[#131313] md:w-[40vw]"
					onClick={event => {
						event.stopPropagation();
					}}
					onKeyDown={event => {
						if (event.key === 'Escape') {
							setShow(false);
						}
					}}
				>
					<search.Form method="get" action="/search">
						<Input
							ref={ref}
							placeholder="search"
							type="search"
							name="q"
							onKeyDown={event => {
								if (
									event.key === 'Escape' &&
									event.currentTarget.value === ''
								) {
									setShow(false);
								} else {
									event.stopPropagation();
								}
							}}
							{...{
								autoComplete: 'off',
							}}
							onChange={event => {
								search.submit(event.currentTarget.form);
							}}
							// style={{
							// 	width: '100%',
							// 	padding: '0.5rem 1rem',
							// 	fontSize: '1.5em',
							// 	position: 'sticky',
							// 	top: 0,
							// 	border: 'none',
							// 	borderBottom: 'solid 1px #ccc',
							// 	outline: 'none',
							// }}
						/>
					</search.Form>
					{search.data ? (
						// [&>li]:border-b-2
						<ul
							role="list"
							onKeyDown={event => {
								if (event.key === 'Enter') {
									setShow(false);
								}
							}}
							className="flex h-full flex-col overflow-scroll pb-10 "
						>
							{/* {JSON.stringify(search.data)} */}

							{search.data.length <= 0 ? (
								ref.current?.value === '' ||
								ref.current?.value.trim() === '' ? (
									<div className="m-auto flex h-full min-h-[20vh] w-full items-center justify-center">
										Search blogs
									</div>
								) : (
									<div className="m-auto flex h-full min-h-[20vh] w-full items-center justify-center">
										No results found.
									</div>
								)
							) : (
								search.data?.map((blog, index) => (
									<li key={index} className="border-b-2 px-4 py-2">
										<Link to={`/blog/${blog.slug}`}>
											<h1>{blog.frontmatter.title}</h1>
											<small>
												{blog.frontmatter.description.slice(0, 100)} ...
											</small>
										</Link>
									</li>
								))
							)}
						</ul>
					) : (
						<div>
							<div className="py-4 text-center">Loading...</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
