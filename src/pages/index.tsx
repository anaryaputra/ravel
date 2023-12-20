/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** Formik */
import { Field as FormikField, Form, Formik, FormikHelpers } from 'formik';
/** Next */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
/** React */
import React from 'react';
/** React Hot Toast */
import { Toaster } from 'react-hot-toast';
/** Yup */
import * as yup from 'yup';
/** Components */
import { Button, Checkbox, Field, FormBox } from '@/components';
/** Contexts */
import { AuthContext } from '@/contexts';
/** Hooks */
import { useAuth } from '@/hooks';
/** Images */
import RavelLogo from 'public/assets/images/ravel-logo.svg';
/** Types */
import { LoginForm } from '@/types';

/**
 * Login page.
 * @returns { JSX.Element } JSX.Element - Login page
 */
const Login = (): JSX.Element => {
	const { user: userContext, accessToken } = React.useContext(AuthContext);
	const { login } = useAuth();
	const router = useRouter();

	/** Form initial values */
	const initialValues: LoginForm = {
		userId: userContext?.userId ?? '',
		password: '',
		rememberMe: false,
	};

	/** Form validation schema */
	const validationSchema: yup.ObjectSchema<LoginForm> = yup.object({
		userId: yup.string().required('User ID wajib diisi!'),
		password: yup.string().required('Password wajib diisi!'),
		rememberMe: yup.boolean().required(),
	});

	/**
	 * Handle login form submit
	 * @param { LoginForm } values Object of login form values.
	 * @param { FormikHelpers } FormikHelpers Object of formik helpers.
	 */
	const handleSubmit = async (values: LoginForm, { setFieldError }: FormikHelpers<LoginForm>): Promise<void> => {
		const response = await login(values);

		if (response.success) {
			router.push('/landing-page');
		} else {
			if (response?.error?.response?.status === 401) {
				setFieldError('userId', 'Id & password salah');
				setFieldError('password', 'Id & password salah');
			}
		}
	};

	React.useEffect(() => {
		accessToken && router.push('/landing-page');
	}, [accessToken]);

	return (
		<main className={clsx('grid h-screen w-screen grid-cols-1 lg:grid-cols-2')}>
			<div className='hidden bg-login bg-cover lg:block' />
			<div className='flex items-center justify-center'>
				<FormBox className='flex w-4/5 flex-col gap-y-4'>
					<div className='flex justify-center'>
						<Image src={RavelLogo} height={101} width={309} alt='Ravel Logo' priority />
					</div>
					<div className='flex flex-col gap-y-4'>
						<h1 className='text-2xl font-semibold'>Masuk</h1>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							enableReinitialize={true}
							onSubmit={handleSubmit}
						>
							{(props) => (
								<Form className='flex flex-col gap-y-6'>
									<FormikField
										id='userId'
										name='userId'
										label='User ID'
										component={Field}
										data-cy='input-userId'
									/>
									<FormikField
										id='password'
										name='password'
										label='Password'
										component={Field}
										data-cy='input-password'
									/>
									<FormikField
										id='rememberMe'
										name='rememberMe'
										label='Ingat Saya!'
										component={Checkbox}
										data-cy='input-remember_me'
									/>
									<Button
										type='submit'
										colorScheme='dark'
										disabled={props.isSubmitting}
										data-cy='btn-login'
									>
										Login
									</Button>
								</Form>
							)}
						</Formik>
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
