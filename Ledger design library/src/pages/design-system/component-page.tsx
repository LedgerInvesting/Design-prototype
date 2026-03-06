import {
  DesignSystemLayoutContent,
  DesignSystemLayoutHeader,
  DesignSystemLayoutHeaderTitle,
  DesignSystemLayoutPage,
} from "@/components/view/design-system-layout";
import { ComponentPreview } from "@/components/view/component-preview";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  components,
  examples,
  getExampleSource,
} from "@/config/registry";
import { useParams } from "react-router-dom";

export default function ComponentPage() {
  const { name } = useParams<{ name: string }>();
  const component = components.find((c) => c.name === name);

  if (!component) {
    return (
      <DesignSystemLayoutPage>
        <DesignSystemLayoutContent>
          <div className="flex items-center justify-center p-12">
            <p className="text-muted-foreground">Component not found: {name}</p>
          </div>
        </DesignSystemLayoutContent>
      </DesignSystemLayoutPage>
    );
  }

  const componentExamples = (component.examples || [])
    .map((exName) => examples[exName])
    .filter((ex): ex is NonNullable<typeof ex> => Boolean(ex));

  return (
    <DesignSystemLayoutPage>
      <DesignSystemLayoutHeader>
        <SidebarTrigger className="-ml-1" />
        <Separator className="mr-2 data-[orientation=vertical]:h-4" orientation="vertical" />
        <DesignSystemLayoutHeaderTitle>
          {component.title}
        </DesignSystemLayoutHeaderTitle>
      </DesignSystemLayoutHeader>
      <DesignSystemLayoutContent>
        <div className="container mx-auto space-y-8 p-6">
          <div className="space-y-2">
            <h1 className="font-bold text-3xl tracking-tight">
              {component.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {component.description}
            </p>
          </div>

          <div className="space-y-10">
            {componentExamples.map((example) => (
              <ComponentPreview
                code={getExampleSource(example.name)}
                component={example.component}
                key={example.name}
                title={example.title}
              />
            ))}
          </div>
        </div>
      </DesignSystemLayoutContent>
    </DesignSystemLayoutPage>
  );
}
