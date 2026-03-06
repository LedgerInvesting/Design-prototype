import { type IconProps, STROKE_WIDTH } from "./types";

export function Eraser({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Eraser</title>
      <path
        d="M8.33551 19.9155L4.51516 16.0952L13.5293 7.08081L19.6023 13.1538L12.8408 19.9155M12.9923 13.002L15.9828 16.0032M3 20.0046H21"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
