import { type IconProps, STROKE_WIDTH } from "./types";

export function List({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>List</title>
      <path
        d="M8.01074 7.0202L20.9971 7.0202M8.01074 12L20.9971 12M3.03027 7.0202H6.03027M3.03027 12.0202H6.03027M8.01074 17.0172L20.9971 17.0172M3.03027 17.0202H6.03027"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
