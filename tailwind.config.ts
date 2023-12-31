import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	important: '#__next',
	theme: {
		extend: {
			aspectRatio: {
				jumbotron: '1280/471',
				'rectangle-thumbnail': '220/159',
				'rectangle-thumbnail-small': '121/99',
			},
			colors: {
				accent: {
					DEFAULT: '#0CC03E',
					light: '#2dcf5b',
				},
				highlight: '#4BFF72',
			},
			backgroundImage: {
				login: "url('/assets/images/login-background.jpg')",
				logo: "url('/assets/images/ravel-logo-square.png')",
			},
		},
	},
	plugins: [],
};
export default config;
