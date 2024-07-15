import { GitHubLogoIcon } from '@radix-ui/react-icons';
import {
	ActionFunctionArgs,
	json,
	LoaderFunctionArgs,
} from '@remix-run/cloudflare';
import {
	ClientActionFunctionArgs,
	Form,
	useActionData,
	useFetcher,
	useLoaderData,
} from '@remix-run/react';
import { HoneypotInputs } from 'remix-utils/honeypot/react';

// import { } from '@conform-to/react';
import { drizzle } from 'drizzle-orm/d1';
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { SessionStorage } from '~/services/session.server';
import * as schema from '../drizzle/schema.server';
import { z } from 'zod';
import { getZodConstraint, parseWithZod } from '@conform-to/zod';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { checkHoneypot } from '~/services/honeypot.server';
import { useIsPending } from '~/lib/misc';
import { useProfanity } from '~/utils';
import { desc } from 'drizzle-orm';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis/cloudflare';

// import { getFieldsetConstraint, parse } from '@conform-to/zod';

interface Point {
	x: number;
	y: number;
}

type Path = Point[];

// const DrawableCanvas: React.FC = () => {
// 	const canvasRef = useRef<HTMLCanvasElement | null>(null);
// 	const [drawing, setDrawing] = useState(false);
// 	const [paths, setPaths] = useState<Path[]>([]);
// 	const [currentPath, setCurrentPath] = useState<Path>([]);
// 	const [undoPaths, setUndoPaths] = useState<Path[]>([]);
// 	const [redoPaths, setRedoPaths] = useState<Path[]>([]);

// 	const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
// 		const { offsetX, offsetY } = event.nativeEvent;
// 		setDrawing(true);
// 		setCurrentPath([{ x: offsetX, y: offsetY }]);
// 	};

// 	const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
// 		if (!drawing) return;

// 		const { offsetX, offsetY } = event.nativeEvent;
// 		setCurrentPath(prevPath => [...prevPath, { x: offsetX, y: offsetY }]);
// 	};

// 	const endDrawing = () => {
// 		setDrawing(false);
// 		if (currentPath.length > 0) {
// 			setPaths(prevPaths => [...prevPaths, currentPath]);
// 			setUndoPaths(prevUndoPaths => [...prevUndoPaths, currentPath]);
// 			setCurrentPath([]);
// 			setRedoPaths([]); // Clear redo paths when new drawing is added
// 		}
// 	};

// 	const drawSmoothPath = (ctx: CanvasRenderingContext2D, path: Path) => {
// 		if (path.length < 2) return;

// 		ctx.beginPath();
// 		ctx.moveTo(path[0].x, path[0].y);

// 		for (let i = 1; i < path.length - 2; i++) {
// 			const cpX = (path[i].x + path[i + 1].x) / 2;
// 			const cpY = (path[i].y + path[i + 1].y) / 2;
// 			ctx.quadraticCurveTo(path[i].x, path[i].y, cpX, cpY);
// 		}

// 		ctx.quadraticCurveTo(
// 			path[path.length - 2].x,
// 			path[path.length - 2].y,
// 			path[path.length - 1].x,
// 			path[path.length - 1].y,
// 		);

// 		ctx.stroke();
// 	};

// 	useEffect(() => {
// 		const canvas = canvasRef.current;
// 		if (!canvas) return;
// 		const ctx = canvas.getContext('2d');
// 		if (!ctx) return;

// 		ctx.clearRect(0, 0, canvas.width, canvas.height);
// 		ctx.strokeStyle = 'black'; // Set the drawing color to black
// 		ctx.lineWidth = 2; // Adjust the line width for better smoothing

// 		paths.forEach(path => {
// 			drawSmoothPath(ctx, path);
// 		});

// 		if (currentPath.length > 0) {
// 			drawSmoothPath(ctx, currentPath);
// 		}
// 	}, [paths, currentPath]);

// 	const handleUndo = () => {
// 		if (undoPaths.length === 0) return;
// 		const newUndoPaths = [...undoPaths];
// 		const lastPath = newUndoPaths.pop();
// 		setUndoPaths(newUndoPaths);
// 		if (lastPath) {
// 			setPaths(prevPaths =>
// 				prevPaths.filter((_, index) => index !== prevPaths.length - 1),
// 			);
// 			setRedoPaths(prevRedoPaths => [...prevRedoPaths, lastPath]);
// 		}
// 	};

