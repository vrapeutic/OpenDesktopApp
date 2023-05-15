<<<<<<< HEAD
=======
require("dotenv").config();
>>>>>>> dev
import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";
<<<<<<< HEAD

=======
import { PublisherGithub } from "@electron-forge/publisher-github";
>>>>>>> dev
import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

const config: ForgeConfig = {
<<<<<<< HEAD
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/index.tsx",
            name: "main_window",
            preload: { js: "./src/preload.ts" },
          },
        ],
      },
    }),
  ],
=======
    packagerConfig: {},
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({}),
        new MakerZIP({}, ["darwin"]),
        new MakerRpm({}),
        new MakerDeb({}),
    ],
    plugins: [
        new WebpackPlugin({
            mainConfig,
            devContentSecurityPolicy: "connect-src 'self' * 'unsafe-eval'",
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: "./src/index.html",
                        js: "./src/index.tsx",
                        name: "main_window",
                        preload: { js: "./src/preload.ts" },
                    },
                ],
            },
        }),
    ],
    publishers: [
        new PublisherGithub({
            repository: { owner: "vrapeutic", name: "OpenDesktopApp" },
            authToken: process.env.GH_TOKEN,
            draft: true,
        }),
    ],
>>>>>>> dev
};

export default config;
