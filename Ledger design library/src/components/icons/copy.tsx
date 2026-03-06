import { type IconProps, STROKE_WIDTH } from "./types";

export function Copy({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Copy</title>
      <path
        d="M4.00684 15.002V3.01306H9.9667L14.0068 7.00198M5.00709 16.0018H8.12532M10.0036 21.0122H20.0037V10.3729L16.5916 7.01735H9.00557V20.0183M14.0008 7.93749V11.9996M19.1435 12.9953H15.005"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
