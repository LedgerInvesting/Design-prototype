import { type IconProps, STROKE_WIDTH } from "./types";

export function ChartPie({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Chart Pie</title>
      <path
        d="M7.57468 4.2826C3.31577 6.74147 1.85491 12.1844 4.31174 16.4398C6.76857 20.6952 12.2127 22.1515 16.4717 19.6926C18.0901 18.7582 19.3045 17.3929 20.0533 15.8256M12.0008 3.1236C13.1664 3.1236 14.3207 3.35319 15.3976 3.79927C16.4746 4.24535 17.4531 4.89918 18.2773 5.72344C19.1016 6.54769 19.7554 7.52621 20.2015 8.60315C20.6476 9.68008 20.8772 10.8343 20.8772 12H12.0008V3.1236Z"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
