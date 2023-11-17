import { FormInputField, FormLabel } from '@/components';
import { Alert } from '@mui/material';
import clsx from 'clsx';
import React from 'react';

interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
	error?: boolean;
	errorMessage?: string;
	label?: string | undefined;
}

const FormInput = ({ error = false, errorMessage, label, name, ...props }: FormInputProps): JSX.Element => {
	return (
		<div
			className={clsx(
				'flex gap-x-1.5',
				props.type !== 'checkbox' ? 'flex-col' : 'flex-row-reverse items-center justify-end'
			)}
		>
			{label && <FormLabel htmlFor={name}>{label}</FormLabel>}
			<FormInputField error={error} {...props} />
			{error && (
				<Alert className='mt-4' severity='warning'>
					{errorMessage}
				</Alert>
			)}
		</div>
	);
};

export default FormInput;
