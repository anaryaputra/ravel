/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** Material UI */
import { useMediaQuery } from '@mui/material';
/** Prisma */
import { Tour } from '@prisma/client';
/** React */
import React from 'react';
/** Components */
import { Description, TextSkeleton, Thumbnail, ThumbnailSkeleton, Title } from '@/components';
/** Types */
import { OverviewProps } from '@/types';

/**
 * Overview layout component.
 * @param { OverviewProps } OverviewProps An object of overview layout component's props.
 * @returns { JSX.Element } JSX.Element - Overview layout component
 */
const Overview = ({
	className,
	children,
	data,
	index,
	isLoading,
	sectionTitle,
	showPrice = false,
	thumbnailSize = 'large',
	...props
}: OverviewProps<Tour>): JSX.Element => {
	const isDesktop = useMediaQuery('(min-width:1024px)');

	return (
		<section className={clsx(className, 'relative flex flex-col gap-12 lg:flex-row')} {...props}>
			{!isLoading && data ? (
				<Thumbnail
					id={index ? `tour-image-${index}` : 'tour-image'}
					src={data.image}
					alt={`${data.name} Image`}
					size={thumbnailSize}
					wrapperProps={{
						wrapperClassName: thumbnailSize === 'large' ? 'lg:max-w-[440px]' : 'lg:max-w-[242px]',
					}}
					data-cy={index ? `tour-image-${index}` : 'tour-image'}
				/>
			) : (
				<ThumbnailSkeleton
					className={thumbnailSize === 'large' ? 'lg:max-w-[440px]' : 'lg:max-w-[242px]'}
					type='rectangle'
					fill
				/>
			)}
			<div className={clsx('flex w-full flex-col gap-y-4', showPrice && 'justify-between')}>
				{typeof sectionTitle === 'string' ? <Title as='h5'>{sectionTitle}</Title> : sectionTitle}
				<div className='flex w-full flex-col gap-y-2'>
					{!isLoading && data ? (
						<React.Fragment>
							<div className='font-bold'>
								<span
									id={index ? `tour-title-${index}` : 'tour-title'}
									data-cy={index ? `tour-title-${index}` : 'tour-title'}
								>{`${data.name}, `}</span>
								<span
									id={index ? `tour-slug-${index}` : 'tour-slug'}
									className='text-[#4BFF72]'
									data-cy={index ? `tour-title-${index}` : 'tour-title'}
								>
									{data.slug}
								</span>
							</div>
							<Description
								id={index ? `tour-desc-${index}` : 'tour-desc'}
								data-cy={index ? `tour-desc-${index}` : 'tour-desc'}
							>
								{data.description}
							</Description>
						</React.Fragment>
					) : (
						<React.Fragment>
							<TextSkeleton className='w-6/12 lg:w-3/12' as='description' type='single' />
							<TextSkeleton as='description' type='grouped' lines={isDesktop ? 12 : 7} wrapped />
						</React.Fragment>
					)}
				</div>
				{showPrice && (
					<React.Fragment>
						{!isLoading && data ? (
							<span className='font-bold'>
								Mulai dari:{' '}
								{new Intl.NumberFormat('id-ID', {
									style: 'currency',
									currency: 'IDR',
									minimumFractionDigits: 0,
								}).format(data.price)}
							</span>
						) : (
							<TextSkeleton className='w-6/12 lg:w-3/12' as='description' type='single' />
						)}
					</React.Fragment>
				)}
			</div>
		</section>
	);
};

export default Overview;
