import { type IconProps, STROKE_WIDTH } from "./types";

export function PanelCollapseLeft({
  variant = "heavy",
  className,
  ...props
}: IconProps) {
  return (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 18 14"
      width="18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Panel Collapse Left</title>
      <rect
        height="12"
        rx="1"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
        width="16"
        x="1"
        y="1"
      />
      <rect
        fill="currentColor"
        height="12"
        rx="1"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
        width="7"
        x="1"
        y="1"
      />
      <path d="M3 5H6" stroke="white" strokeWidth={STROKE_WIDTH[variant]} />
      <path d="M3 9H6" stroke="white" strokeWidth={STROKE_WIDTH[variant]} />
    </svg>
  );
}
