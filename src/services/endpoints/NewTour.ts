/**
 * Required external modules
 */
/** SWR */
import useSWR, { SWRResponse } from 'swr';
/** Services */
import { axiosFetcher } from '@/services';
/** Types */
import { ApiResponse, NewTourResponse } from '@/types';

/**
 * Get new tour data from API.
 * @returns { ApiResponse<NewTour> } ApiResponse - Object of API response.
 */
export const getNewTour = (): ApiResponse => {
	try {
		const { data, error }: SWRResponse<NewTourResponse, Error> = useSWR('/tours/new-tour', axiosFetcher);

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
