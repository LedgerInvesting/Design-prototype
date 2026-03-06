import { type IconProps, STROKE_WIDTH } from "./types";

export function Contract({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Contract</title>
      <path
        d="M20.2915 3.72452L14.0031 10.0129M14.0031 10.0129V3.01404M14.0031 10.0129L20.9932 10.0129M3.71336 20.2937L10.0018 14.0053M10.0018 14.0053L10.0018 21.0042M10.0018 14.0053H3.01172"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
