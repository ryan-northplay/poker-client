import React from "react";
import { ThemeProvider } from "styled-components";

import { themes } from "./style/theme";
import GlobalStyle from "./style/GlobalStyle";
import { Store, StoreContext, useStore } from "./state/store";
import AppRoot from "./AppRoot";
import { observer } from "mobx-react";

const App = () => (
  <StoreContext.Provider value={new Store()}>
    <StyledApp />
  </StoreContext.Provider>
);

export default App;

const StyledApp = observer(() => {
  const store = useStore();

  return (
    <ThemeProvider theme={themes[store.data.themeName]}>
      <GlobalStyle />
      <AppRoot />
    </ThemeProvider>
  );
});
