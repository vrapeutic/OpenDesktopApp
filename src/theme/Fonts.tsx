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
import ManropeExtraLight from "@renderer/assets/fonts/Manrope-ExtraLight.ttf";
import ManropeLight from "@renderer/assets/fonts/Manrope-Light.ttf";
import ManropeRegular from "@renderer/assets/fonts/Manrope-Regular.ttf";
import ManropeMedium from "@renderer/assets/fonts/Manrope-Medium.ttf";
import ManropeSemiBold from "@renderer/assets/fonts/Manrope-SemiBold.ttf";
import ManropeBold from "@renderer/assets/fonts/Manrope-Bold.ttf";
import ManropeExtraBold from "@renderer/assets/fonts/Manrope-ExtraBold.ttf";
import InterThin from "@renderer/assets/fonts/Inter-Thin.ttf";
import InterExtraLight from "@renderer/assets/fonts/Inter-ExtraLight.ttf";
import InterLight from "@renderer/assets/fonts/Inter-Light.ttf";
import InterRegular from "@renderer/assets/fonts/Inter-Regular.ttf";
import InterMedium from "@renderer/assets/fonts/Inter-Medium.ttf";
import InterSemiBold from "@renderer/assets/fonts/Inter-SemiBold.ttf";
import InterBold from "@renderer/assets/fonts/Inter-Bold.ttf";
import InterExtraBold from "@renderer/assets/fonts/Inter-ExtraBold.ttf";
import InterBlack from "@renderer/assets/fonts/Inter-Black.ttf";

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
      /* Manrope-ExtraLight */
      @font-face {
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 200;
        src: url(${ManropeExtraLight}) format('truetype');
      }
      /* Manrope-Light */
      @font-face {
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 300;
        src: url(${ManropeLight}) format('truetype');
      }
      /* Manrope-Regular */
      @font-face {
        font-family: 'Manrope';
        font-style: normal;
        font-weight: normal;
        src: url(${ManropeRegular}) format('truetype');
      }
      /* Manrope-Medium */
      @font-face {
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 500;
        src: url(${ManropeMedium}) format('truetype');
      }
      /* Manrope-SemiBold */
      @font-face {
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 600;
        src: url(${ManropeSemiBold}) format('truetype');
      }
      /* Manrope-Bold */
      @font-face {
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 700;
        src: url(${ManropeBold}) format('truetype');
      }
      /* Manrope-ExtraBold */
      @font-face {
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 800;
        src: url(${ManropeExtraBold}) format('truetype');
      }
      /* Inter-Thin */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100;
        src: url(${InterThin}) format('truetype');
      }
      /* Inter-ExtraLight */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 200;
        src: url(${InterExtraLight}) format('truetype');
      }
      /* Inter-Light */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 300;
        src: url(${InterLight}) format('truetype');
      }
      /* Inter-Regular */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        src: url(${InterRegular}) format('truetype');
      }
      /* Inter-Medium */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        src: url(${InterMedium}) format('truetype');
      }
      /* Inter-SemiBold */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        src: url(${InterSemiBold}) format('truetype');
      }
      /* Inter-Bold */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        src: url(${InterBold}) format('truetype');
      }
      /* Inter-ExtraBold */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 800;
        src: url(${InterExtraBold}) format('truetype');
      }
      /* Inter-Black */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 900;
        src: url(${InterBlack}) format('truetype');
      }
      `}
  />
);
