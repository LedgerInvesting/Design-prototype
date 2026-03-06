import { type IconProps, STROKE_WIDTH } from "./types";

export function EllipsisVertical({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Ellipsis Vertical</title>
      <path
        d="M11 5.00311H13M11 12.0341H13M11 19.029H13"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
