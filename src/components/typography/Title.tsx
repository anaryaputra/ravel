/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** React */
import React from 'react';
/** Types */
import { TitleProps } from '@/types';

/**
 * Title component.
 * @param { TitleProps } TitleProps An object of title component props.
 * @returns { JSX.Element } JSX.Element - Title component
 */
const Title = ({ as, children, className, ...props }: TitleProps): JSX.Element => {
	switch (as) {
		case 'h1':
			return (
				<h1 className={clsx(className, 'text-5xl font-bold lg:text-7xl')} {...props}>
					{children}
				</h1>
			);
		case 'h2':
			return (
				<h2 className={clsx(className, 'text-4xl font-bold lg:text-5xl')} {...props}>
					{children}
				</h2>
			);
		case 'h3':
			return (
				<h3 className={clsx(className, 'text-3xl font-bold lg:text-4xl')} {...props}>
					{children}
				</h3>
			);
		case 'h4':
			return (
				<h4 className={clsx(className, 'text-2xl font-bold lg:text-3xl')} {...props}>
					{children}
				</h4>
			);
		case 'h5':
			return (
				<h5 className={clsx(className, 'text-xl font-bold lg:text-2xl')} {...props}>
					{children}
				</h5>
			);
		case 'h6':
			return (
				<h6 className={clsx(className, 'text-lg font-bold lg:text-xl')} {...props}>
					{children}
				</h6>
			);
	}
};

export default Title;
