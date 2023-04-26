import { Global } from "@emotion/react";
import RobotoMonoRegular from "@renderer/assets/RobotoMono-Regular.ttf";

export const Fonts = () => (
    <Global
        styles={`
      /* RobotoMono-Regular */
      @font-face {
        font-family: 'Roboto Mono';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(${RobotoMonoRegular}) format('ttf');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      `}
    />
);
