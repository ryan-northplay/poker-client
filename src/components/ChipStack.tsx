import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { FCWithoutChildren } from "../types/component";

const ChipStackComponent: FCWithoutChildren<{
  chipCount: number;
}> = ({ chipCount }) => {
  const twentyFiveChipsCount = Math.floor(chipCount / 2 / 25);
  const tenChipsCount = Math.floor(
    (chipCount - twentyFiveChipsCount * 25) / 2 / 10
  );
  const fiveChipsCount = Math.floor(
    (chipCount - twentyFiveChipsCount * 25 - tenChipsCount * 10) / 1.2 / 5
  );
  const oneChipsCount =
    chipCount -
    (25 * twentyFiveChipsCount + 10 * tenChipsCount + 5 * fiveChipsCount);

  return (
    <Container>
      {Array(twentyFiveChipsCount)
        .fill(0)
        .map((_, index) => (
          <Chip25 chipIndex={index} />
        ))}
      {Array(tenChipsCount)
        .fill(0)
        .map((_, index) => (
          <Chip10 chipIndex={index} stackIndex={1} />
        ))}
      {Array(fiveChipsCount)
        .fill(0)
        .map((_, index) => (
          <Chip5 chipIndex={index} stackIndex={2} />
        ))}
      {Array(oneChipsCount)
        .fill(0)
        .map((_, index) => (
          <Chip1 chipIndex={index} stackIndex={3} />
        ))}
      {chipCount !== 0 && <Count>{chipCount}</Count>}
    </Container>
  );
};

export default observer(ChipStackComponent);

const Container = styled.div`
  position: relative;
  width: 140px;
  height: 30px;
  background-color: transparent;
`;

const Chip = styled.div<{ chipIndex?: number; stackIndex?: number }>`
  position: absolute;
  width: 20px;
  height: 20px;
  top: ${({ chipIndex = 0 }) => chipIndex * -2}px;
  left: ${({ stackIndex = 0 }) => stackIndex * 25}px;
  border-radius: 50%;
  border: ${({ theme }) => `1px solid ${theme.colors.chipBorder}`};
`;

const Chip25 = styled(Chip)`
  background-color: ${({ theme }) => theme.colors.chip25};
`;

const Chip10 = styled(Chip)`
  background-color: ${({ theme }) => theme.colors.chip10};
`;

const Chip5 = styled(Chip)`
  background-color: ${({ theme }) => theme.colors.chip5};
`;

const Chip1 = styled(Chip)`
  background-color: ${({ theme }) => theme.colors.chip1};
`;

const Count = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 100px;
`;
