import React from "react";
import styled from "styled-components";
import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";

import GlobalStyle from "../src/style/GlobalStyle";
import { themes } from "../src/style/theme";

addDecorator((s) => (
  <>
    <GlobalStyle />
    {s()}
  </>
));
addDecorator((s) => <Padded>{s()}</Padded>);
addDecorator(withThemesProvider([themes.dark, themes.light]));

const Padded = styled.div`
  padding: 2em;
`;