// 	const handleRedo = () => {
// 		if (redoPaths.length === 0) return;
// 		const newRedoPaths = [...redoPaths];
// 		const redoPath = newRedoPaths.pop();
// 		setRedoPaths(newRedoPaths);
// 		if (redoPath) {
// 			setPaths(prevPaths => [...prevPaths, redoPath]);
// 			setUndoPaths(prevUndoPaths => [...prevUndoPaths, redoPath]);
// 		}
// 	};

// 	const handleSave = () => {
// 		const dataStr = JSON.stringify(paths);
// 		const blob = new Blob([dataStr], { type: 'application/json' });
// 		const url = URL.createObjectURL(blob);
// 		const a = document.createElement('a');
// 		a.href = url;
// 		a.download = 'drawing.json';
// 		document.body.appendChild(a);
// 		a.click();
// 		document.body.removeChild(a);
// 	};

// 	const handleReset = () => {
// 		setPaths([]);
// 		setUndoPaths([]);
// 		setRedoPaths([]);
// 		setCurrentPath([]);
// 	};

// 	const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		const file = event.target.files?.[0];
// 		if (!file) return;

// 		const reader = new FileReader();
// 		reader.onload = e => {
// 			const text = e.target?.result;
// 			if (text) {
// 				try {
// 					const loadedPaths: Path[] = JSON.parse(text as string);
// 					setPaths(loadedPaths);
// 					setUndoPaths(loadedPaths);
// 					setRedoPaths([]);
// 				} catch (err) {
// 					console.error('Error parsing JSON:', err);
// 					alert(
// 						'Failed to load the drawing. Make sure the file format is correct.',
// 					);
// 				}
// 			}
// 		};

// 		reader.readAsText(file);
// 	};

// 	return (
// 		<div>
// 			<canvas
// 				ref={canvasRef}
// 				width={600}
// 				height={400}
// 				style={{ border: '1px solid black', cursor: 'crosshair' }}
// 				onMouseDown={startDrawing}
// 				onMouseMove={draw}
// 				onMouseUp={endDrawing}
// 				onMouseLeave={endDrawing}
// 			/>
// 			<div style={{ marginTop: '10px' }}>
// 				<button onClick={handleUndo} disabled={undoPaths.length === 0}>
// 					Undo
// 				</button>
// 				<button onClick={handleRedo} disabled={redoPaths.length === 0}>
// 					Redo
// 				</button>
// 				<button onClick={handleSave}>Save</button>
// 				<button onClick={handleReset}>Reset</button>
// 				<input type="file" accept=".json" onChange={handleLoad} />
// 			</div>
// 		</div>
// 	);
// };

// export default DrawableCanvas;

const GuestBookSchema = z.object({
	message: z
		.string({
			required_error: 'Message is required',
		})
		.min(10, "Message can't be too short"),
	// .refine(async msg => {
	// 	const data = await useProfanity(msg);
	// 	console.log('value');
	// 	console.log(data);
	// 	console.log('value');
	// 	// return ().isProfanity;
	// 	return data.isProfanity;
	// }, "Message can't contain profanity"),
});

export async function loader({ request, context }: LoaderFunctionArgs) {
	// await SessionStorage.requireUser(context, request);
	let data = await SessionStorage.returnUser(context, request);

	// if (data?.type != 'nees') {
	// 	throw new Response('Unauthorized', {
	// 		status: 401,
	// 		statusText: 'Unauthorized',
	// 		cf: { cacheTtl: 0 },
	// 	});
	// }

	const db = drizzle(context.env.DB, {
		schema,
	});

	// let guestbooks = (await db.query.guestBook.findMany()).reverse().limit(5);
	let guestbooks = await db
		.select()
		.from(schema.guestBook)
		.orderBy(desc(schema.guestBook.id))
		.limit(30)
		.offset(0);

	return json({ data, guestbooks });
}

