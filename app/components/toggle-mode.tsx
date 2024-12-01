import { Moon, Sun } from 'lucide-react';
import { Theme, useTheme } from 'remix-themes';

import { Button } from './ui/button';

export function ModeToggle() {
	const [theme, setTheme] = useTheme();

	function applyTheme() {
		if (typeof window !== 'undefined') {
			if (
				localStorage.theme === 'dark' ||
				(!('theme' in localStorage) &&
					window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}

	function setSystemTheme() {
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			setTheme(Theme.DARK);
		} else {
			setTheme(Theme.LIGHT);
		}
	}

	return (
		// <Button variant="secondary" size="icon">

		// </Button>
		<div className="mr-1 grid cursor-pointer place-content-center">
			<Sun
				onClick={() => {
					setTheme(Theme.DARK);
					applyTheme();
				}}
				className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				onClick={() => {
					setTheme(Theme.LIGHT);
					applyTheme();
				}}
				className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span className="sr-only">Toggle theme</span>
		</div>
	);
}
