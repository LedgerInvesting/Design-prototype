import { type IconProps, STROKE_WIDTH } from "./types";

export function Download({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Download</title>
      <path
        d="M18.3256 9.30704L12.022 15.6648L5.72389 9.30701M12 3.02307V14.9984M5.00525 20.0195H19.0049M20.0018 19.0195V16.0156M4.00391 19.0195V16.0156"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
