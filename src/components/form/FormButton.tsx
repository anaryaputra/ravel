import React from 'react';

const FormButton = ({ children, ...props }: React.ComponentPropsWithoutRef<'button'>): JSX.Element => (
	<button
		className='animate rounded-[5px] bg-[#0CC03E] py-6 text-2xl font-bold normal-case text-white hover:bg-[#2dcf5b]'
		{...props}
	>
		{children}
	</button>
);

export default FormButton;
