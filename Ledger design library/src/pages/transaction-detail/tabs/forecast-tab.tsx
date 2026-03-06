import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { Pencil, Download, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// ─── Style constants ───────────────────────────────────────────────────────────

const clr = {
  black900:   "#0F172A",
  black700:   "#334155",
  black500:   "#64748B",
  white:      "#FFFFFF",
  // design system tokens (no green theme)
  primary200: "var(--secondary)",  // section / panel backgrounds
  primary400: "var(--border)",     // borders / dividers
  primary450: "var(--input)",      // slightly darker borders
  primary700: "var(--primary)",    // primary dark (same value as before)
  // chart data series colors — kept as data-visualization colors
  expected:   "#0f9342",
  reported:   "#ffd028",
  paid:       "#8b68f5",
  bandGreen:  "#64EF99",
};

const tx: Record<string, React.CSSProperties> = {
  h2:     { fontSize: "32px", fontWeight: 700, lineHeight: "1.2" },
  bodyM:  { fontSize: "14px", fontWeight: 400, lineHeight: "1.5" },
  bodyS:  { fontSize: "12px", fontWeight: 400, lineHeight: "1.5" },
  dataXS: { fontSize: "10px", fontWeight: 400, lineHeight: "1.4" },
};

const shadow = {
  sm: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.06)",
  md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
};

// ─── Data types ────────────────────────────────────────────────────────────────

type RawDataPoint = {
  month: string;
  paid: number | null;
  reported: number | null;
  mean: number | null;
  outerBandBase: number | null;
  outerBandHeight: number | null;
  innerBandBase: number | null;
  innerBandHeight: number | null;
};

type ProcessedDataPoint = RawDataPoint & {
  displayMonth: string;
  isLastOfMonth: boolean;
};

type ButtonDataPoint = ProcessedDataPoint & {
  isYearBoundary?: boolean;
};

// ─── Complete history data (Jan 2022 – Jun 2025 + "New") ──────────────────────

