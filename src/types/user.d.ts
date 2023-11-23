export interface UserAuthentication {
	data: UserAuthenticationData;
	status: string;
}

export interface UserAuthenticationData {
	accessToken: string | null;
	name: string | null;
}

export interface UserCookie {
	name: string;
	userId: string;
	password: string;
}

export type UserAccessTokenCookie = string;
