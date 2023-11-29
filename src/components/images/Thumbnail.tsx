/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** Next */
import Image from 'next/image';
/** React */
import React from 'react';
/** Types */
import { ThumbnailProps } from '@/types';

/**
 * Thumbnail component.
 * @param { ThumbnailProps } ThumbnailProps An object of thumbnail component props.
 * @returns { JSX.Element } JSX.Element - Thumbnail component.
 */
const Thumbnail = ({
	alt,
	className,
	size,
	src,
	type = 'rectangle',
	wrapperProps: { wrapperClassName, ...wrapperProps },
	...props
}: ThumbnailProps): JSX.Element => {
	const [error, setError] = React.useState<boolean | null>(null);
	const fallbackImageUrl = `https://placehold.co/600x400/png?text=${alt.replace(' ', '+')}`;

	React.useEffect(() => {
		setError(null);
	}, [src]);

	return (
		<figure
			{...wrapperProps}
			className={clsx(
				wrapperClassName,
				type === 'square' && 'aspect-square',
				type === 'rectangle' && size === 'large'
					? 'aspect-rectangle-thumbnail'
					: 'aspect-rectangle-thumbnail-small',
				'relative h-auto w-full overflow-hidden'
			)}
		>
			<Image
				{...props}
				className={clsx(className, type === 'rectangle' ? 'rounded-[36px]' : 'rounded-[7px]')}
				src={error ? fallbackImageUrl : src}
				alt={alt}
				fill
				style={{ objectFit: 'cover', objectPosition: 'center' }}
				onError={() => setError(true)}
			/>
		</figure>
	);
};

export default Thumbnail;
