import { type IconProps, STROKE_WIDTH } from "./types";

export function ChartBars({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chart Bars</title>
      <path
        d="M3 19.9951H21M7.00842 3.08594V16.9966M12 10.1038V16.9966M17.0289 6.00867V16.9966"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
