/**
 * Required external modules
 */
/** React */
import React from 'react';
/** Components */
import { Layout, TestimonyCard, TestimonySkeleton, Title } from '@/components';
/** Hooks */
import { useTestimony } from '@/hooks';

/**
 * Testimony page.
 * @returns { JSX.Element } Testimony page.
 */
const Testimony = (): JSX.Element => {
	const { fetchAllTestimony } = useTestimony();

	/** Fetch testimonies */
	const { data: testimonies, isLoading, isValidating } = fetchAllTestimony();

	return (
		<Layout>
			<div className='flex flex-col gap-y-14 p-7 lg:p-14'>
				<Title className='text-center' as='h1'>
					Semua <span className='text-[#4BFF72]'>Testimoni</span> Kami
				</Title>
				<div className='grid grid-cols-2 gap-10'>
					{!isLoading && !isValidating && testimonies?.data ? (
						<React.Fragment>
							{testimonies.data.map((testimony, index) => (
								<TestimonyCard key={`testimony-${index}`} data={testimony} />
							))}
						</React.Fragment>
					) : (
						<React.Fragment>
							{[...Array(4)].map((skeleton, index) => (
								<TestimonySkeleton key={`testimony-skeleton-${index}`} />
							))}
						</React.Fragment>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default Testimony;
