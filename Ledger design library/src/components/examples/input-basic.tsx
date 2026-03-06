import { Input } from "@/components/brand/input";

export function InputBasic() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="max-w-sm space-y-2">
        <label className="font-medium text-sm" htmlFor="email">
          Email
        </label>
        <Input id="email" placeholder="name@example.com" type="email" />
      </div>
      <div className="max-w-sm space-y-2">
        <label className="font-medium text-sm" htmlFor="password">
          Password
        </label>
        <Input id="password" placeholder="Enter password" type="password" />
      </div>
      <div className="max-w-sm space-y-2">
        <label
          className="font-medium text-muted-foreground text-sm"
          htmlFor="disabled"
        >
          Disabled
        </label>
        <Input disabled id="disabled" placeholder="Disabled input" />
      </div>
    </div>
  );
}
