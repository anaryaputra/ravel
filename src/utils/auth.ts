/**
 * Required external modules
 */
/** JWT */
import jwt from 'jsonwebtoken';
/** Next */
import { NextApiRequest } from 'next';
/** Nookies */
import { setCookie } from 'nookies';

/**
 * Authenticate user
 * @param { NextApiRequest } request Next HTTP Request.
 * @returns { boolean } Boolean value whether user is authenticated or not.
 */
export const authenticateUser = async (request: NextApiRequest): Promise<boolean> => {
	const authorizationHeader = request.headers.authorization;

	if (authorizationHeader) {
		const authorizationToken = authorizationHeader.split(' ')[1];
		const currentDate = new Date();

		/** Find access token */
		const accessToken = await prisma.accessToken.findFirst({
			where: {
				token: authorizationToken,
			},
		});

		/** Validate access token */
		if (accessToken && currentDate.getTime() < accessToken.expires.getTime()) {
			return true;
		} else {
			const { sessionToken: sessionTokenCookie, user: userCookie } = request.cookies;

			/** Validate cookie */
			if (sessionTokenCookie && userCookie) {
				/** Find session */
				const session = await prisma.session.findFirst({
					where: {
						sessionToken: sessionTokenCookie,
					},
				});

				/** Validate session */
				if (session && currentDate.getTime() < session.expires.getTime()) {
					const { id, userId, name } = JSON.parse(userCookie);
					const IDENTIFIER = process.env.JWT_SECRET_KEY;
					const tokenExpiry = new Date();
					/** Set token expiry */
					tokenExpiry.setTime(tokenExpiry.getTime() + 60 * 60 * 1000);

					/** Generate JWT for new access token, expiring in an hour since last login */
					const newAccessToken: string = jwt.sign({ userId, name }, IDENTIFIER, { expiresIn: '1h' });

					/** Update user access token */
					await prisma.accessToken.update({
						where: {
							userId: id,
						},
						data: {
							token: newAccessToken,
							expires: tokenExpiry,
						},
					});

					/** Update access token in cookie */
					setCookie(null, 'accessToken', newAccessToken, {
						maxAge: 3600,
						path: '/',
					});

					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
	} else {
		return false;
	}
};
