export interface Cookies {
	accessToken: string | null;
	user: UserCookie | null;
}

export interface UserCookie {
	name: string;
	userId: string;
	password: string;
	rememberMe: string;
}

export type AccessTokenCookie = string;
