import Image from 'next/image';
import { Inter } from 'next/font/google';
import React from 'react';
import clsx from 'clsx';
import RavelLogo from 'public/images/ravel-logo.svg';
import { NextFont } from 'next/dist/compiled/@next/font';

const inter: NextFont = Inter({ subsets: ['latin'] });

const Home = (): React.ComponentPropsWithoutRef<'main'> => {
	return (
		<main className={clsx('grid grid-cols-1 lg:grid-cols-2', inter.className)}>
			<div className='bg-black'>
				<h1>Login</h1>
			</div>
			<div className='flex h-screen items-center justify-center bg-white align-baseline'>
				<Image src={RavelLogo} alt='Ravel Logo' />
				<div id='heading flex flex-col'>
					<h1 className='text-[64px] font-bold text-black'>Ravel</h1>
					<p className='text-[10px] text-black'>Travel Solution by Randy</p>
				</div>
			</div>
		</main>
	);
};

export default Home;
