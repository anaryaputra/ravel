/**
 * Required external modules
 */
/** Material UI */
import { Theme, createTheme } from '@mui/material';
/** Styles */
import { INTER } from '@/utils/next/fonts';

export const theme: Theme = createTheme({
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
	},
	typography: {
		fontFamily: INTER.style.fontFamily,
	},
});
