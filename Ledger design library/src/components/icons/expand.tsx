import { type IconProps, STROKE_WIDTH } from "./types";

export function Expand({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Expand</title>
      <path
        d="M13.7211 10.2908L20.0095 4.00238M20.0095 4.00238V11.0013M20.0095 4.00238H13.0194M10.2962 13.7145L4.00781 20.003M4.00781 20.003V13.0041M4.00781 20.003H10.9979"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
