/**
 * Module Imports
 */
import clsx from 'clsx';
import React from 'react';

/**
 * Form label component.
 * @param { React.ComponentPropsWithoutRef } React.ComponentPropsWithoutRef An object of form label properties.
 * @returns { JSX.Element } JSX.Element | Form label component
 */
const FormLabel = ({ className, children, ...props }: React.ComponentPropsWithoutRef<'label'>): JSX.Element => (
	<label className={clsx('text-base font-semibold text-[#7C7C7C]', className)} {...props}>
		{children}
	</label>
);

export default FormLabel;
