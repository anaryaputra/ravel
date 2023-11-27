/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** Next */
import Image from 'next/image';
/** Types */
import { ThumbnailProps } from '@/types';

/**
 * Thumbnail component.
 * @param { ThumbnailProps } ThumbnailProps An object of thumbnail component props.
 * @returns { JSX.Element } JSX.Element - Thumbnail component.
 */
const Thumbnail = ({
	className,
	type = 'rectangle',
	wrapperProps: { wrapperClassName, ...wrapperProps },
	...props
}: ThumbnailProps): JSX.Element => {
	return (
		<figure
			{...wrapperProps}
			className={clsx(
				wrapperClassName,
				type === 'rectangle' ? 'aspect-rectangle-thumbnail' : 'aspect-square',
				'relative h-auto w-full overflow-hidden'
			)}
		>
			<Image
				{...props}
				className={clsx(className, type === 'rectangle' ? 'rounded-[36px]' : 'rounded-[7px]')}
				fill
				style={{ objectFit: 'cover', objectPosition: 'center' }}
			/>
		</figure>
	);
};

export default Thumbnail;