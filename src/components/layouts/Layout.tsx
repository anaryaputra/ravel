/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** React */
import React from 'react';
/** React Hot Toast */
import { Toaster } from 'react-hot-toast';
/** Component */
import { Footer, NavBar } from '@/components';

/**
 * Layout component.
 * @param { React.ComponentPropsWithRef } React.ComponentPropsWithRef An object of layout component props.
 * @returns { JSX.Element } JSX.Element - Layout component
 */
const Layout = ({ children, className, ...props }: React.ComponentPropsWithRef<'main'>): JSX.Element => {
	return (
		<main className={clsx(className, 'min-h-screen w-screen')} {...props}>
			<NavBar />
			{children}
			<Footer />
			<Toaster />
		</main>
	);
};

export default Layout;
