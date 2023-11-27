/**
 * Required external modules
 */
/** Next */
import Image from 'next/image';
/** React */
import React from 'react';
/** Components */
import { Description, FormButton, Layout, Overview, Title, TopTours } from '@/components';
/** Images */
import JumbotronSrc from 'public/assets/images/landing-page-jumbotron.jpg';
import TestimonySrc from 'public/assets/images/testimony-illustration.png';
/** Services */
import { getNewTour } from '@/services';

/**
 * Landing page.
 * @returns { JSX.Element } JSX.Element - Landing page
 */
const LandingPage = (): JSX.Element => {
	const { data, isLoading } = getNewTour();

	return (
		<Layout>
			<div className='relative'>
				<div className='absolute bottom-3 left-7 flex flex-col font-bold text-white lg:bottom-6 lg:left-14'>
					<span className='text-xl lg:text-[40px]'>Ravel</span>
					<span className='text-xs lg:text-2xl'>Travel Solution</span>
				</div>
				<Image className='w-screen' src={JumbotronSrc} alt='Ravel Travel Solution Jumbotron' priority />
			</div>
			<Overview
				id='header-new-tour'
				data={data}
				isLoading={isLoading}
				sectionTitle={
					<h2 className='text-2xl font-bold'>
						Tujuan <span className='text-[#4BFF72]'>Baru</span>!
					</h2>
				}
			/>
			<TopTours id='top-5-tours' />
			<div className='flex flex-col px-7 pb-[92px] pt-10 lg:flex-row lg:px-14'>
				<Image src={TestimonySrc} alt='Testimony Illustration' height={333} width={448} />
				<div className='flex flex-col gap-y-11'>
					<div className='flex flex-col'>
						<Title as='h2' size='md'>
							Experience Nomor <span className='text-[#4BFF72]'>Satu</span>!
						</Title>
						<Title as='h3' size='sm'>
							Dipercaya Seluruh Dunia
						</Title>
					</div>
					<Description>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate erat sit amet
						malesuada lacinia. Maecenas hendrerit, nunc ac finibus interdum, metus nibh pharetra elit, in
						efficitur est sem ut nunc. Cras bibendum turpis tempor, eleifend leo vel, sodales ligula.
						Vestibulum pulvinar fringilla justo, ac dignissim sapien vulputate eu. Quisque bibendum sagittis
						orci, id dapibus quam tincidunt eget. Aenean suscipit ex ac ex facilisis, at ullamcorper nibh
						ultricies. Sed porttitor mi at leo suscipit tincidunt. Fusce molestie pharetra velit ac luctus.
						Donec feugiat dictum tellus, vitae vestibulum erat tempus quis. Maecenas suscipit porta ligula,
						ut mattis lacus ultrices sit amet. In scelerisque nibh at odio lobortis, ut venenatis eros
						cursus. Sed molestie purus ut eros pretium, et auctor tellus accumsan. Etiam posuere suscipit mi
						ac aliquet.
					</Description>
					<FormButton className='max-w-fit rounded-2xl bg-[#4BFF72] px-7 py-5 text-xl font-bold normal-case text-white'>
						{'Testimoni ->'}
					</FormButton>
				</div>
			</div>
		</Layout>
	);
};

export default LandingPage;
