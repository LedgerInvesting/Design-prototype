import { Button } from "@/components/brand/button";
import { ChevronRight } from "lucide-react";

export function ButtonSizes() {
  return (
    <div className="flex items-center justify-center gap-3 p-6">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <ChevronRight />
      </Button>
    </div>
  );
}
