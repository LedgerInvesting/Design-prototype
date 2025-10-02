# Charts Documentation

## Overview
This project uses **Recharts** for data visualization with full design system integration. All charts automatically adapt to the current theme (Reports blue, Analytics green, Marketplace violet).

## Chart Component

### Location
- **Component**: `design-library/src/components/Chart.tsx`
- **Stories**: `design-library/src/components/Chart.stories.tsx`
- **Custom Tick**: `design-library/src/components/ChartCustomTick.tsx`

### Installation
Recharts is installed in the design-library package only:
```bash
cd "E:\Ledger design library\design-library"
npm install recharts
```

## Design System Integration

### Colors
All charts use semantic colors from `useSemanticColors()` hook:

- **Grid lines**: `colors.theme.primary450` (light, subtle)
- **Tick lines**: `colors.theme.primary450` (light, subtle)
- **Bottom X-axis baseline**: `colors.blackAndWhite.black900` (dark, prominent) ⚠️ **IMPORTANT**
- **Left Y-axis line**: `colors.theme.primary450` (light, matches grid)
- **Line strokes**: `colors.theme.main` (primary theme color)
- **Area fills**: `colors.theme.primary200` (light theme fill)
- **Tick labels**: `colors.blackAndWhite.black700` (dark gray)
- **Axis title labels**: `colors.blackAndWhite.black700` (dark gray)

### Typography
All text elements use design tokens:

- **Tick labels**: `typography.styles.dataXS`
- **Axis title labels**: `typography.styles.dataXS`
- **Tooltip text**: `typography.styles.bodyM`
- **Legend**: `typography.styles.bodyS`

## Spacing Rules ⚠️ CRITICAL

### Visual Spacing Target
All charts should have **~50px of visual space** on all sides between the chart border and the card/container border.

### Chart Margins
The Chart component uses optimized default margins that account for axis labels and tick values:

```typescript
margin: {
  top: 40,    // Top spacing
  right: 50,  // Right spacing (full 50px)
  left: 5,    // Left spacing (smaller to account for Y-axis labels and values)
  bottom: 35  // Bottom spacing (smaller to account for X-axis labels and values)
}
```

**Why left and bottom are smaller:**
- Y-axis labels and tick values take up space on the left (~45px)
- X-axis labels and tick values take up space on the bottom (~15px)
- We use smaller margins to compensate and achieve the target ~50px total visual spacing
- Total visual spacing = margin + axis elements space ≈ 50px

### Container Requirements
Charts must be wrapped in a container with `overflow: 'visible'`:

```tsx
<div style={{ height: '550px', overflow: 'visible' }}>
  <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
    <LineChart data={chartData} margin={{ ... }}>
      {/* Chart content */}
    </LineChart>
  </ResponsiveContainer>
</div>
```

This prevents axis labels from being clipped at the edges.

## Axis Labels

### Adding Axis Labels
Use the `xAxisLabel` and `yAxisLabel` props:

```tsx
<Chart
  data={chartData}
  type="line"
  dataKey="revenue"
  xAxisKey="month"
  xAxisLabel="Evaluation Date"
  yAxisLabel="Loss Ratio"
  height={400}
/>
```

### Label Positioning
Labels are positioned with specific offsets to fit within the 50px margin space:

- **X-axis label**: `position: 'insideBottom', offset: -35`
- **Y-axis label**: `position: 'insideLeft', offset: -35, angle: -90`

### Label Styling
All axis labels use consistent styling:
```typescript
style: {
  fill: colors.blackAndWhite.black700,
  ...typography.styles.dataXS
}
```

## Inside Axes Feature

### Overview
Charts support "inside axes" where tick labels appear inside the chart area:

- **X-axis inside**: Labels at top, baseline at bottom
- **Y-axis inside**: Labels on left side with smart positioning

### Configuration
```tsx
<Chart
  data={chartData}
  xAxisInside={true}
  yAxisInside={true}
/>
```

### Smart Label Positioning
The ChartCustomTick component handles edge cases:

- **Last X-axis item**: Moves LEFT instead of RIGHT to stay inside chart
- **Last Y-axis item**: Moves DOWN instead of UP to stay inside chart
- **White backgrounds**: X-axis labels have white backgrounds when inside to ensure visibility

### ChartCustomTick Props
```typescript
interface ChartCustomTickProps {
  x?: number;
  y?: number;
  payload?: { value: any };
  isXAxis: boolean;
  index?: number;
  visibleTicksCount?: number;
  xAxisInside?: boolean;
  yAxisInside?: boolean;
  dataLength?: number;
}
```

## Chart Types

### Supported Types
1. **Line Chart** (default)
2. **Area Chart**
3. **Bar Chart**

