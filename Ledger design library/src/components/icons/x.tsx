import { type IconProps, STROKE_WIDTH } from "./types";

export function X({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>X</title>
      <path
        d="M5.03849 4.99426L11.312 11.2677M12.7233 12.6941L18.9967 18.9676M19.0035 4.99451L12.7301 11.268M11.3018 12.6866L5.02832 18.9601"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
