declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            PREFIX: string;
            SODIUM_URL: string;
            SODIUM_PORT: string;
            SODIUM_PASSWORD: string;
        }
    }
}

export {};