// ─────────────────────────────────────────────────────────────────────────────
// Mock data — one source of truth for all transaction-related data.
// Replace this with real API calls in the repository when ready.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  BdxUpload,
  Contract,
  Transaction,
  TransactionCession,
  TransactionDashboard,
  TransactionInsights,
  Triangle,
  Valuation,
} from "./types";

// ── Transactions ──────────────────────────────────────────────────────────────

export const TRANSACTIONS: Transaction[] = [
  {
    id: "qs-auto-2025",
    name: "QS Auto 2025",
    cedent: "Evergreen Insurance",
    reinsurer: "SwissRe",
    policyGroup: "US Auto Book",
    status: "active",
    transactionType: "renewal",
    effectiveDate: "2025-01-01",
    expiryDate: "2025-12-31",
    premium: 2_500_000,
    lossRatio: 68,
  },
  {
    id: "xol-property-cat",
    name: "XoL Property Cat",
    cedent: "Pacific Coast Mutual",
    reinsurer: "Munich Re",
    policyGroup: "Cat Property",
    status: "active",
    transactionType: "renewal",
    effectiveDate: "2024-04-01",
    expiryDate: "2025-03-31",
    premium: 5_200_000,
    lossRatio: 42,
  },
  {
    id: "surplus-workers-comp",
    name: "Surplus Workers Comp",
    cedent: "Atlantic Casualty",
    reinsurer: "Hannover Re",
    policyGroup: "WC National",
    status: "draft",
    transactionType: "brand-new",
    effectiveDate: "2023-07-01",
    expiryDate: "2024-06-30",
    premium: 1_800_000,
    lossRatio: 91,
  },
  {
    id: "treaty-marine-cargo",
    name: "Treaty Marine Cargo",
    cedent: "Global Marine Ltd",
    reinsurer: "Lloyd's Syndicate 2525",
    policyGroup: "Marine Book",
    status: "active",
    transactionType: "renewal",
    effectiveDate: "2024-01-01",
    expiryDate: "2024-12-31",
    premium: 3_100_000,
    lossRatio: 57,
  },
  {
    id: "fac-property-risk",
    name: "Fac Property Risk",
    cedent: "Heartland Fire & Cas.",
    reinsurer: "SCOR",
    policyGroup: "Large Property",
    status: "pending",
    transactionType: "brand-new",
    effectiveDate: "2024-10-01",
    expiryDate: "2025-09-30",
    premium: 4_000_000,
    lossRatio: 75,
  },
  {
    id: "qs-cyber-liability",
    name: "QS Cyber Liability",
    cedent: "TechShield Insurance",
    reinsurer: "Berkshire Hathaway Re",
    policyGroup: "Cyber Lines",
    status: "active",
    transactionType: "brand-new",
    effectiveDate: "2024-07-01",
    expiryDate: "2025-06-30",
    premium: 2_200_000,
    lossRatio: 38,
  },
];

// ── BDX Uploads ───────────────────────────────────────────────────────────────
// Months run from transaction effectiveDate to ~now.

