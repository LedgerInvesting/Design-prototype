import { Button } from "@/components/brand/button";

export function ButtonOutline() {
  return (
    <div className="flex items-center justify-center gap-3 p-6">
      <Button size="sm" variant="outline">
        Small
      </Button>
      <Button size="default" variant="outline">
        Default
      </Button>
      <Button size="lg" variant="outline">
        Large
      </Button>
    </div>
  );
}
