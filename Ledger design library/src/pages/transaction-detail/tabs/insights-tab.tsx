import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  ScatterChart,
  Scatter,
  Cell,
  ZAxis,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Style constants (replacing @design-library/tokens) ───────────────────────

const clr = {
  black900: "#0F172A",           // recharts axis lines
  black500: "#64748B",           // recharts tick fill / axis labels
  white:    "#FFFFFF",           // recharts tooltip backgrounds
  blue700:  "#3B82F6",           // chart series stroke / fill
  blue400:  "var(--border)",     // chart grid strokes, dividers
  red:      "#F07275",           // cap reference line, scatter, incurred loss
};

const radius = { sm: "8px" };   // recharts tooltip

const shadow = {                 // recharts tooltip
  sm: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.06)",
};

const tx: Record<string, React.CSSProperties> = { // recharts axis label styles
  subheadingM: { fontSize: "18px", fontWeight: 600, lineHeight: "1.3" },
  bodyM:       { fontSize: "14px", fontWeight: 400, lineHeight: "1.6" },
  navS:        { fontSize: "11px", fontWeight: 500, lineHeight: "1.4", letterSpacing: "0.05em" },
  dataXS:      { fontSize: "10px", fontWeight: 400, lineHeight: "1.4" },
  bodyS:       { fontSize: "12px", fontWeight: 400, lineHeight: "1.5" },
};

// ─── Chart data ───────────────────────────────────────────────────────────────

const chartData = [
  { year: 2021,    premium: 0    },
  { year: 2021.25, premium: 5    },
  { year: 2021.5,  premium: 12   },
  { year: 2021.75, premium: 18   },
  { year: 2022,    premium: 20   },
  { year: 2022.25, premium: 19   },
  { year: 2023,    premium: 21   },
  { year: 2023.25, premium: 21.5 },
  { year: 2023.75, premium: 21.3 },
  { year: 2024,    premium: 20.8 },
];

const premiumCap = 25;

const largeLossData = [
  { time: 5.8, loss: 120  },
  { time: 6.5, loss: 1100 },
];

const timeLabels = ["0D", "1WK", "1MO", "3MOS", "6MOS", "1YR", "2YRS", "3YRS"];
const timeValues = [0, 1, 2, 3, 4, 5, 6, 7];

const claimSeverityData = [
  { loss: 100,     claims: 8  },
  { loss: 500,     claims: 14 },
  { loss: 1000,    claims: 16 },
  { loss: 2000,    claims: 20 },
  { loss: 5000,    claims: 28 },
  { loss: 10000,   claims: 36 },
  { loss: 15000,   claims: 32 },
  { loss: 20000,   claims: 22 },
  { loss: 30000,   claims: 33 },
  { loss: 40000,   claims: 38 },
  { loss: 50000,   claims: 43 },
  { loss: 60000,   claims: 53 },
  { loss: 70000,   claims: 68 },
  { loss: 80000,   claims: 75 },
  { loss: 90000,   claims: 58 },
  { loss: 100000,  claims: 20 },
  { loss: 200000,  claims: 14 },
  { loss: 500000,  claims: 5  },
  { loss: 750000,  claims: 3  },
  { loss: 1000000, claims: 2  },
];

const lossRatiosData = [
  { year: 0,   earnedPremium: 0,    incurredLoss: 0    },
  { year: 0.2, earnedPremium: 1,    incurredLoss: 0.5  },
  { year: 0.4, earnedPremium: 2.5,  incurredLoss: 1.2  },
  { year: 0.6, earnedPremium: 4,    incurredLoss: 2    },
  { year: 0.8, earnedPremium: 5.5,  incurredLoss: 3    },
  { year: 1,   earnedPremium: 7,    incurredLoss: 3.5  },
  { year: 1.2, earnedPremium: 8,    incurredLoss: 4    },
  { year: 1.4, earnedPremium: 9,    incurredLoss: 4.5  },
  { year: 1.6, earnedPremium: 10,   incurredLoss: 5.5  },
  { year: 1.8, earnedPremium: 10.5, incurredLoss: 6    },
  { year: 2,   earnedPremium: 11,   incurredLoss: 6.5  },
  { year: 2.2, earnedPremium: 11.5, incurredLoss: 7    },
  { year: 2.4, earnedPremium: 11.8, incurredLoss: 8    },
  { year: 2.6, earnedPremium: 12,   incurredLoss: 9    },
  { year: 2.8, earnedPremium: 12,   incurredLoss: 9.5  },
  { year: 3,   earnedPremium: 11.8, incurredLoss: 10   },
];

