import React, { memo } from "react";
import { useSpring, config, animated } from "react-spring";
import { Face, Suit } from "@pairjacks/poker-cards";

import type { FCWithoutChildren } from "../types/component";
import styled, { css } from "styled-components";
import { roundCorners, absoluteFill } from "../style/partials";
import { useStore } from "../state/store";

const faceCharacterMap: { [key in Face]: string } = {
  [Face.Two]: "2",
  [Face.Three]: "3",
  [Face.Four]: "4",
  [Face.Five]: "5",
  [Face.Six]: "6",
  [Face.Seven]: "7",
  [Face.Eight]: "8",
  [Face.Nine]: "9",
  [Face.Ten]: "10",
  [Face.Jack]: "J",
  [Face.Queen]: "Q",
  [Face.King]: "K",
  [Face.Ace]: "A",
};

const suitCharacterMap: { [key in Suit]: string } = {
  [Suit.Diamonds]: "♦",
  [Suit.Clubs]: "♣",
  [Suit.Hearts]: "♥",
  [Suit.Spades]: "♠",
};

export enum CardOrientation {
  FaceUp = "FaceUp",
  FaceDown = "FaceDown",
}

const Card: FCWithoutChildren<{
  face?: Face;
  suit?: Suit;
  orientation?: CardOrientation;
  highlight?: boolean;
}> = ({
  face,
  suit,
  orientation = CardOrientation.FaceUp,
  highlight = false,
}) => {
  const store = useStore();
  const showFaceUp = !!face && !!suit && orientation === CardOrientation.FaceUp;
  const backSpring = useSpring({ opacity: showFaceUp ? 0 : 1 });
  const charSpring = useSpring({
    scale: showFaceUp ? 1 : 0,
    opacity: showFaceUp ? 1 : 0,
    config: config.gentle,
  });

  return (
    <Container
      highlight={store.data.table?.highlightRelevantCards ? highlight : false}
    >
      {showFaceUp ? null : <Back style={backSpring} />}
      {showFaceUp && face ? (
        <FaceChar style={charSpring}>{faceCharacterMap[face]}</FaceChar>
      ) : null}
      {showFaceUp && suit ? (
        <SuitChar suit={suit} style={charSpring}>
          {suitCharacterMap[suit]}
        </SuitChar>
      ) : null}
    </Container>
  );
};

export default memo(Card);

const cardDimensions = css`
  width: 3.2rem;
  height: 2.4rem;
`;

export const CardPlaceholder = styled.div`
  ${roundCorners} /* stylelint-disable-line value-keyword-case */
  ${cardDimensions} /* stylelint-disable-line value-keyword-case */
  border: 1px solid ${({ theme }) => theme.colors.playingCardPlaceholderBorder};
`;

export type CardElement = ReturnType<typeof Card>;

const Container = styled.div<{ highlight: boolean }>`
  ${roundCorners} /* stylelint-disable-line value-keyword-case */
  ${cardDimensions} /* stylelint-disable-line value-keyword-case */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-size: 1.2rem;
  outline: 1px solid
    ${({ highlight, theme }) =>
      highlight ? theme.colors.playingCardHighlight : "none"};
  background-color: ${({ theme }) => theme.colors.playingCardBackground};
`;

const Back = styled(animated.div)`
  ${absoluteFill} /* stylelint-disable-line value-keyword-case */
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.playingCardBack};

  ::before {
    display: block;
    position: absolute;
    width: 2.6em;
    height: 1px;
    top: 50%;
    left: 50%;
    transform: translateX(-1.3em) rotate(-36deg);
    background-color: ${({ theme }) => theme.colors.playingCardBackAccent};
    content: " ";
  }
`;

const FaceChar = styled(animated.div)`
  position: relative;
  margin-right: 0.2em;
  z-index: 1;
`;

const SuitChar = styled(animated.div)<{ suit: Suit }>`
  position: relative;
  z-index: 1;
  color: ${({ suit, theme }) =>
    [Suit.Hearts, Suit.Diamonds].includes(suit)
      ? theme.colors.playingCardSuitRed
      : theme.colors.playingCardSuitBlack};
`;
