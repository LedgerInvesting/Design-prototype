import { type IconProps, STROKE_WIDTH } from "./types";

export function ChevronUp({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chevron Up</title>
      <path
        d="M5.71005 14.6862L11.998 8.44991L18.2906 14.6862"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
