import { type IconProps, STROKE_WIDTH } from "./types";

export function ChartArea({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chart Area</title>
      <path
        d="M5.00806 20.0021H20.9814M4.01367 3.00299V19.009M18.3085 6.70385L13.9788 11.0092L11.0134 8.01158L8.00059 11.0128L7.99485 16.0109L18.0036 15.9976V12.1548"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
