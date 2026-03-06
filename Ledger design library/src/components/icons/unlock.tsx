import { type IconProps, STROKE_WIDTH } from "./types";

export function Unlock({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Unlock</title>
      <path
        d="M16.0039 12.0099H5.00532L5.00488 21.002L19.0067 21.0028V11.0039M7 11.0273V8.02179C7 5.25416 9.23748 3.01056 11.9976 3.01056C14.7576 3.01056 16.9951 5.25416 16.9951 8.02179M12 15.0148V18.0148"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
