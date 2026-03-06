import { type IconProps, STROKE_WIDTH } from "./types";

export function Pencil({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Pencil</title>
      <path
        d="M16.1555 3.80817L4.11132 15.8524V19.929H8.18798L20.2181 7.89925M3.97168 19.929H20.912M17.5598 3.81197L20.1948 6.44701"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
