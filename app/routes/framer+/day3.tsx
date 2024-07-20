import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import useMeasure from 'react-use-measure';

export default function Page() {
	return (
		<div>
			<h1 className="text-xl font-bold">Day 3 of Framer Motion</h1>

			<br />
			<Test />
		</div>
	);
}

const Test = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [ref, { height, bottom }] = useMeasure();

	const onClickHandler = () => setIsOpen(!isOpen);

	return (
		<div className="rounded-md border shadow ">
			<LayoutGroup id="layout">
				<ToggleContent
					header={<div>Thiis is a header</div>}
					content={
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Perspiciatis nisi unde incidunt libero excepturi, eveniet nobis
							enim inventore? Ratione, fugiat.
						</div>
					}
				/>
				<ToggleContent
					header={<div>Thiis is the first header</div>}
					content={
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
							dolorem nesciunt ab facilis. Similique cumque adipisci eaque
							nesciunt incidunt quod.
						</div>
					}
				/>
				<ToggleContent
					header={<div>Thiis is the second header</div>}
					content={
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
							dolorem nesciunt ab facilis. Similique cumque adipisci eaque
							nesciunt incidunt quod.
						</div>
					}
				/>
				<ToggleContent
					header={<div>Thiis is the third header</div>}
					content={
						<div>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
							dolorem nesciunt ab facilis. Similique cumque adipisci eaque
							nesciunt incidunt quod.
						</div>
					}
				/>
			</LayoutGroup>
		</div>
	);
};

function ToggleContent({ header, content }) {
	const [isOpen, setIsOpen] = useState(false);
	// const [ref, { height, bottom }] = useMeasure();

	return (
		<motion.div
			className="min-w-[50vw] max-w-[50vw] select-none border-b-[1px] p-2"
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={() => setIsOpen(!isOpen)}
		>
			<motion.h2 layout className="flex justify-between">
				{header}
				<motion.div
					layout
					initial={{ rotate: isOpen ? 180 : 0 }}
					animate={{ rotate: isOpen ? 0 : 180 }}
					exit={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.5, ease: 'anticipate' }}
				>
					<ChevronDown className="cursor-pointer" />
				</motion.div>
			</motion.h2>
			{isOpen ? content : null}
		</motion.div>
	);
}

function Tab({ label, isSelected }) {
	return (
		<li>
			{label}
			{isSelected ? (
				<motion.div transition={{ duration: 5 }} layoutId="underline" />
			) : null}
		</li>
	);
}

function TabRow({ items }) {
	return items.map(item => <Tab {...item} />);
}

// <button onClick={onClickHandler}>{isOpen ? 'Close' : 'Open'}</button>
// 			<AnimatePresence>
// 				{isOpen && (
// 					<div className="fixed left-0 top-0 isolate z-50 flex h-full w-full items-center justify-center">
// 						<AnimatePresence mode="popLayout">
// 							<motion.div
// 								ref={ref}
// 								layout
// 								initial={{ opacity: 0 }}
// 								animate={{ opacity: 1 }}
// 								exit={{ opacity: 0 }}
// 								transition={{ duration: 3 }}
// 								// className="w-1/3 rounded-lg bg-slate-50 p-5 "
// 								className="absolute inset-0 isolate -z-10 bg-[#D3D7DB]"
// 								onClick={onClickHandler}
// 							>
// 								<h1>Main</h1>
// 								<p>
// 									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
// 									Praesentium, doloremque.
// 								</p>
// 								{/* <motion.h2 layoutId="h2-layout" className={`tracking-tight`}>
// 								Rabbit R1
// 							</motion.h2> */}
// 							</motion.div>
// 						</AnimatePresence>
// 					</div>
// 				)}
// 			</AnimatePresence>
