/**
 * Stable Transaction Data Hooks (No Async Loading)
 * Provides immediate data to eliminate blinking issues
 */

import { useState, useEffect, useMemo } from 'react';

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

// Enhanced program data based on reinsurance_programs.md
const programsData = [
  {
    id: 'prog-001',
    name: 'Commercial Auto Specialty Lines',
    quota_share: 27,
    gross_written_premium: 5920000,
    gross_earned_premium: 5910000,
    paid_loss_ratio: 58,
    reported_loss_ratio: 67,
    ultimate_loss_ratio: 104,
    current_loss_ratio: 67,
    product_line: 'Commercial Auto'
  },
  {
    id: 'prog-002',
    name: 'Workers Compensation Industrial',
    quota_share: 35,
    gross_written_premium: 7210000,
    gross_earned_premium: 7180000,
    paid_loss_ratio: 63,
    reported_loss_ratio: 75,
    ultimate_loss_ratio: 112,
    current_loss_ratio: 75,
    product_line: 'Workers Compensation'
  },
  {
    id: 'prog-003',
    name: 'General Liability Manufacturing',
    quota_share: 30,
    gross_written_premium: 6180000,
    gross_earned_premium: 6160000,
    paid_loss_ratio: 55,
    reported_loss_ratio: 64,
    ultimate_loss_ratio: 101,
    current_loss_ratio: 64,
    product_line: 'General Liability'
  },
  {
    id: 'prog-004',
    name: 'Property Catastrophe Regional',
    quota_share: 40,
    gross_written_premium: 8430000,
    gross_earned_premium: 8410000,
    paid_loss_ratio: 60,
    reported_loss_ratio: 72,
    ultimate_loss_ratio: 110,
    current_loss_ratio: 72,
    product_line: 'Property'
  },
  {
    id: 'prog-005',
    name: 'Marine Cargo International',
    quota_share: 25,
    gross_written_premium: 4820000,
    gross_earned_premium: 4790000,
    paid_loss_ratio: 52,
    reported_loss_ratio: 63,
    ultimate_loss_ratio: 99,
    current_loss_ratio: 63,
    product_line: 'Marine'
  },
  {
    id: 'prog-006',
    name: 'Professional Indemnity Technology',
    quota_share: 33,
    gross_written_premium: 6430000,
    gross_earned_premium: 6420000,
    paid_loss_ratio: 59,
    reported_loss_ratio: 69,
    ultimate_loss_ratio: 108,
    current_loss_ratio: 69,
    product_line: 'Professional Indemnity'
  },
  {
    id: 'prog-007',
    name: 'Directors Officers Liability',
    quota_share: 29,
    gross_written_premium: 5260000,
    gross_earned_premium: 5250000,
    paid_loss_ratio: 57,
    reported_loss_ratio: 66,
    ultimate_loss_ratio: 103,
    current_loss_ratio: 66,
    product_line: 'Management Liability'
  },
  {
    id: 'prog-008',
    name: 'Cyber Security Protection',
    quota_share: 31,
    gross_written_premium: 6950000,
    gross_earned_premium: 6940000,
    paid_loss_ratio: 64,
    reported_loss_ratio: 73,
    ultimate_loss_ratio: 115,
    current_loss_ratio: 73,
    product_line: 'Cyber'
  },
  {
    id: 'prog-009',
    name: 'Energy Oil Gas Upstream',
    quota_share: 37,
    gross_written_premium: 7820000,
    gross_earned_premium: 7800000,
    paid_loss_ratio: 61,
    reported_loss_ratio: 74,
    ultimate_loss_ratio: 111,
    current_loss_ratio: 74,
    product_line: 'Energy'
  },
  {
    id: 'prog-010',
    name: 'Aviation Hull War Risk',
    quota_share: 26,
    gross_written_premium: 5040000,
    gross_earned_premium: 5020000,
    paid_loss_ratio: 53,
    reported_loss_ratio: 62,
    ultimate_loss_ratio: 97,
    current_loss_ratio: 62,
    product_line: 'Aviation'
  },
  {
    id: 'prog-011',
    name: 'Casualty Umbrella Excess',
    quota_share: 38,
    gross_written_premium: 7540000,
    gross_earned_premium: 7530000,
    paid_loss_ratio: 62,
    reported_loss_ratio: 76,
    ultimate_loss_ratio: 114,
    current_loss_ratio: 76,
    product_line: 'Casualty'
  },
  {
    id: 'prog-012',
    name: 'Environmental Liability Pollution',
    quota_share: 22,
    gross_written_premium: 4460000,
    gross_earned_premium: 4450000,
    paid_loss_ratio: 49,
    reported_loss_ratio: 57,
    ultimate_loss_ratio: 92,
    current_loss_ratio: 57,
    product_line: 'Environmental'
  },
  {
    id: 'prog-013',
    name: 'Product Recall Food Safety',
    quota_share: 34,
    gross_written_premium: 7010000,
    gross_earned_premium: 7000000,
    paid_loss_ratio: 60,
    reported_loss_ratio: 70,
    ultimate_loss_ratio: 107,
    current_loss_ratio: 70,
    product_line: 'Product Liability'
  },
  {
    id: 'prog-014',
    name: 'Life Sciences Clinical Trials',
    quota_share: 20,
    gross_written_premium: 3920000,
    gross_earned_premium: 3910000,
    paid_loss_ratio: 47,
    reported_loss_ratio: 55,
    ultimate_loss_ratio: 88,
    current_loss_ratio: 55,
    product_line: 'Life Sciences'
  },
  {
    id: 'prog-015',
    name: 'Financial Lines Crime Fidelity',
    quota_share: 36,
    gross_written_premium: 8140000,
    gross_earned_premium: 8120000,
    paid_loss_ratio: 63,
    reported_loss_ratio: 78,
    ultimate_loss_ratio: 118,
    current_loss_ratio: 78,
    product_line: 'Financial Lines'
  },
  {
    id: 'prog-016',
    name: 'Trade Credit Political Risk',
    quota_share: 28,
    gross_written_premium: 5630000,
    gross_earned_premium: 5620000,
    paid_loss_ratio: 56,
    reported_loss_ratio: 65,
    ultimate_loss_ratio: 102,
    current_loss_ratio: 65,
    product_line: 'Trade Credit'
  },
  {
    id: 'prog-017',
    name: 'Surety Construction Bonds',
    quota_share: 41,
    gross_written_premium: 8760000,
    gross_earned_premium: 8740000,
    paid_loss_ratio: 65,
    reported_loss_ratio: 79,
    ultimate_loss_ratio: 120,
    current_loss_ratio: 79,
    product_line: 'Surety'
  },
  {
    id: 'prog-018',
    name: 'Agriculture Crop Livestock',
    quota_share: 23,
    gross_written_premium: 4620000,
    gross_earned_premium: 4600000,
    paid_loss_ratio: 50,
    reported_loss_ratio: 59,
    ultimate_loss_ratio: 95,
    current_loss_ratio: 59,
    product_line: 'Agriculture'
  },
  {
    id: 'prog-019',
    name: 'Transportation Motor Fleet',
    quota_share: 39,
    gross_written_premium: 7910000,
    gross_earned_premium: 7900000,
    paid_loss_ratio: 62,
    reported_loss_ratio: 73,
    ultimate_loss_ratio: 113,
    current_loss_ratio: 73,
    product_line: 'Transportation'
  },
  {
    id: 'prog-020',
    name: 'Warranty Extended Protection',
    quota_share: 24,
    gross_written_premium: 4980000,
    gross_earned_premium: 4960000,
    paid_loss_ratio: 54,
    reported_loss_ratio: 64,
    ultimate_loss_ratio: 100,
    current_loss_ratio: 64,
    product_line: 'Warranty'
  }
];

