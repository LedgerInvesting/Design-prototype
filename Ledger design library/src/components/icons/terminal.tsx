import { type IconProps, STROKE_WIDTH } from "./types";

export function Terminal({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Terminal</title>
      <path
        d="M4.02667 18.0117L10.0036 12.0039L4.01465 6.01831M11.9994 19.0052H20.0043"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
