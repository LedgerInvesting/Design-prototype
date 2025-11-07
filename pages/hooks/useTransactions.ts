/**
 * Transaction Data Hooks
 * React hooks for fetching and managing transaction data
 * Based on the database schema for transactions
 */

import { useState, useEffect, useCallback } from 'react';

// Transaction interface based on database schema
export interface Transaction {
  id: string;
  program_id: string;
  transaction_name: string;
  ceding_company_id: string;
  reinsurer_company_id: string;
  effective_date: Date;
  expiry_date: Date;
  premium?: number;
  transaction_status: 'active' | 'pending' | 'draft' | 'cancelled';
  transaction_type?: 'brand-new' | 'renewal';
  subject_business?: string;
  risk_period_start?: Date;
  risk_period_end?: Date;
  ramp_up_period_end?: Date;
  created_at: Date;
  updated_at: Date;
  
  // Joined fields from relationships
  program_name?: string;
  ceding_company_name?: string;
  reinsurer_company_name?: string;
  contract_count?: number;
  bdx_upload_count?: number;
}

export interface TransactionFilters {
  search?: string;
  program_id?: string;
  transaction_status?: string[];
  transaction_type?: string[];
  ceding_company_id?: string;
  reinsurer_company_id?: string;
  effective_date_from?: Date;
  effective_date_to?: Date;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
  message?: string;
}

// Mock data for development - this simulates what would come from the API
const mockTransactions: Transaction[] = [
  {
    id: 'tx-001',
    program_id: 'prog-001',
    transaction_name: 'Blue Commercial Auto 2020',
    ceding_company_id: 'comp-001',
    reinsurer_company_id: 'comp-002',
    effective_date: new Date('2024-01-01'),
    expiry_date: new Date('2024-12-31'),
    premium: 1245000,
    transaction_status: 'active',
    transaction_type: 'renewal',
    subject_business: 'Commercial auto fleet coverage for transportation companies',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
    program_name: 'Blue Commercial Auto 2020',
    ceding_company_name: 'Plum Insurers LLC',
    reinsurer_company_name: 'Global Reinsurance Corp',
    contract_count: 2,
    bdx_upload_count: 12
  },
  {
    id: 'tx-002',
    program_id: 'prog-002',
    transaction_name: 'Red Worker\'s Comp 2021',
    ceding_company_id: 'comp-003',
    reinsurer_company_id: 'comp-004',
    effective_date: new Date('2024-02-01'),
    expiry_date: new Date('2024-12-31'),
    premium: 890500,
    transaction_status: 'pending',
    transaction_type: 'brand-new',
    subject_business: 'Workers compensation coverage for construction industry',
    created_at: new Date('2024-02-01'),
    updated_at: new Date('2024-02-01'),
    program_name: 'Red Worker\'s Comp 2021',
    ceding_company_name: 'Guava Insurers LLC',
    reinsurer_company_name: 'Eagle Re LLC',
    contract_count: 1,
    bdx_upload_count: 8
  },
  {
    id: 'tx-003',
    program_id: 'prog-003',
    transaction_name: 'Green General Liability 2022',
    ceding_company_id: 'comp-005',
    reinsurer_company_id: 'comp-006',
    effective_date: new Date('2024-01-10'),
    expiry_date: new Date('2024-06-30'),
    premium: 567200,
    transaction_status: 'cancelled',
    transaction_type: 'renewal',
    subject_business: 'General liability coverage for manufacturing operations',
    created_at: new Date('2024-01-10'),
    updated_at: new Date('2024-03-15'),
    program_name: 'Green General Liability 2022',
    ceding_company_name: 'Pear Insurers LLC',
    reinsurer_company_name: 'Global Re LLC',
    contract_count: 0,
    bdx_upload_count: 3
  }
  // Additional mock transactions can be added here...
];

