/**
 * Required external modules
 */
/** Next */
import Link from 'next/link';
/** React */
import React from 'react';
/** Components */
import { Carousel, Description, TextSkeleton, Thumbnail, ThumbnailSkeleton, Title } from '@/components';
/** Services */
import { getTop5Tour } from '@/services';

/**
 * Top 5 tours layout component.
 * @param { React.CompoenentPropsWithRef } React.ComponentPropsWithRef An object of HTML section's props.
 * @returns { JSX.Element } JSX.Element - Top 5 tours layout component.
 */
const Top5Tours = ({ ...props }: React.ComponentPropsWithRef<'section'>): JSX.Element => {
	/** Fetch top 5 tours data */
	const { data, isLoading } = getTop5Tour();

	return (
		<section className='flex flex-col gap-y-12' {...props}>
			<Title className='text-center' as='h3' size='md'>
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
									href={`/${destination.name}`}
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
										<Title className='text-center' as='h4' size='xs'>
											{destination.name}
										</Title>
										<Description className='line-clamp-3 text-center'>
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
										<TextSkeleton className='w-1/2' type='single' textSize='text-sm' />
										<TextSkeleton type='grouped' textSize='text-sm' wrapped lines={3} />
									</div>
								</div>
							))}
						</React.Fragment>
					)}
				</Carousel>
			</div>
		</section>
	);
};

export default Top5Tours;
