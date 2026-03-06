import { type IconProps, STROKE_WIDTH } from "./types";

export function Home({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Home</title>
      <path
        d="M11.2889 3.81036L4.07812 10.468V19.9026H19.8955V10.468L12.7222 3.81038M12 13.0039V19.0247"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
