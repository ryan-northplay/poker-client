import React from "react";
import {
  withKnobs,
  text,
  object,
  number,
  boolean,
} from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Seat from "../Seat";
import { withStore } from "../../lib/storybookHelpers";
import { Face, Suit, extractHand } from "@pairjacks/poker-cards";

export default {
  title: "Seat",
  component: Seat,
  decorators: [withKnobs],
};

export const seat = () => {
  // Table
  const tableName = text("Table name", "Table Name", "Table");
  const maxBetChipCount = number(
    "store.data.table.maxBetChipCount",
    0,
    {},
    "Table"
  );

  // Seat
  const seatDisplayName = text("Display name", "", "Seat");
  const seatEmpty = boolean("Is empty", false, "Seat");
  const seatChips = number("Chips", 0, {}, "Seat");
  const seatBet = number("Bet", 0, {}, "Seat");

  // Toggles
  const isCurrentUser = boolean("Is current", false, "Toggles");
  const isTurn = boolean("Is turn", false, "Toggles");
  const isFolded = boolean("Is folded", false, "Toggles");
  const isBust = boolean("Is bust", false, "Toggles");
  const isDealer = boolean("Is dealer", false, "Toggles");
  const canDeal = boolean("Can deal", false, "Toggles");
  const canBet = boolean("Can bet", false, "Toggles");

  // Hand
  const handCandidate = object(
    "Hand candidate",
    {
      pocketCards: [
        [Face.Ace, Suit.Spades],
        [Face.Two, Suit.Hearts],
      ],
      communityCards: [
        [Face.King, Suit.Clubs],
        [Face.Ace, Suit.Spades],
        [Face.Ace, Suit.Spades],
      ],
    },
    "Hand"
  );

  const { store, Component } = withStore(() => (
    <Seat
      tableName={tableName}
      seat={
        {
          isEmpty: seatEmpty,
          displayName: seatDisplayName,
          chipCount: seatChips,
          chipsBetCount: seatBet,
        } as any
      }
      isCurrentUser={isCurrentUser}
      isTurn={isTurn}
      isFolded={isFolded}
      isBust={isBust}
      isDealer={isDealer}
      canDeal={canDeal}
      canBet={canBet}
      hand={extractHand(handCandidate as any)}
      pocketCards={handCandidate.pocketCards as any}
      onDisplayNamePress={action("onDisplayNamePress")}
      onDealPress={action("onDealPress")}
      onBetPress={action("onBetPress")}
      onCheckPress={action("onCheckPress")}
      onCallPress={action("onCallPress")}
      onFoldPress={action("onFoldPress")}
    />
  ));

  Object.defineProperty(store.data, "table", {
    get() {
      return { maxBetChipCount };
    },
  });

  return Component;
};
