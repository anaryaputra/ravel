export interface UserCookie {
	id: string;
	userId: string;
	name: string;
	rememberMe: boolean;
}

export type AccessTokenCookie = string;

export type SessionTokenCookie = string;
