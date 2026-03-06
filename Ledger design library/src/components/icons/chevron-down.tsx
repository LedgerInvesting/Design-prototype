import { type IconProps, STROKE_WIDTH } from "./types";

export function ChevronDown({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chevron Down</title>
      <path
        d="M5.71005 9.2935L11.998 15.5298L18.2906 9.29352"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
