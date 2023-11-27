/**
 * Required external modules
 */
/** SWR */
import useSWR, { SWRResponse } from 'swr';
/** Services */
import { axiosFetcher } from '@/services';
/** Types */
import { ApiResponse, Top5TourResponse, TopTour } from '@/types';

/**
 * Get top 5 tours data.
 * @returns { ApiResponse<TopTour[]> } Top 5 tours API response or null
 */
export const getTop5Tour = (): ApiResponse<TopTour[]> => {
	try {
		const { data, error }: SWRResponse<Top5TourResponse, Error> = useSWR('/tours/top-5-tour', axiosFetcher);

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
