/**
 * Required external modules
 */
/** Nookies */
import { destroyCookie, setCookie } from 'nookies';
/** React */
import React from 'react';
/** Contexts */
import { AuthContext } from '@/contexts';
/** Types */
import { UseSessionToken } from '@/types';

/**
 * User access token hook.
 * @returns { UseSessionToken } An object of user access token hook.
 */
const useSessionToken = (): UseSessionToken => {
	const COOKIE_KEY: string = 'sessionToken';
	const { sessionToken, setSessionToken } = React.useContext(AuthContext);

	/**
	 * Add session token in context and cookies.
	 * @param { string } sessionToken String of session token.
	 */
	const addSessionToken = (sessionToken: string): void => {
		setSessionToken(sessionToken);
		setCookie(null, COOKIE_KEY, sessionToken, {
			maxAge: 3600 * 24 * 30,
			path: '/',
		});
	};

	/**
	 * Remove session token in context and cookies.
	 */
	const removeSessionToken = (): void => {
		setSessionToken(null); /** Set session token in auth context to null */
		destroyCookie(null, COOKIE_KEY); /** Clear session token data from browser cookie */
	};

	return {
		sessionToken,
		addSessionToken,
		removeSessionToken,
	};
};

export default useSessionToken;