export const BDX_UPLOADS: BdxUpload[] = [
  // qs-auto-2025 (Jan 2025–)
  { id: "bdx-1", transactionId: "qs-auto-2025", documentType: "policy", month: "2025-01", status: "success", fileName: "qs_auto_policy_jan25.xlsx", uploadedAt: "2025-02-05" },
  { id: "bdx-2", transactionId: "qs-auto-2025", documentType: "claims", month: "2025-01", status: "success", fileName: "qs_auto_claims_jan25.xlsx", uploadedAt: "2025-02-05" },
  { id: "bdx-3", transactionId: "qs-auto-2025", documentType: "policy", month: "2025-02", status: "progress" },
  { id: "bdx-4", transactionId: "qs-auto-2025", documentType: "claims", month: "2025-02", status: "add" },

  // xol-property-cat (Apr 2024–)
  { id: "bdx-5",  transactionId: "xol-property-cat", documentType: "policy", month: "2024-04", status: "success", fileName: "xol_policy_apr24.xlsx", uploadedAt: "2024-05-03" },
  { id: "bdx-6",  transactionId: "xol-property-cat", documentType: "claims", month: "2024-04", status: "success", fileName: "xol_claims_apr24.xlsx", uploadedAt: "2024-05-03" },
  { id: "bdx-7",  transactionId: "xol-property-cat", documentType: "policy", month: "2024-05", status: "success", fileName: "xol_policy_may24.xlsx", uploadedAt: "2024-06-04" },
  { id: "bdx-8",  transactionId: "xol-property-cat", documentType: "claims", month: "2024-05", status: "error",   fileName: "xol_claims_may24.xlsx",   uploadedAt: "2024-06-04" },
  { id: "bdx-9",  transactionId: "xol-property-cat", documentType: "policy", month: "2024-06", status: "success", fileName: "xol_policy_jun24.xlsx", uploadedAt: "2024-07-02" },
  { id: "bdx-10", transactionId: "xol-property-cat", documentType: "claims", month: "2024-06", status: "success", fileName: "xol_claims_jun24.xlsx", uploadedAt: "2024-07-02" },
  { id: "bdx-11", transactionId: "xol-property-cat", documentType: "policy", month: "2024-07", status: "success", fileName: "xol_policy_jul24.xlsx", uploadedAt: "2024-08-05" },
  { id: "bdx-12", transactionId: "xol-property-cat", documentType: "claims", month: "2024-07", status: "attention" },
  { id: "bdx-13", transactionId: "xol-property-cat", documentType: "policy", month: "2024-08", status: "success", fileName: "xol_policy_aug24.xlsx", uploadedAt: "2024-09-03" },
  { id: "bdx-14", transactionId: "xol-property-cat", documentType: "claims", month: "2024-08", status: "success", fileName: "xol_claims_aug24.xlsx", uploadedAt: "2024-09-03" },
  { id: "bdx-15", transactionId: "xol-property-cat", documentType: "policy", month: "2024-09", status: "success", fileName: "xol_policy_sep24.xlsx", uploadedAt: "2024-10-04" },
  { id: "bdx-16", transactionId: "xol-property-cat", documentType: "claims", month: "2024-09", status: "success", fileName: "xol_claims_sep24.xlsx", uploadedAt: "2024-10-04" },
  { id: "bdx-17", transactionId: "xol-property-cat", documentType: "policy", month: "2024-10", status: "success", fileName: "xol_policy_oct24.xlsx", uploadedAt: "2024-11-05" },
  { id: "bdx-18", transactionId: "xol-property-cat", documentType: "claims", month: "2024-10", status: "success", fileName: "xol_claims_oct24.xlsx", uploadedAt: "2024-11-05" },
  { id: "bdx-19", transactionId: "xol-property-cat", documentType: "policy", month: "2024-11", status: "success", fileName: "xol_policy_nov24.xlsx", uploadedAt: "2024-12-04" },
  { id: "bdx-20", transactionId: "xol-property-cat", documentType: "claims", month: "2024-11", status: "success", fileName: "xol_claims_nov24.xlsx", uploadedAt: "2024-12-04" },
  { id: "bdx-21", transactionId: "xol-property-cat", documentType: "policy", month: "2024-12", status: "progress" },
  { id: "bdx-22", transactionId: "xol-property-cat", documentType: "claims", month: "2024-12", status: "add" },

  // surplus-workers-comp (Jul 2023–Jun 2024, draft — sparse uploads)
  { id: "bdx-23", transactionId: "surplus-workers-comp", documentType: "policy", month: "2023-07", status: "success", fileName: "wc_policy_jul23.xlsx", uploadedAt: "2023-08-07" },
  { id: "bdx-24", transactionId: "surplus-workers-comp", documentType: "claims", month: "2023-07", status: "success", fileName: "wc_claims_jul23.xlsx", uploadedAt: "2023-08-07" },
  { id: "bdx-25", transactionId: "surplus-workers-comp", documentType: "policy", month: "2023-08", status: "error", fileName: "wc_policy_aug23.xlsx", uploadedAt: "2023-09-06" },
  { id: "bdx-26", transactionId: "surplus-workers-comp", documentType: "claims", month: "2023-08", status: "add" },

  // treaty-marine-cargo (Jan 2024–Dec 2024)
  { id: "bdx-27", transactionId: "treaty-marine-cargo", documentType: "policy", month: "2024-01", status: "success", fileName: "marine_policy_jan24.xlsx", uploadedAt: "2024-02-05" },
  { id: "bdx-28", transactionId: "treaty-marine-cargo", documentType: "claims", month: "2024-01", status: "success", fileName: "marine_claims_jan24.xlsx", uploadedAt: "2024-02-05" },
  { id: "bdx-29", transactionId: "treaty-marine-cargo", documentType: "policy", month: "2024-02", status: "success", fileName: "marine_policy_feb24.xlsx", uploadedAt: "2024-03-04" },
  { id: "bdx-30", transactionId: "treaty-marine-cargo", documentType: "claims", month: "2024-02", status: "success", fileName: "marine_claims_feb24.xlsx", uploadedAt: "2024-03-04" },
  { id: "bdx-31", transactionId: "treaty-marine-cargo", documentType: "policy", month: "2024-03", status: "success", fileName: "marine_policy_mar24.xlsx", uploadedAt: "2024-04-03" },
  { id: "bdx-32", transactionId: "treaty-marine-cargo", documentType: "claims", month: "2024-03", status: "attention" },
  { id: "bdx-33", transactionId: "treaty-marine-cargo", documentType: "policy", month: "2024-04", status: "success", fileName: "marine_policy_apr24.xlsx", uploadedAt: "2024-05-06" },
  { id: "bdx-34", transactionId: "treaty-marine-cargo", documentType: "claims", month: "2024-04", status: "success", fileName: "marine_claims_apr24.xlsx", uploadedAt: "2024-05-06" },
  { id: "bdx-35", transactionId: "treaty-marine-cargo", documentType: "policy", month: "2024-05", status: "success", fileName: "marine_policy_may24.xlsx", uploadedAt: "2024-06-04" },
  { id: "bdx-36", transactionId: "treaty-marine-cargo", documentType: "claims", month: "2024-05", status: "success", fileName: "marine_claims_may24.xlsx", uploadedAt: "2024-06-04" },
  { id: "bdx-37", transactionId: "treaty-marine-cargo", documentType: "policy", month: "2024-06", status: "success", fileName: "marine_policy_jun24.xlsx", uploadedAt: "2024-07-03" },
  { id: "bdx-38", transactionId: "treaty-marine-cargo", documentType: "claims", month: "2024-06", status: "success", fileName: "marine_claims_jun24.xlsx", uploadedAt: "2024-07-03" },
  { id: "bdx-39", transactionId: "treaty-marine-cargo", documentType: "policy", month: "2024-07", status: "success", fileName: "marine_policy_jul24.xlsx", uploadedAt: "2024-08-05" },
  { id: "bdx-40", transactionId: "treaty-marine-cargo", documentType: "claims", month: "2024-07", status: "success", fileName: "marine_claims_jul24.xlsx", uploadedAt: "2024-08-05" },
  { id: "bdx-41", transactionId: "treaty-marine-cargo", documentType: "policy", month: "2024-08", status: "success", fileName: "marine_policy_aug24.xlsx", uploadedAt: "2024-09-04" },
  { id: "bdx-42", transactionId: "treaty-marine-cargo", documentType: "claims", month: "2024-08", status: "success", fileName: "marine_claims_aug24.xlsx", uploadedAt: "2024-09-04" },
  { id: "bdx-43", transactionId: "treaty-marine-cargo", documentType: "policy", month: "2024-09", status: "success", fileName: "marine_policy_sep24.xlsx", uploadedAt: "2024-10-04" },
  { id: "bdx-44", transactionId: "treaty-marine-cargo", documentType: "claims", month: "2024-09", status: "error",   fileName: "marine_claims_sep24.xlsx", uploadedAt: "2024-10-04" },
  { id: "bdx-45", transactionId: "treaty-marine-cargo", documentType: "policy", month: "2024-10", status: "success", fileName: "marine_policy_oct24.xlsx", uploadedAt: "2024-11-05" },
  { id: "bdx-46", transactionId: "treaty-marine-cargo", documentType: "claims", month: "2024-10", status: "success", fileName: "marine_claims_oct24.xlsx", uploadedAt: "2024-11-05" },
  { id: "bdx-47", transactionId: "treaty-marine-cargo", documentType: "policy", month: "2024-11", status: "progress" },
  { id: "bdx-48", transactionId: "treaty-marine-cargo", documentType: "claims", month: "2024-11", status: "add" },

  // fac-property-risk (Oct 2024– , pending — minimal uploads)
  { id: "bdx-49", transactionId: "fac-property-risk", documentType: "policy", month: "2024-10", status: "progress" },
  { id: "bdx-50", transactionId: "fac-property-risk", documentType: "claims", month: "2024-10", status: "add" },

  // qs-cyber-liability (Jul 2024–)
  { id: "bdx-51", transactionId: "qs-cyber-liability", documentType: "policy", month: "2024-07", status: "success", fileName: "cyber_policy_jul24.xlsx", uploadedAt: "2024-08-05" },
  { id: "bdx-52", transactionId: "qs-cyber-liability", documentType: "claims", month: "2024-07", status: "success", fileName: "cyber_claims_jul24.xlsx", uploadedAt: "2024-08-05" },
  { id: "bdx-53", transactionId: "qs-cyber-liability", documentType: "policy", month: "2024-08", status: "success", fileName: "cyber_policy_aug24.xlsx", uploadedAt: "2024-09-04" },
  { id: "bdx-54", transactionId: "qs-cyber-liability", documentType: "claims", month: "2024-08", status: "success", fileName: "cyber_claims_aug24.xlsx", uploadedAt: "2024-09-04" },
  { id: "bdx-55", transactionId: "qs-cyber-liability", documentType: "policy", month: "2024-09", status: "success", fileName: "cyber_policy_sep24.xlsx", uploadedAt: "2024-10-03" },
  { id: "bdx-56", transactionId: "qs-cyber-liability", documentType: "claims", month: "2024-09", status: "success", fileName: "cyber_claims_sep24.xlsx", uploadedAt: "2024-10-03" },
  { id: "bdx-57", transactionId: "qs-cyber-liability", documentType: "policy", month: "2024-10", status: "success", fileName: "cyber_policy_oct24.xlsx", uploadedAt: "2024-11-04" },
  { id: "bdx-58", transactionId: "qs-cyber-liability", documentType: "claims", month: "2024-10", status: "success", fileName: "cyber_claims_oct24.xlsx", uploadedAt: "2024-11-04" },
  { id: "bdx-59", transactionId: "qs-cyber-liability", documentType: "policy", month: "2024-11", status: "success", fileName: "cyber_policy_nov24.xlsx", uploadedAt: "2024-12-05" },
  { id: "bdx-60", transactionId: "qs-cyber-liability", documentType: "claims", month: "2024-11", status: "success", fileName: "cyber_claims_nov24.xlsx", uploadedAt: "2024-12-05" },
  { id: "bdx-61", transactionId: "qs-cyber-liability", documentType: "policy", month: "2024-12", status: "success", fileName: "cyber_policy_dec24.xlsx", uploadedAt: "2025-01-06" },
  { id: "bdx-62", transactionId: "qs-cyber-liability", documentType: "claims", month: "2024-12", status: "success", fileName: "cyber_claims_dec24.xlsx", uploadedAt: "2025-01-06" },
  { id: "bdx-63", transactionId: "qs-cyber-liability", documentType: "policy", month: "2025-01", status: "progress" },
  { id: "bdx-64", transactionId: "qs-cyber-liability", documentType: "claims", month: "2025-01", status: "add" },
];

