import { type IconProps, STROKE_WIDTH } from "./types";

export function Book({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Book</title>
      <path
        d="M17.9963 3.00903H5.00586V17.0177H19.001V4.00391M5.00586 17.8599V21.009H20.0186M9.01397 7.98621H15.014M9.01397 11.9642H13.014"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