const lossDevelopmentData = [
  { date: "Jan 2022", value: 100 },
  { date: "Apr 2022", value: 40  },
  { date: "Jul 2022", value: 120 },
  { date: "Oct 2022", value: 60  },
  { date: "Jan 2023", value: 70  },
  { date: "Apr 2023", value: 65  },
  { date: "Jul 2023", value: 30  },
  { date: "Oct 2023", value: 65  },
  { date: "Jan 2024", value: 45  },
  { date: "Apr 2024", value: 25  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TICK_STYLE = { fill: clr.black500, fontSize: 10 };

function ChartCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 bg-background rounded-lg border border-border shadow-sm overflow-hidden">
      {children}
    </div>
  );
}

function CardHeader({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-end items-center px-5 py-4 gap-3">
        {children}
        <Button size="icon-sm" variant="ghost" onClick={() => undefined}>
          <Maximize2 size={14} />
        </Button>
      </div>
      <div className="w-full h-px bg-border" />
    </>
  );
}

function InfoPanel({
  title,
  description,
  stats,
}: {
  title: string;
  description: string;
  stats: { label: string; value: string }[];
}) {
  return (
    <div className="flex flex-col gap-4" style={{ flex: "0 0 30%", paddingTop: "35px" }}>
      <div className="text-lg font-semibold text-foreground">{title}</div>
      <div className="w-full h-px bg-border" />
      <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>

      {stats.map((stat, i) => (
        <React.Fragment key={i}>
          <div className="w-full border-t border-dashed border-border" />
          <div className="flex justify-between items-center">
            <div className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">{stat.label}</div>
            <div className="text-sm text-foreground">{stat.value}</div>
          </div>
        </React.Fragment>
      ))}

      <div className="w-full border-t border-dashed border-border" />
    </div>
  );
}

function TooltipBox({
  dotColor,
  text,
}: {
  dotColor: string;
  text: string;
}) {
  return (
    <div className="bg-background p-2.5 rounded-lg shadow-sm text-xs text-muted-foreground flex items-center gap-2">
      <div className="size-3 rounded-sm shrink-0" style={{ backgroundColor: dotColor }} />
      <p className="m-0">{text}</p>
    </div>
  );
}

// ─── Section 1: Policy BDX Data ───────────────────────────────────────────────

