import { type IconProps, STROKE_WIDTH } from "./types";

export function Upload({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Upload</title>
      <path
        d="M5.7243 10.796L12.0279 4.43823L18.326 10.796M12.0499 17.08L12.0499 5.10465M5.00391 20.0195H19.0049M20.0017 19.0195V16.0156M4.00385 19.0195V16.0156"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
