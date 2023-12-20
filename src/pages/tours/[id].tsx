/**
 * Required external modules
 */
/** Lodash */
import { startCase } from 'lodash';
/** Material UI */
import { Skeleton, useMediaQuery } from '@mui/material';
/** Next */
import { useParams } from 'next/navigation';
/** React */
import React from 'react';
/** Components */
import { Description, Jumbotron, Layout, TextSkeleton, Title } from '@/components';
/** Hooks */
import { useTour } from '@/hooks';

/**
 * Tour details page.
 * @returns { JSX.Element } JSX.Element - Tour details page
 */
const TourDetails = (): JSX.Element => {
	const params = useParams();
	const isDesktop = useMediaQuery('(min-width:1024px)');
	const { fetchTourById } = useTour();

	/** Fetch tour data */
	const { data: tour, isLoading, isValidating } = fetchTourById(params?.id ? (params.id as string) : null);

	return (
		<Layout>
			<div className='flex flex-col items-center gap-y-14 py-7 lg:py-14'>
				<div className='flex w-full flex-col items-center gap-y-2 px-7 lg:px-14'>
					{!isLoading && !isValidating && tour?.data ? (
						<React.Fragment>
							<Title className='text-center text-[#4BFF72]' as='h1' data-cy='tour-title'>
								{tour.data.name}
							</Title>
							<Title className='text-center' as='h2' data-cy='tour-slug'>
								{startCase(tour.data.slug)}
							</Title>
						</React.Fragment>
					) : (
						<React.Fragment>
							<TextSkeleton className='w-9/12 lg:w-3/12' as='h1' type='single' />
							<TextSkeleton className='w-full lg:w-6/12' as='h2' type='single' />
						</React.Fragment>
					)}
				</div>
				{!isLoading && tour?.data ? (
					<Jumbotron src={tour.data.image} alt={`${tour.data.name} Image`} />
				) : (
					<Skeleton className='aspect-jumbotron w-full' />
				)}
				<div className='flex w-full flex-col items-center gap-y-4 px-7 lg:px-14'>
					{!isLoading && tour?.data ? (
						<React.Fragment>
							<div className='font-bold'>
								<span data-cy='tour-title'>{`${tour.data.name}, `}</span>
								<span className='text-[#4BFF72]' data-cy='tour-slug'>
									{tour.data.slug}
								</span>
							</div>
							<Description data-cy='tour-desc'>{tour.data.description}</Description>

							<div className='text-center font-bold' data-cy='tour-price'>
								Mulai dari:{' '}
								{new Intl.NumberFormat('id-ID', {
									style: 'currency',
									currency: 'IDR',
									minimumFractionDigits: 0,
								}).format(tour.data.price)}
							</div>
						</React.Fragment>
					) : (
						<React.Fragment>
							<TextSkeleton className='w-full lg:w-3/12' as='h2' type='single' />
							<TextSkeleton
								className='w-full'
								as='description'
								type='grouped'
								lines={isDesktop ? 3 : 11}
								wrapped
							/>
							<TextSkeleton className='w-7/12 lg:w-2/12' as='h2' type='single' />
						</React.Fragment>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default TourDetails;