// Static data that loads immediately (simulates database response)
const createMockData = (): Transaction[] => {
  const companies = [
    { ceding: 'Apex Insurance Group', reinsurer: 'Continental Re Corp' },
    { ceding: 'Delta Mutual Insurance', reinsurer: 'Global Reinsurance Ltd' },
    { ceding: 'Summit Insurance LLC', reinsurer: 'Atlantic Re Solutions' },
    { ceding: 'Pacific Underwriters', reinsurer: 'Mountain Re Group' },
    { ceding: 'Valley Insurance Co', reinsurer: 'Meridian Reinsurance' },
    { ceding: 'Metropolitan Specialty Group', reinsurer: 'European Re International' },
    { ceding: 'Coastal Insurance Partners', reinsurer: 'Swiss Re Solutions' },
    { ceding: 'National Risk Management', reinsurer: 'Lloyd\'s Syndicate 2021' },
    { ceding: 'Premier Commercial Lines', reinsurer: 'Hannover Re America' },
    { ceding: 'Central States Insurance', reinsurer: 'SCOR Reinsurance Group' },
    { ceding: 'Alliance Specialty Risk', reinsurer: 'Munich Re Group' },
    { ceding: 'Midwest Mutual Group', reinsurer: 'PartnerRe Holdings' },
    { ceding: 'Horizon Insurance Corp', reinsurer: 'RenaissanceRe Holdings' },
    { ceding: 'Preferred Risk Solutions', reinsurer: 'Everest Re Group' },
    { ceding: 'Regional Casualty Group', reinsurer: 'TransRe International' },
    { ceding: 'Atlantic Insurance Holdings', reinsurer: 'Arch Reinsurance Group' },
    { ceding: 'Liberty Mutual Commercial', reinsurer: 'Berkshire Hathaway Re' },
    { ceding: 'Guardian General Insurance', reinsurer: 'XL Catlin Re' },
    { ceding: 'Flagship Insurance Services', reinsurer: 'Aspen Reinsurance Ltd' },
    { ceding: 'Providence Risk Group', reinsurer: 'Maiden Reinsurance' }
  ];

  const baseTransactions = programsData.map((program, index) => {
    const companyPair = companies[index % companies.length];
    return {
      id: `tx-${String(index + 1).padStart(3, '0')}`,
      program_id: program.id,
      transaction_name: program.name,
      ceding_company_id: `comp-c-${index + 1}`,
      reinsurer_company_id: `comp-r-${index + 1}`,
      effective_date: new Date(2024, index % 12, 1), // Spread across months
      expiry_date: new Date(2024, 11, 31), // All expire end of year
      premium: Math.round(program.gross_earned_premium * (program.quota_share / 100)), // Calculate quota share premium
      transaction_status: (['active', 'pending', 'draft', 'cancelled'] as const)[
        index % 4 === 0 ? 0 : index % 4 === 1 ? 1 : index % 4 === 2 ? 0 : 3
      ], // Mix of statuses with more active
      transaction_type: (index % 2 === 0 ? 'renewal' : 'brand-new') as const,
      subject_business: `${program.product_line.toLowerCase()} coverage with ${program.quota_share}% quota share participation`,
      created_at: new Date(2024, index % 12, 1),
      updated_at: new Date(2024, index % 12, Math.min(15, index + 1)),
      program_name: program.name,
      ceding_company_name: companyPair.ceding,
      reinsurer_company_name: companyPair.reinsurer,
      contract_count: Math.floor(Math.random() * 3) + 1,
      bdx_upload_count: Math.floor(Math.random() * 12) + 6,
      // Additional program data
      quota_share: program.quota_share,
      gross_written_premium: program.gross_written_premium,
      reported_loss_ratio: program.reported_loss_ratio,
      ultimate_loss_ratio: program.ultimate_loss_ratio
    };
  });

  // Generate more realistic variations from all 20 programs
  const variations = ['', ' Q1', ' Q2', ' Q3', ' Q4', ' Amendment 1', ' Amendment 2', ' Renewal'];
  const expandedData: Transaction[] = [];

  // Create 5 transactions from the first 5 programs to get exactly 40 variations, then limit to 25
  for (let i = 0; i < Math.min(5, baseTransactions.length); i++) {
    for (let j = 0; j < variations.length && expandedData.length < 40; j++) {
      const tx = baseTransactions[i];
      const variationIndex = expandedData.length;
      expandedData.push({
        ...tx,
        id: `${tx.id}-${i}-${j}`,
        transaction_name: `${tx.transaction_name}${variations[j]}`,
        premium: tx.premium ? Math.round(tx.premium + (Math.random() * 200000 - 100000)) : undefined,
        effective_date: new Date(2024, (i * 2 + j) % 12, Math.min(28, 1 + j * 3)), // Spread across months
        expiry_date: new Date(2024 + (j > 5 ? 1 : 0), 11, 31), // Multi-year terms for amendments/renewals
        transaction_status: (['active', 'pending', 'draft', 'cancelled'] as const)[
          variationIndex % 5 === 0 ? 3 : // cancelled
          variationIndex % 4 === 0 ? 2 : // draft  
          variationIndex % 3 === 0 ? 1 : 0 // pending : active
        ],
        updated_at: new Date(2024, (i * 2 + j) % 12, Math.min(28, 5 + j * 2))
      });
    }
  }

  return expandedData.slice(0, 25); // Limit to 25 transactions
};