// ── Contracts ─────────────────────────────────────────────────────────────────

export const CONTRACTS: Contract[] = [
  // qs-auto-2025
  { id: "con-1", transactionId: "qs-auto-2025", name: "SwissRe QS Auto Trust 2025-A", type: "reinsurance_trust", amended: false, signedDate: "2024-12-15", effectiveDate: "2025-01-01", pageCount: 38 },
  { id: "con-2", transactionId: "qs-auto-2025", name: "RS-2025-001 Evergreen Insurance", type: "reinsurance_schedule", amended: true, signedDate: "2024-12-20", effectiveDate: "2025-01-01", pageCount: 72 },

  // xol-property-cat
  { id: "con-3", transactionId: "xol-property-cat", name: "Munich Re XoL Trust 2024-A", type: "reinsurance_trust", amended: false, signedDate: "2024-03-10", effectiveDate: "2024-04-01", pageCount: 44 },
  { id: "con-4", transactionId: "xol-property-cat", name: "XoL Property Cat Schedule 2024", type: "reinsurance_schedule", amended: false, signedDate: "2024-03-15", effectiveDate: "2024-04-01", pageCount: 89 },
  { id: "con-5", transactionId: "xol-property-cat", name: "Cat Addendum — Wildfire Exclusion", type: "other", amended: false, signedDate: "2024-06-01", effectiveDate: "2024-06-01", pageCount: 6 },

  // surplus-workers-comp
  { id: "con-6", transactionId: "surplus-workers-comp", name: "Hannover Re WC Trust 2023-B", type: "reinsurance_trust", amended: false, signedDate: "2023-06-20", effectiveDate: "2023-07-01", pageCount: 31 },

  // treaty-marine-cargo
  { id: "con-7", transactionId: "treaty-marine-cargo", name: "Lloyd's 2525 Marine Trust 2024", type: "reinsurance_trust", amended: false, signedDate: "2023-12-18", effectiveDate: "2024-01-01", pageCount: 52 },
  { id: "con-8", transactionId: "treaty-marine-cargo", name: "Marine Cargo Treaty Schedule", type: "reinsurance_schedule", amended: true, signedDate: "2023-12-22", effectiveDate: "2024-01-01", pageCount: 103 },

  // fac-property-risk
  { id: "con-9", transactionId: "fac-property-risk", name: "SCOR Fac Property Draft 2024", type: "reinsurance_trust", amended: false, signedDate: undefined, effectiveDate: "2024-10-01", pageCount: 27 },

  // qs-cyber-liability
  { id: "con-10", transactionId: "qs-cyber-liability", name: "BH Re Cyber QS Trust 2024-A", type: "reinsurance_trust", amended: false, signedDate: "2024-06-25", effectiveDate: "2024-07-01", pageCount: 41 },
  { id: "con-11", transactionId: "qs-cyber-liability", name: "Cyber Liability Schedule 2024", type: "reinsurance_schedule", amended: false, signedDate: "2024-06-28", effectiveDate: "2024-07-01", pageCount: 65 },
];

