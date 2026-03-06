import { lazy, type ComponentType } from "react";

export interface RegistryItem {
  name: string;
  title: string;
  description: string;
  type: "component" | "block";
  examples?: string[];
}

export interface RegistryExample {
  name: string;
  title: string;
  component: React.LazyExoticComponent<ComponentType>;
}

// Helper to lazy-load named exports
function lazyNamed<T extends Record<string, ComponentType>>(
  factory: () => Promise<T>,
  exportName: keyof T
) {
  return lazy(() =>
    factory().then((mod) => ({ default: mod[exportName] }))
  );
}

// --- Components ---

export const components: RegistryItem[] = [
  {
    name: "button",
    title: "Button",
    description: "A button component with multiple variants and sizes.",
    type: "component",
    examples: [
      "button-default",
      "button-secondary",
      "button-destructive",
      "button-outline",
      "button-ghost",
      "button-link",
      "button-sizes",
      "button-with-icon",
    ],
  },
  {
    name: "badge",
    title: "Badge",
    description: "A badge component for labels and status indicators.",
    type: "component",
    examples: [
      "badge-default",
      "badge-secondary",
      "badge-destructive",
      "badge-outline",
    ],
  },
  {
    name: "card",
    title: "Card",
    description: "A card container with header, content, and footer sections.",
    type: "component",
    examples: ["card-basic"],
  },
  {
    name: "color-card",
    title: "Color Card",
    description: "A branded color card with pattern lines and CTA areas.",
    type: "component",
    examples: ["color-card-basic", "color-card-with-cta"],
  },
  {
    name: "input",
    title: "Input",
    description: "A text input component.",
    type: "component",
    examples: ["input-basic"],
  },
  {
    name: "sidebar",
    title: "Sidebar",
    description: "A collapsible sidebar navigation component.",
    type: "component",
    examples: ["sidebar-basic"],
  },
];

// --- Blocks ---

export const blocks: RegistryItem[] = [
  {
    name: "page-home",
    title: "Home Page",
    description: "Homepage with sidebar, branded card, and transactions table.",
    type: "block",
  },
];

// --- Example components (lazy loaded with named exports) ---

export const examples: Record<string, RegistryExample> = {
  "button-default": {
    name: "button-default",
    title: "Default",
    component: lazyNamed(() => import("@/components/examples/button-default"), "ButtonDefault"),
  },
  "button-secondary": {
    name: "button-secondary",
    title: "Secondary",
    component: lazyNamed(() => import("@/components/examples/button-secondary"), "ButtonSecondary"),
  },
  "button-destructive": {
    name: "button-destructive",
    title: "Destructive",
    component: lazyNamed(() => import("@/components/examples/button-destructive"), "ButtonDestructive"),
  },
  "button-outline": {
    name: "button-outline",
    title: "Outline",
    component: lazyNamed(() => import("@/components/examples/button-outline"), "ButtonOutline"),
  },
  "button-ghost": {
    name: "button-ghost",
    title: "Ghost",
    component: lazyNamed(() => import("@/components/examples/button-ghost"), "ButtonGhost"),
  },
  "button-link": {
    name: "button-link",
    title: "Link",
    component: lazyNamed(() => import("@/components/examples/button-link"), "ButtonLink"),
  },
  "button-sizes": {
    name: "button-sizes",
    title: "Sizes",
    component: lazyNamed(() => import("@/components/examples/button-sizes"), "ButtonSizes"),
  },
  "button-with-icon": {
    name: "button-with-icon",
    title: "With Icon",
    component: lazyNamed(() => import("@/components/examples/button-with-icon"), "ButtonWithIcon"),
  },
  "badge-default": {
    name: "badge-default",
    title: "Default",
    component: lazyNamed(() => import("@/components/examples/badge-default"), "BadgeDefault"),
  },
  "badge-secondary": {
    name: "badge-secondary",
    title: "Secondary",
    component: lazyNamed(() => import("@/components/examples/badge-secondary"), "BadgeSecondary"),
  },
  "badge-destructive": {
    name: "badge-destructive",
    title: "Destructive",
    component: lazyNamed(() => import("@/components/examples/badge-destructive"), "BadgeDestructive"),
  },
  "badge-outline": {
    name: "badge-outline",
    title: "Outline",
    component: lazyNamed(() => import("@/components/examples/badge-outline"), "BadgeOutline"),
  },
  "card-basic": {
    name: "card-basic",
    title: "Basic Card",
    component: lazyNamed(() => import("@/components/examples/card-basic"), "CardBasic"),
  },
  "color-card-basic": {
    name: "color-card-basic",
    title: "Basic",
    component: lazyNamed(() => import("@/components/examples/color-card-basic"), "ColorCardBasic"),
  },
  "color-card-with-cta": {
    name: "color-card-with-cta",
    title: "With CTA",
    component: lazyNamed(() => import("@/components/examples/color-card-with-cta"), "ColorCardWithCta"),
  },
  "input-basic": {
    name: "input-basic",
    title: "Basic",
    component: lazyNamed(() => import("@/components/examples/input-basic"), "InputBasic"),
  },
  "sidebar-basic": {
    name: "sidebar-basic",
    title: "Basic",
    component: lazyNamed(() => import("@/components/examples/sidebar-basic"), "SidebarBasic"),
  },
};

// --- Block components (lazy loaded) ---

export const blockComponents: Record<
  string,
  React.LazyExoticComponent<ComponentType>
> = {
  "page-home": lazy(() => import("@/pages/home/page")),
};

// --- Source code (loaded at build time via Vite) ---

const exampleSources = import.meta.glob(
  "@/components/examples/*.tsx",
  { query: "?raw", eager: true }
) as Record<string, { default: string }>;

export function getExampleSource(name: string): string {
  const key = Object.keys(exampleSources).find((k) => k.includes(`/${name}.tsx`));
  if (key) {
    return exampleSources[key]!.default;
  }
  return "// Source not found";
}
