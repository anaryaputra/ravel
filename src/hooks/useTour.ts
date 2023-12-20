/**
 * Required external modules
 */
/** Axios */
import { AxiosRequestConfig } from 'axios';
/** Prisma */
import { Tour } from '@prisma/client';
/** SWR */
import { Key, SWRResponse } from 'swr';
import { SWRMutationResponse } from 'swr/mutation';
/** Hooks */
import { useAuth } from '@/hooks';
/** Services */
import { fetch, mutate } from '@/services';
/** Types */
import { ApiResponse, UseTour } from '@/types';

/**
 * Tour API hook.
 * @returns { UseTour } A collection of Tour API fetcher.
 */
const useTour = (): UseTour => {
	const { accessToken } = useAuth();

	/**
	 * Fetch or get new tour data from API.
	 * @returns { SWRResponse } SWR response.
	 */
	const fetchNewTour = (): SWRResponse<ApiResponse<Tour>, Error> => fetch<Tour>('/tours/new-tour');

	/**
	 * Fetch or get top 5 tour based on rating from API.
	 * @returns { SWRResponse } SWR response.
	 */
	const fetchTop5Tour = (): SWRResponse<ApiResponse<Tour[]>, Error> => fetch<Tour[]>('/tours/top-5-tour');

	/**
	 * Fetch or get tour by id from API.
	 * @returns { SWRResponse } SWR response.
	 */
	const fetchTourById = (id: string | null): SWRResponse<ApiResponse<Tour>, Error> => fetch<Tour>(`/tours/${id}`);

	/**
	 * Mutate tours.
	 * @returns { SWRMutationResponse } SWR mutation response.
	 */
	const mutateTours = (): SWRMutationResponse<ApiResponse<Tour[]>, Error, Key, AxiosRequestConfig> =>
		mutate<Tour[]>('/tours');

	return { fetchNewTour, fetchTop5Tour, fetchTourById, mutateTours };
};

export default useTour;