// ── Valuations ────────────────────────────────────────────────────────────────

export const VALUATIONS: Valuation[] = [
  // xol-property-cat — 2 valuations
  { id: "val-1", transactionId: "xol-property-cat", evaluationDate: "2024-12-31", reportedLossRatio: 40, currentWrittenPremium: 5_200_000, status: "reviewed", notes: "Q4 2024 review completed. Loss development tracking below projected.", createdBy: "J. Torres", reviewedBy: "M. Chen" },
  { id: "val-2", transactionId: "xol-property-cat", evaluationDate: "2024-06-30", reportedLossRatio: 38, currentWrittenPremium: 4_900_000, status: "reviewed", createdBy: "J. Torres", reviewedBy: "M. Chen" },

  // treaty-marine-cargo — 1 valuation
  { id: "val-3", transactionId: "treaty-marine-cargo", evaluationDate: "2024-12-31", reportedLossRatio: 55, currentWrittenPremium: 3_100_000, status: "pending", notes: "Awaiting final bordereaux reconciliation for Q4.", createdBy: "S. Park" },

  // qs-auto-2025 — 1 valuation (early review)
  { id: "val-4", transactionId: "qs-auto-2025", evaluationDate: "2025-01-31", reportedLossRatio: 65, currentWrittenPremium: 2_500_000, status: "pending", createdBy: "R. Alvarez" },

  // surplus-workers-comp — 1 valuation
  { id: "val-5", transactionId: "surplus-workers-comp", evaluationDate: "2024-06-30", reportedLossRatio: 88, currentWrittenPremium: 1_800_000, status: "reviewed", notes: "High loss ratio driven by large WC claims in Q1 2024.", createdBy: "L. Kim", reviewedBy: "M. Chen" },

  // qs-cyber-liability — 1 valuation
  { id: "val-6", transactionId: "qs-cyber-liability", evaluationDate: "2024-12-31", reportedLossRatio: 36, currentWrittenPremium: 2_200_000, status: "reviewed", createdBy: "R. Alvarez", reviewedBy: "J. Torres" },
];

// ── Triangles ─────────────────────────────────────────────────────────────────
// Loss development triangles. Rows = accident years, cols = development ages.

