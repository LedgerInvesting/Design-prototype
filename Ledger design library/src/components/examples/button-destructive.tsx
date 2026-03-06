import { Button } from "@/components/brand/button";

export function ButtonDestructive() {
  return (
    <div className="flex items-center justify-center gap-3 p-6">
      <Button size="sm" variant="destructive">
        Small
      </Button>
      <Button size="default" variant="destructive">
        Default
      </Button>
      <Button size="lg" variant="destructive">
        Large
      </Button>
    </div>
  );
}
