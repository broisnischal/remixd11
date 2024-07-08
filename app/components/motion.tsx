import React from 'react';
import { motion } from 'framer-motion';
export default function Motion(props: {
	children: React.ReactChild | React.ReactFragment | React.ReactPortal;
}) {
	return (
		<motion.div
			className="mx-auto flex h-screen w-full "
			initial={{ y: -50 }}
			animate={{ y: 0 }}
			// exit={{ opacity: 0, x: -100 }}
			transition={{ duration: 0.5 }}
		>
			{props.children}
		</motion.div>
	);
}
