export const config = {
    apiURL: (window as any).envVars.API_URL,
    appEnv: (window as any).envVars.APP_ENV as "dev" | "production" | "staging",
};
