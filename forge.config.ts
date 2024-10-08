require('dotenv').config();
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { PublisherGithub } from '@electron-forge/publisher-github';
import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';
const ForgeExternalsPlugin = require('@timfish/forge-externals-plugin');

const forgeExternalsPlugin = new ForgeExternalsPlugin({
  externals: ['mdns'],
  includeDeps: true,
});

const config: ForgeConfig = {
  packagerConfig: {
    icon: './src/assets/images/SmallVRapeutic',
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({ setupIcon: './src/assets/images/SmallVRapeutic.ico' }),
    new MakerZIP({}, ['darwin']),
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
            html: './src/index.html',
            js: './src/index.tsx',
            name: 'main_window',
            preload: { js: './src/preload.ts' },
          },
        ],
      },
    }),
    forgeExternalsPlugin
  ],
  publishers: [
    new PublisherGithub({
      repository: { owner: 'vrapeutic', name: 'OpenDesktopApp' },
      authToken: process.env.GH_TOKEN,
      draft: true,
    }),
  ],
};

export default config;
