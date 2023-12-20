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
import { UseAccessToken } from '@/types';

/**
 * User access token hook.
 * @returns { UseAccessToken } An object of user access token hook.
 */
const useAccessToken = (): UseAccessToken => {
	const COOKIE_KEY: string = 'accessToken';
	const { accessToken, setAccessToken } = React.useContext(AuthContext);

	/**
	 * Add access token in context and cookies.
	 * @param { string } accessToken String of access token.
	 */
	const addAccessToken = (accessToken: string): void => {
		setAccessToken(accessToken);
		setCookie(null, COOKIE_KEY, accessToken, {
			maxAge: 3600,
			path: '/',
		});
	};

	/**
	 * Remove access token in context and cookies.
	 */
	const removeAccessToken = (): void => {
		setAccessToken(null); /** Set access token in auth context to null */
		destroyCookie(null, COOKIE_KEY); /** Clear access token data from browser cookie */
	};

	return {
		accessToken,
		addAccessToken,
		removeAccessToken,
	};
};

export default useAccessToken;
