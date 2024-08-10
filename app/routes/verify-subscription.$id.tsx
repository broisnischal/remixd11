import { json, LoaderFunctionArgs, redirect } from '@remix-run/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import { newsletters } from '~/drizzle/schema.server';

export async function loader({ request, context, params }: LoaderFunctionArgs) {
	const id = params.id;

	const res = await fetch('https://api.useplunk.com/v1/contacts/subscribe', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${context.env.PLUNK_API_KEY}`,
		},
		body: JSON.stringify({
			id: id,
		}),
	});

	const data = (await res.json()) satisfies {
		subscribed: boolean;
		success: boolean;
		contact: string;
	};

	const contact = await fetch(`https://api.useplunk.com/v1/contacts/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${context.env.PLUNK_SECRET_KEY}`,
		},
	});

	const contactresponse = (await contact.json()) satisfies {
		id: string;
		email: string;
		subscribed: boolean;
	};
	console.log(contactresponse);

	const ress = await fetch('https://api.useplunk.com/v1/track', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${context.env.PLUNK_API_KEY}`,
		},
		body: JSON.stringify({
			event: 'subscribed',
			email: contactresponse.email,
			subscribed: contactresponse.subscribed,
			created_at: new Date().toISOString(),
		}),
	});
	const db = drizzle(context.env.DB);

	await db
		.insert(newsletters)
		.values({ email: contactresponse.email, verified: 1 })
		.execute();

	if (data?.subscribed) {
		return redirect('/' + '?subscribed=true');
	}

	return json({
		data,
	});
}
