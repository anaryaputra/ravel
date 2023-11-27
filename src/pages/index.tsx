/**
 * Required external modules
 */
/** Axios */
import axios, { AxiosResponse } from 'axios';
/** Clsx */
import clsx from 'clsx';
/** Formik */
import { FormikProps, useFormik } from 'formik';
/** Lodash */
import upperFirst from 'lodash/upperFirst';
/** Next */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
/** Nookies */
import { parseCookies, setCookie } from 'nookies';
/** React */
import React from 'react';
/** React Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
/** Yup */
import * as yup from 'yup';
/** Components */
import { FormBox, FormButton, FormCheckbox, FormTextField } from '@/components';
/** Hooks */
import { useToast } from '@/hooks';
/** Images */
import RavelLogo from 'public/assets/images/ravel-logo.svg';
/** Types */
import { LoginForm, UserAuthenticationData } from '@/types';

/**
 * Login page.
 * @returns { JSX.Element } JSX.Element - Login page
 */
const Login = (): JSX.Element => {
	const userCookie: string = parseCookies(null).user;
	const initialLoginValues: LoginForm = {
		userId: userCookie ? JSON.parse(userCookie).userId : '',
		password: userCookie ? JSON.parse(userCookie).password : '',
		rememberMe: false,
	};
	const router = useRouter();

	/**
	 * Login validation schema
	 */
	const loginValidationSchema: yup.ObjectSchema<LoginForm> = yup.object({
		userId: yup.string().required('User ID wajib diisi!'),
		password: yup.string().required('Password wajib diisi!'),
		rememberMe: yup.boolean(),
	});

	/**
	 * Formik handler
	 */
	const formik: FormikProps<LoginForm> = useFormik({
		initialValues: initialLoginValues,
		enableReinitialize: true,
		validationSchema: loginValidationSchema,
		onSubmit: (values) => {
			login(values.userId, values.password)
				.then(({ data }) => {
					toast.dismiss();

					const userAuthenticationData: UserAuthenticationData = data.data;
					const accessToken: string = userAuthenticationData.accessToken as string;
					const user: string = JSON.stringify({
						name: userAuthenticationData.name,
						userId: values.userId,
						password: values.password,
						rememberMe: values.rememberMe,
					});

					setCookie(null, 'accessToken', accessToken, {
						maxAge: 30 * 24 * 60 * 60,
						path: '/',
					});
					setCookie(null, 'user', user, {
						maxAge: 30 * 24 * 60 * 60,
						path: '/',
					});

					useToast(`Selamat Datang, ${upperFirst(userAuthenticationData.name as string)}`, 'success');

					router.push('/landing-page');
				})
				.catch((error) => {
					toast.dismiss();

					if (error.response) {
						/**
						 * The request was made and the server responded with a status code
						 * that falls out of the range of 2xx
						 */
						if (error.response.data.error === 'Username & Password salah') {
							const errorMessage = 'Id & password salah';
							formik.setErrors({
								userId: errorMessage,
								password: errorMessage,
							});
							useToast(errorMessage, 'error');
						}
					} else if (error.request) {
						/**
						 * The request was made but no response was received
						 * `error.request` is an instance of XMLHttpRequest in the browser
						 * and an instance of http.ClientRequest in node.js
						 */
						console.error(error.request);
						useToast('Request error', 'error');
					} else {
						/**
						 * Something happened in setting up the request that triggered an Error
						 */
						console.error('Error', error.message);
						useToast('Unexpected error', 'error');
					}
				});
		},
	});

	/**
	 * Login user.
	 * @param { string } userId User account's ID.
	 * @param { string } password User account's password.
	 * @returns { Promise<UserAuthentication> } Login promise axios response
	 */
	const login = async (userId: string, password: string): Promise<AxiosResponse> => {
		toast.loading('Mengautentikasi akun...');

		const response = await axios.post(`${process.env.API_ENDPOINT}/auam/login`, {
			userId: userId,
			password: password,
		});

		return response;
	};

	return (
		<main className={clsx('grid h-screen w-screen grid-cols-1 lg:grid-cols-2')}>
			<div className='bg-login hidden bg-cover lg:block' />
			<div className='flex items-center justify-center'>
				<FormBox className='flex w-4/5 flex-col gap-y-4'>
					<div className='flex justify-center'>
						<Image src={RavelLogo} height={101} width={309} alt='Ravel Logo' priority />
					</div>
					<div className='flex flex-col gap-y-4'>
						<h1 className='text-2xl font-semibold'>Masuk</h1>
						<form className='flex flex-col gap-y-6' onSubmit={formik.handleSubmit} noValidate>
							<FormTextField
								id='userId'
								label='User ID'
								name='userId'
								type='text'
								required
								defaultValue={formik.values.userId}
								value={formik.values.userId}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.userId && Boolean(formik.errors.userId)}
								helperText={formik.touched.userId && formik.errors.userId}
								data-cy='input-userId'
							/>
							<FormTextField
								id='password'
								label='Password'
								name='password'
								type='password'
								required
								defaultValue={formik.values.password}
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.password && Boolean(formik.errors.password)}
								helperText={formik.touched.password && formik.errors.password}
								data-cy='input-password'
							/>
							<FormCheckbox
								id='rememberMe'
								name='rememberMe'
								label='Ingat Saya!'
								onChange={formik.handleChange}
								data-cy='input-remember_me'
							/>
							<FormButton type='submit' data-cy='btn-login'>
								Login
							</FormButton>
						</form>
					</div>
					<div className='flex flex-col gap-y-3'>
						<span className='text-center text-sm font-semibold'>atau</span>
						<span className='text-center text-sm font-semibold text-[#B5B5B5]'>
							Belum punya akun?
							<Link className='text-[#4BFF72]' href='/register' data-cy='btn-register'>
								{' '}
								Daftar
							</Link>
						</span>
					</div>
				</FormBox>
			</div>
			<Toaster />
		</main>
	);
};

export default Login;
