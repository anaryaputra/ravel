/**
 * Required external modules
 */
/** Types */
import { TypographyType } from '@/types';

/**
 * Get tailwind text size class name hook.
 * @param { TypographyType } as String of typography type.
 * @returns  Tailwind text size class name.
 */
const useTextSizeClassName = () => {
	const getTextSizeClassName = (as: TypographyType) => {
		switch (as) {
			case 'h1':
				return 'text-5xl lg:text-7xl';
			case 'h2':
				return 'text-4xl lg:text-5xl';
			case 'h3':
				return 'text-3xl lg:text-4xl';
			case 'h4':
				return 'text-2xl lg:text-3xl';
			case 'h5':
				return 'text-xl lg:text-2xl';
			case 'h6':
				return 'text-lg lg:text-xl';
			case 'description':
				return 'text-base';
			case 'caption':
				return 'text-sm';
			default:
				return 'text-base';
		}
	};

	return getTextSizeClassName;
};

export default useTextSizeClassName;
