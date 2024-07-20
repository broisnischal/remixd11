import { Link } from '@remix-run/react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '~/components/ui/card';

export default function Page() {
	return (
		<div className="flex flex-col items-start gap-4">
			<br />
			<h1 className="text-3xl font-bold">🤝 let's work together</h1>

			<p>
				I'm actively looking for a new role as a Full Stack Developer. Please
				check out my{' '}
				<Link
					target="_blank"
					rel="noopener"
					to={'https://myresume.fly.dev/r/testingg'}
				>
					resume
				</Link>{' '}
				and contact me!
			</p>

			<h2 className=" text-2xl font-bold tracking-wide">Featuring</h2>

			<ul className="list-disc pl-10">
				<li> Frontend and Backend Development </li>
				<li> Mobile Development with Flutter </li>
				<li> Product Designer, and Graphic Designer </li>

				<li> Learning DevOps and AI </li>
			</ul>
			<br />
			<h1 className="text-3xl font-bold">What People Say?</h1>
			<div className="grid  grid-cols-1 grid-rows-1 gap-4 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<h2 className="text-xl font-bold">Sandes Thapa</h2>
					</CardHeader>
					<CardContent>
						<p>
							Working with nees was the best decision I made. He has been
							pushing his limit so far in shortest duration as possible.
						</p>
					</CardContent>
					<CardFooter>
						<h2>CTO at Prisma</h2>
					</CardFooter>
				</Card>
				<Card className="lg:col-span-2">
					<CardHeader>
						<h2 className="text-xl font-bold">Antfu</h2>
					</CardHeader>
					<CardContent>
						<p>
							Nees's tutorial videos are clear and concise. Their production
							value is top notch. Well done! 👍🏻 Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Voluptatibus, sapiente.
						</p>
					</CardContent>
					<CardFooter>
						<h2>Maintainer at VITE</h2>
					</CardFooter>
				</Card>
				<Card className="lg:col-span-3">
					<CardHeader>
						<h2 className="text-xl font-bold">Dave Kelman</h2>
					</CardHeader>
					<CardContent>
						<p>
							I really like the pace and tone of Brad's videos. They are very
							relaxed but still dense with information. Looking forward to the
							next one!
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
