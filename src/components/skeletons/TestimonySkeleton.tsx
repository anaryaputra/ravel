/**
 * Required external modules
 */
/** Material UI */
import { Skeleton } from '@mui/material';
/** Components */
import { BaseCard, TextSkeleton, ThumbnailSkeleton } from '@/components';

/**
 * Testimony skeleton component.
 * @returns { JSX.Element } JSX.Element - Testimony skeleton component.
 */
const TestimonySkeleton = (): JSX.Element => (
	<BaseCard className='flex gap-6'>
		<ThumbnailSkeleton className='h-20 w-20 rounded-full' type='square' />
		<div className='flex w-full flex-col gap-y-4'>
			<div className='flex flex-col'>
				<TextSkeleton className='w-4/12' as='h4' type='single' />
				<TextSkeleton className='w-full' as='h4' type='single' />
			</div>
			<Skeleton className='w-4/12' height={32} variant='rounded' />
		</div>
	</BaseCard>
);

export default TestimonySkeleton;
