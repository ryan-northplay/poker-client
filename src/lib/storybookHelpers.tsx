import React, { ReactElement } from "react";

import { StoreContext, Store } from "../state/store";

export const withStore = (element: () => ReactElement) => {
  const store = new Store();
  const Component = (
    <StoreContext.Provider value={store}>{element()}</StoreContext.Provider>
  );

  return { Component, store };
};
