import { type IconProps, STROKE_WIDTH } from "./types";

export function ArrowUp({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Arrow Up</title>
      <path
        d="M4.71484 12.7025L12.0076 5.41852L19.2936 12.7094M12.0003 6.00384V20.0038"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
