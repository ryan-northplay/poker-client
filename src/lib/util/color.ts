import chroma from "chroma-js";

import { memoizeWeakMap } from "./function";

export const getColorScaler = memoizeWeakMap((scale: string[]) => {
  const scaler = chroma.scale(scale).mode("lch");

  return (ratio: number) => scaler(ratio).hex();
});
