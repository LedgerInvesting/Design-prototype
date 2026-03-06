// ─────────────────────────────────────────────────────────────────────────────
// ITransactionRepository — the contract between the UI and the data source.
//
// To connect a real API, create a class that implements this interface and
// swap it into `db` at the bottom of this file. Nothing else changes.
// ─────────────────────────────────────────────────────────────────────────────

import {
  BDX_UPLOADS,
  CESSIONS,
  CONTRACTS,
  DASHBOARDS,
  INSIGHTS,
  TRANSACTIONS,
  TRIANGLES,
  VALUATIONS,
} from "./mock-data";
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

// ── Interface ─────────────────────────────────────────────────────────────────

export interface ITransactionRepository {
  // Transactions (homepage list)
  getAll(): Transaction[];
  getById(id: string): Transaction | undefined;

  // Per-transaction data (used by transaction-detail tabs)
  getDashboard(transactionId: string): TransactionDashboard | undefined;
  getBdxUploads(transactionId: string): BdxUpload[];
  getContracts(transactionId: string): Contract[];
  getValuations(transactionId: string): Valuation[];
  getInsights(transactionId: string): TransactionInsights | undefined;
  getCession(transactionId: string): TransactionCession | undefined;

  // Triangles belong to a valuation (accessed via Forecast tab)
  getTriangles(valuationId: string): Triangle[];
}

// ── Mock implementation (static in-memory data) ───────────────────────────────

class MockTransactionRepository implements ITransactionRepository {
  getAll(): Transaction[] {
    return TRANSACTIONS;
  }

  getById(id: string): Transaction | undefined {
    return TRANSACTIONS.find((t) => t.id === id);
  }

  getDashboard(transactionId: string): TransactionDashboard | undefined {
    return DASHBOARDS.find((d) => d.transactionId === transactionId);
  }

  getBdxUploads(transactionId: string): BdxUpload[] {
    return BDX_UPLOADS.filter((b) => b.transactionId === transactionId);
  }

  getContracts(transactionId: string): Contract[] {
    return CONTRACTS.filter((c) => c.transactionId === transactionId);
  }

  getValuations(transactionId: string): Valuation[] {
    return VALUATIONS.filter((v) => v.transactionId === transactionId);
  }

  getTriangles(valuationId: string): Triangle[] {
    return TRIANGLES.filter((t) => t.valuationId === valuationId);
  }

  getInsights(transactionId: string): TransactionInsights | undefined {
    return INSIGHTS.find((i) => i.transactionId === transactionId);
  }

  getCession(transactionId: string): TransactionCession | undefined {
    return CESSIONS.find((c) => c.transactionId === transactionId);
  }
}

// ── Singleton export ───────────────────────────────────────────────────────────
// Import `db` anywhere in the app to access data.
// When a real API is ready: replace `new MockTransactionRepository()` with
// `new ApiTransactionRepository()` (or a Zustand/React Query adapter).

export const db: ITransactionRepository = new MockTransactionRepository();
