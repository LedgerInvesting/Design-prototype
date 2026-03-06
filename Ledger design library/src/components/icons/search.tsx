import { type IconProps, STROKE_WIDTH } from "./types";

export function Search({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Search</title>
      <path
        d="M16.4966 16.506L20.1934 20.2029M18.0098 11.0065C18.0098 14.8725 14.8758 18.0065 11.0098 18.0065C7.14377 18.0065 4.00977 14.8725 4.00977 11.0065C4.00977 7.14048 7.14377 4.00647 11.0098 4.00647C14.8758 4.00647 18.0098 7.14048 18.0098 11.0065Z"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
