import { type IconProps, STROKE_WIDTH } from "./types";

export function Bookmark({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Bookmark</title>
      <path
        d="M6.01149 3.00635H19.0429V20.0693L12.01 14.849L5.00586 20.0693V4.00725"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
