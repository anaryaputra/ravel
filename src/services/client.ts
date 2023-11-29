/**
 * Required external modules
 */
/** Axios */
import axios, { AxiosRequestConfig } from 'axios';
/** Nookies */
import { parseCookies } from 'nookies';

// const router = useRouter();

/**
 * Create axios client with configurations.
 */
export const axiosClient = axios.create({
	baseURL: process.env.API_ENDPOINT,
	headers: {
		Authorization: `Bearer ${parseCookies(null).accessToken}`,
	},
	timeout: 40000,
});

/**
 * Fetcher for SWR
 * @param { string } endpoint API endpoint
 * @returns
 */
export const getFetcher = async (endpoint: string): Promise<any> => {
	return axiosClient.get(endpoint).then((response) => {
		if (!response.data) {
			throw Error(response.data.message);
		}

		return response.data;
	});
};

export const baseFetcher = async (url: string, { arg }: { arg: AxiosRequestConfig }) => {
	return await axiosClient(arg).then((response) => {
		if (!response.data) {
			throw Error(response.data.message);
		}

		return response.data;
	});
};
