/**
 * Required external modules
 */
/** Next */
import Link from 'next/link';
/** Prisma */
import { Tour } from '@prisma/client';
/** React */
import React from 'react';
/** Components */
import { Carousel, Description, TextSkeleton, Thumbnail, ThumbnailSkeleton, Title } from '@/components';
/** Types */
import { Top5TourProps } from '@/types';

/**
 * Top 5 tours layout component.
 * @param { Top5TourProps } Top5ToursProps An object of top 5 tour layout component's props.
 * @returns { JSX.Element } JSX.Element - Top 5 tour layout component.
 */
const Top5Tours = ({ data, isLoading, ...props }: Top5TourProps<Tour[]>): JSX.Element => (
	<section className='flex flex-col gap-y-12' {...props}>
		<Title className='text-center' as='h5'>
			<span className='text-[#4BFF72]'>Explore</span> Tempat Lainnya
		</Title>
		<div className='bg-[#FAFAFA] px-7 py-12 lg:px-14'>
			<Carousel options={{ align: 'center', loop: true }}>
				{!isLoading && data ? (
					<React.Fragment>
						{data.map((destination, index) => (
							<Link
								key={index}
								id={`header-top-tour-${index}`}
								className='mr-[40px] flex-[0_0_auto] lg:mr-[60px]'
								data-cy={`header-top-tour-${index}`}
								href={`/tours/${destination.id}`}
							>
								<div className='flex min-w-[160px] max-w-[160px] flex-col items-center gap-y-4'>
									<Thumbnail
										src={destination.image}
										alt={`${destination.name} Image`}
										type='square'
										wrapperProps={{
											wrapperClassName: 'w-full h-auto',
										}}
									/>
									<span className='text-center font-bold'>{destination.name}</span>
									<Description className='line-clamp-3 text-center text-sm'>
										{destination.description}
									</Description>
								</div>
							</Link>
						))}
					</React.Fragment>
				) : (
					<React.Fragment>
						{[...Array(5)].map((e, i) => (
							<div key={`top-tours-skeleton-${i}`} className='mr-[40px] flex-[0_0_auto] lg:mr-[60px]'>
								<div className='flex flex-col items-center gap-y-5'>
									<ThumbnailSkeleton height={160} width={160} type='square' />
									<TextSkeleton className='w-1/2' type='single' as='description' />
									<TextSkeleton type='grouped' as='description' wrapped lines={3} />
								</div>
							</div>
						))}
					</React.Fragment>
				)}
			</Carousel>
		</div>
	</section>
);
export default Top5Tours;
