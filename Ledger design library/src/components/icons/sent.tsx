import { type IconProps, STROKE_WIDTH } from "./types";

export function Sent({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Sent</title>
      <path
        d="M18.8864 12.0084L5.04395 4.62366V11.0089M18.8864 12.0084L5.04395 19.3904V13.0086M18.8864 12.0084H6.04895"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
