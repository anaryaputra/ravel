/**
 * Required external modules
 */
/** Material UI */
import { Checkbox, FormControlLabel } from '@mui/material';
/** React */
import React from 'react';
/** Types */
import { FormCheckboxProps } from '@/types';

/**
 * Form checkbox component.
 * @param { FormCheckboxProps } FormCheckboxProps An object of form checkbox component props.
 * @returns { JSX.Element } JSX.Element - Form checkbox component
 */
const FormCheckbox = ({ label, labelProps, ...props }: FormCheckboxProps): JSX.Element => {
	return label ? (
		<FormControlLabel
			className='font-semibold text-[#7C7C7C]'
			control={<Checkbox className='text-[#BEBEBE]' {...props} />}
			label={label}
			{...labelProps}
		/>
	) : (
		<Checkbox className='text-[#BEBEBE]' {...props} />
	);
};

export default FormCheckbox;
