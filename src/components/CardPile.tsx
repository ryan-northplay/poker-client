import React, { Children } from "react";
import styled, { css } from "styled-components";
import { animated, config, useTransition } from "react-spring";

import { absoluteFill } from "../style/partials";
import { CardPlaceholder } from "./Card";

import type { FunctionComponent } from "react";
import type { CardElement } from "./Card";

const outTransform = () =>
  `translate3d(0, ${Math.random() < 0.5 ? -40 : 40}%, 0)`;

const CardPile: FunctionComponent<{
  children: CardElement[];
  slots?: number;
}> = ({ children, slots = 0 }) => {
  const childArray = Children.toArray(children)
    .filter((child) => !!child)
    .splice(slots > 0 ? -slots : 0) as CardElement[];

  const springs = useTransition(childArray, (child) => child?.key || "", {
    from: { transform: outTransform(), opacity: 0 },
    enter: { transform: "translate3d(0, 0px, 0)", opacity: 1 },
    leave: { transform: outTransform(), opacity: 0 },
    config: config.gentle,
    trail: 200,
  });

  const cards = springs.map(({ item, key, props }) => (
    <CardContainer style={props} key={key}>
      {item}
    </CardContainer>
  ));

  if (slots <= 0) return <Container>{cards}</Container>;

  return (
    <Container>
      <CardsContainerAbs>{cards}</CardsContainerAbs>
      <SlotsContainer>
        {Array(slots)
          .fill(0)
          .map((_, i) => (
            <Slot key={`placeholder-${i}`} />
          ))}
      </SlotsContainer>
    </Container>
  );
};

export default CardPile;

const cardSpacing = css`
  margin: 0.2em;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
`;

const CardContainer = styled(animated.div)`
  ${cardSpacing}/* stylelint-disable-line value-keyword-case */
`;

const CardsContainerAbs = styled.div`
  ${absoluteFill} /* stylelint-disable-line value-keyword-case */
  display: flex;
  flex-wrap: wrap;
  z-index: 2;
`;

const SlotsContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
`;

const Slot = styled(CardPlaceholder)`
  ${cardSpacing}/* stylelint-disable-line value-keyword-case */
`;
