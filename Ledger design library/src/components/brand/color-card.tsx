import { Button } from "@/components/brand/button";
import { cn } from "@/lib/utils";

// --- 1. Main Container ---

export interface ColorCardProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export function ColorCard({ className, children, ...props }: ColorCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 overflow-hidden rounded-xl bg-brand p-2",
        className
      )}
      {...props}
    >
      {/* Content rendered on top */}
      {children}
    </div>
  );
}

// --- 2. Header System ---

export function ColorCardHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "relative z-10 flex shrink-0 items-center justify-between gap-4 bg-transparent px-4 py-2",
        className
      )}
      {...props}
    />
  );
}

export function ColorCardHeaderTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "overflow-wrap-break-word font-medium font-serif text-[2.25rem] text-foreground leading-[1.2] tracking-[-0.02em]",
        className
      )}
      {...props}
    />
  );
}

// --- 3. Content Area ---

export function ColorCardContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative z-10 min-h-0 w-full flex-1 overflow-auto rounded-md bg-background",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// --- 4. CTA Components ---

export interface ColorCardCtaContainerProps
  extends React.ComponentProps<"div"> {}

export function ColorCardCtaContainer({
  className,
  children,
  ...props
}: ColorCardCtaContainerProps) {
  return (
    <div
      className={cn(
        "flex w-[260px] min-w-[260px] shrink-0 flex-col gap-2 rounded-lg bg-background p-2 shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ColorCardCtaButtonProps
  extends React.ComponentProps<typeof Button> {}

export function ColorCardCtaButton({
  children,
  className,
  ...buttonProps
}: ColorCardCtaButtonProps) {
  return (
    <Button className={cn("w-full", className)} {...buttonProps}>
      {children}
    </Button>
  );
}

export interface ColorCardCtaFooterProps extends React.ComponentProps<"div"> {}

export function ColorCardCtaFooter({
  className,
  children,
  ...props
}: ColorCardCtaFooterProps) {
  return (
    <div
      className={cn("text-center text-muted-foreground text-xs", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// --- Pattern Lines (inline SVG component) ---

export function ColorCardPatternLines({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 right-0 h-[140px] w-auto text-white",
        className
      )}
      fill="none"
      viewBox="0 0 530 204"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Pattern Lines</title>
      <rect
        fill="currentColor"
        height="3"
        opacity="0.8"
        transform="matrix(-1 0 0 1 479.174 82.9335)"
        width="119.615"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.8"
        transform="matrix(-1 0 0 1 479.174 34.7344)"
        width="119.615"
      />
      <rect
        fill="currentColor"
        height="3"
        transform="matrix(-1 0 0 1 239.188 23.0938)"
        width="119.594"
      />
      <rect
        fill="currentColor"
        height="2"
        transform="matrix(-1 0 0 1 119.594 7.35156)"
        width="119.594"
      />
      <rect
        fill="currentColor"
        height="4"
        transform="matrix(-1 0 0 1 599.92 199.605)"
        width="120.599"
      />
      <rect
        fill="currentColor"
        height="4"
        transform="matrix(-1 0 0 1 599.943 163.965)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="4"
        transform="matrix(-1 0 0 1 599.943 152.605)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="4"
        transform="matrix(-1 0 0 1 599.943 141.605)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="4"
        transform="matrix(-1 0 0 1 599.943 130.605)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="4"
        transform="matrix(-1 0 0 1 599.943 116.605)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="4"
        opacity="0.8"
        transform="matrix(-1 0 0 1 599.943 102.426)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="3"
        opacity="0.8"
        transform="matrix(-1 0 0 1 599.943 78.7539)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.8"
        transform="matrix(-1 0 0 1 599.943 55.0859)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.8"
        transform="matrix(-1 0 0 1 599.943 31.4141)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.8"
        transform="matrix(-1 0 0 1 599.943 0)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.8"
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 238.962 50.7188)"
        width="120.599"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.8"
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 238.938 61.7695)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="1"
        opacity="0.7"
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 238.962 38.3516)"
        width="120.599"
      />
      <rect
        fill="currentColor"
        height="1"
        opacity="0.7"
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 238.962 21.7734)"
        width="120.599"
      />
      <rect
        fill="currentColor"
        height="1"
        opacity="0.7"
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 238.962 5.03516)"
        width="120.599"
      />
      <rect
        fill="currentColor"
        height="2"
        opacity="0.8"
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 238.938 83.8047)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="3"
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 238.938 95.8555)"
        width="120.769"
      />
      <rect
        fill="currentColor"
        height="3"
        transform="matrix(1 1.74846e-07 1.74846e-07 -1 238.938 108.336)"
        width="120.769"
      />
    </svg>
  );
}
