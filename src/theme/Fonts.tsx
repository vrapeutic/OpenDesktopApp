import { Global } from "@emotion/react";
import GraphicLCGThin from "@renderer/assets/fonts/GraphikLCG-Thin.ttf";
import GraphicLCGThinItalic from "@renderer/assets/fonts/GraphikLCG-ThinItalic.ttf";
import GraphicLCGExtralight from "@renderer/assets/fonts/GraphikLCG-Extralight.ttf";
import GraphicLCGExtralightItalic from "@renderer/assets/fonts/GraphikLCG-ExtralightItalic.ttf";
import GraphicLCGLight from "@renderer/assets/fonts/GraphikLCG-Light.ttf";
import GraphicLCGLightItalic from "@renderer/assets/fonts/GraphikLCG-LightItalic.ttf";
import GraphicLCGRegular from "@renderer/assets/fonts/GraphikLCG-Regular.ttf";
import GraphicLCGRegularItalic from "@renderer/assets/fonts/GraphikLCG-RegularItalic.ttf";
import GraphicLCGMedium from "@renderer/assets/fonts/GraphikLCG-Medium.ttf";
import GraphicLCGMediumItalic from "@renderer/assets/fonts/GraphikLCG-MediumItalic.ttf";
import GraphicLCGSemibold from "@renderer/assets/fonts/GraphikLCG-Semibold.ttf";
import GraphicLCGSemiboldItalic from "@renderer/assets/fonts/GraphikLCG-SemiboldItalic.ttf";
import GraphicLCGBold from "@renderer/assets/fonts/GraphikLCG-Bold.ttf";
import GraphicLCGBoldItalic from "@renderer/assets/fonts/GraphikLCG-BoldItalic.ttf";
import GraphicLCGSuper from "@renderer/assets/fonts/GraphikLCG-Super.ttf";
import GraphicLCGSuperItalic from "@renderer/assets/fonts/GraphikLCG-SuperItalic.ttf";
import GraphicLCGBlack from "@renderer/assets/fonts/GraphikLCG-Black.ttf";
import GraphicLCGBlackItalic from "@renderer/assets/fonts/GraphikLCG-BlackItalic.ttf";

export const Fonts = () => (
  <Global
    styles={`
    /* GraphicLCG-Thin */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: normal;
        font-weight: 100;
        src: url(${GraphicLCGThin}) format('truetype');
      }
    /* GraphicLCG-ThinItalic */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: italic;
        font-weight: 100;
        src: url(${GraphicLCGThinItalic}) format('truetype');
      }
      /* GraphicLCG-Extralight */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: normal;
        font-weight: 200;
        src: url(${GraphicLCGExtralight}) format('truetype');
      }
      /* GraphicLCG-ExtralightItalic */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: italic;
        font-weight: 200;
        src: url(${GraphicLCGExtralightItalic}) format('truetype');
      }
      /* GraphicLCG-Light */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: normal;
        font-weight: 300;
        src: url(${GraphicLCGLight}) format('truetype');
      }
      /* GraphicLCG-LightItalic */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: italic;
        font-weight: 300;
        src: url(${GraphicLCGLightItalic}) format('truetype');
      }
      /* GraphicLCG-Regular */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: normal;
        font-weight: normal;
        src: url(${GraphicLCGRegular}) format('truetype');
      }
      /* GraphicLCG-RegularItalic */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: italic;
        font-weight: normal;
        src: url(${GraphicLCGRegularItalic}) format('truetype');
      }
      /* GraphicLCG-Medium */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: normal;
        font-weight: 500;
        src: url(${GraphicLCGMedium}) format('truetype');
      }
      /* GraphicLCG-MediumItalic */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: italic;
        font-weight: 500;
        src: url(${GraphicLCGMediumItalic}) format('truetype');
      }
      /* GraphicLCG-Semibold */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: normal;
        font-weight: 600;
        src: url(${GraphicLCGSemibold}) format('truetype');
      }
      /* GraphicLCG-SemiboldItalic */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: italic;
        font-weight: 600;
        src: url(${GraphicLCGSemiboldItalic}) format('truetype');
      }
      /* GraphicLCG-Bold */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: normal;
        font-weight: bold;
        src: url(${GraphicLCGBold}) format('truetype');
      }
      /* GraphicLCG-BoldItalic */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: italic;
        font-weight: bold;
        src: url(${GraphicLCGBoldItalic}) format('truetype');
      }
      /* GraphicLCG-Super */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: normal;
        font-weight: 800;
        src: url(${GraphicLCGSuper}) format('truetype');
      }
      /* GraphicLCG-SuperItalic */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: italic;
        font-weight: 800;
        src: url(${GraphicLCGSuperItalic}) format('truetype');
      }
      /* GraphicLCG-Black */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: normal;
        font-weight: 900;
        src: url(${GraphicLCGBlack}) format('truetype');
      }
      /* GraphicLCG-BlackItalic */
      @font-face {
        font-family: 'Graphik LCG';
        font-style: italic;
        font-weight: 900;
        src: url(${GraphicLCGBlackItalic}) format('truetype');
      }
      `}
  />
);
