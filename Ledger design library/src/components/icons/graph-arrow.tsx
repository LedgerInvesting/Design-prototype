import { type IconProps, STROKE_WIDTH } from "./types";

export function GraphArrow({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Graph Arrow</title>
      <path
        d="M4.00391 12.0054L8.16635 8.67871C8.62479 8.31232 9.29872 8.41762 9.62353 8.90639L13.1716 14.2454C13.7196 15.07 15.0045 14.682 15.0045 13.6919V8.99945L20.0017 4.0015M4.00391 12.0054V3.00659M4.00391 12.0054V19.0028M20.0017 4.0015L20.0081 9.02932M20.0017 4.0015L15.0278 4.01608M5.004 20.0063H21.004"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
