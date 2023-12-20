/**
 * Required external modules
 */
/** Next */
import Image from 'next/image';
import Link from 'next/link';
/** React */
import React from 'react';
/** Components */
import { Button, Description, Jumbotron, Layout, Overview, Title, TopTours } from '@/components';
/** Hooks */
import { useTour } from '@/hooks';
/** Images */
import TestimonySrc from 'public/assets/images/testimony-illustration.png';

/**
 * Landing page.
 * @returns { JSX.Element } JSX.Element - Landing page
 */
const LandingPage = (): JSX.Element => {
	const { fetchNewTour, fetchTop5Tour } = useTour();

	/** Fetch new tour data */
	const { data: newTour, isLoading: newTourIsLoading, isValidating: newTourIsValidating } = fetchNewTour();
	/** Fetch top 5 tour data */
	const { data: top5Tour, isLoading: top5TourIsLoading, isValidating: top5TourIsValidating } = fetchTop5Tour();

	return (
		<Layout>
			<Jumbotron src='/assets/images/landing-page-jumbotron.jpg' alt='Travel Destination Image' withText />
			<div className='flex flex-col gap-y-14 py-7 lg:py-14'>
				<Overview
					id='header-new-tour'
					className='px-7 lg:px-14'
					data={newTour?.data}
					isLoading={newTourIsLoading && newTourIsValidating}
					sectionTitle={
						<Title as='h5'>
							Tujuan <span className='text-[#4BFF72]'>Baru</span>!
						</Title>
					}
					data-cy='header-new-tour'
				/>
				<TopTours
					id='top-5-tours'
					data={top5Tour?.data}
					isLoading={top5TourIsLoading && top5TourIsValidating}
				/>
				<div className='flex flex-col gap-12 px-7 lg:flex-row lg:px-14'>
					<Image src={TestimonySrc} alt='Testimony Illustration' height={333} width={448} />
					<div className='flex flex-col justify-between gap-y-10'>
						<div className='flex flex-col gap-y-8'>
							<div className='flex flex-col'>
								<Title as='h5'>
									Experience Nomor <span className='text-[#4BFF72]'>Satu</span>!
								</Title>
								<Title as='h6'>Dipercaya Seluruh Dunia</Title>
							</div>
							<Description>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate erat sit
								amet malesuada lacinia. Maecenas hendrerit, nunc ac finibus interdum, metus nibh
								pharetra elit, in efficitur est sem ut nunc. Cras bibendum turpis tempor, eleifend leo
								vel, sodales ligula. Vestibulum pulvinar fringilla justo, ac dignissim sapien vulputate
								eu. Quisque bibendum sagittis orci, id dapibus quam tincidunt eget. Aenean suscipit ex
								ac ex facilisis, at ullamcorper nibh ultricies. Sed porttitor mi at leo suscipit
								tincidunt. Fusce molestie pharetra velit ac luctus. Donec feugiat dictum tellus, vitae
								vestibulum erat tempus quis. Maecenas suscipit porta ligula, ut mattis lacus ultrices
								sit amet. In scelerisque nibh at odio lobortis, ut venenatis eros cursus. Sed molestie
								purus ut eros pretium, et auctor tellus accumsan. Etiam posuere suscipit mi ac aliquet.
							</Description>
						</div>
						<Link id='btn-testimoni' href='/testimony' data-cy='btn-testimoni' passHref legacyBehavior>
							<Button className='max-w-fit' colorScheme='light'>
								{'Testimoni ->'}
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default LandingPage;
