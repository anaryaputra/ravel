/**
 * Module Imports
 */
import clsx from 'clsx';
import React from 'react';

/**
 * Form box component.
 * @param { React.ComponentPropsWithoutRef<'div'> } React.ComponentPropsWithoutRef An object of props.
 * @returns { JSX.Element } JSX.Element | Form box component
 */
const FormBox = ({ className, children }: React.ComponentPropsWithoutRef<'div'>): JSX.Element => (
	<div className={clsx(className, 'flex flex-col rounded-[49px] px-8 py-16 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]')}>
		{children}
	</div>
);

export default FormBox;
