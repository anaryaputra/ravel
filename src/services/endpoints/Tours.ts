/**
 * Required external modules
 */
/** Axios */
import { AxiosRequestConfig } from 'axios';
/** SWR */
import useSWR, { Key } from 'swr';
import useSWRMutation from 'swr/mutation';
/** Services */
import { getFetcher, baseFetcher } from '@/services';
/** Types */
import { ApiResponse, BaseTour, MutationApiResponse, Tour, TourApiResponse } from '@/types';

/**
 * Get tours data from API.
 * @returns { MutationApiResponse } MutationApiResponse - Object of get tours API response.
 */
export const getTours = (): MutationApiResponse<Tour[]> => {
	try {
		const { data, isMutating, trigger } = useSWRMutation<TourApiResponse<Tour[]>, Error, Key, AxiosRequestConfig>(
			'/tours',
			baseFetcher
		);

		return {
			data: data?.data || null,
			isLoading: isMutating,
			results: data?.results,
			status: true,
			trigger,
		};
	} catch (error: any) {
		return {
			data: error.response,
			isLoading: false,
			status: false,
		};
	}
};

/**
 * Get new tour data from API.
 * @returns { ApiResponse } ApiResponse - Object of get new tour API response.
 */
export const getNewTour = (): ApiResponse<Tour> => {
	try {
		const { data, error } = useSWR<TourApiResponse<Tour>, Error>('/tours/new-tour', getFetcher);

		return {
			data: data?.data || null,
			isLoading: !error && !data,
			status: true,
		};
	} catch (error: any) {
		return {
			data: error.response,
			isLoading: false,
			status: false,
		};
	}
};

/**
 * Get top 5 tours data.
 * @returns Top 5 tours API response or null
 */
export const getTop5Tour = (): ApiResponse<BaseTour[]> => {
	try {
		const { data, error } = useSWR<TourApiResponse<BaseTour[]>, Error>('/tours/top-5-tour', getFetcher);

		return {
			data: data?.data || null,
			isLoading: !error && !data,
			results: data?.data.length,
			status: true,
		};
	} catch (error: any) {
		return {
			data: error.response,
			isLoading: false,
			status: false,
		};
	}
};
