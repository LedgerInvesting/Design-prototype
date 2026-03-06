import { type IconProps, STROKE_WIDTH } from "./types";

export function Ban({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Ban</title>
      <path
        d="M17.9177 6.49956L6.53266 17.8867M6.72895 19.384C10.3642 21.9778 15.4574 21.516 18.582 18.1386C21.9712 14.4754 21.7609 8.76932 18.1124 5.39373C14.4639 2.01814 8.75865 2.25133 5.36947 5.91456C2.24776 9.2887 2.17979 14.396 5.03962 17.8189"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
