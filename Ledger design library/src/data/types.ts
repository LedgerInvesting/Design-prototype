// ─────────────────────────────────────────────────────────────────────────────
// Core domain types — Transaction is the central entity.
// Everything else (BDX, contracts, valuations, insights, cession) belongs to
// a transaction via `transactionId`.
//
// When a real API is ready, only the repository implementation changes —
// these types and the ITransactionRepository interface stay the same.
// ─────────────────────────────────────────────────────────────────────────────

// ── Primitive enums ──────────────────────────────────────────────────────────

export type TransactionStatus = "active" | "pending" | "draft" | "cancelled";
export type TransactionType = "brand-new" | "renewal";

export type BdxDocumentType = "policy" | "claims";
export type BdxStatus =
  | "success"
  | "error"
  | "progress"
  | "attention"
  | "add"
  | "prohibited";

export type ValuationStatus = "reviewed" | "pending" | "none";

export type TrianglePosition = "left" | "center" | "right";
export type TriangleStatus = "completed" | "add" | "pending-review";
export type TriangleType = "paid" | "incurred" | "case";

export type ContractType =
  | "reinsurance_trust"
  | "reinsurance_schedule"
  | "other";

// ── Transaction ───────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  name: string;
  cedent: string;
  reinsurer: string;
  policyGroup: string;
  status: TransactionStatus;
  transactionType: TransactionType;
  effectiveDate: string; // ISO date "YYYY-MM-DD"
  expiryDate: string;    // ISO date "YYYY-MM-DD"
  premium: number;       // USD
  lossRatio: number;     // 0–100
}

// ── BDX (Bordereau) Upload ────────────────────────────────────────────────────

export interface BdxUpload {
  id: string;
  transactionId: string;
  documentType: BdxDocumentType;
  month: string;  // "YYYY-MM"
  status: BdxStatus;
  fileName?: string;
  uploadedAt?: string; // ISO datetime
}

// ── Contract ──────────────────────────────────────────────────────────────────

export interface Contract {
  id: string;
  transactionId: string;
  name: string;
  type: ContractType;
  amended: boolean;
  signedDate?: string;   // ISO date
  effectiveDate?: string; // ISO date
  pageCount?: number;
}

// ── Valuation ─────────────────────────────────────────────────────────────────

export interface Valuation {
  id: string;
  transactionId: string;
  evaluationDate: string;        // ISO date "YYYY-MM-DD"
  reportedLossRatio: number;     // 0–100
  currentWrittenPremium: number; // USD
  status: ValuationStatus;
  notes?: string;
  createdBy?: string;
  reviewedBy?: string;
}

// ── Triangle (Loss Development) ───────────────────────────────────────────────

export interface HeatmapCell {
  age: number;        // development months (12, 24, 36…)
  value: number | null; // null = not yet developed
}

export interface HeatmapRow {
  year: number;
  cells: HeatmapCell[];
}

export interface ChartPoint {
  x: number | string;
  y: number;
  label?: string;
}

export interface AgeToAgeEntry {
  age: string;   // e.g. "12→24"
  factor: number;
}

export interface TriangleData {
  heatmap: HeatmapRow[];
  growth_curve: ChartPoint[];
  mountain: ChartPoint[];
  age_to_age: AgeToAgeEntry[];
}

export interface Triangle {
  id: string;
  valuationId: string;
  name: string;
  type: TriangleType;
  position: TrianglePosition;
  color: string; // hex
  status: TriangleStatus;
  data: TriangleData;
}

// ── Dashboard summary ─────────────────────────────────────────────────────────
// Aggregated KPIs shown on the Dashboard tab.

export interface TransactionDashboard {
  transactionId: string;
  totalPremium: number;
  lossRatio: number;
  bdxCompleteness: number; // 0–100 (% of expected months uploaded successfully)
  contractsCount: number;
  valuationsCount: number;
  lastBdxUpload?: string;  // ISO date
  activeSince: string;     // ISO date (effectiveDate)
}

// ── Insights ──────────────────────────────────────────────────────────────────

export interface InsightDataPoint {
  period: string;    // "YYYY-MM"
  lossRatio: number; // 0–100
  premium: number;   // USD
  claims: number;    // USD
}

export interface TransactionInsights {
  transactionId: string;
  history: InsightDataPoint[];
}

// ── Cession ───────────────────────────────────────────────────────────────────

export interface CessionFlow {
  from: string;
  to: string;
  value: number; // USD
}

export interface CessionPeriod {
  period: string;         // "YYYY-MM" or "YYYY"
  cedingPremium: number;  // USD gross premium ceded
  netPremium: number;     // USD after commission
  commission: number;     // USD
  claims: number;         // USD
  lossRatio: number;      // 0–100
}

export interface TransactionCession {
  transactionId: string;
  flows: CessionFlow[];   // for Sankey diagram
  periods: CessionPeriod[];
}
