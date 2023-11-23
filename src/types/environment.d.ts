declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_HOST: string;
			API_ENDPOINT: string;
		}
	}
}

export {};
