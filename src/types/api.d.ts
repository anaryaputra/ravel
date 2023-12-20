/**
 * Requests
 */
/** Auam Endpoints */
/** Login API */
export interface LoginApiRequestBody {
	userId: string;
	password: string;
}
/** Register API */
export interface RegisterApiRequestBody {
	userId: string;
	name: string;
	password: string;
}

/**
 * Responses
 */
/** Base API response */
export interface ApiResponse<Data = any> {
	data?: Data | undefined;
	error?: any | undefined;
	message?: string | undefined;
	results?: number | undefined;
	status: string;
}
/** Auam Endpoints */
/** Login API */
export interface LoginApiResponseData {
	id: string;
	name: string;
	accessToken: string;
	sessionToken: string;
}
/** Register API */
export interface RegisterApiResponseData {
	name: string;
	userId: string;
}
