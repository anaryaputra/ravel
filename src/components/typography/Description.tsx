/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** React */
import React from 'react';

/**
 * Description component.
 * @param { React.ComponentPropsWithRef } React.ComponentPropsWithRef An object of description component's props.
 * @returns { JSX.Element } JSX.Element - Description component.
 */
const Description = ({ children, className, ...props }: React.ComponentPropsWithRef<'p'>): JSX.Element => (
	<p className={clsx(className, 'text-sm font-light')} {...props}>
		{children}
	</p>
);

export default Description;
