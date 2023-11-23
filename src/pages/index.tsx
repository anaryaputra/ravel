/**
 * Required external modules
 */
/** Axios */
import axios from 'axios';
/** Clsx */
import clsx from 'clsx';
/** Formik */
import { FormikProps, useFormik } from 'formik';
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
import { LoginForm, UserAuthentication } from '@/types';

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
			login(values.userId, values.password).then((res) => {
				toast.dismiss();

				if (res.status === 'berhasil login!') {
					const accessToken: string = res.data.accessToken as string;
					const user: string = JSON.stringify({
						name: res.data.name,
						userId: values.userId,
						password: values.password,
					});

					if (values.rememberMe) {
						setCookie(null, 'accessToken', accessToken, {
							maxAge: 30 * 24 * 60 * 60,
							path: '/',
						});
						setCookie(null, 'user', user, {
							maxAge: 30 * 24 * 60 * 60,
							path: '/',
						});
					}

					useToast(`Selamat Datang, ${res.data.name}`, 'success');

					setTimeout(() => {
						router.push('/landing-page');
					}, 2000);
				} else if (res.status === 'unauthorized') {
					const errorMessage = 'Id & Password Salah';

					formik.setErrors({
						userId: errorMessage,
						password: errorMessage,
					});

					useToast(errorMessage, 'error');
				} else {
					useToast('Terjadi kesalahan!', 'error');
				}
			});
		},
	});

	/**
	 * Login user.
	 * @param { string } userId User account's ID.
	 * @param { string } password User account's password.
	 * @returns { Promise<UserAuthentication> } Login promise with user authentication data
	 */
	const login = async (userId: string, password: string): Promise<UserAuthentication> => {
		try {
			toast.loading('Mengautentikasi akun...');

			const { data } = await axios.post('https://bio-code.cyclic.app/api/v1/auam/login', {
				userId: userId,
				password: password,
			});

			return data;
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				return {
					data: {
						accessToken: null,
						name: null,
					},
					status: 'unauthorized',
				};
			} else {
				console.error(error);
				return {
					data: {
						accessToken: null,
						name: null,
					},
					status: 'unexpected error',
				};
			}
		}
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
							<FormButton type='submit'>Login</FormButton>
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
