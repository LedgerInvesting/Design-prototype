import { Button } from "@/components/brand/button";
import { Loader2, Mail } from "lucide-react";

export function ButtonWithIcon() {
  return (
    <div className="flex items-center justify-center gap-3 p-6">
      <Button>
        <Mail />
        Login with Email
      </Button>
      <Button variant="outline">
        <Mail />
        Login with Email
      </Button>
      <Button disabled>
        <Loader2 className="animate-spin" />
        Please wait
      </Button>
    </div>
  );
}
