/**
 * Required external modules
 */
/** Lodash */
import { startCase } from 'lodash';
/** Material UI */
import { Avatar, Rating } from '@mui/material';
/** Components */
import { BaseCard, Title } from '@/components';
/** Types */
import { TestimonyCardProps } from '@/types';

/**
 * Testimony card component.
 * @param { TestimonyCardProps } TestimonyCardProps Testimony card component's props.
 * @returns { JSX.Element } JSX.Element - Testimony card component.
 */
const TestimonyCard = ({ data }: TestimonyCardProps): JSX.Element => (
	<BaseCard className='flex gap-6'>
		<Avatar className='aspect-square h-20 w-20' src={data.image ?? ''} />
		<div className='flex w-full flex-col gap-y-4'>
			<div className='flex flex-col'>
				<Title as='h5'>{startCase(data.name)}</Title>
				<p className='font-semibold text-[#858585]'>{data.rateComment}</p>
			</div>
			<Rating className='text-[32px]' defaultValue={parseInt(data.applicationRate)} precision={0.1} readOnly />
		</div>
	</BaseCard>
);

export default TestimonyCard;
