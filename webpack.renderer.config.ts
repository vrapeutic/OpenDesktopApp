import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import path from "path";

rules.push({
    test: /\.css$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

export const rendererConfig: Configuration = {
    module: {
        rules,
    },
    plugins,
    resolve: {
        alias: {
            "@main": path.resolve(__dirname, "electron"),
            "@renderer": path.resolve(__dirname, "src"),
        },
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    },
    /**
     * Fix: Enable inline-source-map to fix following:
     * Dev tools: unable to load source maps over custom protocol
     */
    devtool: "inline-source-map",
};
