import React from "react";
import { observer } from "mobx-react";
import styled from "styled-components";

import { useStore, ServerConnectionStatus } from "../state/store";
import type { FCWithoutChildren } from "../types/component";

const ConnectionStatus: FCWithoutChildren = () => {
  const store = useStore();

  return (
    <Container status={store.data.connectionStatus}>
      {store.data.connectionStatus}
      {store.data.connectionStatus === "disconnected" && (
        <ReconnectButton onClick={store.connect}>Reconnect</ReconnectButton>
      )}
    </Container>
  );
};

export default observer(ConnectionStatus);

const Container = observer(styled.div<{
  status: ServerConnectionStatus;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ status, theme }) => {
    switch (status) {
      case "connected":
        return theme.colors.serverConnected;
      case "disconnected":
        return theme.colors.serverDisconnected;
      case "connecting":
        return theme.colors.serverConnecting;
    }
  }};
`);

const ReconnectButton = styled.button`
  margin: 1em auto;
`;
