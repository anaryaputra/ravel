/**
 * Required external modules
 */
/** Formik */
import { Form, Formik, Field as FormikField } from 'formik';
/** Lodash */
import { upperFirst } from 'lodash';
/** Material UI */
import SearchIcon from '@mui/icons-material/Search';
import { Divider, IconButton, useMediaQuery } from '@mui/material';
/** Next */
import Link from 'next/link';
/** React */
import React from 'react';
/** Components */
import { Field, Layout, Overview, TextSkeleton, ThumbnailSkeleton, Title } from '@/components';
/** Hooks */
import { useAuth, useTour } from '@/hooks';
/** Types */
import { SearchTourForm } from '@/types';

/**
 * Other places page.
 * @returns { JSX.Element } JSX.Element - Other places page
 */
const OtherPlaces = (): JSX.Element => {
	const { accessToken, user } = useAuth();
	const { mutateTours } = useTour();
	const { data: tours, trigger, isMutating } = mutateTours();
	const isDesktop = useMediaQuery('(min-width:1024px)');

	/** Form initial values */
	const initialValues: SearchTourForm = {
		searchTour: '',
	};

	/** Initial data fetch */
	React.useEffect(() => {
		trigger({
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			method: 'GET',
			params: {
				search: '',
			},
		});
	}, []);

	/**
	 * Handle form submit
	 * @param { SearchTourForm } values Object of form values.
	 */
	const handleSubmit = (values: SearchTourForm) => {
		console.log(values);

		trigger({
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			method: 'GET',
			params: {
				search: values.searchTour,
			},
		});
	};

	return (
		<Layout>
			<div className='flex flex-col gap-y-14 p-7 lg:p-14'>
				<div id='h-search-page' className='flex flex-col gap-y-2' data-cy='h-search-page'>
					<Title className='text-center' as='h1'>
						Halo <span className='text-[#4BFF72]'>{upperFirst(user?.name)}</span>
					</Title>
					<Title className='text-center' as='h2'>
						Kemana Kau Ingin Pergi?
					</Title>
				</div>
				<div className='flex flex-col items-center'>
					<Formik initialValues={initialValues} onSubmit={handleSubmit}>
						{(props) => (
							<Form className='w-full max-w-[574px]'>
								<FormikField
									name='searchTour'
									component={Field}
									endAdornment={
										<IconButton onClick={() => handleSubmit(props.values)}>
											<SearchIcon />
										</IconButton>
									}
									data-cy='input-search-tour'
								/>
							</Form>
						)}
					</Formik>
				</div>
				<div className='flex flex-col gap-y-12'>
					<Title as='h6'>Hasil Pencarian mu:</Title>
					{!isMutating && tours?.data ? (
						tours.data.map((tour, index) => (
							<React.Fragment key={`search-result-${index}`}>
								<Link href={`/tours/${tour.id}`}>
									<Overview
										data={tour}
										index={index}
										isLoading={isMutating}
										showPrice
										thumbnailSize='small'
									/>
								</Link>
								<Divider />
							</React.Fragment>
						))
					) : (
						<React.Fragment>
							{[...Array(2)].map((e, i) => (
								<React.Fragment key={`search-result-skeleton-${i}`}>
									<div className='flex gap-12'>
										<ThumbnailSkeleton className='max-w-[242px]' type='rectangle' fill />
										<div className='flex w-full flex-col justify-between gap-y-4'>
											<div className='flex w-full flex-col gap-y-2'>
												<TextSkeleton className='w-3/12' as='description' type='single' />
												<TextSkeleton
													as='description'
													type='grouped'
													lines={isDesktop ? 6 : 6}
													wrapped
												/>
											</div>
											<TextSkeleton className='w-3/12' as='description' type='single' />
										</div>
									</div>
									<Divider />
								</React.Fragment>
							))}
						</React.Fragment>
					)}
					<Title className='text-center text-[#5B5B5B]' as='h6'>
						Akhir dari pencarian...
					</Title>
				</div>
			</div>
		</Layout>
	);
};

export default OtherPlaces;
