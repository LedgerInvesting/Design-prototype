import { Button } from "@/components/brand/button";

export function ButtonSecondary() {
  return (
    <div className="flex items-center justify-center gap-3 p-6">
      <Button size="sm" variant="secondary">
        Small
      </Button>
      <Button size="default" variant="secondary">
        Default
      </Button>
      <Button size="lg" variant="secondary">
        Large
      </Button>
    </div>
  );
}