function PolicyBDXSection({ selectedYear, setSelectedYear }: {
  selectedYear: string;
  setSelectedYear: (v: string) => void;
}) {
  return (
    <div className="flex gap-[100px] items-start">
      <InfoPanel
        title="Policy BDX Data"
        description="Track the premium volume written by the policy group over time and assess the probability that the total premium volume will be materially different from expectations."
        stats={[
          { label: "CURRENT WRITTEN PREMIUM",           value: "$45.9M" },
          { label: "PROJECTED WRITTEN PREMIUM",         value: "$59.3M" },
          { label: "PROBABILITY OF EXCEEDING PREMIUM CAP", value: "32.2%" },
        ]}
      />

      <ChartCard>
        <CardHeader>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium tracking-wide text-muted-foreground">Year</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border-none bg-transparent text-sm text-foreground cursor-pointer outline-none"
            >
              {["2022", "2023", "2024", "2025"].map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </CardHeader>

        <div style={{ position: "relative", width: "100%", height: "320px" }}>
          <div
            className="absolute text-[10px] text-muted-foreground whitespace-nowrap"
            style={{ left: "-10px", top: "50%", transform: "rotate(-90deg) translateY(-50%)", transformOrigin: "center" }}
          >
            Written Premium
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 40, left: 10, bottom: 25 }}>
              <defs>
                <pattern
                  id="redStripePattern"
                  patternUnits="userSpaceOnUse"
                  width="4"
                  height="4"
                  patternTransform="rotate(45)"
                >
                  <rect width="4" height="4" fill="transparent" />
                  <line x1="0" y1="0" x2="0" y2="4" stroke={clr.red} strokeWidth="1" />
                </pattern>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical horizontal stroke={clr.blue400} />

              <XAxis
                dataKey="year"
                type="number"
                domain={[2021, 2024]}
                ticks={[2021, 2022, 2023, 2024]}
                axisLine={{ stroke: clr.black900, strokeWidth: 2 }}
                tickLine={false}
                tick={TICK_STYLE}
                label={{
                  value: "Evaluation Date",
                  position: "bottom",
                  offset: 0,
                  style: { ...tx["dataXS"], fill: clr.black500 },
                }}
              />

              <YAxis
                domain={[0, 30]}
                ticks={[0, 10, 15, 20, 25, 30]}
                axisLine={false}
                tickLine={false}
                tick={TICK_STYLE}
                tickFormatter={(v: number) => `$${v}M`}
              />

              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0];
                  if (!item) return null;
                  return <TooltipBox dotColor={clr.blue700} text={`$${String(item.value)}M written premium`} />;
                }}
              />

              <ReferenceLine x={2021.5} stroke={clr.blue400} strokeDasharray="3 3" />
              <ReferenceLine x={2022.5} stroke={clr.blue400} strokeDasharray="3 3" />
              <ReferenceLine x={2023.5} stroke={clr.blue400} strokeDasharray="3 3" />

              <ReferenceArea x1={2021} x2={2022} fill={clr.blue700} fillOpacity={0.15} />
              <ReferenceArea y1={25} y2={30} fill="url(#redStripePattern)" fillOpacity={0.4} />

              <ReferenceLine y={premiumCap} stroke={clr.red} strokeWidth={2} />

              <Area
                type="monotone"
                dataKey="premium"
                stroke={clr.blue700}
                fill={clr.blue700}
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

// ─── Section 2: Large Losses ──────────────────────────────────────────────────

function LargeLossesSection() {
  return (
    <div className="flex gap-[100px] items-start">
      <InfoPanel
        title="Large Losses"
        description="Large losses are claims that cost an appreciable fraction of policy limits to settle. Track the behavior of large losses over time for this policy group."
        stats={[
          { label: "IRR",  value: "18.7%"  },
          { label: "MOIC", value: "1.42"   },
          { label: "WAL",  value: "2.5 YRS" },
        ]}
      />

      <ChartCard>
        <CardHeader />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "320px",
            paddingRight: "20px",
          }}
        >
          <div
            className="absolute text-[10px] text-muted-foreground whitespace-nowrap"
            style={{ left: "-15px", top: "50%", transform: "rotate(-90deg) translateY(-50%)", transformOrigin: "center" }}
          >
            Reported Loss + DCC
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, left: 30, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical horizontal stroke={clr.blue400} />

              <XAxis
                type="number"
                dataKey="time"
                domain={[-0.5, 7.5]}
                ticks={timeValues}
                tickFormatter={(v: number) => {
                  const idx = timeValues.indexOf(v);
                  return idx >= 0 ? (timeLabels[idx] ?? "") : "";
                }}
                axisLine={{ stroke: clr.black900, strokeWidth: 2 }}
                tickLine={false}
                tick={TICK_STYLE}
                label={{
                  value: "Time Since Loss Occurence",
                  position: "bottom",
                  offset: 0,
                  style: { ...tx["dataXS"], fill: clr.black500 },
                }}
                allowDataOverflow
              />

              <YAxis
                type="number"
                dataKey="loss"
                domain={[0, 1200]}
                ticks={[0, 10, 100, 1000]}
                axisLine={false}
                tickLine={false}
                tick={TICK_STYLE}
                tickFormatter={(v: number) => {
                  if (v === 0)    return "$0K";
                  if (v === 10)   return "$10K";
                  if (v === 100)  return "$100K";
                  if (v === 1000) return "$1M";
                  return `$${v}`;
                }}
              />

              <ZAxis range={[64, 64]} />

              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0];
                  if (!item) return null;
                  const loss = (item.payload as { loss: number }).loss;
                  const color = loss === 120 ? "#10B981" : "#F59E0B";
                  return <TooltipBox dotColor={color} text={`$${loss}K reported loss`} />;
                }}
              />

              <ReferenceLine y={500} stroke={clr.blue700} strokeWidth={2} />

              <Scatter name="Large Losses" data={largeLossData}>
                {largeLossData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.loss === 120 ? "#10B981" : "#F59E0B"} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