export const TRIANGLES: Triangle[] = [
  // val-1 (xol-property-cat Q4 2024) — 2 triangles
  {
    id: "tri-1",
    valuationId: "val-1",
    name: "Paid Loss Triangle",
    type: "paid",
    position: "left",
    color: "#BD8B11",
    status: "completed",
    data: {
      heatmap: [
        { year: 2019, cells: [{ age: 12, value: 210 }, { age: 24, value: 298 }, { age: 36, value: 348 }, { age: 48, value: 368 }, { age: 60, value: 374 }, { age: 72, value: 376 }] },
        { year: 2020, cells: [{ age: 12, value: 185 }, { age: 24, value: 263 }, { age: 36, value: 307 }, { age: 48, value: 324 }, { age: 60, value: 330 }, { age: 72, value: null }] },
        { year: 2021, cells: [{ age: 12, value: 225 }, { age: 24, value: 320 }, { age: 36, value: 374 }, { age: 48, value: 394 }, { age: 60, value: null }, { age: 72, value: null }] },
        { year: 2022, cells: [{ age: 12, value: 240 }, { age: 24, value: 341 }, { age: 36, value: 398 }, { age: 48, value: null }, { age: 60, value: null }, { age: 72, value: null }] },
        { year: 2023, cells: [{ age: 12, value: 260 }, { age: 24, value: 370 }, { age: 36, value: null }, { age: 48, value: null }, { age: 60, value: null }, { age: 72, value: null }] },
        { year: 2024, cells: [{ age: 12, value: 278 }, { age: 24, value: null }, { age: 36, value: null }, { age: 48, value: null }, { age: 60, value: null }, { age: 72, value: null }] },
      ],
      growth_curve: [
        { x: 12, y: 56 }, { x: 24, y: 79 }, { x: 36, y: 92 }, { x: 48, y: 97 }, { x: 60, y: 99 }, { x: 72, y: 100 },
      ],
      mountain: [
        { x: 2019, y: 376, label: "Paid" }, { x: 2020, y: 330, label: "Paid" }, { x: 2021, y: 394, label: "Paid" },
        { x: 2022, y: 398, label: "Paid" }, { x: 2023, y: 370, label: "Paid" }, { x: 2024, y: 278, label: "Paid" },
      ],
      age_to_age: [
        { age: "12→24", factor: 1.422 }, { age: "24→36", factor: 1.169 }, { age: "36→48", factor: 1.055 },
        { age: "48→60", factor: 1.016 }, { age: "60→72", factor: 1.005 },
      ],
    },
  },
  {
    id: "tri-2",
    valuationId: "val-1",
    name: "Incurred Loss Triangle",
    type: "incurred",
    position: "center",
    color: "#744DEB",
    status: "completed",
    data: {
      heatmap: [
        { year: 2019, cells: [{ age: 12, value: 320 }, { age: 24, value: 390 }, { age: 36, value: 408 }, { age: 48, value: 414 }, { age: 60, value: 416 }, { age: 72, value: 416 }] },
        { year: 2020, cells: [{ age: 12, value: 280 }, { age: 24, value: 341 }, { age: 36, value: 357 }, { age: 48, value: 362 }, { age: 60, value: 364 }, { age: 72, value: null }] },
        { year: 2021, cells: [{ age: 12, value: 342 }, { age: 24, value: 417 }, { age: 36, value: 436 }, { age: 48, value: 441 }, { age: 60, value: null }, { age: 72, value: null }] },
        { year: 2022, cells: [{ age: 12, value: 365 }, { age: 24, value: 445 }, { age: 36, value: 465 }, { age: 48, value: null }, { age: 60, value: null }, { age: 72, value: null }] },
        { year: 2023, cells: [{ age: 12, value: 395 }, { age: 24, value: 482 }, { age: 36, value: null }, { age: 48, value: null }, { age: 60, value: null }, { age: 72, value: null }] },
        { year: 2024, cells: [{ age: 12, value: 422 }, { age: 24, value: null }, { age: 36, value: null }, { age: 48, value: null }, { age: 60, value: null }, { age: 72, value: null }] },
      ],
      growth_curve: [
        { x: 12, y: 77 }, { x: 24, y: 94 }, { x: 36, y: 98 }, { x: 48, y: 99 }, { x: 60, y: 100 }, { x: 72, y: 100 },
      ],
      mountain: [
        { x: 2019, y: 416 }, { x: 2020, y: 364 }, { x: 2021, y: 441 }, { x: 2022, y: 465 }, { x: 2023, y: 482 }, { x: 2024, y: 422 },
      ],
      age_to_age: [
        { age: "12→24", factor: 1.219 }, { age: "24→36", factor: 1.046 }, { age: "36→48", factor: 1.013 },
        { age: "48→60", factor: 1.005 }, { age: "60→72", factor: 1.000 },
      ],
    },
  },

  // val-3 (treaty-marine-cargo) — 2 triangles
  {
    id: "tri-3",
    valuationId: "val-3",
    name: "Paid Loss Triangle",
    type: "paid",
    position: "left",
    color: "#3DA3CB",
    status: "completed",
    data: {
      heatmap: [
        { year: 2020, cells: [{ age: 12, value: 142 }, { age: 24, value: 198 }, { age: 36, value: 224 }, { age: 48, value: 232 }, { age: 60, value: 235 }] },
        { year: 2021, cells: [{ age: 12, value: 158 }, { age: 24, value: 220 }, { age: 36, value: 249 }, { age: 48, value: 258 }, { age: 60, value: null }] },
        { year: 2022, cells: [{ age: 12, value: 171 }, { age: 24, value: 238 }, { age: 36, value: 270 }, { age: 48, value: null }, { age: 60, value: null }] },
        { year: 2023, cells: [{ age: 12, value: 185 }, { age: 24, value: 258 }, { age: 36, value: null }, { age: 48, value: null }, { age: 60, value: null }] },
        { year: 2024, cells: [{ age: 12, value: 198 }, { age: 24, value: null }, { age: 36, value: null }, { age: 48, value: null }, { age: 60, value: null }] },
      ],
      growth_curve: [
        { x: 12, y: 60 }, { x: 24, y: 84 }, { x: 36, y: 95 }, { x: 48, y: 99 }, { x: 60, y: 100 },
      ],
      mountain: [
        { x: 2020, y: 235 }, { x: 2021, y: 258 }, { x: 2022, y: 270 }, { x: 2023, y: 258 }, { x: 2024, y: 198 },
      ],
      age_to_age: [
        { age: "12→24", factor: 1.393 }, { age: "24→36", factor: 1.131 }, { age: "36→48", factor: 1.035 }, { age: "48→60", factor: 1.013 },
      ],
    },
  },
  {
    id: "tri-4",
    valuationId: "val-3",
    name: "Case Incurred Triangle",
    type: "case",
    position: "center",
    color: "#E05F3B",
    status: "pending-review",
    data: {
      heatmap: [
        { year: 2020, cells: [{ age: 12, value: 210 }, { age: 24, value: 264 }, { age: 36, value: 283 }, { age: 48, value: 288 }, { age: 60, value: 289 }] },
        { year: 2021, cells: [{ age: 12, value: 234 }, { age: 24, value: 294 }, { age: 36, value: 315 }, { age: 48, value: 320 }, { age: 60, value: null }] },
        { year: 2022, cells: [{ age: 12, value: 253 }, { age: 24, value: 318 }, { age: 36, value: 341 }, { age: 48, value: null }, { age: 60, value: null }] },
        { year: 2023, cells: [{ age: 12, value: 274 }, { age: 24, value: 344 }, { age: 36, value: null }, { age: 48, value: null }, { age: 60, value: null }] },
        { year: 2024, cells: [{ age: 12, value: 293 }, { age: 24, value: null }, { age: 36, value: null }, { age: 48, value: null }, { age: 60, value: null }] },
      ],
      growth_curve: [
        { x: 12, y: 73 }, { x: 24, y: 91 }, { x: 36, y: 98 }, { x: 48, y: 99 }, { x: 60, y: 100 },
      ],
      mountain: [
        { x: 2020, y: 289 }, { x: 2021, y: 320 }, { x: 2022, y: 341 }, { x: 2023, y: 344 }, { x: 2024, y: 293 },
      ],
      age_to_age: [
        { age: "12→24", factor: 1.257 }, { age: "24→36", factor: 1.072 }, { age: "36→48", factor: 1.018 }, { age: "48→60", factor: 1.003 },
      ],
    },
  },

  // val-5 (surplus-workers-comp) — 2 triangles
  {
    id: "tri-5",
    valuationId: "val-5",
    name: "Paid Loss Triangle",
    type: "paid",
    position: "left",
    color: "#BD8B11",
    status: "completed",
    data: {
      heatmap: [
        { year: 2020, cells: [{ age: 12, value: 380 }, { age: 24, value: 542 }, { age: 36, value: 634 }, { age: 48, value: 671 }] },
        { year: 2021, cells: [{ age: 12, value: 420 }, { age: 24, value: 598 }, { age: 36, value: 699 }, { age: 48, value: null }] },
        { year: 2022, cells: [{ age: 12, value: 461 }, { age: 24, value: 656 }, { age: 36, value: null }, { age: 48, value: null }] },
        { year: 2023, cells: [{ age: 12, value: 508 }, { age: 24, value: null }, { age: 36, value: null }, { age: 48, value: null }] },
      ],
      growth_curve: [
        { x: 12, y: 57 }, { x: 24, y: 81 }, { x: 36, y: 94 }, { x: 48, y: 100 },
      ],
      mountain: [
        { x: 2020, y: 671 }, { x: 2021, y: 699 }, { x: 2022, y: 656 }, { x: 2023, y: 508 },
      ],
      age_to_age: [
        { age: "12→24", factor: 1.424 }, { age: "24→36", factor: 1.170 }, { age: "36→48", factor: 1.058 },
      ],
    },
  },

  // val-6 (qs-cyber-liability) — 1 triangle
  {
    id: "tri-6",
    valuationId: "val-6",
    name: "Paid Loss Triangle",
    type: "paid",
    position: "left",
    color: "#744DEB",
    status: "completed",
    data: {
      heatmap: [
        { year: 2022, cells: [{ age: 12, value: 62 }, { age: 24, value: 88 }, { age: 36, value: 96 }] },
        { year: 2023, cells: [{ age: 12, value: 71 }, { age: 24, value: 101 }, { age: 36, value: null }] },
        { year: 2024, cells: [{ age: 12, value: 78 }, { age: 24, value: null }, { age: 36, value: null }] },
      ],
      growth_curve: [
        { x: 12, y: 65 }, { x: 24, y: 92 }, { x: 36, y: 100 },
      ],
      mountain: [
        { x: 2022, y: 96 }, { x: 2023, y: 101 }, { x: 2024, y: 78 },
      ],
      age_to_age: [
        { age: "12→24", factor: 1.420 }, { age: "24→36", factor: 1.091 },
      ],
    },
  },
];

