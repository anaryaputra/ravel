/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** React */
import React from 'react';
/** Component */
import { Footer, NavBar } from '@/components';

/**
 * Layout component.
 * @param { React.ComponentPropsWithRef } React.ComponentPropsWithRef An object of layout component props.
 * @returns { JSX.Element } JSX.Element - Layout component
 */
const Layout = ({ children, className, ...props }: React.ComponentPropsWithRef<'main'>): JSX.Element => (
	<main className={clsx(className, 'min-h-screen w-screen')} {...props}>
		<NavBar />
		{children}
		<Footer />
	</main>
);

export default Layout;
