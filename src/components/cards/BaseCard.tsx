/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** React */
import React from 'react';

/**
 * Base card component.
 * @param { React.ComponentPropsWithRef } React.ComponentPropsWithRef An object of base card component's props.
 * @returns { JSX.Element } JSX.Element - Base card component.
 */
const BaseCard = ({ children, className, ...props }: React.ComponentPropsWithRef<'div'>): JSX.Element => (
	<div className={clsx(className, 'rounded-3xl border border-[#767676] p-6')} {...props}>
		{children}
	</div>
);

export default BaseCard;
