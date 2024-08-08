// @ts-expect-error
import { Mermaid } from 'mdx-mermaid/Mermaid';

export default function MermaidChart({ chart }: { chart: string }) {
	return (
		<div className="m-auto flex items-center justify-center ">
			<Mermaid
				config={{
					//default,base,mforest,dark,neutral,null,auto
					// mermaid: 'auto',
					// theme: {
					// 	dark: 'base',
					// 	light: 'base',
					// },
					theme: {
						dark: 'neutral',
						light: 'neutral',
					},
				}}
				chart={chart}
			/>
		</div>
	);
}

// import React, { useEffect } from 'react';
// import mermaid from 'mermaid';

// export interface MermaidProps {
// 	text: string;
// }

// const Mermaid: React.FC<MermaidProps> = ({ text }) => {
// 	const ref = React.useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		mermaid.mermaidAPI.initialize({
// 			startOnLoad: true,
// 			securityLevel: 'loose',
// 			theme: 'forest',
// 			logLevel: 5,
// 		});
// 	});

// 	useEffect(() => {
// 		if (ref.current && text !== '') {
// 			// @ts-expect-error
// 			mermaid.mermaidAPI.render('preview', text, result => {
// 				if (ref.current) {
// 					ref.current.innerHTML = result;
// 				}
// 			});
// 		}
// 	}, [text]);

// 	return <div key="preview" ref={ref} />;
// };

// export default Mermaid;
