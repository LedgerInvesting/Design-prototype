import { type IconProps, STROKE_WIDTH } from "./types";

export function Globe({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Globe</title>
      <path
        d="M21 13.1397C20.4376 17.5722 16.6386 21 12.0359 21C7.0455 21 3 16.9706 3 12C3 7.02944 7.0455 3 12.0359 3C16.6387 3 20.4377 6.42792 21 10.8605M3.98242 12L20.0127 12M15.0635 12C15.0635 16.9706 13.7142 21 12.0498 21C10.3854 21 9.03613 16.9706 9.03613 12C9.03613 7.02944 10.3854 3 12.0498 3C13.7142 3 15.0635 7.02944 15.0635 12Z"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
