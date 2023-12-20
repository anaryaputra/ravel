/**
 * Required external modules
 */
/** Axios */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
/** SWR */
import useSWR, { Key, SWRResponse } from 'swr';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';
/** Hooks */
import { useAuth } from '@/hooks';
/** Types */
import { ApiResponse } from '@/types';

/** Create axios client with configurations. */
export const axiosClient: AxiosInstance = axios.create({
	baseURL: process.env.API_ENDPOINT,
	timeout: 40000,
});

/** Intercept response */
axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status === 403) {
			window.location.href = '/';
		}

		return Promise.reject(error);
	}
);

/**
 * Fetcher.
 * @param { string } URL API endpoint string.
 * @returns { Promise } Promise.
 */
export const fetcher = async (URL: string, accessToken: string): Promise<any> => {
	return axiosClient
		.get(URL, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((response) => {
			if (!response.data) {
				throw Error(response.data.message);
			}

			return response.data;
		});
};

/**
 * Fetch data.
 * @param { string } URL API endpoint string/
 * @returns { SWRResponse } SWRResponse - SWR response.
 */
export const fetch = <Data = any>(URL: string): SWRResponse<ApiResponse<Data>, Error> => {
	const { accessToken } = useAuth();

	return useSWR<ApiResponse<Data>, Error>(URL, (URL: string) => fetcher(URL, accessToken as string));
};

/**
 * Mutator.
 * @param { string } URL API endpoint string.
 * @param { AxiosRequestConfig } AxiosRequestConfig Axios request config.
 * @returns { Promise } Promise.
 */
export const mutator = (URL: string, { arg }: { arg: AxiosRequestConfig }): Promise<any> => {
	return axiosClient({
		...arg,
		url: URL,
	}).then((response) => {
		if (!response.data) {
			throw Error(response.data.message);
		}

		return response.data;
	});
};

/**
 * Mutate data.
 * @param { string } URL API endpoint string.
 * @returns { SWRMutationResponse } SWRMutationResponse - SWR mutation response.
 */
export const mutate = <Data = any>(
	URL: string
): SWRMutationResponse<ApiResponse<Data>, Error, Key, AxiosRequestConfig> => {
	return useSWRMutation<ApiResponse<Data>, Error, Key, AxiosRequestConfig>(URL, mutator);
};
