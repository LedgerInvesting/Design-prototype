import { type IconProps, STROKE_WIDTH } from "./types";

export function Ellipsis({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Ellipsis</title>
      <path
        d="M4.9873 13V11M12.0183 13V11M19.0132 13V11"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
