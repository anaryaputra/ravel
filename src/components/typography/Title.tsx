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
const Title = ({ as, children, className, size = 'base', ...props }: TitleProps): JSX.Element => {
	const getTailwindTextSize = () => {
		switch (size) {
			case '2xl':
				return 'text-[64px]';
			case 'xl':
				return 'text-5xl';
			case 'lg':
				return 'text-[40px]';
			case 'md':
				return 'text-2xl';
			case 'base':
				return 'text-xl';
			case 'sm':
				return 'text-base';
			case 'xs':
				return 'text-sm';
		}
	};

	switch (as) {
		case 'h1':
			return (
				<h1 className={clsx(className, `font-bold ${getTailwindTextSize()}`)} {...props}>
					{children}
				</h1>
			);
		case 'h2':
			return (
				<h2 className={clsx(className, `font-bold ${getTailwindTextSize()}`)} {...props}>
					{children}
				</h2>
			);
		case 'h3':
			return (
				<h3 className={clsx(className, `font-bold ${getTailwindTextSize()}`)} {...props}>
					{children}
				</h3>
			);
		case 'h4':
			return (
				<h4 className={clsx(className, `font-bold ${getTailwindTextSize()}`)} {...props}>
					{children}
				</h4>
			);
		case 'h5':
			return (
				<h5 className={clsx(className, `font-bold ${getTailwindTextSize()}`)} {...props}>
					{children}
				</h5>
			);
		case 'h6':
			return (
				<h6 className={clsx(className, `font-bold ${getTailwindTextSize()}`)} {...props}>
					{children}
				</h6>
			);
	}
};

export default Title;
