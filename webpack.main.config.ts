import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import path from "path";

export const mainConfig: Configuration = {
    /**
     * This is the main entry point for your application, it's the first file
     * that runs in the main process.
     */
    entry: "./electron/main.ts",
    // Put your normal webpack config below here
    module: {
        rules,
    },
    resolve: {
        alias: {
            "@main": path.resolve(__dirname, "electron"),
            "@renderer": path.resolve(__dirname, "src"),
        },
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    },
};