### Chart Props
```typescript
interface ChartProps {
  data: any[];                    // Array of data objects
  type?: 'line' | 'area' | 'bar'; // Chart type
  dataKey: string;                // Key for data values
  xAxisKey?: string;              // Key for x-axis labels (default: 'name')
  height?: number;                // Chart height in pixels (default: 300)
  showGrid?: boolean;             // Show grid lines (default: true)
  showTooltip?: boolean;          // Show tooltips (default: true)
  showLegend?: boolean;           // Show legend (default: false)
  yAxisInside?: boolean;          // Y-axis labels inside (default: false)
  xAxisInside?: boolean;          // X-axis labels inside (default: false)
  xAxisLabel?: string;            // X-axis title label
  yAxisLabel?: string;            // Y-axis title label
}
```

## Usage Examples

### Basic Line Chart
```tsx
import { Chart } from '@design-library/components';

const data = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
];

<Chart
  data={data}
  type="line"
  dataKey="revenue"
  xAxisKey="month"
  height={400}
/>
```

### Chart with Axis Labels
```tsx
<Chart
  data={chartData}
  type="area"
  dataKey="premium"
  xAxisKey="quarter"
  xAxisLabel="Evaluation Date"
  yAxisLabel="Loss Ratio"
  height={400}
/>
```

### Chart with Inside Axes
```tsx
<Chart
  data={chartData}
  type="line"
  dataKey="revenue"
  xAxisKey="month"
  xAxisInside={true}
  yAxisInside={true}
  height={400}
/>
```

### Custom Multi-line Chart (Direct Recharts)
For complex charts with multiple lines, uncertainty bands, or custom styling, use Recharts directly with ChartCustomTick:

**IMPORTANT**: When mixing Area and Line components (e.g., for uncertainty bands), you MUST use `ComposedChart` instead of `LineChart`.

```tsx
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartCustomTick, useSemanticColors, typography } from '@design-library/components';

const colors = useSemanticColors();

<div style={{ height: '550px', overflow: 'visible' }}>
  <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
    <ComposedChart data={chartData} margin={{ top: 50, right: 50, left: 15, bottom: 30 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={colors.theme.primary450} />

      {/* Uncertainty band - render BEFORE lines so it appears as background */}
      <Area dataKey="meanHigh" stroke="none" fill="#b8e5c9" fillOpacity={1} />
      <Area dataKey="meanLow" stroke="none" fill={colors.blackAndWhite.white} fillOpacity={1} />

      {/* Multiple lines */}
      <Line dataKey="paid" stroke="#8b68f5" strokeWidth={2} />
      <Line dataKey="reported" stroke="#ffd028" strokeWidth={2} strokeDasharray="5 5" />
      <Line dataKey="mean" stroke="#0f9342" strokeWidth={2} />

      {/* Axes */}
      <XAxis
        dataKey="month"
        stroke={colors.theme.primary450}
        axisLine={{ stroke: colors.blackAndWhite.black900 }}
        tick={{ fill: colors.blackAndWhite.black700, ...typography.styles.dataXS }}
        label={{
          value: 'Evaluation Date',
          position: 'insideBottom',
          offset: -10,
          style: { fill: colors.blackAndWhite.black700, ...typography.styles.dataXS }
        }}
      />
      <YAxis
        stroke={colors.theme.primary450}
        axisLine={{ stroke: colors.theme.primary450 }}
        tick={{ fill: colors.blackAndWhite.black700, ...typography.styles.dataXS }}
        tickFormatter={(value) => `${value}%`}
        label={{
          value: 'Loss Ratio',
          angle: -90,
          position: 'insideLeft',
          style: { fill: colors.blackAndWhite.black700, ...typography.styles.dataXS }
        }}
      />

      <Tooltip />
    </ComposedChart>
  </ResponsiveContainer>
</div>
```

## Important Rules ⚠️

### 1. Bottom Baseline Color
**CRITICAL**: The bottom X-axis baseline MUST be `black900`, all other axis lines use `primary450`:

```tsx
// ✅ CORRECT
<XAxis axisLine={{ stroke: colors.blackAndWhite.black900 }} />
<YAxis axisLine={{ stroke: colors.theme.primary450 }} />

// ❌ WRONG
<XAxis axisLine={{ stroke: colors.theme.primary450 }} />
<YAxis axisLine={{ stroke: colors.blackAndWhite.black900 }} />
```

### 2. Overflow Visible
Always set `overflow: 'visible'` on containers to prevent label clipping:

```tsx
// ✅ CORRECT
<div style={{ overflow: 'visible' }}>
  <ResponsiveContainer style={{ overflow: 'visible' }}>
    <LineChart style={{ overflow: 'visible' }}>
```

### 3. Tick Styling
All tick labels MUST use Data XS typography and black700 color:

```tsx
// ✅ CORRECT
tick={{ fill: colors.blackAndWhite.black700, ...typography.styles.dataXS }}

// ❌ WRONG
tick={{ fill: colors.blackAndWhite.black500, fontSize: 12 }}
```

