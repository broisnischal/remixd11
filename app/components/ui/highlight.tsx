import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const highlightVariants = cva(
	'inline-flex items-center justify-center rounded-lg border px-2 pb-1 pt-[.5px] text-xs font-semibold transition-colors',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-primary/10 text-primary',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive:
					'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
				outline: 'text-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

export interface HighlightProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof highlightVariants> {}

function TextHighlight({ className, variant, ...props }: HighlightProps) {
	return (
		<span
			className={cn(highlightVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { TextHighlight, highlightVariants };
