/**
 * Required external modules
 */
/** Formik */
import { FormikProps, useFormik } from 'formik';
/** Lodash */
import { upperFirst } from 'lodash';
/** Material UI */
import SearchIcon from '@mui/icons-material/Search';
import { Divider, useMediaQuery } from '@mui/material';
/** Next */
import Link from 'next/link';
/** React */
import React from 'react';
/** Components */
import { FormTextField, Layout, Overview, TextSkeleton, ThumbnailSkeleton, Title } from '@/components';
/** Hooks */
import { useCookies } from '@/hooks';
/** Services */
import { getTours } from '@/services';
/** Types */
import { SearchTourForm } from '@/types';

/**
 * Other places page.
 * @returns { JSX.Element } JSX.Element - Other places page
 */
const OtherPlaces = (): JSX.Element => {
	const [searchKeyword, setSearchKeyword] = React.useState<string>('');
	const [isTyping, setIsTyping] = React.useState<boolean>(false);
	const cookies = useCookies();
	const isDesktop = useMediaQuery('(min-width:1024px)');
	const { data, trigger, isLoading } = getTours();
	const initialSearchValues: SearchTourForm = {
		keyword: '',
	};
	const formik: FormikProps<SearchTourForm> = useFormik({
		initialValues: initialSearchValues,
		onSubmit: () => {
			trigger &&
				trigger({
					url: '/tours',
					method: 'GET',
					params: {
						search: searchKeyword,
					},
				});
		},
	});

	const handleOnChangeSearchInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setIsTyping(true);
		setSearchKeyword(event.target.value);

		setTimeout(() => {
			setIsTyping(false);
		}, 2000);
	};

	React.useEffect(() => {
		!isTyping && formik.submitForm();
	}, [isTyping]);

	return (
		<Layout>
			<div className='flex flex-col gap-y-14 p-14'>
				<div id='h-search-page' className='flex flex-col' data-cy='h-search-page'>
					<Title className='text-center' as='h1' size='2xl'>
						Halo, <span className='text-[#4BFF72]'>{upperFirst(cookies.user?.name)}</span>
					</Title>
					<Title className='text-center' as='h3' size='xl'>
						Kemana Kau Ingin Pergi?
					</Title>
				</div>
				<div className='flex flex-col items-center'>
					<FormTextField
						id='input-search-tour'
						name='searchTour'
						className='h-9 min-w-[574px] max-w-[574px] rounded-[5px] border border-[#CCCCCC] px-3 py-2 font-semibold'
						endAdornment={<SearchIcon />}
						value={searchKeyword}
						onChange={handleOnChangeSearchInput}
						data-cy='input-search-tour'
					/>
				</div>
				<div className='flex flex-col gap-y-12'>
					<Title as='h4'>Hasil Pencarian mu:</Title>
					{!isLoading && data ? (
						data.map((tour, index) => (
							<React.Fragment>
								<Link key={index} href={`/tours/${tour._id}`}>
									<Overview
										data={tour}
										index={index}
										isLoading={isLoading}
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
								<React.Fragment>
									<div key={i} className='flex gap-12'>
										<ThumbnailSkeleton className='max-w-[242px]' type='rectangle' fill />
										<div className='flex w-full flex-col justify-between gap-y-4'>
											<div className='flex w-full flex-col gap-y-2'>
												<TextSkeleton className='w-3/12' type='single' />
												<TextSkeleton
													type='grouped'
													lines={isDesktop ? 6 : 6}
													wrapped
													textSize='text-sm'
												/>
											</div>
											<TextSkeleton className='w-3/12' type='single' />
										</div>
									</div>
									<Divider />
								</React.Fragment>
							))}
						</React.Fragment>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default OtherPlaces;
