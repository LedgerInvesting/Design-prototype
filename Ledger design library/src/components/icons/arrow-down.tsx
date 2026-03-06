import { type IconProps, STROKE_WIDTH } from "./types";

export function ArrowDown({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Arrow Down</title>
      <path
        d="M19.2924 11.2969L12.022 18.6207L4.71387 11.2967M11.9997 3.95428V17.9543"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
