import { type IconProps, STROKE_WIDTH } from "./types";

export function Document({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Document</title>
      <path
        d="M6.01585 21.0085H19.0049V6.41993L15.5849 3.00391H5.00586V20.008M12.9861 3.86528V8.03058M18.0959 9.02304H13.9805"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
