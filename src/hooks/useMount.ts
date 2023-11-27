/** Required external modules */
import React from 'react';

/**
 * Component mount hook.
 * @returns { React.MutableRefObject } Boolean value of componet mounted.
 */
const useMount = (): React.MutableRefObject<boolean> => {
	const mounted = React.useRef(false);

	React.useEffect(() => {
		mounted.current = true;

		return () => {
			mounted.current = false;
		};
	}, []);

	return mounted;
};

export default useMount;
