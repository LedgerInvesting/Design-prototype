import { type IconProps, STROKE_WIDTH } from "./types";

export function Talk({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Talk</title>
      <path
        d="M12.0093 17V21.0003M12.0093 21.0003H16.0235M12.0093 21.0003H8.00708M17.9922 11.0027C17.9922 13.7204 15.7734 15.9366 13.0086 16.0085M6.02344 11.0027C6.02344 13.7168 8.23639 15.9308 10.9962 16.0082M12 12.9545C10.3431 12.9545 9 11.6114 9 9.95453V5.95453C9 4.29767 10.3431 2.95453 12 2.95453C13.6569 2.95453 15 4.29767 15 5.95453V9.95453C15 11.6114 13.6569 12.9545 12 12.9545Z"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
