// Hooks for accessing all transaction-related data in the detail tabs.
// Each hook wraps the db repository call with a consistent { data } shape,
// ready to be replaced by React Query (or similar) when a real API is wired up.

import { db } from "@/data";
import type {
  BdxUpload,
  Contract,
  Transaction,
  TransactionCession,
  TransactionDashboard,
  TransactionInsights,
  Triangle,
  Valuation,
} from "@/data";

export function useTransaction(id: string): { data: Transaction | undefined } {
  return { data: db.getById(id) };
}

export function useTransactionDashboard(
  transactionId: string
): { data: TransactionDashboard | undefined } {
  return { data: db.getDashboard(transactionId) };
}

export function useTransactionBdx(
  transactionId: string
): { data: BdxUpload[] } {
  return { data: db.getBdxUploads(transactionId) };
}

export function useTransactionContracts(
  transactionId: string
): { data: Contract[] } {
  return { data: db.getContracts(transactionId) };
}

export function useTransactionValuations(
  transactionId: string
): { data: Valuation[] } {
  return { data: db.getValuations(transactionId) };
}

export function useValuationTriangles(
  valuationId: string
): { data: Triangle[] } {
  return { data: db.getTriangles(valuationId) };
}

export function useTransactionInsights(
  transactionId: string
): { data: TransactionInsights | undefined } {
  return { data: db.getInsights(transactionId) };
}

export function useTransactionCession(
  transactionId: string
): { data: TransactionCession | undefined } {
  return { data: db.getCession(transactionId) };
}
