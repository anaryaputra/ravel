/**
 * Required external modules
 */
/** Nookies */
import { parseCookies } from 'nookies';
/** React */
import React from 'react';
/** Types */
import { AccessTokenCookie, AuthContext as Auth, AuthProviderProps, SessionTokenCookie, UserCookie } from '@/types';

/**
 * Auth context initial values.
 */
const initialValue: Auth = {
	user: null,
	accessToken: null,
	sessionToken: null,
	setUser: () => {},
	setAccessToken: () => {},
	setSessionToken: () => {},
};

/**
 * Create auth context
 */
export const AuthContext = React.createContext(initialValue);

/**
 * Auth context provider.
 * @param { AuthProviderProps } AuthProviderProps An object of auth context provider props.
 * @returns { JSX.Element } JSX.Element - Auth context provider.
 */
export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
	const [user, setUser] = React.useState<UserCookie | null>(initialValue.user);
	const [accessToken, setAccessToken] = React.useState<AccessTokenCookie | null>(initialValue.accessToken);
	const [sessionToken, setSessionToken] = React.useState<SessionTokenCookie | null>(initialValue.sessionToken);

	React.useEffect(() => {
		const cookies = parseCookies(null);

		cookies?.user && setUser(JSON.parse(cookies.user));
		cookies?.accessToken && setAccessToken(cookies.accessToken);
		cookies?.sessionToken && setSessionToken(cookies.sessionToken);
	}, []);

	return (
		<AuthContext.Provider value={{ user, accessToken, sessionToken, setUser, setAccessToken, setSessionToken }}>
			{children}
		</AuthContext.Provider>
	);
};
