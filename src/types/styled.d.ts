import 'styled-components';
import { ThemeObj } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeObj {}
}
