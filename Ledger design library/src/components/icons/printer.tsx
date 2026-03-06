import { type IconProps, STROKE_WIDTH } from "./types";

export function Printer({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Printer</title>
      <path
        d="M7.99164 8H3.02441V16.9839H7.04297M10.0237 8H14.0278M16.0399 8H21.0068V16.9839H17.6958M17.0157 20.9975V12.9793M7.04688 20.9975V12.9793M15.0142 7V4H9.0203V7M7.17624 13.9775H16.8962M7.84961 19.9935L16.9361 19.9935"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
