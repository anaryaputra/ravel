import clsx from 'clsx';

interface FormInputFieldProps extends React.ComponentPropsWithoutRef<'input'> {
	error?: boolean;
}

const FormInputField = ({ className, error, ...props }: FormInputFieldProps): JSX.Element => {
	return (
		<input
			className={clsx(
				className,
				'min-h-[36px] rounded-[5px] border px-4',
				error ? 'border-[#FF0000]' : 'border-[#CCCCCC]'
			)}
			{...props}
		/>
	);
};

export default FormInputField;
