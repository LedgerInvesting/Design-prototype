import { type IconProps, STROKE_WIDTH } from "./types";

export function Check({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Check</title>
      <path
        d="M3.73633 11.3193L9.03668 17.0305L20.3109 6.27966"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
