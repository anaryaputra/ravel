declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_HOST: string;
			API_ENDPOINT: string;
			JWT_SECRET_KEY: string;
		}
	}
}

export {};
