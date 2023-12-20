/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** Material UI */
import { Skeleton } from '@mui/material';
/** React */
import React from 'react';
/** Types */
import { ThumbnailSkeletonProps } from '@/types';

/**
 * Thumbnail skeleton component.
 * @param { ThumbnailSkeletonProps } ThumbnailSkeletonProps An object of skeleton props.
 * @returns { JSX.Element } JSX.Element - Thumbnail skeleton component
 */
const ThumbnailSkeleton = ({ className, fill, type = 'rectangle', ...props }: ThumbnailSkeletonProps): JSX.Element => (
	<Skeleton
		{...props}
		className={clsx(
			className,
			fill && 'h-auto w-full',
			type === 'rectangle' ? 'aspect-rectangle-thumbnail rounded-[36px]' : 'aspect-square rounded-[7px]'
		)}
		variant='rounded'
	/>
);

export default ThumbnailSkeleton;
