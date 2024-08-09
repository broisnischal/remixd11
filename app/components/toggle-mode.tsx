import { Moon, Sun } from 'lucide-react';
import { Theme, useTheme } from 'remix-themes';

import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

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
		// <DropdownMenu>
		// 	<DropdownMenuTrigger asChild>
		// 		<Button variant="ghost" size="icon">
		// 			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
		// 			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		// 			<span className="sr-only">Toggle theme</span>
		// 		</Button>
		// 	</DropdownMenuTrigger>
		// 	<DropdownMenuContent align="end">
		// 		<DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
		// 			Light
		// 		</DropdownMenuItem>
		// 		<DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
		// 			Dark
		// 		</DropdownMenuItem>
		// 		<DropdownMenuItem onClick={() => setSystemTheme()}>
		// 			System
		// 		</DropdownMenuItem>
		// 	</DropdownMenuContent>
		// </DropdownMenu>
		<Button variant="outline" size="icon">
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
		</Button>
	);
}
