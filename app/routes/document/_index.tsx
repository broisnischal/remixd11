import { json, LoaderFunctionArgs } from '@remix-run/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import { SessionStorage } from '~/services/session.server';
import * as schema from '../../drizzle/schema.server';
import { CopyIcon, EyeIcon, TrashIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { useState } from 'react';
import { desc } from 'drizzle-orm';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request, context }: LoaderFunctionArgs) {
	await SessionStorage.requireUser(context, request);
	let data = await SessionStorage.readUser(context, request);

	let db = drizzle(context.env.DB, {
		schema,
	});

	let documents = await db
		.select({
			data: schema.document,
		})
		.from(schema.document)
		.orderBy(desc(schema.document.id));

	if (data?.type != 'nees') {
		throw new Response('Unauthorized', {
			status: 401,
			statusText: 'Opps! You are not nees!',
			cf: { cacheTtl: 0 },
		});
	}

	return json({
		data,
		documents,
	});
}

export default function Index() {
	const { data, documents } = useLoaderData<typeof loader>();

	return (
		<div>
			<h1 className="text-center font-bricolage text-2xl font-bold">
				Personal Data
			</h1>
			<br />
			<div className="flex w-full flex-wrap items-start gap-2">
				{documents.map((item, index) => (
					<Value
						key={index}
						title={item.data.title}
						value={item.data.value}
						hidden={item.data.hidden == 1}
					/>
				))}
			</div>
		</div>
	);
}

export function Value({
	value,
	title,
	hidden,
}: {
	value: string;
	title: string;
	hidden?: boolean;
}) {
	const [isHide, setIsHide] = useState(hidden ?? false);

	return (
		<div>
			<div className="group flex w-[350px] items-center justify-between  rounded-md border bg-zinc-100 p-2 dark:bg-[#1f1f1f]">
				<div className="ml-3 flex items-center gap-2">
					<div>
						<div className="text-xs  text-muted-foreground">{title}</div>
						{isHide ? (
							<div className="font-medium ">
								{hidden ? '*'.repeat(value.length) : value}
							</div>
						) : (
							<div className="">{value}</div>
						)}
					</div>
				</div>
				<div className="ml-3 flex gap-2">
					<Button
						variant="ghost"
						onClick={() => navigator.clipboard.writeText(value)}
						size="icon"
						className="hidden place-content-center group-hover:grid"
					>
						<CopyIcon className="h-5 w-5" />
					</Button>
					{!hidden ? (
						<></>
					) : (
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsHide(prev => !prev)}
						>
							<EyeIcon className="h-5 w-5" />
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