### 4. Margin Calculation
When adding axis labels to direct Recharts implementations:
- **With labels**: `left: 15, bottom: 30`
- **Without labels**: `left: 5, bottom: 20`
- **Always**: `top: 50, right: 50`

### 5. Grid and Tick Line Colors
All grid lines and tick lines use `colors.theme.primary450` for subtle appearance:

```tsx
<CartesianGrid stroke={colors.theme.primary450} />
<XAxis tickLine={{ stroke: colors.theme.primary450 }} />
```

### 6. No Focus Outline
All charts have focus outlines disabled globally via `base.css`:

```css
/* Remove focus outline from charts */
.recharts-wrapper,
.recharts-surface,
svg[class*="recharts"] {
  outline: none !important;
}
```

This prevents the black border from appearing when clicking on charts.

## Theme Adaptation

Charts automatically adapt to the current product theme:

- **Reports**: Blue colors (`theme.main` = blue)
- **Analytics**: Green colors (`theme.main` = green)
- **Marketplace**: Violet colors (`theme.main` = violet)

The `useSemanticColors()` hook ensures all charts use the correct theme colors.

## Custom Tooltips

All charts use the reusable `ChartTooltip` component with design token integration that displays all data values with their respective colors.

### Using ChartTooltip

**IMPORTANT**: Always use the `ChartTooltip` component for consistent styling across all charts. This ensures any tooltip updates are applied everywhere automatically.

```tsx
import { ChartTooltip } from '@design-library/components';
import { Tooltip } from 'recharts';

// Inside your chart - cursor={false} removes the crosshair line
<Tooltip content={<ChartTooltip />} cursor={false} />
```

### Tooltip Styling
- **Border radius**: `borderRadius[8]` (8px rounded corners)
- **Shadow**: `shadows.medium` (medium shadow)
- **Border**: `1px solid colors.theme.primary400` (theme-aware border)
- **Background**: `colors.blackAndWhite.white`
- **Padding**: 12px

### Tooltip Content
- **Label** (top): Body M, black900, bold (e.g., "Mar 2024")
- **Data values**: Body M, black500 (lighter gray)
- **Color indicators**: 10px × 10px squares with 2px border radius
- **Spacing**: 8px gap between color and text, 4px between rows

### Implementation
```tsx
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: colors.blackAndWhite.white,
        padding: '12px',
        borderRadius: borderRadius[8],
        border: `1px solid ${colors.theme.primary400}`,
        boxShadow: shadows.medium,
      }}>
        {label && (
          <p style={{
            ...typography.styles.bodyM,
            color: colors.blackAndWhite.black900,
            margin: '0 0 8px 0',
            fontWeight: 600,
          }}>
            {label}
          </p>
        )}
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: index < payload.length - 1 ? '4px' : 0,
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              backgroundColor: entry.color,
              borderRadius: '2px',
            }} />
            <p style={{
              ...typography.styles.bodyM,
              color: colors.blackAndWhite.black500,
              margin: 0,
            }}>
              {entry.name}: {entry.value}
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};
```

## Storybook Examples

The Chart component has comprehensive Storybook stories:

1. **Default**: Basic line chart
2. **AreaChart**: Area chart with theme colors
3. **BarChart**: Bar chart example
4. **NoGrid**: Chart without grid lines
5. **AnalyticsTheme**: Demonstrates green theme
6. **MarketplaceTheme**: Demonstrates violet theme
7. **CompactChart**: Smaller height chart
8. **YAxisInside**: Y-axis labels inside chart
9. **BothAxesInside**: Both axes inside chart

## Common Issues & Solutions

### Issue: Labels are clipped
**Solution**: Add `overflow: 'visible'` to all chart containers

### Issue: Too much space on left/bottom
**Solution**: Reduce left/bottom margins (use 5-30px instead of 50px)

### Issue: Axis labels not visible
**Solution**: Ensure negative offset (-35px) and correct position ('insideBottom', 'insideLeft')

### Issue: Wrong axis line color
**Solution**: Bottom X-axis should be black900, Y-axis should be primary450

## File References

- **Chart Component**: `design-library/src/components/Chart.tsx`
- **Chart Stories**: `design-library/src/components/Chart.stories.tsx`
- **ChartCustomTick**: `design-library/src/components/ChartCustomTick.tsx`
- **ChartTooltip**: `design-library/src/components/ChartTooltip.tsx` ⚠️ **IMPORTANT: Reusable tooltip**
- **Example Usage**: `pages/AnalyticsValuationDashboard.tsx`
- **Main Documentation**: `CHARTS.md` (this file)
- **Component Index**: `design-library/src/components/index.ts`

## Future Enhancements

Potential improvements for the chart system:

- [ ] Add stacked area/bar chart support
- [ ] Add scatter plot support
- [ ] Add pie/donut chart support
- [ ] Custom legend component with design tokens
- [ ] Animation configuration options
- [ ] Responsive font sizes for different chart heights
- [ ] Export chart as image functionality
