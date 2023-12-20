/**
 * Required external modules
 */
/** Axios */
import axios, { AxiosResponse } from 'axios';
/** Formik */
import { Form, Formik, FormikHelpers, FormikProps, useFormik, Field as FormikField } from 'formik';
/** Material UI */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
/** Next */
import { useRouter } from 'next/router';
/** React */
import React from 'react';
/** React Hot Toast */
import { Toaster } from 'react-hot-toast';
/** Yup */
import * as yup from 'yup';
/** Components */
import { Button, Field, FormBox } from '@/components';
/** Contexts */
import { AuthContext } from '@/contexts';
/** Hooks */
import { useAuth } from '@/hooks';
/** Types */
import { RegistrationForm } from '@/types';
import { AccessToken } from '@prisma/client';

/**
 * Register page.
 * @returns { JSX.Element } JSX.Element - Register page.
 */
const Register = (): JSX.Element => {
	const { accessToken } = React.useContext(AuthContext);
	const { register } = useAuth();
	const router = useRouter();

	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState<boolean>(false);

	/** Form initial values */
	const initialValues: RegistrationForm = {
		userId: '',
		name: '',
		password: '',
		passwordConfirmation: '',
	};

	/** Form validation schema */
	const validationSchema: yup.ObjectSchema<RegistrationForm> = yup.object({
		userId: yup
			.string()
			.matches(/^[A-Za-z-0-9.]*$/, 'User ID hanya dapat menggunakan alphanumeric dan titik!')
			.required('User ID wajib diisi!'),
		name: yup.string().required('Nama wajib diisi!'),
		password: yup.string().required('Password wajib diisi!'),
		passwordConfirmation: yup
			.string()
			.oneOf([yup.ref('password')], 'Konfirmasi password tidak sama!')
			.required('Konfirmasi password wajib diisi!'),
	});

	/** Toggle password visibility */
	const handleClickShowPassword = (field: string): void => {
		if (field === 'password') {
			setShowPassword((show) => !show);
		} else {
			setShowPasswordConfirmation((show) => !show);
		}
	};

	/** Prevent default on password field mouse down event */
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		event.preventDefault();
	};

	/**
	 * Handle registration form submit
	 * @param { LoginForm } values Object of registration form values.
	 * @param { FormikHelpers } FormikHelpers Object of formik helpers.
	 */
	const handleSubmit = async (
		values: RegistrationForm,
		{ setFieldError }: FormikHelpers<RegistrationForm>
	): Promise<void> => {
		const response = await register(values);

		if (response.success) {
			router.push('/');
		} else {
			if (response?.error?.response?.status === 401) {
				setFieldError('userId', 'User ID telah digunakan');
			}
		}
	};

	React.useEffect(() => {
		accessToken && router.push('/landing-page');
	}, [accessToken]);

	return (
		<main className='flex min-h-screen w-screen items-center justify-center bg-logo bg-contain bg-center bg-no-repeat'>
			<FormBox className='max-w-[321px] gap-y-4 lg:min-w-[531px]'>
				<h1 className='text-2xl font-semibold'>Masuk</h1>
				<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
					{(props) => (
						<Form className='flex flex-col gap-y-6'>
							<FormikField
								id='userId'
								name='userId'
								label='User ID'
								placeholder='Masukkan User ID'
								component={Field}
								data-cy='input-userId'
							/>
							<FormikField
								id='name'
								name='name'
								label='Nama'
								placeholder='Masukkan Nama'
								component={Field}
								data-cy='input-name'
							/>
							<FormikField
								id='password'
								name='password'
								label='Password'
								placeholder='Masukkan Password'
								type={showPassword ? 'text' : 'password'}
								component={Field}
								endAdornment={
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => handleClickShowPassword('password')}
										onMouseDown={(e) => handleMouseDownPassword(e)}
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								}
								data-cy='input-password'
							/>
							<FormikField
								id='passwordConfirmation'
								name='passwordConfirmation'
								label='Konfirmasi Password'
								placeholder='Masukkan Konfirmasi Password'
								component={Field}
								type={showPasswordConfirmation ? 'text' : 'password'}
								endAdornment={
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => handleClickShowPassword('passwordConfirmation')}
										onMouseDown={(e) => handleMouseDownPassword(e)}
									>
										{showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								}
								data-cy='input-confirmation_password'
							/>
							<Button
								type='submit'
								colorScheme='dark'
								disabled={props.isSubmitting}
								data-cy='btn-register'
							>
								Daftar
							</Button>
						</Form>
					)}
				</Formik>
			</FormBox>
			<Toaster />
		</main>
	);
};

export default Register;
