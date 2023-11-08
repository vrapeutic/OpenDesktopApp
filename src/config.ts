export const config = {
    apiURL:
        (window as any).envVars.API_URL ??
        "http://vrapeutic-api-production.eba-7rjfenj2.eu-west-1.elasticbeanstalk.com",
    appEnv:
        ((window as any).envVars.APP_ENV as "dev" | "production" | "staging") ??
        "dev",
};
