import { type IconProps, STROKE_WIDTH } from "./types";

export function Sidebar({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Sidebar</title>
      <path
        d="M21.002 18.0072V4.99969H4.01326M20.0294 19.0024H3.02148V5.99998M8.01749 5.72522V18.2358"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
