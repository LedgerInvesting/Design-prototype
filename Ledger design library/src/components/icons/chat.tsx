import { type IconProps, STROKE_WIDTH } from "./types";

export function Chat({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chat</title>
      <path
        d="M12.7135 21.332L17.0477 16.9978H21.0605V12.25V5H14.038H3.06055L3.06055 16.9978H11.9987"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
