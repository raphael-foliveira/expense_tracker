declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_PORT: number;
      POSTGRES_HOST: string;
    }
  }
}

export {};
