import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { useStore } from "./state/store";
import TableScreen from "./screens/TableScreen";
import CreateTableScreen from "./screens/CreateTableScreen";

import type { FCWithoutChildren } from "./types/component";

const AppRoot: FCWithoutChildren = () => {
  const store = useStore();
  const changeTheme = useMemo(() => store.cycleTheme, [store]);

  useEffect(() => {
    store.connect();
  }, [store]);

  return (
    <Container>
      <AppBarContainer>
        <ChangeThemeButton onClick={changeTheme}>{"😈 / 👼"}</ChangeThemeButton>
      </AppBarContainer>
      <ScreenContainer>
        {store.data.table ? (
          <TableScreen />
        ) : (
          <CreateTableScreen onCreateTable={store.onCreateTable} />
        )}
      </ScreenContainer>
    </Container>
  );
};

export default observer(AppRoot);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const AppBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 0 0;
`;

const ScreenContainer = styled.div`
  flex: 1 0;
`;

const ChangeThemeButton = styled.button`
  font: inherit;
  color: inherit;
  border: none;
  appearance: none;
  background-color: transparent;
  cursor: pointer;
`;
