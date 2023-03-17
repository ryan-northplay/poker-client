import React, { useMemo } from "react";
import { observer } from "mobx-react";
import { animated, useSpring, config } from "react-spring";
import styled, { useTheme } from "styled-components";

import { clamp } from "../lib/util/number";
import { getColorScaler } from "../lib/util/color";
import { useStore } from "../state/store";
import { absoluteFill } from "../style/partials";
import AnimatedNumber from "./AnimatedNumber";

import type { FCWithoutChildren } from "../types/component";

const clampRatio = clamp(0, 1);

const ChipBall: FCWithoutChildren<{
  chipCount: number;
  minSize?: number;
  maxSize?: number;
}> = ({ chipCount, minSize = 30, maxSize = 80 }) => {
  const store = useStore();
  const theme = useTheme();
  const ratio = clampRatio(
    chipCount / (store.data.table?.maxBetChipCount || 1000)
  );
  const sizeScale = (minSize + ratio * (maxSize - minSize)) / maxSize;

  const colorScaler = useMemo(
    () => getColorScaler(theme.colors.chipValueScale),
    [theme.colors.chipValueScale]
  );

  const colorSpring = useSpring({ backgroundColor: colorScaler(ratio) });

  const sizeSpring = useSpring({
    transform: `scale(${sizeScale})`,
    config: config.gentle,
  });

  return (
    <Container size={maxSize}>
      {!!chipCount && (
        <>
          <Ball style={{ ...colorSpring, ...sizeSpring }}></Ball>
          <ValueContainer>
            <AnimatedNumber value={chipCount} />
          </ValueContainer>
        </>
      )}
    </Container>
  );
};

export default observer(ChipBall);

const Container = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const Ball = styled(animated.div)`
  ${absoluteFill} /* stylelint-disable-line value-keyword-case */
  border-radius: 50%;
`;

const ValueContainer = styled(animated.div)`
  ${absoluteFill} /* stylelint-disable-line value-keyword-case */
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.chipValueText};
`;
