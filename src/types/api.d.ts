/**
 * Required external modules
 */
/** SWR */
import { SWRResponse } from 'swr';
import { TriggerWithArgs } from 'swr/mutation';
/** Types */
import { NewTour, TopTours, TopTour, Tour } from '@/types';

export interface ApiResponse<T = any> {
	data: T | null;
	isLoading: boolean;
	results?: number | undefined;
	status: boolean;
}
export interface MutationApiResponse<T = any> extends ApiResponse<T> {
	trigger?: TriggerWithArgs<TourApiResponse<T>, Error, Key, AxiosRequestConfig<any>> | undefined;
}

export interface TourApiResponse<T = any> {
	data: T;
	results?: number | undefined;
	status: string;
}