// ── Transaction Dashboards ────────────────────────────────────────────────────

export const DASHBOARDS: TransactionDashboard[] = [
  { transactionId: "qs-auto-2025",       totalPremium: 2_500_000, lossRatio: 68, bdxCompleteness: 50,  contractsCount: 2, valuationsCount: 1, lastBdxUpload: "2025-02-05", activeSince: "2025-01-01" },
  { transactionId: "xol-property-cat",   totalPremium: 5_200_000, lossRatio: 42, bdxCompleteness: 88,  contractsCount: 3, valuationsCount: 2, lastBdxUpload: "2024-12-04", activeSince: "2024-04-01" },
  { transactionId: "surplus-workers-comp", totalPremium: 1_800_000, lossRatio: 91, bdxCompleteness: 25, contractsCount: 1, valuationsCount: 1, lastBdxUpload: "2023-08-07", activeSince: "2023-07-01" },
  { transactionId: "treaty-marine-cargo", totalPremium: 3_100_000, lossRatio: 57, bdxCompleteness: 79,  contractsCount: 2, valuationsCount: 1, lastBdxUpload: "2024-11-05", activeSince: "2024-01-01" },
  { transactionId: "fac-property-risk",  totalPremium: 4_000_000, lossRatio: 75, bdxCompleteness: 0,   contractsCount: 1, valuationsCount: 0, activeSince: "2024-10-01" },
  { transactionId: "qs-cyber-liability", totalPremium: 2_200_000, lossRatio: 38, bdxCompleteness: 92,  contractsCount: 2, valuationsCount: 1, lastBdxUpload: "2025-01-06", activeSince: "2024-07-01" },
];

