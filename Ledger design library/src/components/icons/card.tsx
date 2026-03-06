import { type IconProps, STROKE_WIDTH } from "./types";

export function Card({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Card</title>
      <path
        d="M4.00905 19H21V5H3V18.022M2.58496 9.03171H21.0127M6.04102 14.9809H11.041"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
