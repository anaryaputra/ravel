/**
 * Required external modules
 */
/** React */
import React from 'react';
/** Types */
import { UserCookie } from '@/types';

export interface AuthContext {
	user: UserCookie | null;
	accessToken: string | null;
	sessionToken: string | null;
	setUser: React.Dispatch<React.SetStateAction<UserCookie | null>>;
	setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
	setSessionToken: React.Dispatch<React.SetStateAction<string | null>>;
}
export interface AuthProviderProps {
	children: React.ReactNode;
}
