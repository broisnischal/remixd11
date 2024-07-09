import { Outlet } from '@remix-run/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Motion from '~/components/motion';

export default function Page() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<Outlet />
			<h1>Learning Framer Motion</h1>
			<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
				Hover Me
			</motion.button>
			<motion.div
				onClick={() => setIsOpen(!isOpen)}
				animate={{ height: isOpen ? 200 : 50 }}
				transition={{ duration: 0.3 }}
			>
				Toggle Content
			</motion.div>
		</div>
	);
}
