export interface UserAuthentication {
	data: UserAuthenticationData;
	status: string;
}

export interface UserAuthenticationData {
	accessToken: string | null;
	name: string | null;
}

export interface UserRegistration {
	data: UserRegistrationData;
	status: string;
}

export interface UserRegistrationData {
	name: string;
	userId: string;
}

export interface UserCookie {
	name: string;
	userId: string;
	password: string;
}

export type UserAccessTokenCookie = string;
