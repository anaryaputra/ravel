/** Base Tour */
export interface BaseTour {
	_id: string;
	description: string;
	image: string;
	name: string;
	rating: number;
}
/** Tour */
export interface Tour extends BaseTour {
	__V?: number | undefined;
	price: number;
	slug: string;
}
