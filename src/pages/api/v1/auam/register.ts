/**
 * Required external modules
 */
/** Bcrypt */
import bcrypt from 'bcryptjs';
/** Next */
import { NextApiRequest, NextApiResponse } from 'next';
/** Types */
import { ApiResponse, RegisterApiRequestBody, RegisterApiResponseData } from '@/types';

/**
 * Register API.
 * @param { NextApiRequest } request Next HTTP Request.
 * @param { NextApiResponse } response Next HTTP Response.
 */
const handler = async (request: NextApiRequest, response: NextApiResponse<ApiResponse<RegisterApiResponseData>>) => {
	try {
		/** Validate method */
		if (request.method === 'POST') {
			const { userId, name, password }: RegisterApiRequestBody = request.body;

			/** Validate required request body */
			if (!userId || !name || !password) {
				response.status(400).json({ message: 'Request missing required body', status: 'error' });
			}

			/** Find user from database */
			const user = await prisma.user.findFirst({
				where: {
					userId: userId,
				},
			});

			/** Validate user found */
			if (user) {
				response.status(409).json({ message: 'User ID already taken', status: 'error' });
			} else {
				const HASHED_PASSWORD = await bcrypt.hash(password, 10);

				await prisma.user.create({
					data: {
						userId: userId,
						name: name,
						password: HASHED_PASSWORD,
					},
				});

				response.status(200).json({
					status: 'success',
					data: {
						name,
						userId,
					},
				});
			}
		} else {
			response.status(405).json({ message: 'Method not allowed', status: 'error' });
		}
	} catch (error: any) {
		response.status(500).json({ error, message: 'Unexpected error', status: 'error' });
	}
};

export default handler;
