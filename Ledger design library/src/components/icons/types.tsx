import type { ComponentProps } from "react";

export type IconVariant = "thin" | "heavy";

export const STROKE_WIDTH: Record<IconVariant, number> = {
  thin: 1.5,
  heavy: 2,
};

export type IconProps = ComponentProps<"svg"> & {
  variant?: IconVariant;
};
