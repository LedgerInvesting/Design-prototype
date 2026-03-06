import { type IconProps, STROKE_WIDTH } from "./types";

export function ChartBarsNoAxis({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chart Bars No Axis</title>
      <path
        d="M7.04102 5.03021V19.0302M12.0322 12.9968V18.9968M17.0615 7.01178V19.0118"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
