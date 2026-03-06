import { Button } from "@/components/brand/button";

export function ButtonDefault() {
  return (
    <div className="flex items-center justify-center gap-3 p-6">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
