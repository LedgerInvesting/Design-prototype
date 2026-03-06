import { type IconProps, STROKE_WIDTH } from "./types";

export function Attach({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Attach</title>
      <path
        d="M10.0241 6.00055V15.9991H14.0058L14.0001 3.0155H6.00801M17.9836 20.9995H5.00879V4.01172M18.9954 20.0298V9.58096"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
