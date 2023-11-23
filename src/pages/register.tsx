/**
 * Required external modules
 */
/** Axios */
import axios, { AxiosResponse } from 'axios';
/** Formik */
import { FormikProps, useFormik } from 'formik';
/** Material UI */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
/** Next */
import { useRouter } from 'next/router';
/** React */
import React from 'react';
/** React Hot Toast */
import toast, { Toaster } from 'react-hot-toast';
/** Yup */
import * as yup from 'yup';
/** Components */
import { FormBox, FormButton, FormTextField } from '@/components';
/** Hooks */
import { useToast } from '@/hooks';
/** Types */
import { RegistrationForm, UserRegistrationData } from '@/types';

/**
 * Register page.
 * @returns { JSX.Element } JSX.Element - Register page.
 */
const Register = (): JSX.Element => {
	const router = useRouter();
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [showConfirmationPassword, setShowConfirmationPassword] = React.useState<boolean>(false);
	const initialRegistrationValues = {
		userId: '',
		name: '',
		password: '',
		confirmationPassword: '',
	};

	const handleClickShowPassword = (field: string) => {
		if (field === 'password') {
			setShowPassword((show) => !show);
		} else {
			setShowConfirmationPassword((show) => !show);
		}
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
	};

	/**
	 * Registration validation schema
	 */
	const registrationValidationSchema: yup.ObjectSchema<RegistrationForm> = yup.object({
		userId: yup
			.string()
			.matches(/^[A-Za-z-0-9.]*$/, 'User ID hanya dapat menggunakan alphanumeric dan titik!')
			.required('User ID wajib diisi!'),
		name: yup.string().required('Nama wajib diisi!'),
		password: yup.string().required('Password wajib diisi!'),
		confirmationPassword: yup
			.string()
			.oneOf([yup.ref('password')], 'Konfirmasi password tidak sama!')
			.required('Konfirmasi password wajib diisi!'),
	});

	/**
	 * Formik handler
	 */
	const formik: FormikProps<RegistrationForm> = useFormik({
		initialValues: initialRegistrationValues,
		validationSchema: registrationValidationSchema,
		onSubmit: (values) => {
			register(values.userId, values.name, values.password)
				.then(({ data }) => {
					toast.dismiss();

					const user: UserRegistrationData = data.data;

					useToast(`Hai ${user.name}`, 'success');
					setTimeout(() => {
						router.push('/login');
					}, 2000);
				})
				.catch((error) => {
					toast.dismiss();

					if (error.response) {
						/**
						 * The request was made and the server responded with a status code
						 * that falls out of the range of 2xx
						 */
						if (error.response.data.message === 'User id sudah ada, coba yang lain') {
							const errorMessage = 'User ID telah digunakan';
							formik.setErrors({
								userId: errorMessage,
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
	 * Register user.
	 * @param { string } userId User account's ID.
	 * @param { string } name User account's name.
	 * @param { string } password User account's password.
	 * @returns { Promise<AxiosResponse> } Register promise axios response.
	 */
	const register = async (userId: string, name: string, password: string): Promise<AxiosResponse> => {
		toast.loading('Mendaftarkan akun...');

		const response = await axios.post(`${process.env.API_ENDPOINT}/auam/register`, {
			userId: userId,
			name: name,
			password: password,
		});

		return response;
	};

	return (
		<main className='bg-logo flex min-h-screen w-screen items-center justify-center bg-contain bg-center bg-no-repeat'>
			<FormBox className='max-w-[321px] gap-y-4 lg:min-w-[531px]'>
				<h1 className='text-2xl font-semibold'>Masuk</h1>
				<form className='flex flex-col gap-y-16' onSubmit={formik.handleSubmit} noValidate>
					<div className='flex flex-col gap-y-4'>
						<FormTextField
							id='userId'
							label='User ID'
							name='userId'
							type='text'
							placeholder='Masukkan User ID'
							required
							value={formik.values.userId}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.userId && Boolean(formik.errors.userId)}
							helperText={formik.touched.userId && formik.errors.userId}
							data-cy='input-userId'
						/>
						<FormTextField
							id='name'
							label='Nama'
							name='name'
							type='text'
							placeholder='Masukkan Nama'
							required
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
							data-cy='input-name'
						/>
						<FormTextField
							id='password'
							label='Password'
							name='password'
							type={showPassword ? 'text' : 'password'}
							placeholder='Masukkan Password'
							data-cy='input-password'
							required
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => handleClickShowPassword('password')}
										onMouseDown={(e) => handleMouseDownPassword(e)}
										edge='end'
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
						/>
						<FormTextField
							id='confirmationPassword'
							label='Konfirmasi Password'
							name='confirmationPassword'
							type={showConfirmationPassword ? 'text' : 'password'}
							placeholder='Masukkan Password'
							required
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => handleClickShowPassword('confirmationPassword')}
										onMouseDown={(e) => handleMouseDownPassword(e)}
										edge='end'
									>
										{showConfirmationPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							value={formik.values.confirmationPassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.confirmationPassword && Boolean(formik.errors.confirmationPassword)}
							helperText={formik.touched.confirmationPassword && formik.errors.confirmationPassword}
							data-cy='input-confirmation_password'
						/>
					</div>
					<FormButton type='submit' data-cy='btn-register'>
						Daftar
					</FormButton>
				</form>
			</FormBox>
			<Toaster />
		</main>
	);
};

export default Register;
