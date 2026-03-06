import { type IconProps, STROKE_WIDTH } from "./types";

export function Plus({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Plus</title>
      <path
        d="M11.9996 2.99915V10.9991M11.9996 13.0017V21.0017M21.005 12.0054L13.005 12.0054M11.0068 11.9989L3.00684 11.9989"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
