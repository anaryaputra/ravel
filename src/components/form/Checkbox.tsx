/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** React */
import React from 'react';
/** Types */
import { CheckboxProps } from '@/types';

/**
 * Checkbox component.
 * @param { CheckboxProps } CheckboxProps Object of checkbox component's props.
 * @returns { JSX.Element } JSX.Element - Checkbox component.
 */
const Checkbox = ({ className, field, form: { touched, errors }, label, ...props }: CheckboxProps): JSX.Element => (
	<div className='flex items-center gap-x-1.5'>
		<input
			className={clsx(
				'disabled:border-steel-400 disabled:bg-steel-400 relative h-5 w-5 shrink-0 appearance-none rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-offset-0',
				errors[field.name] && touched[field.name]
					? 'border-red-400 focus:ring-red-400'
					: 'border-[#BEBEBE] focus:ring-[#3b82f6]'
			)}
			type='checkbox'
			{...field}
			{...props}
		/>
		<label
			className={clsx(
				'font-semibold',
				errors[field.name] && touched[field.name] ? 'text-red-400' : 'text-[#7C7C7C]'
			)}
			htmlFor={field.name}
		>
			{label}
		</label>
		<svg
			className={clsx('pointer-events-none absolute h-5 w-5', field.value ? 'block' : 'hidden')}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke={errors[field.name] && touched[field.name] ? '#F8719D' : '#7C7C7C'}
			strokeWidth='4'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<polyline points='20 6 9 17 4 12'></polyline>
		</svg>
		{errors[field.name] && touched[field.name] && (
			<span className='text-sm text-red-400'>{errors[field.name] as string}</span>
		)}
	</div>
);

export default Checkbox;
