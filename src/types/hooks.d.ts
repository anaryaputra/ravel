/**
 * Required external modules
 */
/** Next */
import { NextApiRequest } from 'next';
/** Prisma */
import { Testimony, Tour } from '@prisma/client';
/** SWR */
import { SWRResponse } from 'swr';
import { SWRMutationResponse, TriggerWithArgs } from 'swr/mutation';
/** Types */
import { ApiResponse, LoginApiResponse, LoginForm, RegistrationForm, UserCookie } from '@/types';

export interface ApiHookResponse<Data = any> {
	success: boolean;
	data?: Data | undefined;
	error?: any | undefined;
}

/** useAccessToken Hook */
export interface UseAccessToken {
	accessToken: string | null;
	addAccessToken: (accessToken: string) => void;
	removeAccessToken: () => void;
}

/** useAuth Hook */
export interface UseAuth {
	user: UserCookie | null;
	accessToken: string | null;
	sessionToken: string | null;
	register: (registrationForm: RegistrationForm) => Promise<UseAuthResponse<RegisterApiResponse>>;
	login: (loginForm: LoginForm) => Promise<UseAuthResponse<LoginApiResponse>>;
	logout: () => void;
}
export interface UseAuthResponse<Data = any> extends ApiHookResponse<Data> {}

/** useSessionToken Hook */
export interface UseSessionToken {
	sessionToken: string | null;
	addSessionToken: (sessionToken: string) => void;
	removeSessionToken: () => void;
}

/** useTestimony Hook */
export interface UseTestimony {
	fetchAllTestimony: () => SWRResponse<ApiResponse<Testimony[]>, Error>;
}

/** useTour Hook */
export interface UseTour {
	fetchNewTour: () => SWRResponse<ApiResponse<Tour>, Error>;
	fetchTop5Tour: () => SWRResponse<ApiResponse<Tour[]>, Error>;
	fetchTourById: (id: string | null) => SWRResponse<ApiResponse<Tour>, Error>;
	mutateTours: () => SWRMutationResponse<ApiResponse<Tour[]>, Error, Key, AxiosRequestConfig>;
}

/** useUser Hook */
export interface UseUser {
	user: UserCookie | null;
	addUser: (user: UserCookie) => void;
	removeUser: () => void;
}
