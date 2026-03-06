import { type IconProps, STROKE_WIDTH } from "./types";

export function Email({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Email</title>
      <path
        d="M20.1914 5.82233L12.7097 13.3036M3.96583 5.82233L11.2934 13.2969M3 19V5H21V19H3Z"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
