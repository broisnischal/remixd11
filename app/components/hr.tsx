import { cn } from '~/lib/utils';
import React from 'react';

interface Props {
	className?: string;
}

export default function Hr({ className }: Props) {
	return (
		<div
			className={cn('my-4 h-px w-full bg-black/20 dark:bg-white/10', className)}
		/>
	);
}
