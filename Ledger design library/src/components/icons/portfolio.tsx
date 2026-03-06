import { type IconProps, STROKE_WIDTH } from "./types";

export function Portfolio({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Portfolio</title>
      <path
        d="M19.0381 19.998H4.04102V7.99799H20.041L20.041 18.9983M9.00977 7.11847V6.04626C9.00977 4.39265 10.3503 3.05212 12.0039 3.05212C13.6575 3.05212 14.998 4.39265 14.998 6.04626V7.11847M3.98145 13.0034H10.0078M14 13.0034L20.0737 13.0034M10.0059 15.0041H14.0078"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
