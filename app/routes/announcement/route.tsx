import { Highlight } from '../_landing.about/route';

export default function Page() {
	return (
		<div className="min-w-[70vh] font-sans">
			{/* <h1 className="font-mono italic">Announcements</h1> */}

			<div className="flex gap-4">
				<div className="flex flex-col items-start gap-4">
					{announcements.map((data, index) => (
						<AnnouncementCard key={index} {...data} />
					))}
				</div>

				<div className="flex min-w-[30%] flex-col items-start gap-2">
					<h1 className="font-bold">Others Update</h1>

					<div className="flex flex-col items-start gap-4 rounded-md border p-3">
						<h1 className="italic">Speaking at TechConf</h1>
						<p className="text-sm">
							I'll be giving a talk on "The Future of Web Development" at
							TechConf 2023.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

const announcements: IAnnouncement[] = [
	{
		title: 'Creating content related to Websockets!',
		description:
			'I will be creating content related to websockets, including videos, posts and more. This will include tutorials, guides and more.',
		hashTag: ['#content', '#websockets'],
		link: 'https://linkedin.com/in/broisnischal',
		image: 'https://hookdeck.com/_astro/websockets.mp2H5Nf0_1R51gG.webp',
	},
	{
		title: 'Webhook',
		description: 'Short about how webhook works, and how you can use it.',
		hashTag: ['#api', '#webhook'],
		link: 'https://github.com/broisnischal',
	},
];

interface IAnnouncement {
	title: string;
	description: string;
	hashTag: string[];
	link: string;
	image?: string;
}

export function AnnouncementCard(data: IAnnouncement) {
	return (
		<div className="group relative flex flex-col gap-2 rounded-md border px-4 py-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-center gap-2">
					<img
						src="https://avatars.githubusercontent.com/u/98168009?v=4"
						className="h-5 w-5 rounded-full"
					/>
					<span className="font-reader">Nischal Dahal</span>
				</div>
				<span className="secondary text-sm">Dec 01</span>
			</div>

			<div className=" font-atkinson text-xl font-bold  sm:mb-0">
				{data.title}
			</div>
			<div className="font-atkinson text-sm sm:mb-0">{data.description}</div>
			<div className="flex flex-wrap gap-2">
				{data.hashTag.map((tag, index) => (
					<Highlight key={index}>{tag}</Highlight>
				))}
			</div>

			<a href={data.link} target="_blank" className="secondary text-sm ">
				{data.link}
			</a>

			{data.image && (
				<img
					src={data.image}
					alt={data.title}
					className=" rounded-md border-2 border-zinc-200/5 object-cover object-center shadow-lg"
				/>
			)}
		</div>
	);
}
