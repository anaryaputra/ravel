/**
 * Required external modules
 */
/** Embla Carousel */
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
/** Types */
import { CarouselProps } from '@/types';

/**
 * Carousel component.
 * @param { CarouselProps } CarouselProps An object of carousel component's props.
 * @returns { JSX.Element } Carousel component.
 */
const Carousel = ({ children, options }: CarouselProps): JSX.Element => {
	const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

	return (
		<div>
			<div className='overflow-hidden' ref={emblaRef}>
				<div className='flex justify-center'>{children}</div>
			</div>
		</div>
	);
};

export default Carousel;
