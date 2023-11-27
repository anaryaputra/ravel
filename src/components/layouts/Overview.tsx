/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** React */
import React from 'react';
/** Components */
import { Description, TextSkeleton, Thumbnail, ThumbnailSkeleton, Title } from '@/components';
/** Types */
import { NewTour, OverviewProps } from '@/types';

/**
 * Overview layout component.
 * @param { OverviewProps } OverviewProps An object of overview layout component's props.
 * @returns { JSX.Element } JSX.Element - Overview layout component
 */
const Overview = ({
	className,
	children,
	data,
	isLoading,
	sectionTitle,
	...props
}: OverviewProps<NewTour>): JSX.Element => {
	return (
		<section
			className={clsx(className, 'relative flex flex-col gap-4 px-7 pt-7 lg:flex-row lg:px-14 lg:pt-14')}
			{...props}
		>
			{!isLoading && data !== null ? (
				<Thumbnail
					src={data.image}
					alt={`${data.name} Image`}
					wrapperProps={{ wrapperClassName: 'lg:max-w-[440px]' }}
				/>
			) : (
				<ThumbnailSkeleton className='lg:max-w-[440px]' type='rectangle' fill />
			)}
			<div className='flex w-full flex-col gap-y-3'>
				{typeof sectionTitle === 'string' ? (
					<Title as='h2' size='md'>
						{sectionTitle}
					</Title>
				) : (
					sectionTitle
				)}
				<div className='flex w-full flex-col gap-y-2'>
					{!isLoading && data ? (
						<React.Fragment>
							<Title as='h3' size='sm'>
								{data.name}, <span className='text-[#4BFF72]'>{data.slug}</span>
							</Title>
							<Description>{data.description}</Description>
						</React.Fragment>
					) : (
						<React.Fragment>
							<TextSkeleton className='w-3/12' type='single' />
							<TextSkeleton type='grouped' lines={12} wrapped textSize='text-sm' />
						</React.Fragment>
					)}
				</div>
			</div>
		</section>
	);
};

export default Overview;
