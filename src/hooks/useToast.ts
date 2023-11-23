/**
 * Required external modules
 */
import toast from 'react-hot-toast';

/**
 * useToast hook.
 * @param { string } message Toast message to display.
 * @param  { 'success' | 'error' } type Toast type.
 * @returns Toast.
 */
const useToast = (message: string, type: 'success' | 'error') => {
	switch (type) {
		case 'success':
			return toast(message, {
				duration: 2000,
				style: {
					background: '#33E164',
					borderRadius: '22px',
					color: '#FFFFFF',
					fontWeight: 600,
					padding: '24px 40px',
				},
			});
		case 'error':
			return toast(message, {
				duration: 4000,
				style: {
					background: '#E5111E',
					borderRadius: '22px',
					color: '#FFFFFF',
					fontWeight: 600,
					padding: '24px 40px',
				},
			});
		default:
			return toast(message);
	}
};

export default useToast;
