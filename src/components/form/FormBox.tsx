/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** React */
import React from 'react';

/**
 * Form box component.
 * @param { React.ComponentPropsWithRef } React.ComponentPropsWithRef An object of props.
 * @returns { JSX.Element } JSX.Element - Form box component
 */
const FormBox = ({ className, children, ...props }: React.ComponentPropsWithRef<'div'>): JSX.Element => (
	<div
		className={clsx(className, 'flex flex-col rounded-[49px] px-8 py-16 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]')}
		{...props}
	>
		{children}
	</div>
);

export default FormBox;
