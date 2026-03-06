import { type IconProps, STROKE_WIDTH } from "./types";

export function Settings({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Settings</title>
      <path
        d="M12 3.98114L12 9.79117M5.04322 4V15.0189M5.04322 15.0189V20M5.04322 15.0189H2.01562M5.04322 15.0189H8.01562M19.0175 4V15.0189M19.0175 15.0189V20M19.0175 15.0189H16.0039M19.0175 15.0189H22.0039M12 12.015V20M9 9.06043H15"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
