/**
 * Required external modules
 */
/** Types */
import { NewTour, TopTours, TopTour } from '@/types';

export interface ApiResponse<T = any> {
	data: ApiResponseData<T>;
	isLoading: boolean;
	status: boolean;
}
export type ApiResponseData<T = any> = T | null | undefined;

export interface NewTourResponse {
	data: ApiResponseData<NewTour>;
	status: string;
}

export interface Top5TourResponse {
	data: ApiResponseData<TopTour[]>;
	status: string;
}
