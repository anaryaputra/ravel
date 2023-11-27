/**
 * Required external modules
 */
/** Nookies */
import { parseCookies } from 'nookies';
/** React */
import React from 'react';
/** Hooks */
import { useMount } from '@/hooks';
/** Tyoes */
import { Cookies } from '@/types';

/**
 * Get cookies hook.
 * @returns { Cookies } { accessToken, user } - An object of cookies.
 */
const useCookies = (): Cookies => {
	const [cookies, setCookies] = React.useState<Cookies>({
		accessToken: null,
		user: null,
	});
	const isMount = useMount();

	React.useEffect(() => {
		if (isMount.current) {
			let { accessToken, user } = parseCookies(null);

			setCookies({
				accessToken: accessToken,
				user: JSON.parse(user),
			});
		}
	}, [isMount.current]);

	return cookies;
};

export default useCookies;
