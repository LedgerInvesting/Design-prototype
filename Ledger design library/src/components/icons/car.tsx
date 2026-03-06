import { type IconProps, STROKE_WIDTH } from "./types";

export function Car({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Car</title>
      <path
        d="M8.02027 16.9207V19.004H3.04297V12.3139L5.17026 10.2306V7.51508L7.29754 5.01508H16.2735L18.6371 7.51508V10.2306L21.0008 12.3139L21.0008 19.004H16.0039L16.0039 16.9207M18.25 9.04382H22M2 9.04382H5.75M9.03114 14.9882L13.9889 14.9882M7.97949 12H16.0205"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
