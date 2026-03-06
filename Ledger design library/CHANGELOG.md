# Changelog

## Session — 2026-02-17

### Fresh Prototype Rebuild

Completely rebuilt the prototype from scratch using the new design system library from `packages/ui` (Korra design system monorepo). The old prototype was backed up to the `backup/old-prototype` branch on GitHub before cleanup.

**Stack:**
- Vite + React 19 + TypeScript
- Tailwind CSS v4 (with `@tailwindcss/vite` plugin)
- react-router-dom for client-side routing
- Zustand for global state
- Shiki for syntax highlighting (design system viewer)
- Deployed via Vercel (existing connection preserved)

**What was done:**

#### 1. Scaffold & Component Library Setup
- Created fresh Vite project with `@/` path alias
- Copied and adapted shadcn UI components from `packages/ui`: button, badge, input, table, sidebar, tooltip, separator, sheet, skeleton, scroll-area, tabs, collapsible
- Copied brand components: app-layout, sidebar, color-card, button, badge, card, input
- Copied all 69 custom icons from the design system
- Set up `globals.css` with full OKLch color theme (light + dark mode)
- Added `vercel.json` with SPA rewrites

#### 2. Homepage (page-home)
- Ported the `page-home` block as the homepage at `/`
- Includes: branded sidebar, color card header, transactions table with mock data
- Sidebar shows: Transactions, Notifications, Apps (removed Policy Groups, Companies, Organization)

#### 3. Design System Viewer (`/design-system`)
- Built a simplified client-side design system viewer (adapted from the Next.js-based `packages/ui-ds`)
- Replaced Next.js routing with react-router-dom (`Link`, `useLocation`)
- Replaced server-side file I/O with Vite's `import.meta.glob('...', { query: '?raw' })` for source code loading
- Used `React.lazy()` with a `lazyNamed` helper for named-export example components

**Pages:**
- `/design-system` — Overview with links to all components and blocks
- `/design-system/components/:name` — Component preview with live rendering + syntax-highlighted code
- `/design-system/blocks/:name` — Block preview
- `/design-system/colors` — Color palette (all CSS custom properties, click-to-copy)
- `/design-system/icons` — Icon library (67 icons, heavy/thin variants, click-to-copy)

**Components documented:** Button (8 variants), Badge (4 variants), Card, Color Card (2 variants), Input, Sidebar

#### 4. Sidebar Color Updates
Updated sidebar CSS variables to match the new Figma design tokens:

**Light mode changes:**
- `--sidebar`: `#FFFFFF` → `#FDFDFD`
- `--sidebar-foreground`: `#252E28` → `#17211B`
- `--sidebar-accent`: `#EDF2F4` → `#F1F5F9`
- `--sidebar-accent-foreground`: `#252E28` → `#0F172A`

**Dark mode changes:**
- `--sidebar-accent`: `#474F4B` → `#1E293B`
- `--sidebar-border`: `#474F4B` → `#1E293B`

#### 5. Tab-Based Transaction Navigation ("Recent" Section)
Implemented browser-like tab navigation for transactions:

- **Zustand store** (`src/stores/tabs-store.ts`) — manages open tabs globally
- **Clickable table rows** — clicking a transaction opens it as a tab and navigates to `/transactions/:id`
- **"Recent" sidebar section** — open transactions appear below "Platform" with close (X) buttons on hover
- **Shared layout** — `AppLayout` + `Sidebar` lifted to a layout route in `App.tsx` so they persist across pages
- **Transaction detail placeholder** (`src/pages/transaction-detail/page.tsx`) — shows transaction name, ready for real dashboard content

**Routing structure:**
```
/                        → Homepage (transactions table)
/transactions/:id        → Transaction detail (placeholder)
/design-system           → Design system overview
/design-system/components/:name → Component preview
/design-system/blocks/:name    → Block preview
/design-system/colors          → Color palette
/design-system/icons           → Icon library
```

### Key Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root routing with shared app layout |
| `src/stores/tabs-store.ts` | Zustand store for open transaction tabs |
| `src/config/registry.ts` | Design system component registry |
| `src/styles/globals.css` | Theme (OKLch colors, light/dark) |
| `src/pages/home/page.tsx` | Homepage |
| `src/pages/home/components/sidebar.tsx` | App sidebar with Platform + Recent sections |
| `src/pages/home/components/transactions-table.tsx` | Clickable transactions table |
| `src/pages/transaction-detail/page.tsx` | Transaction detail placeholder |
| `src/components/view/design-system-layout.tsx` | Design system viewer layout |
| `src/components/view/design-system-sidebar.tsx` | Design system viewer sidebar |

### Next Steps
- Build out the transaction detail dashboard page
- Migrate pages from the old prototype one by one (starting with Reports module)
- Add more components to the design system viewer as needed