// ─── Section 3: Claim Severity ────────────────────────────────────────────────

function ClaimSeveritySection() {
  return (
    <div className="flex gap-[100px] items-start">
      <InfoPanel
        title="Claim Severity"
        description="Better understand the distribution of claim severity within a policy group. How much of loss costs are being driven by the few largest claims? Is it typical for that line of business?"
        stats={[
          { label: "AVERAGE LOSS",    value: "$0" },
          { label: "MEDIAN LOSS",     value: "$0" },
          { label: "PERCENTILE LOSS", value: "$0" },
        ]}
      />

      <ChartCard>
        <CardHeader />

        <div style={{ position: "relative", width: "100%", height: "320px" }}>
          <div
            className="absolute text-[10px] text-muted-foreground whitespace-nowrap"
            style={{ left: "-10px", top: "50%", transform: "rotate(-90deg) translateY(-50%)", transformOrigin: "center" }}
          >
            Number of Claims
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={claimSeverityData}
              margin={{ top: 20, right: 40, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical horizontal stroke={clr.blue400} />

              <XAxis
                xAxisId="top"
                dataKey="loss"
                type="number"
                scale="log"
                domain={[100, 1000000]}
                ticks={[100, 1000, 10000, 100000, 1000000]}
                orientation="top"
                axisLine={false}
                tickLine={false}
                tick={TICK_STYLE}
                tickFormatter={(v: number) => {
                  if (v === 100)     return "$100";
                  if (v === 1000)    return "$1K";
                  if (v === 10000)   return "$10K";
                  if (v === 100000)  return "$100K";
                  if (v === 1000000) return "$1M";
                  return "";
                }}
              />

              <XAxis
                xAxisId="bottom"
                dataKey="loss"
                type="number"
                scale="log"
                domain={[100, 1000000]}
                axisLine={{ stroke: clr.black900, strokeWidth: 2 }}
                tickLine={false}
                tick={false}
                label={{
                  value: "Reported Loss Amount",
                  position: "bottom",
                  offset: 0,
                  style: { ...tx["dataXS"], fill: clr.black500 },
                }}
              />

              <YAxis
                domain={[0, 80]}
                ticks={[0, 20, 40, 60, 80]}
                axisLine={false}
                tickLine={false}
                tick={TICK_STYLE}
              />

              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0];
                  if (!item) return null;
                  const claims = item.value as number;
                  const loss = (item.payload as { loss: number }).loss;
                  let lossLabel = "";
                  if (loss < 1000)    lossLabel = `$${loss}`;
                  else if (loss < 1e6) lossLabel = `$${loss / 1000}K`;
                  else                 lossLabel = `$${loss / 1e6}M`;
                  return <TooltipBox dotColor={clr.blue700} text={`${claims} claims at ${lossLabel}`} />;
                }}
              />

              <Bar xAxisId="bottom" dataKey="claims" fill={clr.blue700} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

// ─── Section 4: Loss Ratios ───────────────────────────────────────────────────

function LossRatiosSection() {
  return (
    <div className="flex gap-[100px] items-start">
      <InfoPanel
        title="Loss Ratios"
        description="Loss ratios are a crucial tool for understanding underwriting performance. See how different definitions of loss ratios evolve over time in response to new information."
        stats={[
          { label: "TY22 PAID LOSS RATIO",     value: "18.7%" },
          { label: "TY22 REPORTED LOSS RATIO", value: "1.42"  },
          { label: "TY22 INCURRED LOSS RATIO", value: "2.5 Y" },
        ]}
      />

      <ChartCard>
        <CardHeader />

        <div style={{ position: "relative", width: "100%", height: "320px" }}>
          <div
            className="absolute text-[10px] text-muted-foreground whitespace-nowrap"
            style={{ left: "15px", top: "50%", transform: "rotate(-90deg) translateY(-50%)", transformOrigin: "center" }}
          >
            Amount
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lossRatiosData} margin={{ top: 20, right: 40, left: 10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical horizontal stroke={clr.blue400} />

              <XAxis
                dataKey="year"
                type="number"
                domain={[0, 3]}
                ticks={[1, 2, 3]}
                axisLine={{ stroke: clr.black900, strokeWidth: 2 }}
                tickLine={false}
                tick={TICK_STYLE}
                label={{
                  value: "Year Since Treaty Start",
                  position: "bottom",
                  offset: 0,
                  style: { ...tx["dataXS"], fill: clr.black500 },
                }}
              />

              <YAxis
                domain={[0, 12]}
                ticks={[0, 2, 5, 8, 10, 12]}
                axisLine={false}
                tickLine={false}
                tick={TICK_STYLE}
                tickFormatter={(v: number) => `${v}M`}
              />

              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div
                      style={{
                        backgroundColor: clr.white,
                        padding: "10px",
                        borderRadius: radius.sm,
                        boxShadow: shadow.sm,
                        ...tx["bodyS"],
                        color: clr.black500,
                      }}
                    >
                      {payload.map((entry, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: i < payload.length - 1 ? "4px" : "0",
                          }}
                        >
                          <div
                            style={{
                              width: "12px",
                              height: "12px",
                              backgroundColor: String(entry.color),
                              borderRadius: "2px",
                            }}
                          />
                          <p style={{ margin: 0 }}>{`${String(entry.name)}: $${String(entry.value)}M`}</p>
                        </div>
                      ))}
                    </div>
                  );
                }}
              />

              <Line
                type="monotone"
                dataKey="earnedPremium"
                stroke={clr.blue700}
                strokeWidth={2}
                dot={false}
                name="Earned Premium"
              />
              <Line
                type="monotone"
                dataKey="incurredLoss"
                stroke={clr.red}
                strokeWidth={2}
                dot={false}
                name="Incurred Loss"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

