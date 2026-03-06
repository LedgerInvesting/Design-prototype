import { type IconProps, STROKE_WIDTH } from "./types";

export function Folder({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Folder</title>
      <path
        d="M6.00507 10.0855V5.01849H11.9831L13.4832 7.00846L20.0017 7.00845V11.3383M20.0017 19.0119V11.0153L4.03223 11.0057V20.0058H18.9953"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
