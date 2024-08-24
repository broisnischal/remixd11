import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';

export default function Chat() {
	const [showCal, setShowCal] = useState(false);

	return (
		<div>
			<h1 className="text-3xl font-bold">Start Chat!</h1>
			<br />
			<p className="mb-3">
				I am very happy to start a conversation with you. I will be happy to
				help you in tech, related to any of your query. I am very keen and
				passonated about learning and sharing ideas.
				<br />
				<br />
				If you are interested in getting in touch with me, please feel free to
				meet me, I would be more than happy to help, I deeply value my time, and
				I’m sure you do too, so I would appreciate it if you come prepared with
				some initial research and questions in mind. I am looking forward have a
				short while meaningful chat with you!
			</p>
			<a target="_blank" href="https://cal.com/nischal-dahal/idea">
				<Button variant={'outline'} size={'sm'}>
					<Calendar className="mr-2 h-4 w-4" />
					Book a Chat
				</Button>
			</a>
		</div>
	);
}

// function CalEmbed() {
// 	useEffect(() => {
// 		(async function () {
// 			const cal = await getCalApi({ namespace: 'idea' });
// 			cal('ui', {
// 				styles: { branding: { brandColor: '#000000' } },
// 				hideEventTypeDetails: true,
// 				layout: 'month_view',
// 			});
// 		})();
// 	}, []);

// 	return (
// 		<div className="relative h-full w-full overflow-hidden ">
// 			<div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
// 				hello
// 				<Cal
// 					namespace="consult"
// 					calLink="nischal-dahal/idea"
// 					config={{ layout: 'month_view' }}
// 				/>
// 			</div>
// 		</div>
// 	);
// }