export async function action({ request, context }: ActionFunctionArgs) {
	let formData = await request.formData();

	const ratelimit = new Ratelimit({
		redis: Redis.fromEnv(context.env),
		limiter: Ratelimit.fixedWindow(3, '60 m'),
		enableProtection: true,
		analytics: true,
	});

	const ip =
		request.headers.get('X-Forwarded-For') ?? request.headers.get('x-real-ip');

	const identifier = ip ?? 'global';

	// checkHoneypot(formData);
	// await SessionStorage.requireAnonymous(context, request);
	const submission = await parseWithZod(formData, {
		schema: intent =>
			GuestBookSchema.transform(async (data, ctx) => {
				if (intent !== null) return { ...data, session: null };

				const session = await SessionStorage.readUser(context, request);

				if (!session) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'You must be logged in to post',
					});
					return z.NEVER;
				}

				if ((await useProfanity(data.message)).isProfanity) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['message'],
						params: {
							type: 'profanity',
						},
						message: "Message can't contain profanity.",
					});
					return z.NEVER;
				}

				const { success, limit, remaining, reset } =
					await ratelimit.limit(identifier);

				if (!success) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						path: ['message'],
						params: {
							type: 'rateLimit',
							limit,
							remaining,
							reset,
						},
						message: 'Too many messages. Try again later.',
					});
					return z.NEVER;
				}

				return { ...data, session, limit, remaining, reset };
			}),
		async: true,
	});

	if (submission.status !== 'success' || !submission.value.session) {
		return json(
			{
				submission: submission.reply({
					// resetForm: true,
				}),
			},
			{
				status: 400,
				// headers: {
				// 	'X-RateLimit-Limit': limit.toString(),
				// 	'X-RateLimit-Remaining': remaining.toString(),
				// 	'X-RateLimit-Reset': reset.toString(),
				// },
			},
		);
	}

	const { message, limit, remaining, reset } = submission.value;

	let db = drizzle(context.env.DB, {
		schema,
	});

	await db.insert(schema.guestBook).values({
		message: message,
		authorId: submission.value.session.id!,
		email: submission.value.session.email!,
		name: submission.value.session.name!,
	});

	return json(
		{ submission },
		{
			headers: {
				'X-RateLimit-Limit': limit.toString(),
				'X-RateLimit-Remaining': remaining.toString(),
				'X-RateLimit-Reset': reset.toString(),
			},
		},
	);
}
export default function Page() {
	const { data, guestbooks } = useLoaderData<typeof loader>();
	const isPending = useIsPending();
	const lastResult = useActionData<typeof action>();
	const formRef = useRef<HTMLFormElement>(null);

	// let isSubmitting = fetcher.state !== 'idle';

	const [form, fields] = useForm({
		id: 'guestbook',
		// onSubmit(event, context) {
		// 	event.preventDefault();
		// 	formRef.current?.submit();
		// 	formRef.current?.reset();
		// 	return context.submission?.status === 'success';
		// },
		constraint: getZodConstraint(GuestBookSchema),
		lastResult: lastResult?.submission,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: GuestBookSchema });
		},
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	});

	return (
		<div>
			<h1 className="text-3xl font-bold">Sign My Guestbook</h1>
			<br />
			{data?.id ? (
				<Form
					ref={formRef}
					method="POST"
					className="w-[50vw]"
					{...getFormProps(form)}
				>
					<HoneypotInputs />
					<div className="flex gap-4">
						<Input
							// type="text"
							// name="message"
							// {...conform.input(fields.title)}
							className="min-w-[30vw]"
							placeholder="Leave your kind message..."
							aria-invalid={fields.message.errorId ? true : undefined}
							aria-describedby={fields.message.errorId}
							{...getInputProps(fields.message, { type: 'text' })}
							{...{
								autoFocus: true,
								autoComplete: 'off',
							}}
						/>

						<input type="hidden" name="_intent" value="guestbook" />
						<Button disabled={isPending} type="submit" variant="outline">
							{isPending ? 'Loading...' : 'Send Message'}
						</Button>
					</div>
					{fields.message.errors ? (
						<p id={fields.message.errorId} className="mt-2 text-red-500">
							{fields.message.errors[0]}
						</p>
					) : (
						''
					)}
				</Form>
			) : (
				<Form action="/auth/github" method="POST">
					<Button
						type="submit"
						className="flex items-center justify-center gap-3"
						variant="outline"
					>
						<GitHubLogoIcon /> Sign in with GitHub
					</Button>
				</Form>
			)}

			<ul className="mt-4 flex flex-col gap-3">
				{guestbooks.map(i => (
					<li key={i.id}>
						<strong>{i.name} : </strong> {i.message}
					</li>
				))}
			</ul>

			{/* {JSON.stringify(lastResult, null, 2)} */}
		</div>
	);
}

// export async function clientAction({
// 	request,
// 	serverAction,
// }: ClientActionFunctionArgs) {
// 	let formData = await request.formData();
// 	// validateFormData(formData);
// 	return await serverAction<typeof action>();
// }