// Calculate dynamic stats from the actual generated data
const calculateStats = (): TransactionStats => {
  const transactions = createMockData();
  const totalPremium = transactions.reduce((sum, tx) => sum + (tx.premium || 0), 0);
  
  const statusCounts = transactions.reduce((counts, tx) => {
    counts[tx.transaction_status] = (counts[tx.transaction_status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  return {
    total_transactions: transactions.length,
    active_transactions: statusCounts.active || 0,
    pending_transactions: statusCounts.pending || 0,
    draft_transactions: statusCounts.draft || 0,
    cancelled_transactions: statusCounts.cancelled || 0,
    total_premium: Math.round(totalPremium),
    average_premium: Math.round(totalPremium / transactions.length),
    by_status: statusCounts,
    recent_activity: {
      uploads_this_month: 18,
      new_transactions: 5,
      renewals: 8
    }
  };
};

// Static stats data calculated from actual transaction data
const STATIC_STATS: TransactionStats = calculateStats();

// Generate static data once
const STATIC_TRANSACTIONS = createMockData();

/**
 * Hook for fetching transactions - returns data immediately, no loading states
 */
export function useTransactions(filters?: TransactionFilters) {
  // Apply filtering to static data
  const filteredTransactions = useMemo(() => {
    let filtered = [...STATIC_TRANSACTIONS];
    
    if (filters?.search) {
      filtered = filtered.filter(tx => 
        tx.transaction_name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        tx.ceding_company_name?.toLowerCase().includes(filters.search!.toLowerCase()) ||
        tx.reinsurer_company_name?.toLowerCase().includes(filters.search!.toLowerCase())
      );
    }
    
    if (filters?.transaction_status && filters.transaction_status.length > 0) {
      filtered = filtered.filter(tx => 
        filters.transaction_status!.includes(tx.transaction_status)
      );
    }

    return filtered.slice(0, filters?.limit || 25);
  }, [filters]);

  const pagination = useMemo(() => ({
    page: 1,
    limit: filters?.limit || 25,
    total: filteredTransactions.length,
    totalPages: Math.ceil(filteredTransactions.length / (filters?.limit || 25))
  }), [filteredTransactions.length, filters?.limit]);

  return {
    transactions: filteredTransactions,
    loading: false, // Never loading
    error: null, // No errors
    pagination,
    refetch: () => {} // No-op
  };
}

/**
 * Hook for fetching transaction statistics - returns data immediately
 */
export function useTransactionStats() {
  return {
    stats: STATIC_STATS,
    loading: false, // Never loading
    error: null, // No errors
    refetch: () => {} // No-op
  };
}