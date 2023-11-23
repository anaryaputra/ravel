/**
 * Required external modules
 */
/** Material UI */
import { Button, ButtonProps } from '@mui/material';
/** React */
import React from 'react';

/**
 * Form button component.
 * @param { ButtonProps } ButtonProps An object of button component props.
 * @returns { JSX.Element } JSX.Element - Form button component.
 */
const FormButton = ({ children, ...props }: ButtonProps): JSX.Element => (
	<Button
		className='bg-accent hover:bg-accent-light rounded-xl py-6 text-2xl font-bold normal-case'
		variant='contained'
		{...props}
	>
		{children}
	</Button>
);

export default FormButton;
