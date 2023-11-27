/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** Material UI */
import { Skeleton } from '@mui/material';
/** Types */
import { TextSkeletonProps } from '@/types';
import React from 'react';

const TextSkeleton = ({
	className,
	id,
	lines = 1,
	textSize = 'text-base',
	type,
	wrapped,
	...props
}: TextSkeletonProps): JSX.Element => {
	switch (type) {
		case 'single':
			return <Skeleton className={className} variant='text' {...props} />;
		case 'grouped':
			return wrapped ? (
				<div className='w-full'>
					{[...Array(lines)].map((e, i) => (
						<Skeleton
							key={`${id}-grouped-text-skeleton-${i}`}
							className={clsx(className, textSize)}
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
							className={clsx(className, textSize)}
							variant='text'
							{...props}
						/>
					))}
				</React.Fragment>
			);
	}
};

export default TextSkeleton;

// const TextSkeleton = ({ className, id, lines = 1, titleSize, wrapped, ...props }: TextSkeletonProps): JSX.Element => {
// 	const getTitleTextSize = () => {
// 		switch (titleSize) {
// 			case 'xl':
// 				return 'text-[64px]';
// 			case 'xl':
// 				return 'text-5xl';
// 			case 'lg':
// 				return 'text-[40px]';
// 			case 'md':
// 				return 'text-2xl';
// 			case 'base':
// 				return 'text-xl';
// 			case 'sm':
// 				return 'text-base';
// 			case 'xs':
// 				return 'text-sm';
// 		}
// 	};

// 	return wrapped ? (
// 		<div className='w-full'>
// 			{[...Array(lines)].map((e, i) => (
// 				<Skeleton
// 					key={`${id ?? 'grouped-text-skeleton'}-${i}`}
// 					className={className}
// 					variant='text'
// 					{...props}
// 				/>
// 			))}
// 		</div>
// 	) : (
// 		<React.Fragment>
// 			{[...Array(lines)].map((e, i) => (
// 				<Skeleton key={`${id ?? 'text-skeleton'}-${i}`} className={className} variant='text' {...props} />
// 			))}
// 		</React.Fragment>
// 	);

// 	// return type === 'title' ? (
// 	// 	<Skeleton className={clsx(className, 'w-6/12', titleSize && getTitleTextSize())} variant='text' {...props} />
// 	// ) : (
// 	// 	<div className='w-full'>
// 	// 		<Skeleton className={className} variant='text' {...props} />
// 	// 		<Skeleton className={className} variant='text' {...props} />
// 	// 		<Skeleton className={className} variant='text' {...props} />
// 	// 		<Skeleton className={className} variant='text' {...props} />
// 	// 		<Skeleton className={className} variant='text' {...props} />
// 	// 		<Skeleton className={className} variant='text' {...props} />
// 	// 		<Skeleton className={className} variant='text' {...props} />
// 	// 	</div>
// 	// );
// };

// export default TextSkeleton;
