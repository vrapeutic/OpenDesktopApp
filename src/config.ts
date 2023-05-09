export const config = {
    apiURL: process.env.API_URL,
    appEnv: process.env.APP_ENV as "dev" | "production" | "staging",
};
