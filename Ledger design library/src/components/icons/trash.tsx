import { type IconProps, STROKE_WIDTH } from "./types";

export function Trash({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Trash</title>
      <path
        d="M8.00482 3.00519H16.0048M16.0077 5.00872H20.0077M4.0459 5.05021H8.0459M6.04735 8.0261V21.0022H17.992V8.0261M12.0003 10.0098V18.0371"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
