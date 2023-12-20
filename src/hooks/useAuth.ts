/**
 * Required external modules
 */
/** Lodash */
import { startCase } from 'lodash';
/** Next */
import { useRouter } from 'next/router';
/** React Hot Toast */
import toast from 'react-hot-toast';
/** Hooks */
import { useAccessToken, useSessionToken, useToast, useUser } from '@/hooks';
/** Services */
import { mutate } from '@/services';
/** Types */
import {
	ApiResponse,
	LoginApiResponseData,
	LoginForm,
	RegisterApiResponseData,
	RegistrationForm,
	UseAuth,
	UseAuthResponse,
} from '@/types';

/**
 * User authentication hook.
 * @returns { UseAuth } An object of user authentication hook.
 */
const useAuth = (): UseAuth => {
	const { accessToken, addAccessToken, removeAccessToken } = useAccessToken();
	const { sessionToken, addSessionToken, removeSessionToken } = useSessionToken();
	const { user, addUser, removeUser } = useUser();
	const { trigger: triggerLogin } = mutate<LoginApiResponseData>('/auam/login');
	const { trigger: triggerRegister } = mutate<RegisterApiResponseData>('/auam/register');
	const router = useRouter();

	/**
	 * Register user.
	 * @param { RegistrationForm } registrationForm Registration form values.
	 * @returns { Promise } Promise.
	 */
	const register = async (
		registrationForm: RegistrationForm
	): Promise<UseAuthResponse<ApiResponse<RegisterApiResponseData>>> => {
		try {
			const { userId, name, password } = registrationForm;

			toast.loading('Registering...');

			const response = await triggerRegister({
				data: {
					userId,
					name,
					password,
				},
				method: 'POST',
			}).then((response) => {
				return response;
			});

			toast.dismiss();

			useToast(`Hai, ${startCase(name)}`, 'success');

			return {
				success: true,
				data: response,
			};
		} catch (error: any) {
			toast.dismiss();

			if (error.response) {
				/**
				 * The request was made and the server responded with a status code
				 * that falls out of the range of 2xx
				 */
				if (error.response.status === 409) {
					useToast('User ID telah digunakan', 'error');
				}
			} else if (error.request) {
				/**
				 * The request was made but no response was received
				 * `error.request` is an instance of XMLHttpRequest in the browser
				 * and an instance of http.ClientRequest in node.js
				 */
				useToast('Request error', 'error');
			} else {
				/**
				 * Something happened in setting up the request that triggered an Error
				 */
				useToast('Unexpected error', 'error');
			}

			return {
				success: false,
				error,
			};
		}
	};

	/**
	 * Log user in
	 * @param { LoginForm } loginForm Login form values.
	 * @returns { Promise } Promise.
	 */
	const login = async (loginForm: LoginForm): Promise<UseAuthResponse<ApiResponse<LoginApiResponseData>>> => {
		try {
			const { userId, password } = loginForm;

			toast.loading('Logging in...');

			const response = await triggerLogin({
				data: {
					userId,
					password,
				},
				method: 'POST',
			});

			if (response?.data) {
				addAccessToken(response.data.accessToken);
				addUser({
					...loginForm,
					id: response.data.id,
					name: response.data.name,
				});
				addSessionToken(response.data.sessionToken);

				toast.dismiss();

				useToast(`Selamat Datang, ${startCase(response.data.name)}`, 'success');
			}

			return {
				success: true,
				data: response,
			};
		} catch (error: any) {
			toast.dismiss();

			if (error.response) {
				/**
				 * The request was made and the server responded with a status code
				 * that falls out of the range of 2xx
				 */
				if (error.response.status === 401) {
					useToast('Id & password salah', 'error');
				}
			} else if (error.request) {
				/**
				 * The request was made but no response was received
				 * `error.request` is an instance of XMLHttpRequest in the browser
				 * and an instance of http.ClientRequest in node.js
				 */
				useToast('Request error', 'error');
			} else {
				/**
				 * Something happened in setting up the request that triggered an Error
				 */
				useToast('Unexpected error', 'error');
			}

			return {
				success: false,
				error,
			};
		}
	};

	/**
	 * Log user out.
	 */
	const logout = (): void => {
		try {
			toast.loading('Logging Out...');

			removeAccessToken();
			removeSessionToken();
			removeUser();

			toast.dismiss();
			useToast('Berhasil! Mengarahkan keluar...', 'success');

			setTimeout(() => {
				router.push('/');
			}, 2000);
		} catch (error: any) {
			toast.dismiss();

			useToast('Gagal!', 'error');
		}
	};

	return { user, accessToken, sessionToken, register, login, logout };
};

export default useAuth;
