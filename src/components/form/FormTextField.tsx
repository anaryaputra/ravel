/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** Material UI */
import { FormHelperText, Input, InputLabel } from '@mui/material';
/** React */
import React from 'react';
/** Types */
import { FormTextFieldProps } from '@/types';

/**
 * Form text field component.
 * @param { FormTextFieldProps } FormTextFieldProps An object of form text field component props.
 * @returns { JSX.Element } JSX.Element - Form text field component.
 */
const FormTextField = ({ error, helperText, label, name, value, ...props }: FormTextFieldProps): JSX.Element => {
	return (
		<div
			className={clsx(
				'flex gap-x-1.5 gap-y-1',
				props.type !== 'checkbox' ? 'flex-col' : 'flex-row-reverse items-center justify-end'
			)}
		>
			{label && (
				<InputLabel className={clsx(error ? 'text-red-400' : 'text-[#7C7C7C]', 'font-semibold')}>
					{label}
				</InputLabel>
			)}
			<Input
				className={clsx(
					error ? 'border-red-400' : 'border-[#CCCCCC]',
					'min-h-[36px] rounded-[5px] border px-4'
				)}
				disableUnderline
				{...props}
			/>
			{helperText && (
				<FormHelperText className={error ? 'text-red-400' : 'text-[#7C7C7C]'}>{helperText}</FormHelperText>
			)}
		</div>
	);
};

export default FormTextField;
