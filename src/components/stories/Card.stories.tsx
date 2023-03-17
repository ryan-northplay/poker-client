import React, { useRef, useState, useEffect } from "react";
import {
  withKnobs,
  select,
  boolean,
  number,
  button,
} from "@storybook/addon-knobs";
import { Face, Suit, createDeck } from "@pairjacks/poker-cards";

import { clamp } from "../../lib/util/number";
import { withStore } from "../../lib/storybookHelpers";
import Card, { CardOrientation } from "../Card";
import CardPile from "../CardPile";

export default {
  title: "Cards",
  component: Card,
  decorators: [withKnobs],
};

export const card = () => {
  const face = select("Face", { ...Face, None: undefined }, Face.Two);
  const suit = select("Suit", { ...Suit, None: undefined }, Suit.Diamonds);
  const orientation = select(
    "Orientation",
    { ...CardOrientation, None: undefined },
    undefined
  );
  const highlight = boolean("Highlight", false);
  const { store, Component } = withStore(() => (
    <Card
      face={face}
      suit={suit}
      orientation={orientation}
      highlight={highlight}
    />
  ));

  Object.defineProperty(store.data, "table", {
    get() {
      return { highlightRelevantCards: true };
    },
  });

  return Component;
};

export const Pile = () => {
  const clampNum = clamp(1, 52);
  const deck = useRef([...createDeck()].sort(() => -1 + Math.random() * 2));
  const [num, setNum] = useState(3);
  const [cards, setCards] = useState(deck.current.slice(0, num));

  useEffect(() => {
    setCards(deck.current.slice(0, num));
  }, [num]);

  const slots = number("Slots", 0, {
    min: 0,
    max: 20,
    range: true,
  });

  button("Add card", () => {
    setNum((curr) => clampNum(curr + 1));
  });

  button("Remove card", () => {
    setNum((curr) => clampNum(curr - 1));
  });

  button("Add 3 cards", () => {
    setNum((curr) => clampNum(curr + 3));
  });

  button("Remove 3 cards", () => {
    setNum((curr) => clampNum(curr - 3));
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CardPile slots={slots}>
        {cards.map(([face, suit], index) => (
          <Card face={face} suit={suit} key={[face, suit].join("")} />
        ))}
      </CardPile>
    </div>
  );
};
