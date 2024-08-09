import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const kbdVariants = cva(
	'w-fit inline-flex items-center tracking-loose font-atkinson whitespace-nowrap rounded-md border text-sm tracking-tight text-[16px] bg-[var(--accents-1)] border-[var(--accents-2)]',
	{
		variants: {
			size: {
				default: 'px-2 py-0',
				sm: 'px-1 py-0.5 text-xs',
				lg: 'px-3 py-1.5 text-base',
			},
		},
		defaultVariants: {
			size: 'default',
		},
	},
);

export interface KbdProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof kbdVariants> {
	asChild?: boolean;
}

const KBD = React.forwardRef<HTMLElement, KbdProps>(
	({ className, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'span';
		return (
			<Comp
				className={cn(kbdVariants({ size, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
KBD.displayName = 'Kbd';

export { KBD, kbdVariants };
