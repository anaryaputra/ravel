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
import { UseUser, UserCookie } from '@/types';

/**
 * User hook.
 * @returns { UseUser } An object of user hook.
 */
const useUser = (): UseUser => {
	const COOKIE_KEY = 'user';
	const { user, setUser } = React.useContext(AuthContext);

	/**
	 * Add user data in context and cookies.
	 * @param { UserCookie } user User data.
	 */
	const addUser = (user: UserCookie): void => {
		setUser(user);
		setCookie(null, COOKIE_KEY, JSON.stringify(user), {
			maxAge: 30 * 24 * 60 * 60,
			path: '/',
		});
	};

	/**
	 * Remove user data from context and cookies.
	 */
	const removeUser = (): void => {
		setUser(null); /** Set user in auth context to null */

		/** Clear user data from browser cookie if user opted not to 'remember me' */
		if (!user?.rememberMe) {
			destroyCookie(null, COOKIE_KEY);
		}
	};

	return {
		user,
		addUser,
		removeUser,
	};
};

export default useUser;
