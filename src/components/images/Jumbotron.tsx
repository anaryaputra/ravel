/**
 * Required external modules
 */
/** Next */
import Image from 'next/image';
/** Components */
import { Title } from '@/components';
/** Types */
import { JumbotronProps } from '@/types';

/**
 * Jumbotron component.
 * @param { JumbotronProps } JumbotronProps An object of jumbotron component's props.
 * @returns { JSX.Element } JSX.Element - Jumbotron component
 */
const Jumbotron = ({ alt, src, withText }: JumbotronProps): JSX.Element => {
	return (
		<section className='relative aspect-jumbotron w-full'>
			<Image
				className='absolute'
				src={src}
				alt={alt}
				fill
				style={{
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'contain',
				}}
			/>
			{withText && (
				<div className='absolute bottom-3 left-7 text-white lg:bottom-6 lg:left-14'>
					<Title as='h2'>Ravel</Title>
					<Title as='h5'>Travel Solution</Title>
				</div>
			)}
		</section>
	);
};

export default Jumbotron;
