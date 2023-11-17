/**
 * Module Imports
 */
import axios from 'axios';

import clsx from 'clsx';

import { NextFont } from 'next/dist/compiled/@next/font';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

import LoginBackground from 'public/images/login-background.jpg';
import RavelLogo from 'public/images/ravel-logo.svg';
import { FormBox, FormButton, FormInput } from '@/components';

const inter: NextFont = Inter({ subsets: ['latin'] });

interface UserData {
	data: {
		accessToken: string;
		name: string;
	};
	status: string;
}

const Home = (): JSX.Element => {
	const [userId, setUserId] = React.useState<string>();
	const [password, setPassword] = React.useState<string>();
	const [rememberMe, setRememberMe] = React.useState<boolean>(false);
	const [userIdError, setUserIdError] = React.useState<boolean>(false);
	const [passwordError, setPasswordError] = React.useState<boolean>(false);
	const [userIdErrorMessage, setUserIdErrorMessage] = React.useState<string>('');
	const [passwordErrorMessage, setPasswordErrorMessage] = React.useState<string>('');

	const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		e.currentTarget.value ? setUserIdError(false) : setUserIdError(true);

		setUserId(e.currentTarget.value);
	};
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		e.currentTarget.value ? setPasswordError(false) : setPasswordError(true);

		setPassword(e.currentTarget.value);
	};
	const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
		setRememberMe(e.currentTarget.checked);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		if (!userId) {
			setUserIdError(true);
			setUserIdErrorMessage('User ID harus diisi!');
		}

		if (!password) {
			setPasswordError(true);
			setPasswordErrorMessage('Password harus diisi!');
		}

		if (userId && password) {
			login().then(() => {
				if (rememberMe) {
					const userData = {
						userId: userId,
						password: password,
					};

					localStorage.setItem('userData', JSON.stringify(userData));
				}
			});
		}
	};

	const login = async (): Promise<UserData | string> => {
		try {
			const { data } = await axios.post('https://bio-code.cyclic.app/api/v1/auam/login', {
				userId: userId,
				password: password,
			});

			return data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setUserIdError(true);
				setPasswordError(true);
				setUserIdErrorMessage('User ID/password salah!');
				setPasswordErrorMessage('User ID/password salah!');

				console.log('error message: ', error.message);
				return error.message;
			} else {
				console.log('unexpected error: ', error);
				return 'An unexpected error occurred';
			}
		}
	};

	return (
		<main className={clsx('grid h-screen w-screen grid-cols-1 lg:grid-cols-2', inter.className)}>
			<Image className='h-screen' src={LoginBackground} alt='LoginBackground' priority />
			<div className='flex items-center justify-center'>
				<FormBox className='w-4/5'>
					<Header />
					<form className='flex flex-col gap-y-6' onSubmit={handleSubmit} noValidate>
						<div className='flex flex-col gap-y-4'>
							<h2 className='text-[24px] font-semibold'>Masuk</h2>
							<FormInput
								name='input-userId'
								label='User ID'
								type='text'
								required
								error={userIdError}
								errorMessage={userIdErrorMessage}
								onChange={handleUserIdChange}
								data-cy='input-userId'
							/>
							<FormInput
								name='input-password'
								label='Password'
								type='password'
								required
								error={passwordError}
								errorMessage={passwordErrorMessage}
								onChange={handlePasswordChange}
								data-cy='input-password'
							/>
							<FormInput
								name='input-remember_me'
								label='Ingat Saya!'
								type='checkbox'
								onChange={handleRememberMeChange}
								data-cy='input-remember_me'
							/>
						</div>
						<FormButton type='submit' data-cy='btn-login'>
							Login
						</FormButton>
					</form>
					<span className='my-4 text-center text-sm font-semibold'>atau</span>
					<span className='text-center text-sm font-semibold'>
						Belum punya akun?
						<Link className='text-[#4BFF72]' href='/register' data-cy='btn-register'>
							{' '}
							Daftar
						</Link>
					</span>
				</FormBox>
			</div>
		</main>
	);
};

const Header = (): JSX.Element => (
	<div className='flex justify-center'>
		<Image src={RavelLogo} height={98} width={132} alt='Ravel Logo' />
		<div id='flex flex-col'>
			<h1 className='text-[64px] font-bold'>Ravel</h1>
			<p className='text-[10px]'>Travel Solution by Randy</p>
		</div>
	</div>
);

export default Home;
