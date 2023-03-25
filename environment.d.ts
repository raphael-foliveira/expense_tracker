declare global {
	namespace NodeJS {
		interface ProcessEnv {
			POSTGRES_PORT: number;
			POSTGRES_HOST: string;
			POSTGRES_DB: string;
			POSTGRES_USER: string;
			POSTGRES_PASSWORD: string;
		}
	}
}

export {};
