import { type IconProps, STROKE_WIDTH } from "./types";

export function ExternalLink({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>External Link</title>
      <path
        d="M4 19.0035V4H9.99749M5.00014 20H20.0225V14.0057M20 4V11M20 4H13.0359M20 4L12.0029 11.9971"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
