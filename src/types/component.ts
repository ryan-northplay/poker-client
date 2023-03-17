import type { FunctionComponent } from "react";

export type PropsWithoutChildren<P = {}> = P & { children?: never };

export type FCWithoutChildren<P = {}> = FunctionComponent<
  PropsWithoutChildren<P>
>;
