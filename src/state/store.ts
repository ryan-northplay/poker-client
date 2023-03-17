import React, { useContext } from "react";
import { observable } from "mobx";
import {
  isServerMessage,
  ClientChangeDisplayNameMessage,
} from "@pairjacks/poker-messages";
import type {
  LimitedTable,
  ClientJoinTableMessage,
  ClientCreateTableMessage,
  ClientStartGameMessage,
  ClientPlaceBetMessage,
  ClientMessage,
  ClientDealMessage,
  ClientFoldMessage,
  ClientCallMessage,
  ClientCheckMessage,
} from "@pairjacks/poker-messages";

import { themes, getNextThemeName } from "../style/theme";

export interface JoinTableOptions {
  seatToken: string;
  tableName: string;
}

export interface CreateTableOptions {
  tableName: string;
  numberOfSeats: number;
  startingChipCount: number;
  smallBlind: number;
  highlightRelevantCards: boolean;
}

export type ServerConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected";

interface AppState {
  themeName: string;
  connectionStatus: ServerConnectionStatus;
  table?: LimitedTable;
}

const WS_URL = "wss://easy-poker-server.herokuapp.com";
const REST_URL = "https://easy-poker-server.herokuapp.com";

// const WS_URL = "ws://localhost:8080";
// const REST_URL = "http://localhost:8080";

export class Store {
  @observable data: AppState = {
    themeName: themes.dark.name,
    connectionStatus: "disconnected",
  };

  private ws?: WebSocket;
  private pingIntervalRef?: number;

  connect = () => {
    this.data.connectionStatus = "connecting";

    this.ws = new WebSocket(WS_URL);

    this.ws.addEventListener("open", () => {
      this.data.connectionStatus = "connected";

      clearInterval(this.pingIntervalRef);
      this.pingIntervalRef = setInterval(() => {
        this.ws?.send("PING");
      }, 20000);

      const pathnameParts = window.location.pathname.split("/");

      const tableName = pathnameParts[1];
      const seatToken = pathnameParts[2];

      if (tableName && !seatToken) this.requestSeatToken(tableName);
      if (tableName && seatToken) this.onJoinTable({ tableName, seatToken });
    });

    this.ws.addEventListener("close", () => {
      this.data.connectionStatus = "disconnected";
    });

    this.ws.addEventListener("error", () => {
      this.data.connectionStatus = "disconnected";
    });

    this.ws.addEventListener("message", (event) => {
      if (typeof event.data !== "string") {
        console.log("Unable to process event: ", event);
        return;
      }

      const message = JSON.parse(event.data);
      console.log("Parsed message: ", message);

      if (!isServerMessage(message)) {
        console.log("Unable to parse message: ", message);
        return;
      }

      switch (message.type) {
        case "server/table-state":
          this.updateTableState(message.table);
          break;
      }
    });
  };

  cycleTheme = () => {
    this.data.themeName = getNextThemeName(this.data.themeName);
  };

  private requestSeatToken = async (tableName: string) => {
    try {
      const response = await fetch(`${REST_URL}/join/${tableName}`, {
        method: "POST",
      });
      const { seatToken } = await response.json();

      if (!seatToken) {
        throw new Error("InvalidResponse");
      }

      this.onJoinTable({
        tableName,
        seatToken,
      });
    } catch (e) {
      // TODO Handle Error
    }
  };

  private updateTableState = (table?: LimitedTable) => {
    this.data.table = table;
    if (
      table &&
      (window.location.pathname === "/" ||
        window.location.pathname === `/${table.name}`)
    ) {
      window.history.pushState(
        "page2",
        "Title",
        `${table.name}/${table.currentUser.seatToken}`
      );
    }
  };

  onJoinTable = (options: JoinTableOptions) => {
    const joinTableMessage: ClientJoinTableMessage = {
      type: "client/join-table",
      ...options,
    };

    this.sendMessage(joinTableMessage);
  };

  onCreateTable = (options: CreateTableOptions) => {
    const createTableMessage: ClientCreateTableMessage = {
      type: "client/create-table",
      ...options,
    };

    this.sendMessage(createTableMessage);
  };

  onStartGame = () => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken) {
      return;
    }

    const startGameMessage: ClientStartGameMessage = {
      type: "client/start-game",
      tableName,
      seatToken,
    };

    this.sendMessage(startGameMessage);
  };

  onChangeDisplayName = () => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken) {
      return;
    }

    const startGameMessage: ClientChangeDisplayNameMessage = {
      type: "client/change-display-name",
      tableName,
      seatToken,
    };

    this.sendMessage(startGameMessage);
  };

  onDeal = () => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken) {
      return;
    }

    const dealMessage: ClientDealMessage = {
      type: "client/deal",
      tableName,
      seatToken,
    };

    this.sendMessage(dealMessage);
  };

  onPlaceBet = (chipCount: number) => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken || !chipCount) {
      return;
    }

    const placeBetMessage: ClientPlaceBetMessage = {
      type: "client/place-bet",
      tableName,
      seatToken,
      chipCount,
    };

    this.sendMessage(placeBetMessage);
  };

  onCall = () => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken) {
      return;
    }

    const callMessage: ClientCallMessage = {
      type: "client/call",
      tableName,
      seatToken,
    };

    this.sendMessage(callMessage);
  };

  onCheck = () => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken) {
      return;
    }

    const callMessage: ClientCheckMessage = {
      type: "client/check",
      tableName,
      seatToken,
    };

    this.sendMessage(callMessage);
  };

  onFold = () => {
    const tableName = this.data.table?.name;
    const seatToken = this.data.table?.currentUser.seatToken;

    if (!tableName || !seatToken) {
      return;
    }

    const foldMessage: ClientFoldMessage = {
      type: "client/fold",
      tableName,
      seatToken,
    };

    this.sendMessage(foldMessage);
  };

  private sendMessage = (message: ClientMessage) => {
    if (!this.ws) return;

    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  };
}

export const StoreContext = React.createContext<Store>(new Store());

export const useStore = () => useContext(StoreContext);
