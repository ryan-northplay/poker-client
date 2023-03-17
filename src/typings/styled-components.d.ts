import type { Theme } from "../style/theme";

// Types theme prop used in styled components to match our theme interface
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}
