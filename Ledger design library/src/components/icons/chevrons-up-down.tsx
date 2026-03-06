import { type IconProps, STROKE_WIDTH } from "./types";

export function ChevronsUpDown({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chevrons Up Down</title>
      <path
        d="M7.01763 9.40131L12.003 4.41638L16.9877 9.4011M7.01758 14.6039L12.0029 19.5888L16.9876 14.6041"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
