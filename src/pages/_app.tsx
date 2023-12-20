/**
 * Required external modules
 */
/** Material UI */
import { ThemeProvider } from '@mui/material';
/** Next */
import type { AppProps } from 'next/app';
import Head from 'next/head';
/** React */
import React from 'react';
/** Contexts */
import { AuthProvider } from '@/contexts';
/** Styles */
import '@/styles/globals.css';
/** Utils */
import { INTER, theme } from '@/utils';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<React.Fragment>
			<Head>
				<title>Ravel</title>
			</Head>
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<div className={INTER.className}>
						<Component {...pageProps} />
					</div>
				</ThemeProvider>
			</AuthProvider>
		</React.Fragment>
	);
}
