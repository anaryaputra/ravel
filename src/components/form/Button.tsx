/**
 * Required external modules
 */
/** Material UI */
import { Button as MuiButton } from '@mui/material';
/** Clsx */
import clsx from 'clsx';
/** React */
import React from 'react';
/** Types */
import { ButtonProps } from '@/types';

/**
 * Button component.
 * @param { ButtonProps } ButtonProps Object of button component's props.
 * @returns { JSX.Element } JSX.Element - Button component.
 */
const Button = React.forwardRef(
	(
		{ children, className, colorScheme = 'dark', variant = 'contained', ...props }: ButtonProps,
		ref: React.Ref<HTMLButtonElement>
	): JSX.Element => {
		return (
			<MuiButton
				{...props}
				className={clsx(
					className,
					'rounded-2xl py-6 text-2xl font-bold normal-case text-white',
					colorScheme === 'dark' ? 'bg-accent hover:bg-accent-light' : 'bg-[#4BFF72] hover:bg-[#5fff82]'
				)}
				variant={variant}
				ref={ref}
			>
				{children}
			</MuiButton>
		);
	}
);

export default Button;
