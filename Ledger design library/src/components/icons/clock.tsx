import { type IconProps, STROKE_WIDTH } from "./types";

export function Clock({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Clock</title>
      <path
        d="M10.8713 3.13239C6.50542 3.689 3.12988 7.43154 3.12988 11.9655C3.12988 16.8834 7.10117 20.8701 12 20.8701C16.8988 20.8701 20.8701 16.8834 20.8701 11.9655C20.8701 7.43579 17.5009 3.69601 13.141 3.13396M12 11.0142V4.01552M13.008 12H16.9941"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
