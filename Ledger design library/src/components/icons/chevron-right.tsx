import { type IconProps, STROKE_WIDTH } from "./types";

export function ChevronRight({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chevron Right</title>
      <path
        d="M9.35547 18.2903L15.5917 12.0024L9.35548 5.70984"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
