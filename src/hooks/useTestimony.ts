/**
 * Required external modules
 */
/** Prisma */
import { Testimony } from '@prisma/client';
/** SWR */
import { SWRResponse } from 'swr';
/** Services */
import { fetch } from '@/services';
/** Types */
import { ApiResponse, UseTestimony } from '@/types';

/**
 * Testimony API Hook.
 * @returns { UseTestimony } A collection of Testimony API fetcher.
 */
const useTestimony = (): UseTestimony => {
	/**
	 * Fetch or get testimonies from API.
	 * @returns { SWRResponse } SWR response.
	 */
	const fetchAllTestimony = (): SWRResponse<ApiResponse<Testimony[]>, Error> => fetch<Testimony[]>('/testimonies');

	return { fetchAllTestimony };
};

export default useTestimony;
