import { type IconProps, STROKE_WIDTH } from "./types";

export function Cloud({ variant = "heavy", ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Cloud</title>
      <path
        d="M10.0184 17.0207C7.0828 17.0207 2.9707 16.3477 2.9707 11.6369C2.9707 8.28388 6.52044 7.23203 7.70368 7.84382M7.70368 10.9028C7.11206 6.00845 9.89044 3.56128 13.6648 3.56128C17.4392 3.56128 19.5361 7.10323 19.5361 10.409C19.5361 11.5425 18.977 12.9278 18.6974 13.4787M14.9583 12.9059L13.1583 15.6331L15.5259 17.1175L13.4546 20.3744"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH[variant]}
      />
    </svg>
  );
}
