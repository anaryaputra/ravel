/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** React */
import React from 'react';
/** Types */
import { FieldProps } from '@/types';

/**
 * Input field component.
 * @param { FieldProps } FieldProps Object of input field component's props.
 * @returns { JSX.Element } JSX.Element - Input field component.
 */
const Field = ({
	className,
	endAdornment,
	field,
	form: { touched, errors },
	label,
	...props
}: FieldProps): JSX.Element => {
	return (
		<div className='flex flex-col gap-y-1'>
			{label && (
				<label
					className={clsx(
						'font-semibold',
						errors[field.name] && touched[field.name] ? 'text-red-400' : 'text-[#7C7C7C]'
					)}
					htmlFor={field.name}
				>
					{label}
				</label>
			)}
			<div
				className={clsx(
					'flex min-h-[36px] w-full rounded-md border',
					errors[field.name] && touched[field.name] ? 'border-red-400' : 'border-[#CCCCCC]'
				)}
			>
				<input className={clsx(className, 'w-full rounded-md px-4')} type='text' {...field} {...props} />
				{endAdornment && <div>{endAdornment}</div>}
			</div>
			{touched[field.name] && errors[field.name] && (
				<span className='text-sm text-red-400'>{errors[field.name] as string}</span>
			)}
		</div>
	);
};

export default Field;
