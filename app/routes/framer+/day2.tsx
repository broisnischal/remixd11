import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Fragment, useState } from 'react';
import { GrNotification } from 'react-icons/gr';
import { MdKeyboardArrowRight } from 'react-icons/md';
import useMeasure from 'react-use-measure';
import Hr from '~/components/hr';

export default function Page() {
	return (
		<div>
			<h1 className="text-xl font-bold">Day 2 of Framer Motion</h1>

			<br />

			<Test />
		</div>
	);
}

export function Test() {
	const [isOpen, setIsVisible] = useState(false);

	const onClickHandler = () => setIsVisible(!isOpen);

	const [ref, { height }] = useMeasure();

	return (
		<MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0.05 }}>
			<motion.div
				animate={{ height }}
				className="overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-[0_2px_10px_rgba(0,0,0,.05)]"
			>
				<div ref={ref} className="relative flex w-[340px] flex-col">
					<div className="flex items-center gap-3 p-3">
						<motion.div
							initial={{ width: 48, height: 48 }}
							animate={{ width: isOpen ? 36 : 48, height: isOpen ? 36 : 48 }}
							className="flex aspect-square items-center justify-center rounded-lg bg-[#F4F4F7] text-xl text-[#b0b0b0]"
						>
							<GrNotification />
						</motion.div>
						<div className="flex grow flex-col">
							<motion.h2 layout className="font-medium">
								5 New Activities
							</motion.h2>
							<AnimatePresence initial={false}>
								{!isOpen ? (
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1, transition: { duration: 0.5 } }}
										exit={{ opacity: 0 }}
										className="text-sm text-[#A1A1A1]"
									>
										What&apos;s happening around you
									</motion.p>
								) : null}
							</AnimatePresence>
						</div>
						<motion.button
							animate={{ rotateX: isOpen ? 180 : 0 }}
							className="text-2xl text-[#A5A1AD]"
							onClick={onClickHandler}
						>
							<ChevronDown />
						</motion.button>
					</div>

					<AnimatePresence>
						{isOpen ? (
							<div className="relative">
								<motion.div
									initial={{ opacity: 0 }}
									animate={{
										opacity: 1,
									}}
									exit={{ opacity: 0, position: 'absolute' }}
									className="top-0 w-full"
								>
									{Array.from({ length: 5 }).map((_, index) => (
										<Fragment key={index}>
											<div className="flex h-12 items-center justify-between pl-4 pr-2">
												<div>
													<h2 className="text-sm font-medium text-[#7d7d7d]">
														5 New Activities
													</h2>
													<p className="text-xs text-[#A1A1A1]">
														You can do it
													</p>
												</div>
												<button className="text-xl text-[#A1A1A1]">
													<MdKeyboardArrowRight />
												</button>
											</div>
											{index !== 4 && <Hr className="my-0 bg-black/5" />}
										</Fragment>
									))}
								</motion.div>
							</div>
						) : null}
					</AnimatePresence>
				</div>
			</motion.div>
		</MotionConfig>
		// <div className=" w-[400px]">
		// 	<MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}>
		// 		<motion.div
		// 			animate={{
		// 				height: height,
		// 			}}
		// 		>
		// 			<div
		// 				ref={ref}
		// 				className="relative flex  w-[400px] select-none flex-col gap-5 rounded-md border border-[#EEEEEE] bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,.02)]"
		// 			>
		// 				<div className="flex items-center justify-between gap-5">
		// 					<div className="flex items-center gap-2">
		// 						<motion.div
		// 							initial={{ width: 30, height: 30 }}
		// 							animate={{
		// 								width: isVisible ? 30 : 48,
		// 								height: isVisible ? 30 : 48,
		// 							}}
		// 							className="div mr-5 grid place-content-center items-center justify-center rounded-md bg-[#F2F2F2] p-4"
		// 						>
		// 							<Rss size={20} />
		// 						</motion.div>
		// 						<div className="div flex flex-col ">
		// 							<h2>5 new notifications</h2>
		// 							{!isVisible && (
		// 								<motion.p
		// 									initial={{ opacity: 0 }}
		// 									animate={{ opacity: 1 }}
		// 									exit={{ opacity: 0, height: 0 }}
		// 									className="text-sm text-[#A1A1A1]"
		// 								>
		// 									Whats happening around you?
		// 								</motion.p>
		// 							)}
		// 						</div>
		// 					</div>
		// 					<div className="cursor-pointer">
		// 						{!isVisible ? (
		// 							<ChevronDown onClick={() => setIsVisible(!isVisible)} />
		// 						) : (
		// 							<ChevronUp onClick={() => setIsVisible(!isVisible)} />
		// 						)}
		// 					</div>
		// 				</div>
		// 				<AnimatePresence>
		// 					{isVisible ? (
		// 						<div className="relative">
		// 							<motion.div
		// 								initial={{ opacity: 0 }}
		// 								animate={{
		// 									opacity: 1,
		// 								}}
		// 								exit={{ opacity: 0, position: 'absolute' }}
		// 								className="top-0 w-full"
		// 							>
		// 								{Array.from({ length: 5 }).map((_, index) => (
		// 									<Fragment key={index}>
		// 										<div className="flex h-12 items-center justify-between pl-4 pr-2">
		// 											<div>
		// 												<h2 className="text-sm font-medium text-[#7d7d7d]">
		// 													5 New Activities
		// 												</h2>
		// 												<p className="text-xs text-[#A1A1A1]">
		// 													You can do it
		// 												</p>
		// 											</div>
		// 											<button className="text-xl text-[#A1A1A1]">
		// 												<MdKeyboardArrowRight />
		// 											</button>
		// 										</div>
		// 										{index !== 4 && <Hr className="my-0 bg-black/5" />}
		// 									</Fragment>
		// 								))}
		// 							</motion.div>
		// 						</div>
		// 					) : null}
		// 				</AnimatePresence>
		// 				{/* <AnimatePresence>
		// 					<div className="relative">
		// 						{isVisible && (
		// 							<motion.div
		// 								initial={{ opacity: 0 }}
		// 								animate={{
		// 									opacity: 1,
		// 								}}
		// 								exit={{ opacity: 0, position: 'absolute' }}
		// 								className="top-0 w-full"
		// 							>
		// 								{isVisible &&
		// 									Array.from({ length: 3 }).map((_, index) => (
		// 										<Fragment key={index}>
		// 											<Item key={index} />
		// 										</Fragment>
		// 									))}
		// 							</motion.div>
		// 						)}
		// 					</div>
		// 				</AnimatePresence> */}
		// 			</div>
		// 		</motion.div>
		// 	</MotionConfig>
		// </div>
	);
}

const Item = () => {
	return (
		<div className="flex justify-between text-zinc-500">
			<div className="div">
				<div className="div flex flex-col">
					<h1>5 new Activity</h1>
					<p>Whats happening around you?</p>
				</div>
				<small>You can do it </small>
			</div>
			<ChevronRight />
		</div>
	);
};

// export const MyComponent = ({ isVisible }: { isVisible: boolean }) => (
// 	<MotionConfig
// 		transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
// 	></MotionConfig>
// );
