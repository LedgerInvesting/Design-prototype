import { type IconProps, STROKE_WIDTH } from "./types";

export function ArrowLeft({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Arrow Left</title>
      <path
        d="M12.7347 4.7204L5.51074 12.0346L12.7148 19.2969M6.01829 12H20.0183"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
