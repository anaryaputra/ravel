/**
 * Required external modules
 */
/** Nookies */
import { parseCookies } from 'nookies';
/** React */
import React from 'react';
/** Hooks */
import { useMount } from '@/hooks';

/**
 * User authentication validation hook.
 * @returns { boolean } isAuthenticted - A state whether user authenticated or not
 */
const useUserAuthentication = (): boolean | null => {
	const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);
	const isMounted = useMount();

	React.useEffect(() => {
		if (isMounted.current) {
			const accessToken = parseCookies(null).accessToken;

			if (accessToken) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		}
	}, [isMounted.current]);

	return isAuthenticated;
};

export default useUserAuthentication;