// Statistics interface
export interface TransactionStats {
  total_transactions: number;
  active_transactions: number;
  pending_transactions: number;
  draft_transactions: number;
  cancelled_transactions: number;
  total_premium: number;
  average_premium: number;
  by_status: Record<string, number>;
  recent_activity: {
    uploads_this_month: number;
    new_transactions: number;
    renewals: number;
  };
}

/**
 * Hook for fetching paginated transactions list with filtering
 */
export function useTransactions(filters?: TransactionFilters) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false); // Start with false to prevent initial loading flash
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0
  });

  const fetchTransactions = useCallback(async () => {
    // Don't show loading for initial load to prevent blinking
    if (transactions.length === 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/transactions?${buildQueryString(filters)}`);
      
      // For now, use synchronous mock data to eliminate blinking entirely
      // await new Promise(resolve => setTimeout(resolve, 100)); // Remove delay completely
      
      // Apply basic filtering to mock data
      let filteredData = [...mockTransactions]; // Create copy to avoid mutation
      
      if (filters?.search) {
        filteredData = filteredData.filter(tx => 
          tx.transaction_name.toLowerCase().includes(filters.search!.toLowerCase()) ||
          tx.ceding_company_name?.toLowerCase().includes(filters.search!.toLowerCase()) ||
          tx.reinsurer_company_name?.toLowerCase().includes(filters.search!.toLowerCase())
        );
      }
      
      if (filters?.transaction_status && filters.transaction_status.length > 0) {
        filteredData = filteredData.filter(tx => 
          filters.transaction_status!.includes(tx.transaction_status)
        );
      }

      // Create a more reasonable set of transactions (avoid excessive duplication)
      const expandedData = [];
      const baseCount = Math.min(filteredData.length, 3); // Use up to 3 base transactions
      const variations = ['', ' - Q1', ' - Q2', ' - Q3', ' - Q4', ' - Amendment 1', ' - Amendment 2', ' - Renewal'];
      
      for (let i = 0; i < baseCount; i++) {
        for (let j = 0; j < variations.length && expandedData.length < 25; j++) {
          const tx = filteredData[i];
          expandedData.push({
            ...tx,
            id: `${tx.id}-${i}-${j}`,
            transaction_name: `${tx.transaction_name}${variations[j]}`,
            // Vary some properties for realism
            premium: tx.premium ? tx.premium + (Math.random() * 100000 - 50000) : undefined,
            effective_date: new Date(tx.effective_date.getTime() + (j * 30 * 24 * 60 * 60 * 1000)), // Stagger dates
            expiry_date: new Date(tx.expiry_date.getTime() + (j * 30 * 24 * 60 * 60 * 1000))
          });
        }
      }

      setTransactions(expandedData.slice(0, filters?.limit || 25));
      setPagination({
        page: 1,
        limit: filters?.limit || 25,
        total: expandedData.length,
        totalPages: Math.ceil(expandedData.length / (filters?.limit || 25))
      });
      
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    pagination,
    refetch: fetchTransactions
  };
}

/**
 * Hook for fetching transaction statistics
 */
export function useTransactionStats() {
  const [stats, setStats] = useState<TransactionStats | null>(null);
  const [loading, setLoading] = useState(false); // Start with false to prevent flash
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    // Only show loading for subsequent fetches, not initial load
    if (stats !== null) {
      setLoading(true);
    }
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/transactions/stats');
      
      // Use synchronous data to eliminate blinking
      // await new Promise(resolve => setTimeout(resolve, 50)); // Remove delay
      
      const mockStats: TransactionStats = {
        total_transactions: 25,
        active_transactions: 11,
        pending_transactions: 8,
        draft_transactions: 4,
        cancelled_transactions: 2,
        total_premium: 272216134,
        average_premium: 10888645,
        by_status: {
          active: 11,
          pending: 8,
          draft: 4,
          cancelled: 2
        },
        recent_activity: {
          uploads_this_month: 15,
          new_transactions: 3,
          renewals: 2
        }
      };

      setStats(mockStats);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error fetching transaction stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
}