const COMPLETE_HISTORY_DATA: RawDataPoint[] = [
  { month: "Jan 2022", paid: 0,  reported: 8,  mean: 45,  outerBandBase: 35, outerBandHeight: 20, innerBandBase: 40, innerBandHeight: 10 },
  { month: "Feb 2022", paid: 2,  reported: 12, mean: 48,  outerBandBase: 38, outerBandHeight: 20, innerBandBase: 43, innerBandHeight: 10 },
  { month: "Mar 2022", paid: 3,  reported: 15, mean: 50,  outerBandBase: 40, outerBandHeight: 20, innerBandBase: 45, innerBandHeight: 10 },
  { month: "Apr 2022", paid: 5,  reported: 18, mean: 52,  outerBandBase: 42, outerBandHeight: 20, innerBandBase: 47, innerBandHeight: 10 },
  { month: "May 2022", paid: 8,  reported: 22, mean: 54,  outerBandBase: 44, outerBandHeight: 20, innerBandBase: 49, innerBandHeight: 10 },
  { month: "Jun 2022", paid: 10, reported: 25, mean: 56,  outerBandBase: 46, outerBandHeight: 20, innerBandBase: 51, innerBandHeight: 10 },
  { month: "Jul 2022", paid: 12, reported: 28, mean: 58,  outerBandBase: 48, outerBandHeight: 20, innerBandBase: 53, innerBandHeight: 10 },
  { month: "Aug 2022", paid: 15, reported: 32, mean: 60,  outerBandBase: 50, outerBandHeight: 20, innerBandBase: 55, innerBandHeight: 10 },
  { month: "Sep 2022", paid: 18, reported: 35, mean: 62,  outerBandBase: 52, outerBandHeight: 20, innerBandBase: 57, innerBandHeight: 10 },
  { month: "Oct 2022", paid: 20, reported: 38, mean: 64,  outerBandBase: 54, outerBandHeight: 20, innerBandBase: 59, innerBandHeight: 10 },
  { month: "Nov 2022", paid: 22, reported: 42, mean: 66,  outerBandBase: 56, outerBandHeight: 20, innerBandBase: 61, innerBandHeight: 10 },
  { month: "Dec 2022", paid: 25, reported: 45, mean: 68,  outerBandBase: 58, outerBandHeight: 20, innerBandBase: 63, innerBandHeight: 10 },
  { month: "Jan 2023", paid: 28, reported: 48, mean: 70,  outerBandBase: 60, outerBandHeight: 20, innerBandBase: 65, innerBandHeight: 10 },
  { month: "Feb 2023", paid: 30, reported: 52, mean: 72,  outerBandBase: 62, outerBandHeight: 20, innerBandBase: 67, innerBandHeight: 10 },
  { month: "Mar 2023", paid: 32, reported: 55, mean: 74,  outerBandBase: 64, outerBandHeight: 20, innerBandBase: 69, innerBandHeight: 10 },
  { month: "Apr 2023", paid: 35, reported: 58, mean: 76,  outerBandBase: 66, outerBandHeight: 20, innerBandBase: 71, innerBandHeight: 10 },
  { month: "May 2023", paid: 38, reported: 62, mean: 78,  outerBandBase: 68, outerBandHeight: 20, innerBandBase: 73, innerBandHeight: 10 },
  { month: "Jun 2023", paid: 40, reported: 65, mean: 80,  outerBandBase: 70, outerBandHeight: 20, innerBandBase: 75, innerBandHeight: 10 },
  { month: "Jul 2023", paid: 42, reported: 68, mean: 82,  outerBandBase: 72, outerBandHeight: 20, innerBandBase: 77, innerBandHeight: 10 },
  { month: "Aug 2023", paid: 45, reported: 72, mean: 84,  outerBandBase: 74, outerBandHeight: 20, innerBandBase: 79, innerBandHeight: 10 },
  { month: "Sep 2023", paid: 48, reported: 75, mean: 86,  outerBandBase: 76, outerBandHeight: 20, innerBandBase: 81, innerBandHeight: 10 },
  { month: "Oct 2023", paid: 50, reported: 78, mean: 88,  outerBandBase: 78, outerBandHeight: 20, innerBandBase: 83, innerBandHeight: 10 },
  { month: "Nov 2023", paid: 52, reported: 82, mean: 90,  outerBandBase: 80, outerBandHeight: 20, innerBandBase: 85, innerBandHeight: 10 },
  { month: "Dec 2023", paid: 55, reported: 85, mean: 92,  outerBandBase: 82, outerBandHeight: 20, innerBandBase: 87, innerBandHeight: 10 },
  { month: "Jan 2024", paid: 0,  reported: 15, mean: 58,  outerBandBase: 48, outerBandHeight: 20, innerBandBase: 53, innerBandHeight: 10 },
  { month: "Feb 2024", paid: 5,  reported: 22, mean: 62,  outerBandBase: 52, outerBandHeight: 20, innerBandBase: 57, innerBandHeight: 10 },
  { month: "Mar 2024", paid: 8,  reported: 30, mean: 65,  outerBandBase: 55, outerBandHeight: 20, innerBandBase: 60, innerBandHeight: 10 },
  { month: "Apr 2024", paid: 12, reported: 35, mean: 68,  outerBandBase: 58, outerBandHeight: 20, innerBandBase: 63, innerBandHeight: 10 },
  { month: "May 2024", paid: 20, reported: 39, mean: 70,  outerBandBase: 60, outerBandHeight: 20, innerBandBase: 65, innerBandHeight: 10 },
  { month: "Jun 2024", paid: 22, reported: 45, mean: 74,  outerBandBase: 64, outerBandHeight: 20, innerBandBase: 69, innerBandHeight: 10 },
  { month: "Jul 2024", paid: 25, reported: 50, mean: 78,  outerBandBase: 68, outerBandHeight: 20, innerBandBase: 73, innerBandHeight: 10 },
  { month: "Aug 2024", paid: 23, reported: 58, mean: 82,  outerBandBase: 72, outerBandHeight: 20, innerBandBase: 77, innerBandHeight: 10 },
  { month: "Sep 2024", paid: 25, reported: 65, mean: 85,  outerBandBase: 75, outerBandHeight: 20, innerBandBase: 80, innerBandHeight: 10 },
  { month: "Oct 2024", paid: 28, reported: 72, mean: 88,  outerBandBase: 78, outerBandHeight: 20, innerBandBase: 83, innerBandHeight: 10 },
  { month: "Nov 2024", paid: 30, reported: 78, mean: 92,  outerBandBase: 82, outerBandHeight: 20, innerBandBase: 87, innerBandHeight: 10 },
  { month: "Dec 2024", paid: 35, reported: 80, mean: 95,  outerBandBase: 85, outerBandHeight: 20, innerBandBase: 90, innerBandHeight: 10 },
  { month: "Jan 2025", paid: 60, reported: 80, mean: 98,  outerBandBase: 88, outerBandHeight: 20, innerBandBase: 93, innerBandHeight: 10 },
  { month: "Feb 2025", paid: 65, reported: 85, mean: 100, outerBandBase: 90, outerBandHeight: 20, innerBandBase: 95, innerBandHeight: 10 },
  { month: "Mar 2025", paid: 70, reported: 88, mean: 102, outerBandBase: 92, outerBandHeight: 20, innerBandBase: 97, innerBandHeight: 10 },
  { month: "Apr 2025", paid: 78, reported: 92, mean: 106, outerBandBase: 96, outerBandHeight: 20, innerBandBase: 101, innerBandHeight: 10 },
  { month: "May 2025", paid: 80, reported: 93, mean: 107, outerBandBase: 97, outerBandHeight: 20, innerBandBase: 102, innerBandHeight: 10 },
  { month: "Jun 2025", paid: 92, reported: 99, mean: 113, outerBandBase: 103, outerBandHeight: 20, innerBandBase: 108, innerBandHeight: 10 },
  { month: "New",      paid: null, reported: null, mean: null, outerBandBase: null, outerBandHeight: null, innerBandBase: null, innerBandHeight: null },
];

