import { type IconProps, STROKE_WIDTH } from "./types";

export function Calculator({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Calculator</title>
      <path
        d="M19.0068 20.0007V3.00781H5.00488V21.0009H17.9978M8 14.0522H10.0449M8 17.0363H10.0449M11.0127 14.0522H13.0576M11.0127 17.0363H13.0576M13.9619 14.0522H16.0068M13.9619 17.0363H16.0068M8.99902 7.01044H14.9951V10.0096H8.99902V7.01044Z"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
