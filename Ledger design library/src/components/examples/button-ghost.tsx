import { Button } from "@/components/brand/button";

export function ButtonGhost() {
  return (
    <div className="flex items-center justify-center gap-3 p-6">
      <Button size="sm" variant="ghost">
        Small
      </Button>
      <Button size="default" variant="ghost">
        Default
      </Button>
      <Button size="lg" variant="ghost">
        Large
      </Button>
    </div>
  );
}
