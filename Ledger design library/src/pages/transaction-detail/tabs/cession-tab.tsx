import React, { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown, ChevronRight, ArrowRight, Info } from "lucide-react";
import {
  Tooltip as UiTooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ─── Style constants (replacing @design-library/tokens) ──────────────────────

const clr = {
  black900: "#0F172A",
  black800: "#1E293B",
  black700: "#334155",
  black500: "#64748B",
  black300: "#CBD5E1",
  black200: "#E2E8F0",
  white:    "#FFFFFF",
  green:    "#166534",
  error:    "#DC2626",
};

const radius = { sm: "8px", md: "12px" };

const shadow = {
  sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
  md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
};

const tx = {
  h2:      { fontSize: "20px",  fontWeight: 700, lineHeight: "1.3" }  as React.CSSProperties,
  bodyM:   { fontSize: "14px",  fontWeight: 400, lineHeight: "1.5" }  as React.CSSProperties,
  bodyS:   { fontSize: "12px",  fontWeight: 400, lineHeight: "1.5" }  as React.CSSProperties,
  bodyL:   { fontSize: "15px",  fontWeight: 400, lineHeight: "1.5" }  as React.CSSProperties,
  caption: { fontSize: "11px",  fontWeight: 400, lineHeight: "1.4" }  as React.CSSProperties,
};

// ─── Chart colors ─────────────────────────────────────────────────────────────

const chartColors = {
  premium:          { fill: "#E3F4FF", stroke: "#B8D9EE" },
  capital:          { fill: "#FFFDDD", stroke: "#E6E2B0" },
  claimsPaid:       { fill: "#79CAFB", stroke: "#5AA8D8" },
  profitCommission: { fill: "#B5E3FF", stroke: "#8EC5DD" },
  investmentIncome: { fill: "#FFF4A5", stroke: "#E0D580" },
  dividends:        { fill: "#FFD666", stroke: "#D9B24A" },
  expectedLoss:     "#0F9342",
};

// ─── Scenario data generation (from old prototype, unchanged) ─────────────────

type ScenarioType = "base" | "conservative" | "aggressive";

const scenarioParams: Record<ScenarioType, {
  totalPremium: number; totalCapital: number;
  totalClaimsPaid: number; totalProfitCommission: number;
  totalInvestmentIncome: number; totalDividends: number;
  expectedLossBase: number; expectedLossAmplitude: number;
}> = {
  base:         { totalPremium: 50, totalCapital: 40, totalClaimsPaid: 50, totalProfitCommission: 8,  totalInvestmentIncome: 10, totalDividends: 22, expectedLossBase: 30, expectedLossAmplitude: 12 },
  conservative: { totalPremium: 45, totalCapital: 35, totalClaimsPaid: 60, totalProfitCommission: 4,  totalInvestmentIncome: 6,  totalDividends: 10, expectedLossBase: 45, expectedLossAmplitude: 8  },
  aggressive:   { totalPremium: 60, totalCapital: 50, totalClaimsPaid: 40, totalProfitCommission: 14, totalInvestmentIncome: 16, totalDividends: 40, expectedLossBase: 20, expectedLossAmplitude: 15 },
};

const generateChartData = (scenario: ScenarioType = "base") => {
  const months = 24;
  const p = scenarioParams[scenario];
  return Array.from({ length: months + 1 }, (_, month) => {
    const t = month / months;
    const premium          = p.totalPremium          * (1 - Math.pow(1 - Math.min(t * 2, 1), 3));
    const capital          = p.totalCapital          * (1 - Math.pow(1 - Math.min(t * 4, 1), 4));
    const investmentIncome = p.totalInvestmentIncome * (1 - Math.pow(1 - t, 1.8));
    const claimsT          = Math.max(0, (t - 0.15) / 0.85);
    const claimsPaid       = p.totalClaimsPaid       * Math.pow(claimsT, 1.8);
    const commissionT      = Math.max(0, (t - 0.35) / 0.65);
    const profitCommission = p.totalProfitCommission * Math.pow(commissionT, 2);
    const dividendT        = Math.max(0, (t - 0.45) / 0.55);
    const dividends        = p.totalDividends        * Math.pow(dividendT, 2.5);
    const expectedLoss     = p.expectedLossBase + Math.sin(t * Math.PI * 0.7) * p.expectedLossAmplitude;
    const monthNum = (month % 12) + 1;
    const year     = 2024 + Math.floor(month / 12);
    return {
      month,
      date: `${String(monthNum).padStart(2, "0")}/${String(year).slice(-2)}`,
      premium:          Math.round(premium          * 10) / 10,
      capital:          Math.round(capital          * 10) / 10,
      claimsPaid:       Math.round(claimsPaid       * 10) / 10,
      profitCommission: Math.round(profitCommission * 10) / 10,
      investmentIncome: Math.round(investmentIncome * 10) / 10,
      dividends:        Math.round(dividends        * 10) / 10,
      expectedLoss:     Math.round(expectedLoss     * 10) / 10,
    };
  });
};

const chartDataByScenario: Record<ScenarioType, ReturnType<typeof generateChartData>> = {
  base:         generateChartData("base"),
  conservative: generateChartData("conservative"),
  aggressive:   generateChartData("aggressive"),
};

// ─── Period helpers ───────────────────────────────────────────────────────────

const CHART_MONTHS      = 24;
const CHART_START_YEAR  = 2024;

const periodToIndex = (month: number, year: number) =>
  (year - CHART_START_YEAR) * 12 + (month - 1);

const indexToPeriod = (index: number) => {
  const clamped = Math.max(0, Math.min(CHART_MONTHS, Math.round(index)));
  return { month: (clamped % 12) + 1, year: CHART_START_YEAR + Math.floor(clamped / 12) };
};

// ─── Small components ─────────────────────────────────────────────────────────

const InfoTooltipIcon = ({ text }: { text: string }) => (
  <UiTooltip>
    <TooltipTrigger asChild>
      <Info size={12} style={{ color: clr.black500, cursor: "help", flexShrink: 0 }} />
    </TooltipTrigger>
    <TooltipContent side="top">
      <p style={{ ...tx.bodyS, maxWidth: 220 }}>{text}</p>
    </TooltipContent>
  </UiTooltip>
);

const FilterBtn = ({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    type="button"
    style={{
      padding: "4px 14px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 500,
      border: "none",
      cursor: "pointer",
      transition: "background 0.15s, color 0.15s",
      background: active ? clr.black900 : "transparent",
      color:      active ? clr.white    : clr.black500,
    }}
  >
    {label}
  </button>
);

const LegendItem = ({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
    {dashed ? (
      <div style={{ width: 16, height: 2,
        backgroundImage: `repeating-linear-gradient(90deg,${color} 0,${color} 4px,transparent 4px,transparent 8px)` }} />
    ) : (
      <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
    )}
    <span style={{ ...tx.bodyS, color: clr.black700 }}>{label}</span>
  </div>
);

// ─── Period scrubber ──────────────────────────────────────────────────────────

interface ScrubberProps {
  period: { month: number; year: number };
  onChange: (p: { month: number; year: number }) => void;
  onDragChange?: (d: boolean) => void;
}

const PeriodScrubber: React.FC<ScrubberProps> = ({ period, onChange, onDragChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const position = (periodToIndex(period.month, period.year) / CHART_MONTHS) * 100;

  const handleMove = (e: MouseEvent) => {
    if (!dragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    onChange(indexToPeriod((pct / 100) * CHART_MONTHS));
  };
  const stopDrag = () => { setDragging(false); onDragChange?.(false); };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", stopDrag);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [dragging]);

  return (
    <div ref={containerRef} style={{ position: "absolute", top: 0, left: 72, right: 30, bottom: 35, pointerEvents: "none" }}>
      <div style={{
        position: "absolute", left: `${position}%`, top: 20, bottom: 30,
        width: "1.5px", background: clr.black900, transform: "translateX(-50%)",
      }} />
      <div
        onMouseDown={e => { setDragging(true); onDragChange?.(true); e.preventDefault(); }}
        style={{
          position: "absolute", left: `${position}%`, top: "50%",
          transform: "translate(-50%,-50%)",
          width: 34, height: 34, borderRadius: "50%",
          background: clr.white, boxShadow: shadow.md,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "ew-resize", pointerEvents: "auto", zIndex: 10, gap: 0,
        }}
      >
        <ChevronRight size={12} color={clr.black900} style={{ transform: "scaleX(-1)" }} />
        <ChevronRight size={12} color={clr.black900} />
      </div>
    </div>
  );
};

// ─── Period navigation ────────────────────────────────────────────────────────

const PeriodNav = ({
  period, onPrev, onNext,
}: { period: { month: number; year: number }; onPrev: () => void; onNext: () => void }) => {
  const label = `${String(period.month).padStart(2, "0")}/${String(period.year).slice(-2)}`;
  const btnStyle: React.CSSProperties = {
    background: clr.white, border: "none", borderRadius: radius.sm,
    cursor: "pointer", padding: 8, display: "flex", alignItems: "center", boxShadow: shadow.sm,
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <button onClick={onPrev} style={btnStyle} type="button">
        <ArrowRight size={14} color={clr.black900} style={{ transform: "scaleX(-1)" }} />
      </button>
      <span style={{ ...tx.h2, minWidth: 72, textAlign: "center" }}>{label}</span>
      <button onClick={onNext} style={btnStyle} type="button">
        <ArrowRight size={14} color={clr.black900} />
      </button>
    </div>
  );
};

// ─── Accordion table data ─────────────────────────────────────────────────────

interface RowMeta { id: string; variable: string; tooltip: string; group: number; isSpecial?: boolean }

const ROW_META: RowMeta[] = [
  { id: "1",  variable: "Reinsurance Premium",                  tooltip: "Total premium ceded to reinsurer after commissions and fees", group: 1 },
  { id: "2",  variable: "Reinsured Paid Claims",                tooltip: "Total claims paid by the reinsurer",                          group: 1 },
  { id: "3",  variable: "Reinsured Loss Adjustment Expense",    tooltip: "Expenses incurred in adjusting and settling claims",           group: 1 },
  { id: "4",  variable: "Reinsurance Loss Adjustment Expense",  tooltip: "Reinsurer share of loss adjustment expenses",                  group: 1 },
  { id: "5",  variable: "Profit Commission",                     tooltip: "Commission paid based on profitability of the business",      group: 1 },
  { id: "6",  variable: "Net Reinsurance Settlement",           tooltip: "Net amount after all premium and claim transactions",          group: 2 },
  { id: "7",  variable: "Manual Adjustment",                    tooltip: "Manual adjustments made to the settlement",                    group: 2 },
  { id: "8",  variable: "Net Reinsurance Settlement Adjustment",tooltip: "Net settlement after manual adjustments",                      group: 3 },
  { id: "9",  variable: "Net Settlement Actual",                tooltip: "Actual settlement amount transferred",                         group: 3 },
  { id: "10", variable: "Payment Due from (to) Cedent",         tooltip: "Final balance due from or to the cedent",                     group: 4, isSpecial: true },
];

type MonthlyStore = Record<string, Record<string, number>>;

const buildMonthlyStore = (): MonthlyStore => {
  const base: Record<string, number> = {
    "1": 13_400_000, "2": 4_000_000, "3": 640_000,   "4": 1_000_000, "5": 480_000,
    "6": 7_280_000,  "7": 1_000_000, "8": 6_280_000, "9": 5_000_000, "10": 1_280_000,
  };
  const store: MonthlyStore = {};
  for (let y = 2024; y <= 2025; y++) {
    for (let m = 1; m <= 12; m++) {
      const key = `${m}/${y}`;
      const seasonal = 1 + Math.sin((m - 1) * Math.PI / 6) * 0.15;
      const year_f   = y === 2025 ? 1.08 : 1;
      const rand     = 0.95 + Math.random() * 0.1;
      const row: Record<string, number> = {};
      for (const id of Object.keys(base)) {
        let v = Math.round((base[id] ?? 0) * seasonal * year_f * rand);
        if (id === "5") v = m % 3 === 0 ? v : Math.round(v * 0.3);
        if (id === "7") v = Math.round((base["7"] ?? 0) * (0.9 + Math.random() * 0.2));
        row[id] = v;
      }
      store[key] = row;
    }
  }
  return store;
};

const MONTHLY_STORE = buildMonthlyStore();

interface RowData {
  id: string; variable: string; tooltip: string; group: number; isSpecial?: boolean;
  prior: number; current: number; change: number;
  breakdown?: Array<{ label: string; value: string; source?: string }>;
}

const getRowData = (month: number, year: number): RowData[] => {
  const cur  = MONTHLY_STORE[`${month}/${year}`] ?? MONTHLY_STORE["8/2025"] ?? {};
  const pm   = month === 1 ? 12 : month - 1;
  const py   = month === 1 ? year - 1 : year;
  const prev = MONTHLY_STORE[`${pm}/${py}`]   ?? MONTHLY_STORE["7/2025"] ?? {};

  return ROW_META.map(meta => {
    const cv = cur[meta.id]  ?? 0;
    const pv = prev[meta.id] ?? 0;

    let breakdown: RowData["breakdown"];
    const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    if (meta.id === "1") {
      breakdown = [
        { label: "Gross Collected Premium",        value: fmt(cv * 7.46),  source: "Insurance Data" },
        { label: "Gross Collected Premium Limited", value: fmt(cv * 7.4),   source: "Insurance Data" },
        { label: "Premium Limit",                  value: fmt(80_000_000), source: "Contract Data"  },
        { label: "Quota Share %",                  value: "20%",           source: "Contract Data"  },
        { label: "Ceded Collected Premium",        value: fmt(cv * 1.49)                            },
        { label: "Ceding Commission",              value: "32%",           source: "Contract Data"  },
        { label: "FET",                            value: "1%",            source: "Contract Data"  },
        { label: "Reinsurance Premium",            value: fmt(cv)                                   },
      ];
    } else if (meta.id === "2") {
      breakdown = [
        { label: "Paid Claims by policy", value: fmt(cv * 5), source: "Insurance Data" },
        { label: "Quota Share %",         value: "20%",       source: "Contract Data"  },
        { label: "Reinsured Paid Claims", value: fmt(cv)                               },
      ];
    } else if (meta.id === "6") {
      breakdown = [
        { label: "Reinsurance Premium",         value: fmt(cur["1"] ?? 0), source: "Row 1" },
        { label: "Less: Reinsured Paid Claims", value: fmt(cur["2"] ?? 0), source: "Row 2" },
        { label: "Less: Reinsured LAE",         value: fmt(cur["3"] ?? 0), source: "Row 3" },
        { label: "Less: Reinsurance LAE",       value: fmt(cur["4"] ?? 0), source: "Row 4" },
        { label: "Less: Profit Commission",     value: fmt(cur["5"] ?? 0), source: "Row 5" },
        { label: "Net Reinsurance Settlement",  value: fmt(cv)                             },
      ];
    } else if (meta.id === "8") {
      breakdown = [
        { label: "Net Reinsurance Settlement",   value: fmt(cur["6"] ?? 0), source: "Row 6" },
        { label: "Less: Manual Adjustment",      value: fmt(cur["7"] ?? 0), source: "Row 7" },
        { label: "Net Settlement Adjustment",    value: fmt(cv)                             },
      ];
    } else if (meta.id === "10") {
      breakdown = [
        { label: "Net Settlement Adjustment", value: fmt(cur["8"] ?? 0), source: "Row 8" },
        { label: "Less: Net Settlement Actual", value: fmt(cur["9"] ?? 0), source: "Row 9" },
        { label: "Payment Due from (to) Cedent", value: fmt(cv)                           },
      ];
    }

    return { ...meta, prior: pv, current: cv, change: cv - pv, breakdown };
  });
};

// ─── Accordion row ────────────────────────────────────────────────────────────

interface AccRowProps {
  row: RowData; expanded: boolean; onToggle: () => void;
  isFirst: boolean; isLast: boolean; showDivider: boolean;
}

const AccRow: React.FC<AccRowProps> = ({ row, expanded, onToggle, isFirst, isLast, showDivider }) => {
  const fmt = (n: number) =>
    Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const bgColor = row.isSpecial ? clr.white : row.group <= 3 ? "#FBFBFB" : clr.white;

  const borderRadius = (() => {
    if (row.isSpecial)        return radius.md;
    if (isFirst && isLast)    return radius.md;
    if (isFirst)              return `${radius.md} ${radius.md} 0 0`;
    if (isLast)               return `0 0 ${radius.md} ${radius.md}`;
    return "0";
  })();

  const changeColor = row.change > 0 ? clr.green : row.change < 0 ? clr.error : clr.black700;

  return (
    <div style={{
      background: bgColor, borderRadius, overflow: "hidden",
      ...(row.isSpecial ? { border: `1px solid ${clr.black200}`, boxShadow: shadow.sm } : {}),
    }}>
      {showDivider && <div style={{ height: 1, background: clr.black200, margin: "0 24px" }} />}

      <div
        onClick={onToggle}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 160px 160px 160px 36px",
          alignItems: "center",
          padding: "18px 24px",
          cursor: "pointer",
        }}
        onMouseEnter={e => { if (!row.isSpecial) (e.currentTarget as HTMLDivElement).style.background = "#F5F5F5"; }}
        onMouseLeave={e => { if (!row.isSpecial) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ ...tx.bodyM, color: clr.black900 }}>{row.variable}</span>
          <InfoTooltipIcon text={row.tooltip} />
        </div>

        <span style={{ ...tx.bodyS, color: clr.black500, textAlign: "right" }}>
          {fmt(row.prior)}
        </span>
        <span style={{ ...tx.bodyS, color: clr.black500, textAlign: "right" }}>
          {fmt(row.current)}
        </span>
        <span style={{ ...tx.bodyL, textAlign: "right", color: changeColor }}>
          {row.change > 0 ? "+" : row.change < 0 ? "-" : ""}{fmt(row.change)}
        </span>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s", transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
        }}>
          <ChevronDown size={14} color={clr.black900} />
        </div>
      </div>

      {expanded && row.breakdown && (
        <div style={{ padding: "0 24px 20px" }}>
          <div style={{ background: clr.white, borderRadius: radius.sm, padding: 16, boxShadow: shadow.sm }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ ...tx.bodyM, color: clr.black800, textAlign: "left",  padding: "8px 12px" }}>Variable</th>
                  <th style={{ ...tx.bodyM, color: clr.black800, textAlign: "right", padding: "8px 12px", width: 180 }}>Value</th>
                  <th style={{ ...tx.bodyM, color: clr.black800, textAlign: "right", padding: "8px 12px", width: 180 }}>Source</th>
                </tr>
              </thead>
              <tbody>
                {row.breakdown.map((line, i) => (
                  <tr key={i} style={{ borderTop: i > 0 ? `1px solid ${clr.black200}` : "none" }}>
                    <td style={{ ...tx.bodyM, color: clr.black500, padding: "12px 12px" }}>{line.label}</td>
                    <td style={{ ...tx.bodyM, color: clr.black500, padding: "12px 12px", textAlign: "right" }}>{line.value}</td>
                    <td style={{ ...tx.bodyM, color: clr.black500, padding: "12px 12px", textAlign: "right" }}>{line.source ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main tab component ───────────────────────────────────────────────────────

interface CessionTabProps { transactionId: string }

export function CessionTab({ transactionId: _transactionId }: CessionTabProps) {
  const [scenario, setScenario]   = useState<ScenarioType>("base");
  const [scrubbing, setScrubbing] = useState(false);
  const [period, setPeriod]       = useState({ month: 8, year: 2025 });
  const [filter, setFilter]       = useState<"all" | "trust" | "cedent" | "reinsurer">("all");
  const [expanded, setExpanded]   = useState<Set<string>>(new Set());

  const showCedent    = filter === "all" || filter === "cedent";
  const showReinsurer = filter === "all" || filter === "reinsurer";
  const showTrust     = filter === "all" || filter === "trust";

  const rowData = getRowData(period.month, period.year);

  const toggleRow = (id: string) =>
    setExpanded(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });

  const prevPeriod = () =>
    setPeriod(p => { const i = periodToIndex(p.month, p.year); return i > 0 ? indexToPeriod(i - 1) : p; });

  const nextPeriod = () =>
    setPeriod(p => { const i = periodToIndex(p.month, p.year); return i < CHART_MONTHS ? indexToPeriod(i + 1) : p; });

  // Determine group position for each row
  const getGroupPos = (idx: number) => {
    const cur  = rowData[idx];
    const prev = rowData[idx - 1];
    const next = rowData[idx + 1];
    if (!cur) return { isFirst: false, isLast: false };
    if (cur.isSpecial) return { isFirst: true, isLast: true };
    const isFirst = !prev || prev.group !== cur.group;
    const isLast  = !next || next.group !== cur.group || !!next.isSpecial;
    return { isFirst, isLast };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

      {/* ── Blue header card ─────────────────────────────────────────────── */}
      <div style={{ background: "#B3E5FF", borderRadius: radius.md, padding: "40px 10px 10px" }}>

        {/* Title + period nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, padding: "0 20px" }}>
          <h2 style={{ ...tx.h2, margin: 0 }}>Cession Statement</h2>
          <PeriodNav period={period} onPrev={prevPeriod} onNext={nextPeriod} />
        </div>

        {/* White chart card */}
        <div style={{ background: clr.white, borderRadius: radius.md, padding: 24 }}>

          {/* Chart mode toggle row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            {/* Filter buttons */}
            <div style={{ display: "flex", gap: 4, background: "#F1F5F9", borderRadius: "999px", padding: 3 }}>
              {(["all","trust","cedent","reinsurer"] as const).map(f => (
                <FilterBtn
                  key={f}
                  label={{ all: "All", trust: "Trust account", cedent: "Cedent", reinsurer: "Reinsurer" }[f]}
                  active={filter === f}
                  onClick={() => setFilter(f)}
                />
              ))}
            </div>

            {/* Scenario select */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ ...tx.bodyS, color: clr.black700 }}>Scenario</span>
              <select
                value={scenario}
                onChange={e => setScenario(e.target.value as ScenarioType)}
                style={{
                  ...tx.bodyS,
                  border: `1px solid ${clr.black300}`,
                  borderRadius: radius.sm,
                  padding: "5px 10px",
                  background: clr.white,
                  cursor: "pointer",
                }}
              >
                <option value="base">Base Case</option>
                <option value="conservative">Conservative</option>
                <option value="aggressive">Aggressive</option>
              </select>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: clr.black200, marginBottom: 20 }} />

          {/* Legend */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px 16px" }}>
            <div style={{ display: "flex", gap: 16 }}>
              <LegendItem color={chartColors.premium.fill}   label="Cedent"    />
              <LegendItem color={chartColors.capital.fill}   label="Reinsurer" />
              <LegendItem color={chartColors.expectedLoss}   label="Exp. Loss" dashed />
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ ...tx.bodyS, color: clr.black300, fontWeight: 600 }}>Inflows:</span>
                <LegendItem color={chartColors.premium.fill} label="Premium" />
                <LegendItem color={chartColors.capital.fill} label="Capital" />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ ...tx.bodyS, color: clr.black300, fontWeight: 600 }}>Outflows:</span>
                <LegendItem color={chartColors.claimsPaid.fill}       label="Claims"     />
                <LegendItem color={chartColors.profitCommission.fill}  label="Commission" />
                <LegendItem color={chartColors.investmentIncome.fill}  label="Investment" />
                <LegendItem color={chartColors.dividends.fill}         label="Dividends"  />
              </div>
            </div>
          </div>

          {/* Area chart */}
          <div style={{ height: 320, position: "relative", overflow: "visible" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartDataByScenario[scenario]} margin={{ top: 20, right: 30, left: 10, bottom: 35 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={clr.black300} vertical={false} />

                {/* Inflows */}
                {(showTrust || showCedent) && (
                  <Area type="monotone" dataKey="premium" stackId="in"
                    stroke={chartColors.premium.stroke} strokeWidth={1}
                    fill={chartColors.premium.fill} fillOpacity={0.9} name="Premium" />
                )}
                {(showTrust || showReinsurer) && (
                  <Area type="monotone" dataKey="capital" stackId="in"
                    stroke={chartColors.capital.stroke} strokeWidth={1}
                    fill={chartColors.capital.fill} fillOpacity={0.9} name="Capital" />
                )}

                {/* Outflows */}
                {showCedent && (<>
                  <Area type="monotone" dataKey="claimsPaid" stackId="out"
                    stroke={chartColors.claimsPaid.stroke} strokeWidth={1}
                    fill={chartColors.claimsPaid.fill} fillOpacity={0.85} name="Claims Paid" />
                  <Area type="monotone" dataKey="profitCommission" stackId="out"
                    stroke={chartColors.profitCommission.stroke} strokeWidth={1}
                    fill={chartColors.profitCommission.fill} fillOpacity={0.85} name="Profit Commission" />
                </>)}
                {showReinsurer && (<>
                  <Area type="monotone" dataKey="investmentIncome" stackId="out"
                    stroke={chartColors.investmentIncome.stroke} strokeWidth={1}
                    fill={chartColors.investmentIncome.fill} fillOpacity={0.85} name="Investment Income" />
                  <Area type="monotone" dataKey="dividends" stackId="out"
                    stroke={chartColors.dividends.stroke} strokeWidth={1}
                    fill={chartColors.dividends.fill} fillOpacity={0.85} name="Dividends" />
                </>)}

                <Line type="monotone" dataKey="expectedLoss"
                  stroke={chartColors.expectedLoss} strokeWidth={2}
                  strokeDasharray="5 5" dot={false} name="Expected Loss" />

                <XAxis dataKey="date"
                  tick={{ fill: clr.black700, fontSize: 11 }} interval={2}
                  label={{ value: "Evaluation Date", position: "insideBottom", offset: -25, style: { fill: clr.black700, fontSize: 11 } }} />
                <YAxis
                  tick={{ fill: clr.black700, fontSize: 11 }}
                  tickFormatter={v => `$${v}M`} domain={[0, "auto"]}
                  label={{ value: "Cumulative Cash ($M)", angle: -90, position: "insideLeft", style: { fill: clr.black700, fontSize: 11 } }} />

                <Tooltip
                  cursor={false}
                  content={({ active, payload, label }) => {
                    if (!active || scrubbing || !payload?.length) return null;
                    const d = payload[0]?.payload;
                    return (
                      <div style={{ background: clr.white, padding: 12, borderRadius: radius.sm, border: `1px solid ${clr.black200}`, boxShadow: shadow.md }}>
                        <p style={{ ...tx.bodyM, fontWeight: 600, margin: "0 0 8px" }}>{label}</p>
                        {[
                          { key: "premium",          label: "Premium",    color: chartColors.premium.fill          },
                          { key: "capital",           label: "Capital",    color: chartColors.capital.fill          },
                          { key: "claimsPaid",        label: "Claims",     color: chartColors.claimsPaid.fill       },
                          { key: "profitCommission",  label: "Commission", color: chartColors.profitCommission.fill },
                          { key: "investmentIncome",  label: "Investment", color: chartColors.investmentIncome.fill },
                          { key: "dividends",         label: "Dividends",  color: chartColors.dividends.fill        },
                        ].map(item => (
                          <div key={item.key} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                            <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
                            <span style={{ ...tx.bodyS, color: clr.black500 }}>{item.label}: ${d?.[item.key]}M</span>
                          </div>
                        ))}
                        <div style={{ borderTop: `1px solid ${clr.black200}`, marginTop: 6, paddingTop: 6, display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 12, height: 2, backgroundImage: `repeating-linear-gradient(90deg,${chartColors.expectedLoss} 0,${chartColors.expectedLoss} 3px,transparent 3px,transparent 6px)` }} />
                          <span style={{ ...tx.bodyS, color: chartColors.expectedLoss }}>Exp. Loss: {d?.expectedLoss}%</span>
                        </div>
                      </div>
                    );
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <PeriodScrubber period={period} onChange={setPeriod} onDragChange={setScrubbing} />
          </div>
        </div>
      </div>

      {/* ── Accordion table ───────────────────────────────────────────────── */}
      <div>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 160px 160px 36px", padding: "10px 24px" }}>
          {["Variable", "Prior Period", "Current Period", "Change", ""].map((h, i) => (
            <span key={i} style={{ ...tx.bodyM, color: clr.black900, textAlign: i > 0 && i < 4 ? "right" : "left" }}>{h}</span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 8 }}>
          {rowData.map((row, idx) => {
            const { isFirst, isLast } = getGroupPos(idx);
            const needsGap = isFirst && idx > 0;
            return (
              <div key={row.id} style={{ marginTop: needsGap ? 12 : 0 }}>
                <AccRow
                  row={row}
                  expanded={expanded.has(row.id)}
                  onToggle={() => toggleRow(row.id)}
                  isFirst={isFirst}
                  isLast={isLast}
                  showDivider={!isFirst}
                />
              </div>
            );
          })}
        </div>

        <p style={{ ...tx.caption, color: clr.black500, marginTop: 16, padding: "0 24px" }}>Currency: USD</p>
      </div>
    </div>
  );
}
