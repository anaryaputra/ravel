/**
 * Required external modules
 */
/** Next */
import { NextApiRequest, NextApiResponse } from 'next';
/** Utils */
import { authenticateUser } from '@/utils';

/**
 * Tour API.
 * @param { NextApiRequest } request Next HTTP Request.
 * @param { NextApiResponse } response Next HTTP Response.
 */
const handler = async (request: NextApiRequest, response: NextApiResponse) => {
	try {
		/** Validate method */
		if (request.method === 'GET') {
			const { search: keyword } = request.query;

			if (keyword || keyword === '') {
				/** Authenticate user */
				const isAuthenticated = await authenticateUser(request);

				if (isAuthenticated) {
					const tours = await prisma.tour.findMany({
						where: {
							name: {
								contains: keyword as string,
							},
						},
					});

					response.status(200).json({
						status: 'success',
						data: tours,
					});
				} else {
					response.status(403).json({ message: 'Request not authorized', status: 'error' });
				}
			} else {
				response.status(422).json({ message: 'Missing parameter', status: 'error' });
			}
		} else {
			response.status(405).json({ message: 'Method not allowed', status: 'error' });
		}
	} catch (error: any) {
		response.status(500).json({ error, message: 'Unexpected error', status: 'error' });
	}
};

export default handler;