// ── Insights ──────────────────────────────────────────────────────────────────

export const INSIGHTS: TransactionInsights[] = [
  {
    transactionId: "xol-property-cat",
    history: [
      { period: "2024-04", lossRatio: 28, premium: 430_000, claims: 120_400 },
      { period: "2024-05", lossRatio: 35, premium: 433_000, claims: 151_550 },
      { period: "2024-06", lossRatio: 38, premium: 435_000, claims: 165_300 },
      { period: "2024-07", lossRatio: 41, premium: 432_000, claims: 177_120 },
      { period: "2024-08", lossRatio: 40, premium: 436_000, claims: 174_400 },
      { period: "2024-09", lossRatio: 39, premium: 431_000, claims: 168_090 },
      { period: "2024-10", lossRatio: 43, premium: 434_000, claims: 186_620 },
      { period: "2024-11", lossRatio: 42, premium: 437_000, claims: 183_540 },
      { period: "2024-12", lossRatio: 44, premium: 432_000, claims: 190_080 },
    ],
  },
  {
    transactionId: "treaty-marine-cargo",
    history: [
      { period: "2024-01", lossRatio: 48, premium: 258_000, claims: 123_840 },
      { period: "2024-02", lossRatio: 52, premium: 256_000, claims: 133_120 },
      { period: "2024-03", lossRatio: 55, premium: 260_000, claims: 143_000 },
      { period: "2024-04", lossRatio: 53, premium: 257_000, claims: 136_210 },
      { period: "2024-05", lossRatio: 57, premium: 262_000, claims: 149_340 },
      { period: "2024-06", lossRatio: 58, premium: 259_000, claims: 150_220 },
      { period: "2024-07", lossRatio: 60, premium: 261_000, claims: 156_600 },
      { period: "2024-08", lossRatio: 56, premium: 258_000, claims: 144_480 },
      { period: "2024-09", lossRatio: 59, premium: 263_000, claims: 155_170 },
      { period: "2024-10", lossRatio: 57, premium: 260_000, claims: 148_200 },
      { period: "2024-11", lossRatio: 61, premium: 257_000, claims: 156_770 },
    ],
  },
  {
    transactionId: "qs-auto-2025",
    history: [
      { period: "2025-01", lossRatio: 65, premium: 208_000, claims: 135_200 },
      { period: "2025-02", lossRatio: 68, premium: 210_000, claims: 142_800 },
    ],
  },
  {
    transactionId: "surplus-workers-comp",
    history: [
      { period: "2023-07", lossRatio: 80, premium: 150_000, claims: 120_000 },
      { period: "2023-08", lossRatio: 88, premium: 151_000, claims: 132_880 },
      { period: "2023-09", lossRatio: 95, premium: 149_000, claims: 141_550 },
      { period: "2023-10", lossRatio: 92, premium: 152_000, claims: 139_840 },
      { period: "2023-11", lossRatio: 89, premium: 150_000, claims: 133_500 },
      { period: "2023-12", lossRatio: 97, premium: 153_000, claims: 148_410 },
      { period: "2024-01", lossRatio: 91, premium: 150_000, claims: 136_500 },
      { period: "2024-02", lossRatio: 88, premium: 149_000, claims: 131_120 },
    ],
  },
  {
    transactionId: "qs-cyber-liability",
    history: [
      { period: "2024-07", lossRatio: 30, premium: 183_000, claims: 54_900 },
      { period: "2024-08", lossRatio: 34, premium: 185_000, claims: 62_900 },
      { period: "2024-09", lossRatio: 36, premium: 184_000, claims: 66_240 },
      { period: "2024-10", lossRatio: 38, premium: 186_000, claims: 70_680 },
      { period: "2024-11", lossRatio: 37, premium: 184_000, claims: 68_080 },
      { period: "2024-12", lossRatio: 40, premium: 185_000, claims: 74_000 },
      { period: "2025-01", lossRatio: 38, premium: 186_000, claims: 70_680 },
    ],
  },
  {
    transactionId: "fac-property-risk",
    history: [
      { period: "2024-10", lossRatio: 70, premium: 333_000, claims: 233_100 },
      { period: "2024-11", lossRatio: 75, premium: 334_000, claims: 250_500 },
    ],
  },
];

// ── Cession ───────────────────────────────────────────────────────────────────

