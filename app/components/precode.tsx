import clsx from 'clsx';
import { CopyButton } from './copybutton.jsx';

export function Pre({
	// @ts-expect-error
	children,
	// @ts-expect-error
	raw,
	buttonClasses = 'absolute top-3 right-3 bg-zinc-900',
	...props
}) {
	const lang = props['data-language'];

	return (
		<pre {...props} className={clsx('relative', props.className)}>
			<div className={'code-header'}>{lang}</div>

			{children}
			<CopyButton text={raw} className={buttonClasses} />
		</pre>
	);
}

// export const Pre = ({ children, raw, ...props }) => {
// 	const lang = props['data-language'];
// 	return (
// 		<pre {...props} className={'p-0'}>
// 			<div className={'code-header'}>{lang}</div>
// 			{children}
// 			<CopyButton text={raw} className={buttonClasses} />
// 		</pre>
// 	);
// };
