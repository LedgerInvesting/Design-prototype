import { db } from "@/data";
import type { Transaction } from "@/data";

export type { Transaction };

export function useTransactions() {
  // In production: swap db for an ApiTransactionRepository + React Query
  return { data: db.getAll() };
}
