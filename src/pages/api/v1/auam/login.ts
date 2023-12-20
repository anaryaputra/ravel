/**
 * Required external modules
 */
/** Bcrypt */
import bcrypt from 'bcryptjs';
/** JWT */
import jwt from 'jsonwebtoken';
/** Next */
import { NextApiRequest, NextApiResponse } from 'next';
/** Services */
import { prisma } from '@/services';
/** Types */
import { ApiResponse, LoginApiRequestBody, LoginApiResponseData } from '@/types';

/**
 * Login API.
 * @param { NextApiRequest } request Next HTTP Request.
 * @param { NextApiResponse } response Next HTTP Response.
 */
const handler = async (request: NextApiRequest, response: NextApiResponse<ApiResponse<LoginApiResponseData>>) => {
	try {
		/** Validate method */
		if (request.method === 'POST') {
			const { userId, password }: LoginApiRequestBody = request.body;

			/** Validate required request body */
			if (!userId || !password) {
				response.status(400).json({ message: 'Request missing required body', status: 'error' });
			}

			/** Find user from database */
			const user = await prisma.user.findFirst({
				where: {
					userId,
				},
			});

			/** Validate user found */
			if (user) {
				const { name: registeredName, password: registeredPassword } = user;

				/** Validate password */
				bcrypt.compare(password, registeredPassword).then(async (isMatch) => {
					if (isMatch) {
						const IDENTIFIER = process.env.JWT_SECRET_KEY;
						const payload = {
							userId: user.userId,
							name: user.name,
						};
						const sessionTokenExpiry = new Date();
						const accessTokenExpiry = new Date();

						/** Set tokens expiry date */
						sessionTokenExpiry.setDate(sessionTokenExpiry.getDate() + 30);
						accessTokenExpiry.setTime(sessionTokenExpiry.getTime() + 60 * 60 * 1000);

						/** Generate JWT for session token, expiring in 30 days since last login */
						const sessionToken: string = jwt.sign(payload, IDENTIFIER, { expiresIn: '30 days' });
						/** Generate JWT for access token, expiring in an hour since last login */
						const accessToken: string = jwt.sign(payload, IDENTIFIER, { expiresIn: '1h' });

						/** Update session if exist or create new one */
						await prisma.session.upsert({
							where: {
								userId: user.id,
							},
							update: {
								sessionToken,
								expires: sessionTokenExpiry,
							},
							create: {
								sessionToken,
								expires: sessionTokenExpiry,
								user: {
									connect: {
										id: user.id,
									},
								},
							},
						});

						/** Update access token or create new one */
						await prisma.accessToken.upsert({
							where: {
								userId: user.id,
							},
							update: {
								identifier: IDENTIFIER,
								token: accessToken,
								expires: accessTokenExpiry,
							},
							create: {
								identifier: IDENTIFIER,
								token: accessToken,
								expires: accessTokenExpiry,
								user: {
									connect: {
										id: user.id,
									},
								},
							},
						});

						response.status(200).json({
							status: 'success',
							data: {
								id: user.id,
								name: registeredName,
								accessToken,
								sessionToken,
							},
						});
					} else {
						response.status(401).json({ message: 'Incorrect user id or password', status: 'error' });
					}
				});
			} else {
				response.status(401).json({ message: 'Incorrect user id or password', status: 'error' });
			}
		} else {
			response.status(405).json({ message: 'Method not allowed', status: 'error' });
		}
	} catch (error: any) {
		response.status(500).json({ error, message: 'Unexpected error', status: 'error' });
	}
};

export default handler;
