import { type IconProps, STROKE_WIDTH } from "./types";

export function ChartCandles({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chart Candles</title>
      <path
        d="M3 19.9951H21M17.0417 12.1381H14.0391V6.13812H18.0391V11.0605M7.03666 9.03753L10.0392 9.03753L10.0392 14.0375L6.03918 14.0375L6.03918 10.1151M16.0323 5.43211V3.02325M8.04597 15.0125L8.04598 17.0541M16.0323 14.9813V12.9813M8.04598 5.93499V8.11714"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
