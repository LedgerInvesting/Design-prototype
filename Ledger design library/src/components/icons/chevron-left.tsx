import { type IconProps, STROKE_WIDTH } from "./types";

export function ChevronLeft({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chevron Left</title>
      <path
        d="M14.7089 5.70984L8.47266 11.9978L14.7089 18.2903"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
