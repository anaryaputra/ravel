/**
 * Required external modules
 */
/** Clsx */
import clsx from 'clsx';
/** Material UI */
import { useMediaQuery } from '@mui/material';
/** React */
import React from 'react';
/** Components */
import { Description, TextSkeleton, Thumbnail, ThumbnailSkeleton, Title } from '@/components';
/** Types */
import { Tour, OverviewProps } from '@/types';

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
			<div className='flex w-full flex-col justify-between gap-y-4'>
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
							<Title
								id={index ? `tour-title-${index}` : 'tour-title'}
								as='h3'
								size='sm'
								data-cy={index ? `tour-title-${index}` : 'tour-title'}
							>
								{data.name},{' '}
								<span
									id={index ? `tour-slug-${index}` : 'tour-slug'}
									className='text-[#4BFF72]'
									data-cy={index ? `tour-title-${index}` : 'tour-title'}
								>
									{data.slug}
								</span>
							</Title>
							<Description
								id={index ? `tour-desc-${index}` : 'tour-desc'}
								data-cy={index ? `tour-desc-${index}` : 'tour-desc'}
							>
								{data.description}
							</Description>
						</React.Fragment>
					) : (
						<React.Fragment>
							<TextSkeleton className='w-3/12' type='single' />
							<TextSkeleton type='grouped' lines={isDesktop ? 12 : 7} wrapped textSize='text-sm' />
						</React.Fragment>
					)}
				</div>
				{showPrice && (
					<React.Fragment>
						{!isLoading && data ? (
							<Title
								id={index ? `tour-price-${index}` : 'tour-price'}
								as='h3'
								size='sm'
								data-cy={index ? `tour-price-${index}` : 'tour-price'}
							>
								Mulai dari:{' '}
								{new Intl.NumberFormat('id-ID', {
									style: 'currency',
									currency: 'IDR',
									minimumFractionDigits: 0,
								}).format(data.price)}
							</Title>
						) : (
							<TextSkeleton className='w-3/12' type='single' />
						)}
					</React.Fragment>
				)}
			</div>
		</section>
	);
};

export default Overview;
