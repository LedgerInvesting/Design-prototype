import { type IconProps, STROKE_WIDTH } from "./types";

export function Pin({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Pin</title>
      <path
        d="M11.4786 21.0474C5.74834 17.2511 4.18555 14.2045 4.18555 10.2862C4.18555 6.2705 7.68398 3.01514 11.9995 3.01514C16.315 3.01514 19.8135 6.2705 19.8135 10.2862C19.8135 14.2045 18.2507 17.2511 12.5204 21.0474M14.9889 10.9908C14.9889 12.6416 13.6507 13.9798 11.9999 13.9798C10.3491 13.9798 9.01086 12.6416 9.01086 10.9908C9.01086 9.33998 10.3491 8.00176 11.9999 8.00176C13.6507 8.00176 14.9889 9.33998 14.9889 10.9908Z"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
