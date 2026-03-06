import { type IconProps, STROKE_WIDTH } from "./types";

export function Calendar({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Calendar</title>
      <path
        d="M9.00039 4.99923H4.00098V20.0137H18.9957M9.00039 4.99923H15.031M9.00039 4.99923V7.04527M9.00039 4.99923V2.01184M15.031 4.99923H20.0058V19M15.031 4.99923V7.00603M15.031 4.99923V2.02211M4.83963 10.0252H19.1553"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