// ─── processChartData helper ──────────────────────────────────────────────────

function processChartData(data: RawDataPoint[]): ProcessedDataPoint[] {
  const monthLastIndex = new Map<string, number>();
  data.forEach((item, index) => { monthLastIndex.set(item.month, index); });
  return data.map((item, index) => ({
    ...item,
    displayMonth: monthLastIndex.get(item.month) === index ? item.month : "",
    isLastOfMonth: monthLastIndex.get(item.month) === index,
  }));
}

// SimpleTooltip — now uses shadcn Tooltip
const SimpleTooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <Tooltip>
    <TooltipTrigger asChild>{children as React.ReactElement}</TooltipTrigger>
    <TooltipContent>{text}</TooltipContent>
  </Tooltip>
);

// ─── ChartComponent ───────────────────────────────────────────────────────────

const ChartComponent: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [monthlyOffset, setMonthlyOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<{
    month: string;
    type: "edit" | "download";
    position: { x: number; y: number };
  } | null>(null);
  const [expandedValuation, setExpandedValuation] = useState<number | null>(null);

  const uniqueMonths = Array.from(new Set(COMPLETE_HISTORY_DATA.map((d) => d.month)));

  // Initialise to show most-recent months
  useEffect(() => {
    const initialOffset = Math.max(0, uniqueMonths.length - 7);
    setMonthlyOffset(initialOffset);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return;
    const handleClick = () => {
      setOpenDropdown(null);
      setExpandedValuation(null);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openDropdown]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (selectedPeriod !== "monthly" && selectedPeriod !== "annual") return;
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || (selectedPeriod !== "monthly" && selectedPeriod !== "annual")) return;
    const deltaX = e.clientX - dragStart;
    if (Math.abs(deltaX) <= 30) return;

    const direction = deltaX > 0 ? -1 : 1;
    const maxOffset =
      selectedPeriod === "monthly"
        ? uniqueMonths.length - 7
        : uniqueMonths.length - 13;
    const newOffset = Math.max(0, Math.min(maxOffset, monthlyOffset + direction));
    if (newOffset !== monthlyOffset) {
      setMonthlyOffset(newOffset);
      setDragStart(e.clientX);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Compute visible data
  let finalChartData: ProcessedDataPoint[] = [];
  let finalButtonData: ButtonDataPoint[] = [];
  let finalAddButtonIndex: number = -1;

  if (selectedPeriod === "monthly") {
    const startIdx = Math.max(0, Math.min(monthlyOffset, uniqueMonths.length - 7));
    const endIdx = Math.min(startIdx + 6, uniqueMonths.length - 1);
    const monthsToShow = uniqueMonths.slice(startIdx, endIdx + 1);
    if (endIdx >= uniqueMonths.length - 1 && !monthsToShow.includes("New")) {
      monthsToShow.push("New");
    }
    const processed = processChartData(COMPLETE_HISTORY_DATA.filter((d) => monthsToShow.includes(d.month)));
    finalChartData = processed;
    finalButtonData = processed.slice(1);
    finalAddButtonIndex = processed.length - 2;
  } else if (selectedPeriod === "annual") {
    const startIdx = Math.max(0, Math.min(monthlyOffset, uniqueMonths.length - 13));
    const endIdx = Math.min(startIdx + 12, uniqueMonths.length - 1);
    const monthsToShow = uniqueMonths.slice(startIdx, endIdx + 1);
    if (endIdx >= uniqueMonths.length - 1 && !monthsToShow.includes("New")) {
      monthsToShow.push("New");
    }
    const processed = processChartData(COMPLETE_HISTORY_DATA.filter((d) => monthsToShow.includes(d.month)));
    finalChartData = processed;
    finalButtonData = processed.slice(1);
    finalAddButtonIndex = processed.length - 2;
  } else {
    // all-data
    const processed = processChartData(COMPLETE_HISTORY_DATA).filter((d) => d.month !== "New");
    finalChartData = processed;
    const buttonData: ButtonDataPoint[] = processed.slice(1).map((item, index) => {
      const currentYear = item.month.split(" ")[1] ?? "";
      const nextItem = index < processed.length - 2 ? processed[index + 2] : undefined;
      const nextYear = nextItem?.month.split(" ")[1] ?? null;
      return { ...item, isYearBoundary: currentYear !== nextYear };
    });
    finalButtonData = buttonData;
    finalAddButtonIndex = -1;
  }

  const generateDateLabel = (monthStr: string, index: number, total: number): string => {
    const parts = monthStr.split(" ");
    const monthName = parts[0] ?? "";
    const daysInMonth: Record<string, number> = {
      Jan: 31, Feb: 28, Mar: 31, Apr: 30, May: 31, Jun: 30,
      Jul: 31, Aug: 31, Sep: 30, Oct: 31, Nov: 30, Dec: 31,
    };
    const maxDay = daysInMonth[monthName] ?? 30;
    const day = Math.floor((index * maxDay) / total) + 1;
    const suffix = (d: number) => {
      if (d >= 11 && d <= 13) return "th";
      switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
    return `${day}${suffix(day)} ${monthName}`;
  };

  const hasNewColumn = finalChartData.some((d) => d.month === "New");

  return (
    <div
      className="bg-background rounded-xl border border-border"
      style={{ overflow: "visible", outline: "none" }}
    >
      {/* Header: legend + period selector */}
      <div className="px-[30px] py-5 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-6">
          {[
            { color: clr.expected, label: "Expected loss ratio" },
            { color: clr.reported, label: "Reported Loss Ratio" },
            { color: clr.paid,     label: "Paid Loss Ratio"     },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* Period selector */}
        <select
          value={selectedPeriod}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedPeriod(value);
            if (value === "monthly") {
              setMonthlyOffset(Math.max(0, uniqueMonths.length - 7));
            } else if (value === "annual") {
              setMonthlyOffset(Math.max(0, uniqueMonths.length - 13));
            } else {
              setMonthlyOffset(0);
            }
          }}
          className="px-2.5 py-1.5 border border-border rounded-md text-xs text-foreground bg-background cursor-pointer outline-none"
        >
          <option value="monthly">Monthly</option>
          <option value="annual">Annually</option>
          <option value="all-data">All Data</option>
        </select>
      </div>

      {/* Chart */}
      <div
        style={{
          height: "421px",
          overflow: "visible",
          outline: "none",
          position: "relative",
          cursor:
            selectedPeriod === "monthly" || selectedPeriod === "annual"
              ? isDragging ? "grabbing" : "move"
              : "default",
          userSelect: "none",
          paddingTop: "30px",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Diagonal pattern for "New" column */}
        {hasNewColumn && (
          <div
            style={{
              position: "absolute",
              top: "80px",
              left: "15px",
              right: "50px",
              bottom: "60px",
              pointerEvents: "none",
              zIndex: 0,
              display: "flex",
            }}
          >
            {finalChartData.slice(0, -1).map((_, idx) => (
              <div key={`spacer-${idx}`} style={{ flexGrow: 1, flexShrink: 0, flexBasis: 0 }} />
            ))}
            <div
              style={{
                flexGrow: 1,
                flexShrink: 0,
                flexBasis: 0,
                background: `repeating-linear-gradient(45deg, ${clr.primary450}, ${clr.primary450} 1px, transparent 1px, transparent 4px)`,
                opacity: 0.3,
              }}
            />
          </div>
        )}

        <ResponsiveContainer
          width="100%"
          height="100%"
          style={{ overflow: "visible", outline: "none" }}
        >
          <ComposedChart
            data={finalChartData}
            margin={{ top: 50, right: selectedPeriod === "all-data" ? 40 : 50, left: 15, bottom: 30 }}
            style={{ overflow: "visible", outline: "none" }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={clr.primary450} />

            <XAxis
              dataKey="displayMonth"
              stroke={clr.primary450}
              axisLine={{ stroke: clr.black900, strokeWidth: 2 }}
              tickLine={{ stroke: clr.primary450, strokeWidth: 1 }}
              tickSize={4}
              tick={{ fontSize: 0 }}
              interval={0}
              type="category"
              label={{
                value: "Evaluation Date",
                position: "insideBottom",
                offset: 0,
                style: { fill: clr.black500, ...tx["dataXS"] },
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: clr.black500, fontSize: 10 }}
              tickFormatter={(v: number) => `${v}%`}
              label={{
                value: "Loss Ratio",
                angle: -90,
                position: "insideLeft",
                style: { fill: clr.black500, ...tx["dataXS"] },
              }}
              domain={[0, 120]}
              ticks={[0, 20, 40, 60, 80, 100, 120]}
              allowDataOverflow
            />

            {/* Outer uncertainty band */}
            <Area type="monotone" dataKey="outerBandBase"   stroke="none" fill="transparent" stackId="outer" isAnimationActive={false} activeDot={false} connectNulls={false} />
            <Area type="monotone" dataKey="outerBandHeight" stroke="none" fill={clr.bandGreen} fillOpacity={0.3} stackId="outer" isAnimationActive={false} activeDot={false} connectNulls={false} />

            {/* Inner uncertainty band */}
            <Area type="monotone" dataKey="innerBandBase"   stroke="none" fill="transparent" stackId="inner" isAnimationActive={false} activeDot={false} connectNulls={false} />
            <Area type="monotone" dataKey="innerBandHeight" stroke="none" fill={clr.bandGreen} fillOpacity={0.6} stackId="inner" isAnimationActive={false} activeDot={false} connectNulls={false} />

            {/* Lines */}
            <Line type="monotone" dataKey="mean"     stroke={clr.expected} strokeWidth={2} dot={{ fill: clr.expected, r: 6, stroke: clr.white, strokeWidth: 2 }} activeDot={{ r: 6, fill: clr.expected, stroke: clr.white, strokeWidth: 2 }} connectNulls={false} />
            <Line type="monotone" dataKey="reported" stroke={clr.reported} strokeWidth={2} strokeDasharray="5 5" dot={{ fill: clr.reported, r: 6, stroke: clr.white, strokeWidth: 2 }} activeDot={{ r: 6, fill: clr.reported, stroke: clr.white, strokeWidth: 2 }} connectNulls={false} />
            <Line type="monotone" dataKey="paid"     stroke={clr.paid}     strokeWidth={2} dot={{ fill: clr.paid, r: 6, stroke: clr.white, strokeWidth: 2 }} activeDot={{ r: 6, fill: clr.paid, stroke: clr.white, strokeWidth: 2 }} connectNulls={false} />

            <RechartsTooltip
              cursor={false}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div
                    style={{
                      backgroundColor: clr.white,
                      border: `1px solid ${clr.primary400}`,
                      borderRadius: "8px",
                      padding: "12px",
                      boxShadow: shadow.md,
                      minWidth: "160px",
                    }}
                  >
                    <div style={{ ...tx["dataXS"], color: clr.black500, marginBottom: "8px" }}>
                      {String(label)}
                    </div>
                    {payload.map((entry, i) =>
                      entry.value != null ? (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", ...tx["bodyS"], color: clr.black700 }}>
                          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: String(entry.color) }} />
                          <span>{String(entry.name)}: {String(entry.value)}%</span>
                        </div>
                      ) : null
                    )}
                  </div>
                );
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Date labels + edit/download buttons */}
        <div
          style={{
            position: "absolute",
            top: "25px",
            left: "75px",
            right: selectedPeriod === "all-data" ? "40px" : "50px",
            height: "55px",
            display: "flex",
            zIndex: 2,
          }}
        >
          {finalButtonData.map((dataPoint, index) => {
            let showMonthLabel: boolean;
            let showButtons: boolean;
            let displayLabel: string;

            if (selectedPeriod === "all-data") {
              const isYearBoundary = dataPoint.isYearBoundary === true;
              showMonthLabel = isYearBoundary;
              showButtons = isYearBoundary;
              displayLabel = isYearBoundary ? (dataPoint.month.split(" ")[1] ?? "") : "";
            } else {
              showMonthLabel = dataPoint.isLastOfMonth || dataPoint.month === "New";
              showButtons = dataPoint.isLastOfMonth || dataPoint.month === "New";
              displayLabel = dataPoint.month;
            }

            const monthValuations = finalChartData.filter(
              (d) => d.month === dataPoint.month && d.month !== "New"
            );
            const hasMultipleValuations = monthValuations.length > 1;
            const isNewColumn = index === finalAddButtonIndex;

            return (
              <div
                key={index}
                style={{
                  flexGrow: selectedPeriod === "all-data" && dataPoint.month === "New" ? 0 : 1,
                  flexShrink: 0,
                  flexBasis: 0,
                  width: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  gap: "7px",
                  borderRight: showMonthLabel ? `1px dashed ${clr.primary450}` : "none",
                  borderLeft: index === 0 ? `1px dashed ${clr.primary450}` : "none",
                  paddingRight: "8px",
                  minHeight: "55px",
                  position: "relative",
                  overflow: showButtons ? "visible" : "hidden",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {showMonthLabel && (
                  <div
                    className="text-[10px] text-foreground"
                    style={{
                      marginTop: "-6px",
                      opacity: hoveredIndex === index || selectedPeriod !== "complete" ? 1 : 0,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    {displayLabel}
                  </div>
                )}

                {showButtons && (
                  <div className="flex gap-0.5">
                    {isNewColumn ? (
                      <Button
                        size="icon-sm"
                        onClick={() => undefined}
                      >
                        <Plus size={16} />
                      </Button>
                    ) : (
                      <>
                        <SimpleTooltip text="Edit valuation">
                          <Button
                            size="icon-sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                              if (selectedPeriod === "all-data" || hasMultipleValuations) {
                                setOpenDropdown(
                                  openDropdown?.month === displayLabel && openDropdown?.type === "edit"
                                    ? null
                                    : { month: displayLabel, type: "edit", position: { x: rect.right, y: rect.bottom + 4 } }
                                );
                              } else {
                                console.log("navigate to edit:", displayLabel);
                              }
                            }}
                          >
                            <Pencil size={12} />
                          </Button>
                        </SimpleTooltip>

                        <SimpleTooltip text="Download valuation files">
                          <Button
                            size="icon-sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                              setOpenDropdown(
                                openDropdown?.month === displayLabel && openDropdown?.type === "download"
                                  ? null
                                  : { month: displayLabel, type: "download", position: { x: rect.right, y: rect.bottom + 4 } }
                              );
                            }}
                          >
                            <Download size={12} />
                          </Button>
                        </SimpleTooltip>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Portal dropdown */}
      {openDropdown &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
              onClick={() => { setOpenDropdown(null); setExpandedValuation(null); }}
            />
            {(() => {
              const isDownload = openDropdown.type === "download";
              const isYearView = selectedPeriod === "all-data" && openDropdown.month !== "New";

              const yearMonths: string[] = isYearView
                ? Array.from(new Set(
                    COMPLETE_HISTORY_DATA
                      .filter((d) => d.month !== "New" && d.month.endsWith(openDropdown.month))
                      .map((d) => d.month)
                  ))
                : [];

              const monthValuations = isYearView
                ? []
                : finalChartData.filter((d) => d.month === openDropdown.month && d.month !== "New");

              const menuItemStyle: React.CSSProperties = {
                padding: "12px 10px",
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "14px",
                lineHeight: "1.5",
                color: "var(--foreground)",
                transition: "background-color 0.2s ease",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              };

              return (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background rounded-lg shadow-md min-w-[180px] p-2.5"
                  style={{
                    position: "fixed",
                    left: openDropdown.position.x - 180,
                    top: openDropdown.position.y,
                    zIndex: 10000,
                  }}
                >
                  {isYearView ? (
                    yearMonths.map((monthName, mIdx) => {
                      const mVals = COMPLETE_HISTORY_DATA.filter((d) => d.month === monthName);
                      const hasMultiple = mVals.length > 1;
                      return (
                        <div key={mIdx}>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isDownload && !hasMultiple) {
                                console.log("edit:", monthName);
                                setOpenDropdown(null);
                              } else {
                                setExpandedValuation(expandedValuation === mIdx ? null : mIdx);
                              }
                            }}
                            onMouseEnter={(e) => { if (expandedValuation !== mIdx) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--secondary)"; }}
                            onMouseLeave={(e) => { if (expandedValuation !== mIdx) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                            style={{ ...menuItemStyle, backgroundColor: expandedValuation === mIdx ? "var(--secondary)" : "transparent" }}
                          >
                            <span>{monthName}</span>
                            {(hasMultiple || isDownload) && <ChevronRight size={12} className="text-foreground" />}
                          </div>
                          {expandedValuation === mIdx && (
                            <div>
                              {mVals.map((_, vIdx) => (
                                <div key={vIdx}>
                                  <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!isDownload) { console.log("edit:", monthName, vIdx); setOpenDropdown(null); setExpandedValuation(null); }
                                      else setExpandedValuation(-(vIdx + 1 + mIdx * 1000));
                                    }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--secondary)"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                                    style={{ ...menuItemStyle, padding: "12px 10px 12px 24px" }}
                                  >
                                    <span>{generateDateLabel(monthName, vIdx, mVals.length)}</span>
                                    {isDownload && <ChevronRight size={12} className="text-foreground" />}
                                  </div>
                                  {isDownload && expandedValuation === -(vIdx + 1 + mIdx * 1000) && (
                                    ["Format 1", "Format 2"].map((fmt) => (
                                      <div key={fmt} onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); setExpandedValuation(null); }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--secondary)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }} style={{ ...menuItemStyle, padding: "12px 10px 12px 40px" }}>
                                        {fmt}
                                      </div>
                                    ))
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    monthValuations.map((_, vIdx) => (
                      <div key={vIdx}>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isDownload) { console.log("edit:", openDropdown.month, vIdx); setOpenDropdown(null); setExpandedValuation(null); }
                            else setExpandedValuation(expandedValuation === vIdx ? null : vIdx);
                          }}
                          onMouseEnter={(e) => { if (!isDownload || expandedValuation !== vIdx) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--secondary)"; }}
                          onMouseLeave={(e) => { if (!isDownload || expandedValuation !== vIdx) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                          style={{ ...menuItemStyle, backgroundColor: isDownload && expandedValuation === vIdx ? "var(--secondary)" : "transparent" }}
                        >
                          <span>{generateDateLabel(openDropdown.month, vIdx, monthValuations.length)}</span>
                          {isDownload && <ChevronRight size={12} className="text-foreground" />}
                        </div>
                        {isDownload && expandedValuation === vIdx && (
                          ["Format 1", "Format 2"].map((fmt) => (
                            <div key={fmt} onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); setExpandedValuation(null); }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--secondary)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }} style={{ ...menuItemStyle, padding: "12px 10px 12px 24px" }}>
                              {fmt}
                            </div>
                          ))
                        )}
                      </div>
                    ))
                  )}
                </div>
              );
            })()}
          </>,
          document.body
        )}
    </div>
  );
};

// ─── Main export ──────────────────────────────────────────────────────────────

const VALUATION_TABLE_ROWS = [
  { date: "Jan, 2025", lossModeling: "Complete", paidLossRatio: "75%",  reportedLossRatio: "62%", expectedLossRatio: "103%", currentWrittenPremium: "$20,107,359" },
  { date: "Dec, 2024", lossModeling: "Complete", paidLossRatio: "89%",  reportedLossRatio: "45%", expectedLossRatio: "103%", currentWrittenPremium: "$21,542,987" },
  { date: "Nov, 2024", lossModeling: "Complete", paidLossRatio: "89%",  reportedLossRatio: "45%", expectedLossRatio: "103%", currentWrittenPremium: "$19,876,421" },
  { date: "Oct, 2024", lossModeling: "Complete", paidLossRatio: "89%",  reportedLossRatio: "45%", expectedLossRatio: "103%", currentWrittenPremium: "$22,345,789" },
  { date: "Sep, 2024", lossModeling: "Complete", paidLossRatio: "89%",  reportedLossRatio: "45%", expectedLossRatio: "103%", currentWrittenPremium: "$18,901,234" },
  { date: "Aug, 2024", lossModeling: "Complete", paidLossRatio: "89%",  reportedLossRatio: "45%", expectedLossRatio: "103%", currentWrittenPremium: "$20,456,890" },
  { date: "Jul, 2024", lossModeling: "Complete", paidLossRatio: "89%",  reportedLossRatio: "45%", expectedLossRatio: "103%", currentWrittenPremium: "$21,123,567" },
  { date: "Jun, 2024", lossModeling: "Complete", paidLossRatio: "89%",  reportedLossRatio: "45%", expectedLossRatio: "103%", currentWrittenPremium: "$19,567,234" },
  { date: "May, 2024", lossModeling: "Complete", paidLossRatio: "89%",  reportedLossRatio: "45%", expectedLossRatio: "103%", currentWrittenPremium: "$22,789,654" },
  { date: "Apr, 2024", lossModeling: "Complete", paidLossRatio: "89%",  reportedLossRatio: "45%", expectedLossRatio: "103%", currentWrittenPremium: "$18,234,901" },
];

const TABLE_HEADERS = ["Date", "Loss modeling", "Paid LR", "Reported LR", "Expected LR", "Written Premium", "Actions"];

export function ForecastTab({ transactionId: _transactionId }: { transactionId: string }) {
  return (
    <div className="flex flex-col gap-10 pb-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-5">
        <div />
        <Button variant="outline">Configuration</Button>
      </div>

      {/* Chart */}
      <ChartComponent />

      {/* All Valuations table */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-sm font-semibold text-foreground m-0">
            All Valuations{" "}
            <span style={{ color: clr.expected }}>({VALUATION_TABLE_ROWS.length})</span>
          </h3>
        </div>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary hover:bg-secondary">
                {TABLE_HEADERS.map((h) => (
                  <TableHead key={h} className="whitespace-nowrap font-semibold">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {VALUATION_TABLE_ROWS.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-transparent">
                      {row.lossModeling}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.paidLossRatio}</TableCell>
                  <TableCell className="text-muted-foreground">{row.reportedLossRatio}</TableCell>
                  <TableCell className="text-muted-foreground">{row.expectedLossRatio}</TableCell>
                  <TableCell className="text-muted-foreground">{row.currentWrittenPremium}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Pencil size={12} />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
