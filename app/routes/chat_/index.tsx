import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';

export default function Chat() {
	const [showCal, setShowCal] = useState(false);

	return (
		<div>
			<h1 className="text-4xl font-bold">
				Start <span className="text-green-500">Chat</span>
			</h1>
			<p className="mb-4 mt-2 font-mono">
				I'm happy to chat with you about tech or answer any questions you may
				have. If you'd like to schedule a call, please feel free to book a time
				that works for you. I value our time and appreciate it if you come
				prepared with some initial research and questions in mind.
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
