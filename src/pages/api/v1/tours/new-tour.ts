/**
 * Required external modules
 */
/** Next */
import { NextApiRequest, NextApiResponse } from 'next';
/** Utils */
import { authenticateUser } from '@/utils';

/**
 * New Tour API.
 * @param { NextApiRequest } request Next HTTP Request.
 * @param { NextApiResponse } response Next HTTP Response.
 */
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
	try {
		/** Validate method */
		if (request.method === 'GET') {
			/** Authenticate user */
			const isAuthenticated = await authenticateUser(request);

			if (isAuthenticated) {
				const newTour = await prisma.tour.findFirst({
					orderBy: {
						createdAt: 'desc',
					},
				});

				response.status(200).json({
					status: 'success',
					data: newTour,
				});
			} else {
				response.status(403).json({ message: 'Request not authorized', status: 'error' });
			}
		} else {
			response.status(405).json({ message: 'Method not allowed', status: 'error' });
		}
	} catch (error: any) {
		response.status(500).json({ error, message: 'Unexpected error', status: 'error' });
	}
};

export default handler;
