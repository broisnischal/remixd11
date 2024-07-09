import type { Config } from 'tailwindcss';
import typeography from '@tailwindcss/typography';

const config = {
	// darkMode: ['class'],
	content: ['./app/**/*.{ts,tsx}'],
	theme: {},
	plugins: [require('tailwindcss-animate'), typeography],
} satisfies Config;

export default config;
