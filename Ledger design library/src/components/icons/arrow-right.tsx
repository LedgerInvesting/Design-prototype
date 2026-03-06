import { type IconProps, STROKE_WIDTH } from "./types";

export function ArrowRight({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Arrow Right</title>
      <path
        d="M11.2889 4.6969L18.5934 12.0346L11.3018 19.3028M4.01855 12.0155H18.0186"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
