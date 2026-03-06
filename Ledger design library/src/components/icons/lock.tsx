import { type IconProps, STROKE_WIDTH } from "./types";

export function Lock({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Lock</title>
      <path
        d="M16.0039 12.0099H5.00532L5.00488 21.002L19.0067 21.0028V11.0039M16.9951 11.0039V8.02179C16.9951 5.25416 14.7576 3.01056 11.9976 3.01056C9.23748 3.01056 7 5.25416 7 8.02179V11.0273M12 15.0148V18.0148"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
