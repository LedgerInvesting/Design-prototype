import { Button } from "@/components/brand/button";

export function ButtonLink() {
  return (
    <div className="flex items-center justify-center gap-3 p-6">
      <Button size="sm" variant="link">
        Small
      </Button>
      <Button size="default" variant="link">
        Default
      </Button>
      <Button size="lg" variant="link">
        Large
      </Button>
    </div>
  );
}
