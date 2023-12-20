/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** Material UI */
import { Skeleton } from '@mui/material';
/** React */
import React from 'react';
/** Hooks */
import { useTextSizeClassName } from '@/hooks';
/** Types */
import { TextSkeletonProps } from '@/types';

/**
 * Text skeleton component.
 * @param { TextSkeletonProps } TextSkeletonProps An object of text skeleton component's props.
 * @returns { JSX.Element } JSX.Element - Text skeleton component
 */
const TextSkeleton = ({ as, className, id, lines = 1, type, wrapped, ...props }: TextSkeletonProps): JSX.Element => {
	const getFontSizeClassName = useTextSizeClassName();

	switch (type) {
		case 'single':
			return <Skeleton className={clsx(className, getFontSizeClassName(as))} variant='text' {...props} />;
		case 'grouped':
			return wrapped ? (
				<div className='w-full'>
					{[...Array(lines)].map((e, i) => (
						<Skeleton
							key={`${id}-grouped-text-skeleton-${i}`}
							className={clsx(className, getFontSizeClassName(as))}
							variant='text'
							{...props}
						/>
					))}
				</div>
			) : (
				<React.Fragment>
					{[...Array(lines)].map((e, i) => (
						<Skeleton
							key={`${id}-grouped-text-skeleton-${i}`}
							className={clsx(className, getFontSizeClassName(as))}
							variant='text'
							{...props}
						/>
					))}
				</React.Fragment>
			);
	}
};

export default TextSkeleton;
