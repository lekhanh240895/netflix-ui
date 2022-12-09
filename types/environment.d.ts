namespace NodeJS {
    interface ProcessEnv extends NodeJS.ProcessEnv {
        MONGODB_URI: string;
        TOKEN_SECRET: string;
    }
}
