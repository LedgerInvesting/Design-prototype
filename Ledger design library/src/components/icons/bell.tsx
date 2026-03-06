import { type IconProps, STROKE_WIDTH } from "./types";

export function Bell({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Bell</title>
      <path
        d="M15.0084 18.0051H20.9802M15.0046 20.0023H9.00962M3.10449 18.0051H9.00519M18.0153 17.0192V10.1165C18.0153 6.79924 15.3262 4.11011 12.009 4.11011C8.69178 4.11011 6.00265 6.79924 6.00265 10.1165V17.0192"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
