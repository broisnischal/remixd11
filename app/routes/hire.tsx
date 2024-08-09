import { Link } from '@remix-run/react';
import DevStack from '~/components/devstack';
import { ConnectButton } from '~/components/ui-library/tailwindbutton';
import { Button } from '~/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { useIsPending } from '~/lib/misc';
import { SoftwareTools } from './_index';
import { MetaCreator } from '~/utils/meta';
import { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = ({ location }) => {
	const url = new URL('https://nischal-dahal.com.np');

	const metadata = MetaCreator({
		title: `Nischal Dahal | Guestbook `,
		description: `Passionate software engineer and full stack developer with expertise in
				backend development and DevOps. Skilled in a wide array of technologies,
				frameworks, databases, and tools. Experienced content creator and
				editor. Committed to building efficient, secure, and innovative
				solutions.`,
		image: '/ogimg.png',
		url: `${url.origin}${location.pathname}`,
	});

	return [...metadata];
};

export default function Page() {
	const isPending = useIsPending();

	return (
		<div className="flex flex-col items-start gap-4">
			<h1 className="text-3xl font-bold">🤝 Let's work together</h1>
			<p className="secondary">
				Passionate software engineer and full stack developer with expertise in
				backend development and DevOps. Skilled in a wide array of technologies,
				frameworks, databases, and tools. Experienced content creator and
				editor. Committed to building efficient, secure, and innovative
				solutions.
			</p>
			<p className="secondary">
				I'm actively looking for a new role as a Full Stack Developer. Please
				check out{' '}
				<Link
					target="_blank"
					rel="noopener"
					className="underline"
					to={'https://myresume.fly.dev/r/testingg'}
				>
					myresume
				</Link>{' '}
				and{' '}
				<a className="underline" href="mailto:info@nischal-dahal.com.np">
					contact me
				</a>
				!
			</p>
			<a href="https://rxresu.me/broisnischal/nischal-job" target="_blank">
				<ConnectButton>View My Resume</ConnectButton>
			</a>
			<br />
			<DevStack />
			<br />
			<h2 className=" text-2xl font-bold tracking-wide">Featuring</h2>
			<ul className="secondary list-disc pl-10">
				<li>Full stack development,</li>
				<li> Product Designer, and Graphic designing skills, </li>
				<li> Keen to Learn, other things like DevOps and AI </li>
				<li> 🏡 Fully remote </li>
				<li>🏖️ Unlimited paid time off</li>
			</ul>
			<br />
			<SoftwareTools />
			<br />
			<div className="div flex w-full flex-col">
				<h1 className="mb-3 font-nunito text-xl">
					💯 What people think of me?
				</h1>

				<div className="flex w-full flex-col gap-2">
					<div className="div flex gap-2">
						<Input placeholder="Leave your testimonial here..." />
						<Button variant={'outline'} disabled={isPending} type="submit">
							{isPending ? 'Loading...' : 'Send Message'}
						</Button>
					</div>
					<small>
						I love to hear from you. Your feedback is important to me.
					</small>
				</div>

				{/* <div className="flex flex-col gap-4 ">
					{testimonials.map(testimonial => (
						<CardList key={testimonial.name} {...testimonial} />
					))}
				</div> */}
			</div>
		</div>
	);
}

const CardList = (data: {
	name: string;
	link?: string;
	message: string;
	company: string;
}) => {
	return <div className="border-3 border-2">{data.name}</div>;
};

const testimonials: {
	name: string;
	link?: string;
	message: string;
	company: string;
}[] = [
	{
		name: 'Sandes thapa',
		message:
			"Nischal's expertise in full stack development is unparalleled. His problem-solving skills are exceptional and he consistently delivers high-quality results.",
		company: 'Tech Innovators',
	},
	{
		name: 'Pedro ',
		link: 'https://janesmith.com',
		message:
			'Working with Nischal was a game-changer for our project. His innovative approach and deep knowledge in technology made a huge impact.',
		company: 'Remix',
	},
	{
		name: 'Alice Johnson',
		link: 'https://alicejohnson.com',
		message:
			"Nischal's dedication and attention to detail are truly commendable. His contributions significantly enhanced our team's productivity and project outcomes.",
		company: 'NextGen Technologies',
	},
	{
		name: 'Bob Brown',
		link: 'https://bobbrown.com',
		message:
			"Nischal's ability to adapt and implement complex systems is impressive. His collaborative spirit and technical skills make him a valuable asset to any team.",
		company: 'FutureTech',
	},
];