export const CESSIONS: TransactionCession[] = [
  {
    transactionId: "xol-property-cat",
    flows: [
      { from: "Pacific Coast Mutual", to: "Gross Premium", value: 5_200_000 },
      { from: "Gross Premium", to: "Munich Re (Ceded)",   value: 3_900_000 },
      { from: "Gross Premium", to: "Net Retained",        value: 1_300_000 },
      { from: "Munich Re (Ceded)", to: "Commission",      value: 780_000 },
      { from: "Munich Re (Ceded)", to: "Net Cession",     value: 3_120_000 },
    ],
    periods: [
      { period: "2024-Q2", cedingPremium: 1_298_000, netPremium: 1_038_400, commission: 259_600, claims: 518_200, lossRatio: 39 },
      { period: "2024-Q3", cedingPremium: 1_299_000, netPremium: 1_039_200, commission: 259_800, claims: 519_600, lossRatio: 40 },
      { period: "2024-Q4", cedingPremium: 1_301_000, netPremium: 1_040_800, commission: 260_200, claims: 572_440, lossRatio: 44 },
    ],
  },
  {
    transactionId: "treaty-marine-cargo",
    flows: [
      { from: "Global Marine Ltd", to: "Gross Premium",    value: 3_100_000 },
      { from: "Gross Premium", to: "Lloyd's 2525 (Ceded)", value: 2_170_000 },
      { from: "Gross Premium", to: "Net Retained",          value: 930_000 },
      { from: "Lloyd's 2525 (Ceded)", to: "Commission",    value: 434_000 },
      { from: "Lloyd's 2525 (Ceded)", to: "Net Cession",   value: 1_736_000 },
    ],
    periods: [
      { period: "2024-Q1", cedingPremium: 774_000, netPremium: 619_200, commission: 154_800, claims: 400_200, lossRatio: 52 },
      { period: "2024-Q2", cedingPremium: 778_000, netPremium: 622_400, commission: 155_600, claims: 441_330, lossRatio: 57 },
      { period: "2024-Q3", cedingPremium: 782_000, netPremium: 625_600, commission: 156_400, claims: 456_250, lossRatio: 58 },
      { period: "2024-Q4", cedingPremium: 766_000, netPremium: 612_800, commission: 153_200, claims: 460_120, lossRatio: 60 },
    ],
  },
  {
    transactionId: "qs-auto-2025",
    flows: [
      { from: "Evergreen Insurance", to: "Gross Premium", value: 2_500_000 },
      { from: "Gross Premium", to: "SwissRe (Ceded)",     value: 1_750_000 },
      { from: "Gross Premium", to: "Net Retained",         value: 750_000 },
      { from: "SwissRe (Ceded)", to: "Commission",         value: 350_000 },
      { from: "SwissRe (Ceded)", to: "Net Cession",        value: 1_400_000 },
    ],
    periods: [
      { period: "2025-01", cedingPremium: 208_000, netPremium: 146_000, commission: 62_000, claims: 135_200, lossRatio: 65 },
      { period: "2025-02", cedingPremium: 210_000, netPremium: 147_000, commission: 63_000, claims: 142_800, lossRatio: 68 },
    ],
  },
  {
    transactionId: "qs-cyber-liability",
    flows: [
      { from: "TechShield Insurance", to: "Gross Premium",     value: 2_200_000 },
      { from: "Gross Premium", to: "BH Re (Ceded)",             value: 1_540_000 },
      { from: "Gross Premium", to: "Net Retained",               value: 660_000 },
      { from: "BH Re (Ceded)", to: "Commission",                value: 308_000 },
      { from: "BH Re (Ceded)", to: "Net Cession",               value: 1_232_000 },
    ],
    periods: [
      { period: "2024-Q3", cedingPremium: 552_000, netPremium: 386_400, commission: 165_600, claims: 203_920, lossRatio: 37 },
      { period: "2024-Q4", cedingPremium: 555_000, netPremium: 388_500, commission: 166_500, claims: 212_760, lossRatio: 38 },
    ],
  },
  {
    transactionId: "surplus-workers-comp",
    flows: [
      { from: "Atlantic Casualty", to: "Gross Premium",    value: 1_800_000 },
      { from: "Gross Premium", to: "Hannover Re (Ceded)", value: 1_260_000 },
      { from: "Gross Premium", to: "Net Retained",          value: 540_000 },
      { from: "Hannover Re (Ceded)", to: "Commission",    value: 252_000 },
      { from: "Hannover Re (Ceded)", to: "Net Cession",   value: 1_008_000 },
    ],
    periods: [
      { period: "2023-Q3", cedingPremium: 451_000, netPremium: 315_700, commission: 135_300, claims: 394_125, lossRatio: 87 },
      { period: "2023-Q4", cedingPremium: 452_000, netPremium: 316_400, commission: 135_600, claims: 421_060, lossRatio: 93 },
      { period: "2024-Q1", cedingPremium: 449_000, netPremium: 314_300, commission: 134_700, claims: 399_110, lossRatio: 89 },
      { period: "2024-Q2", cedingPremium: 448_000, netPremium: 313_600, commission: 134_400, claims: 403_200, lossRatio: 90 },
    ],
  },
  {
    transactionId: "fac-property-risk",
    flows: [
      { from: "Heartland Fire & Cas.", to: "Gross Premium", value: 4_000_000 },
      { from: "Gross Premium", to: "SCOR (Ceded)",           value: 2_800_000 },
      { from: "Gross Premium", to: "Net Retained",             value: 1_200_000 },
      { from: "SCOR (Ceded)", to: "Commission",               value: 560_000 },
      { from: "SCOR (Ceded)", to: "Net Cession",              value: 2_240_000 },
    ],
    periods: [
      { period: "2024-Q4", cedingPremium: 667_000, netPremium: 467_000, commission: 200_000, claims: 483_530, lossRatio: 72 },
    ],
  },
];
