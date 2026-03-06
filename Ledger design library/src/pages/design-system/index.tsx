import {
  DesignSystemLayoutContent,
  DesignSystemLayoutPage,
} from "@/components/view/design-system-layout";
import { components, blocks } from "@/config/registry";
import { Link } from "react-router-dom";

export default function DesignSystemIndex() {
  return (
    <DesignSystemLayoutPage>
      <DesignSystemLayoutContent>
        <div className="container mx-auto space-y-10 p-6">
          <div className="space-y-4">
            <h1 className="font-bold text-4xl tracking-tight">
              Design System
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              A collection of reusable components, blocks, and design tokens
              built with Tailwind CSS v4 and Radix UI primitives.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link
              className="rounded-lg border p-6 transition-colors hover:bg-muted/50"
              to="/design-system/colors"
            >
              <h2 className="mb-2 font-semibold text-lg">Colors</h2>
              <p className="text-muted-foreground text-sm">
                OKLch color palette with light and dark theme support.
              </p>
            </Link>
            <Link
              className="rounded-lg border p-6 transition-colors hover:bg-muted/50"
              to="/design-system/icons"
            >
              <h2 className="mb-2 font-semibold text-lg">Icons</h2>
              <p className="text-muted-foreground text-sm">
                Custom stroke-based icon set in two weight variants.
              </p>
            </Link>
          </div>

          <section className="space-y-4">
            <h2 className="font-semibold text-2xl">Components</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {components.map((item) => (
                <Link
                  className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  key={item.name}
                  to={`/design-system/components/${item.name}`}
                >
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-semibold text-2xl">Blocks</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {blocks.map((item) => (
                <Link
                  className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  key={item.name}
                  to={`/design-system/blocks/${item.name}`}
                >
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </DesignSystemLayoutContent>
    </DesignSystemLayoutPage>
  );
}
