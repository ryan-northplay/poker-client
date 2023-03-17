import React from "react";
import { animated, useSpring, config } from "react-spring";
import styled from "styled-components";

import { FCWithoutChildren } from "../types/component";

const AnimatedNumber: FCWithoutChildren<{
  value: number;
  format?(x: number): string;
}> = ({ value, format = (n) => n.toLocaleString() }) => {
  const spring = useSpring({ value, config: config.slow });

  return (
    <Container>
      {spring.value.interpolate((x) => format(Math.round(x)))}
    </Container>
  );
};

export default AnimatedNumber;

const Container = styled(animated.div)`
  font-size: 1.2em;
  font-weight: 600;
`;
