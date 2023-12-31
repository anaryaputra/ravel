/**
 * Required external modules
 */
/** React */
import React from 'react';

/**
 * Footer component.
 * @returns { JSX.Element } JSX.Element - Footer component
 */
const Footer = (): JSX.Element => {
	const year = new Date();

	return (
		<footer
			id='f-ravel'
			className='flex flex-col items-center gap-y-3 bg-[#333333] py-6 text-white lg:h-[103px] lg:flex-row'
			data-cy='f-ravel'
		>
			<div className='left-14 flex flex-col lg:absolute'>
				<span className='text-center text-4xl font-bold'>Ravel</span>
				<span className='text-2xl font-light'>Travel Solution</span>
			</div>
			<span
				className={`m-auto text-lg font-light`}
			>{`Copyright ©${year.getFullYear()} All rights reserved`}</span>
		</footer>
	);
};

export default Footer;