// ─── Section 5: Loss Development ──────────────────────────────────────────────

function LossDevelopmentSection() {
  return (
    <div className="flex gap-[100px] items-start">
      <InfoPanel
        title="Loss Development"
        description="Loss development is the study of how loss ratios change over time as claims are reported, investigated, paid, and closed. Gain greater insight into the claim lifecycle for this policy group."
        stats={[
          { label: "0-12 MONTH PAID ATA",     value: "2" },
          { label: "0-12 MONTH REPORTED ATA", value: "4" },
          { label: "12-24 MONTH PAID ATA",    value: "6" },
        ]}
      />

      <ChartCard>
        <CardHeader />

        <div style={{ position: "relative", width: "100%", height: "320px" }}>
          <div
            className="absolute text-[10px] text-muted-foreground whitespace-nowrap"
            style={{ left: "15px", top: "50%", transform: "rotate(-90deg) translateY(-50%)", transformOrigin: "center" }}
          >
            Percentage
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lossDevelopmentData}
              margin={{ top: 20, right: 40, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical horizontal stroke={clr.blue400} />

              <XAxis
                dataKey="date"
                axisLine={{ stroke: clr.black900, strokeWidth: 2 }}
                tickLine={false}
                tick={TICK_STYLE}
                label={{
                  value: "Year Since Treaty Start",
                  position: "bottom",
                  offset: 0,
                  style: { ...tx["dataXS"], fill: clr.black500 },
                }}
              />

              <YAxis
                domain={[0, 125]}
                ticks={[0, 25, 50, 75, 100, 125]}
                axisLine={false}
                tickLine={false}
                tick={TICK_STYLE}
                tickFormatter={(v: number) => `${v}%`}
              />

              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0];
                  if (!item) return null;
                  return (
                    <TooltipBox dotColor={clr.blue700} text={`${String(item.value)}%`} />
                  );
                }}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke={clr.blue700}
                strokeWidth={2}
                dot={false}
                name="Loss Development"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function InsightsTab({ transactionId: _transactionId }: { transactionId: string }) {
  const [selectedYear, setSelectedYear] = useState("2022");

  return (
    <div className="flex flex-col gap-[50px] pb-10">
      <PolicyBDXSection selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      <LargeLossesSection />
      <ClaimSeveritySection />
      <LossRatiosSection />
      <LossDevelopmentSection />
    </div>
  );
}
