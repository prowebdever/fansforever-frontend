import { css } from 'styled-components';

import ClashGrotesk_Medium_WOFF2 from '../../assets/fonts/ClashGrotesk-Medium.woff2';
import ClashGrotesk_Medium_WOFF from '../../assets/fonts/ClashGrotesk-Medium.woff';
import ClashGrotesk_SemiBold_WOFF2 from '../../assets/fonts/ClashGrotesk-Semibold.woff2';
import ClashGrotesk_SemiBold_WOFF from '../../assets/fonts/ClashGrotesk-Semibold.woff';
import ClashGrotesk_Bold_WOFF2 from '../../assets/fonts/ClashGrotesk-Bold.woff2';
import ClashGrotesk_Bold_WOFF from '../../assets/fonts/ClashGrotesk-Bold.woff';
import ClashGrotesk_Regular_WOFF2 from '../../assets/fonts/ClashGrotesk-Regular.woff2';
import ClashGrotesk_Regular_WOFF from '../../assets/fonts/ClashGrotesk-Regular.woff';
import ClashGrotesk_Light_WOFF2 from '../../assets/fonts/ClashGrotesk-Light.woff2';
import ClashGrotesk_Light_WOFF from '../../assets/fonts/ClashGrotesk-Light.woff';
import ClashGrotesk_Extralight_WOFF2 from '../../assets/fonts/ClashGrotesk-Extralight.woff2';
import ClashGrotesk_Extralight_WOFF from '../../assets/fonts/ClashGrotesk-Extralight.woff';

const fonts = css`
  @font-face {
    font-family: 'Clash Grotesk';
    src: url(${ClashGrotesk_Medium_WOFF2}) format('woff2'),
      url(${ClashGrotesk_Medium_WOFF}) format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Clash Grotesk';
    src: url(${ClashGrotesk_SemiBold_WOFF2}) format('woff2'),
      url(${ClashGrotesk_SemiBold_WOFF}) format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Clash Grotesk';
    src: url(${ClashGrotesk_Bold_WOFF2}) format('woff2'),
      url(${ClashGrotesk_Bold_WOFF}) format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Clash Grotesk';
    src: url(${ClashGrotesk_Regular_WOFF2}) format('woff2'),
      url(${ClashGrotesk_Regular_WOFF}) format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Clash Grotesk';
    src: url(${ClashGrotesk_Light_WOFF2}) format('woff2'),
      url(${ClashGrotesk_Light_WOFF}) format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Clash Grotesk';
    src: url(${ClashGrotesk_Extralight_WOFF2}) format('woff2'),
      url(${ClashGrotesk_Extralight_WOFF}) format('woff');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }
`;

export default fonts;
