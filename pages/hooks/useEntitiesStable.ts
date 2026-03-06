/**
 * Stable Entity Data Hooks (Reinsurers, MGAs, Programs, Transactions)
 * Provides aggregated data for the reports-explorer hierarchical dropdown
 */

import { useState, useEffect, useMemo } from 'react';

// Entity interfaces
export interface Reinsurer {
  id: string;
  name: string;
  type: 'Reinsurer';
  country: string;
  rating: string;
  specialization: string;
  
  // Aggregated stats from programs
  totalPrograms: number;
  totalTransactions: number;
  totalPremium: number;
  averageQuotaShare: number;
  averageLossRatio: number;
  dataValidationIssues: number;
  contractsCount: number;
  bdxUploadsCount: number;
}

export interface MGA {
  id: string;
  name: string;
  type: 'MGA';
  product_line: string;
  country: string;
  reinsurer_id: string;
  reinsurer_name: string;
  
  // Aggregated stats from programs
  totalPrograms: number;
  totalTransactions: number;
  totalPremium: number;
  averageQuotaShare: number;
  averageLossRatio: number;
  dataValidationIssues: number;
  contractsCount: number;
  bdxUploadsCount: number;
}

export interface Program {
  id: string;
  name: string;
  type: 'Program';
  product_line: string;
  quota_share: number;
  gross_written_premium: number;
  gross_earned_premium: number;
  paid_loss_ratio: number;
  reported_loss_ratio: number;
  ultimate_loss_ratio: number;
  reinsurer_id: string;
  reinsurer_name: string;
  mga_id: string;
  mga_name: string;
  
  // Direct stats
  totalTransactions: number;
  totalPremium: number;
  quotaShare: number;
  lossRatio: number;
  dataValidationIssues: number;
  contractsCount: number;
  bdxUploadsCount: number;
}

export interface Transaction {
  id: string;
  name: string;
  type: 'Transaction';
  program_id: string;
  program_name: string;
  mga_id: string;
  mga_name: string;
  reinsurer_id: string;
  reinsurer_name: string;
  premium: number;
  transaction_status: 'active' | 'pending' | 'draft' | 'cancelled';
  effective_date: Date;
  expiry_date: Date;
  
  // Direct stats
  totalPremium: number;
  quotaShare: number;
  lossRatio: number;
  dataValidationIssues: number;
  contractsCount: number;
  bdxUploadsCount: number;
}

// Base reinsurer data
const reinsurersData = [
  {
    id: 'pineapple-re',
    name: 'Pineapple Re',
    country: 'Bermuda',
    rating: 'A-',
    specialization: 'Specializes in property-cat treaties.'
  },
  {
    id: 'mango-re',
    name: 'Mango Reinsurance Group',
    country: 'Switzerland',
    rating: 'A',
    specialization: 'Strong presence in specialty lines.'
  },
  {
    id: 'blueberry-re',
    name: 'Blueberry Re',
    country: 'USA',
    rating: 'A+',
    specialization: 'Focus on casualty and multiline quota share.'
  },
  {
    id: 'citrus-re',
    name: 'Citrus Re Corp',
    country: 'UK',
    rating: 'A',
    specialization: 'Known for innovative structured reinsurance.'
  }
];

// Base MGA data
const mgasData = [
  {
    id: 'lion-underwriting',
    name: 'Lion Underwriting',
    product_line: 'Commercial Auto',
    country: 'USA',
    reinsurer_id: 'pineapple-re'
  },
  {
    id: 'falcon-risk',
    name: 'Falcon Risk Services',
    product_line: 'Property',
    country: 'UK',
    reinsurer_id: 'pineapple-re'
  },
  {
    id: 'wolf-specialty',
    name: 'Wolf Specialty MGA',
    product_line: 'Liability',
    country: 'Canada',
    reinsurer_id: 'mango-re'
  },
  {
    id: 'eagle-insurance',
    name: 'Eagle Insurance Solutions',
    product_line: 'Professional Lines',
    country: 'USA',
    reinsurer_id: 'mango-re'
  },
  {
    id: 'panther-underwriters',
    name: 'Panther Underwriters',
    product_line: 'Excess & Surplus',
    country: 'USA',
    reinsurer_id: 'blueberry-re'
  },
  {
    id: 'buffalo-risk',
    name: 'Buffalo Risk Partners',
    product_line: 'Workers Comp',
    country: 'USA',
    reinsurer_id: 'blueberry-re'
  },
  {
    id: 'shark-coverage',
    name: 'Shark Coverage Group',
    product_line: 'Marine',
    country: 'Netherlands',
    reinsurer_id: 'citrus-re'
  },
  {
    id: 'rhino-assurance',
    name: 'Rhino Assurance Agency',
    product_line: 'Construction',
    country: 'Australia',
    reinsurer_id: 'citrus-re'
  }
];

// Enhanced programs data (from useTransactionsStable.ts)
const programsData = [
  {
    id: 'prog-001', name: 'Commercial Auto Specialty Lines', quota_share: 27, gross_written_premium: 5920000, gross_earned_premium: 5910000,
    paid_loss_ratio: 58, reported_loss_ratio: 67, ultimate_loss_ratio: 104, product_line: 'Commercial Auto'
  },
  {
    id: 'prog-002', name: 'Workers Compensation Industrial', quota_share: 35, gross_written_premium: 7210000, gross_earned_premium: 7180000,
    paid_loss_ratio: 63, reported_loss_ratio: 75, ultimate_loss_ratio: 112, product_line: 'Workers Compensation'
  },
  {
    id: 'prog-003', name: 'General Liability Manufacturing', quota_share: 30, gross_written_premium: 6180000, gross_earned_premium: 6160000,
    paid_loss_ratio: 55, reported_loss_ratio: 64, ultimate_loss_ratio: 101, product_line: 'General Liability'
  },
  {
    id: 'prog-004', name: 'Property Catastrophe Regional', quota_share: 40, gross_written_premium: 8430000, gross_earned_premium: 8410000,
    paid_loss_ratio: 60, reported_loss_ratio: 72, ultimate_loss_ratio: 110, product_line: 'Property'
  },
  {
    id: 'prog-005', name: 'Marine Cargo International', quota_share: 25, gross_written_premium: 4820000, gross_earned_premium: 4790000,
    paid_loss_ratio: 52, reported_loss_ratio: 63, ultimate_loss_ratio: 99, product_line: 'Marine'
  },
  // Add all 20 programs with proper assignments
  {
    id: 'prog-006', name: 'Professional Indemnity Technology', quota_share: 33, gross_written_premium: 6430000, gross_earned_premium: 6420000,
    paid_loss_ratio: 59, reported_loss_ratio: 69, ultimate_loss_ratio: 108, product_line: 'Professional Indemnity'
  },
  {
    id: 'prog-007', name: 'Directors Officers Liability', quota_share: 29, gross_written_premium: 5260000, gross_earned_premium: 5250000,
    paid_loss_ratio: 57, reported_loss_ratio: 66, ultimate_loss_ratio: 103, product_line: 'Management Liability'
  },
  {
    id: 'prog-008', name: 'Cyber Security Protection', quota_share: 31, gross_written_premium: 6950000, gross_earned_premium: 6940000,
    paid_loss_ratio: 64, reported_loss_ratio: 73, ultimate_loss_ratio: 115, product_line: 'Cyber'
  },
  {
    id: 'prog-009', name: 'Energy Oil Gas Upstream', quota_share: 37, gross_written_premium: 7820000, gross_earned_premium: 7800000,
    paid_loss_ratio: 61, reported_loss_ratio: 74, ultimate_loss_ratio: 111, product_line: 'Energy'
  },
  {
    id: 'prog-010', name: 'Aviation Hull War Risk', quota_share: 26, gross_written_premium: 5040000, gross_earned_premium: 5020000,
    paid_loss_ratio: 53, reported_loss_ratio: 62, ultimate_loss_ratio: 97, product_line: 'Aviation'
  },
  {
    id: 'prog-011', name: 'Casualty Umbrella Excess', quota_share: 38, gross_written_premium: 7540000, gross_earned_premium: 7530000,
    paid_loss_ratio: 62, reported_loss_ratio: 76, ultimate_loss_ratio: 114, product_line: 'Casualty'
  },
  {
    id: 'prog-012', name: 'Environmental Liability Pollution', quota_share: 22, gross_written_premium: 4460000, gross_earned_premium: 4450000,
    paid_loss_ratio: 49, reported_loss_ratio: 57, ultimate_loss_ratio: 92, product_line: 'Environmental'
  },
  {
    id: 'prog-013', name: 'Product Recall Food Safety', quota_share: 34, gross_written_premium: 7010000, gross_earned_premium: 7000000,
    paid_loss_ratio: 60, reported_loss_ratio: 70, ultimate_loss_ratio: 107, product_line: 'Product Liability'
  },
  {
    id: 'prog-014', name: 'Life Sciences Clinical Trials', quota_share: 20, gross_written_premium: 3920000, gross_earned_premium: 3910000,
    paid_loss_ratio: 47, reported_loss_ratio: 55, ultimate_loss_ratio: 88, product_line: 'Life Sciences'
  },
  {
    id: 'prog-015', name: 'Financial Lines Crime Fidelity', quota_share: 36, gross_written_premium: 8140000, gross_earned_premium: 8120000,
    paid_loss_ratio: 63, reported_loss_ratio: 78, ultimate_loss_ratio: 118, product_line: 'Financial Lines'
  },
  {
    id: 'prog-016', name: 'Trade Credit Political Risk', quota_share: 28, gross_written_premium: 5630000, gross_earned_premium: 5620000,
    paid_loss_ratio: 56, reported_loss_ratio: 65, ultimate_loss_ratio: 102, product_line: 'Trade Credit'
  },
  {
    id: 'prog-017', name: 'Surety Construction Bonds', quota_share: 41, gross_written_premium: 8760000, gross_earned_premium: 8740000,
    paid_loss_ratio: 65, reported_loss_ratio: 79, ultimate_loss_ratio: 120, product_line: 'Surety'
  },
  {
    id: 'prog-018', name: 'Agriculture Crop Livestock', quota_share: 23, gross_written_premium: 4620000, gross_earned_premium: 4600000,
    paid_loss_ratio: 50, reported_loss_ratio: 59, ultimate_loss_ratio: 95, product_line: 'Agriculture'
  },
  {
    id: 'prog-019', name: 'Transportation Motor Fleet', quota_share: 39, gross_written_premium: 7910000, gross_earned_premium: 7900000,
    paid_loss_ratio: 62, reported_loss_ratio: 73, ultimate_loss_ratio: 113, product_line: 'Transportation'
  },
  {
    id: 'prog-020', name: 'Warranty Extended Protection', quota_share: 24, gross_written_premium: 4980000, gross_earned_premium: 4960000,
    paid_loss_ratio: 54, reported_loss_ratio: 64, ultimate_loss_ratio: 100, product_line: 'Warranty'
  }
];

// MGA assignment mapping based on product line
const getMGAForProductLine = (productLine: string): string => {
  const mgaMapping: Record<string, string> = {
    'Commercial Auto': 'lion-underwriting',
    'Property': 'falcon-risk',
    'General Liability': 'wolf-specialty',
    'Casualty': 'wolf-specialty',
    'Professional Indemnity': 'eagle-insurance',
    'Management Liability': 'eagle-insurance',
    'Financial Lines': 'eagle-insurance',
    'Cyber': 'panther-underwriters',
    'Life Sciences': 'panther-underwriters',
    'Workers Compensation': 'buffalo-risk',
    'Marine': 'shark-coverage',
    'Energy': 'shark-coverage',
    'Transportation': 'shark-coverage',
    'Environmental': 'rhino-assurance',
    'Product Liability': 'rhino-assurance',
    'Trade Credit': 'rhino-assurance',
    'Agriculture': 'rhino-assurance',
    'Surety': 'rhino-assurance',
    'Aviation': 'rhino-assurance',
    'Warranty': 'rhino-assurance'
  };
  return mgaMapping[productLine] || 'rhino-assurance';
};

// Reinsurer assignment mapping (5 programs each)
const getReinsurerForProgram = (programId: string): string => {
  const programNumber = parseInt(programId.split('-')[1]);
  if (programNumber <= 5) return 'pineapple-re';
  if (programNumber <= 10) return 'mango-re';
  if (programNumber <= 15) return 'blueberry-re';
  return 'citrus-re';
};

// Generate sample transactions per program (5 each = 100 total)
const createTransactionData = () => {
  const transactions: any[] = [];
  const statuses: ('active' | 'pending' | 'draft' | 'cancelled')[] = ['active', 'pending', 'draft', 'cancelled'];
  
  programsData.forEach((program, programIndex) => {
    for (let i = 0; i < 5; i++) {
      const transactionId = `tx-${program.id}-${i + 1}`;
      const reinsurerId = getReinsurerForProgram(program.id);
      const mgaId = getMGAForProductLine(program.product_line);
      
      transactions.push({
        id: transactionId,
        name: `${program.name} Contract ${i + 1}`,
        program_id: program.id,
        program_name: program.name,
        mga_id: mgaId,
        mga_name: mgasData.find(m => m.id === mgaId)?.name || 'Unknown MGA',
        reinsurer_id: reinsurerId,
        reinsurer_name: reinsurersData.find(r => r.id === reinsurerId)?.name || 'Unknown Reinsurer',
        premium: Math.round(program.gross_earned_premium * (program.quota_share / 100) / 5), // Split premium among transactions
        transaction_status: statuses[i % 4],
        effective_date: new Date(2024, programIndex % 12, 1),
        expiry_date: new Date(2024, 11, 31),
        // Mock stats
        quotaShare: program.quota_share,
        lossRatio: program.reported_loss_ratio,
        dataValidationIssues: Math.floor(Math.random() * 3),
        contractsCount: 1,
        bdxUploadsCount: Math.floor(Math.random() * 12) + 6
      });
    }
  });
  
  return transactions;
};

// Create aggregated data functions
export function useReinsurers() {
  const reinsurers = reinsurersData.map(reinsurer => {
    const relatedPrograms = programsData.filter(p => getReinsurerForProgram(p.id) === reinsurer.id);
    const transactions = createTransactionData().filter(t => t.reinsurer_id === reinsurer.id);
    
    const totalPremium = relatedPrograms.reduce((sum, p) => sum + p.gross_earned_premium, 0);
    const averageQuotaShare = relatedPrograms.reduce((sum, p) => sum + p.quota_share, 0) / relatedPrograms.length;
    const averageLossRatio = relatedPrograms.reduce((sum, p) => sum + p.reported_loss_ratio, 0) / relatedPrograms.length;
    const dataValidationIssues = transactions.reduce((sum, t) => sum + t.dataValidationIssues, 0);
    const contractsCount = transactions.length;
    const bdxUploadsCount = transactions.reduce((sum, t) => sum + t.bdxUploadsCount, 0);
    
    return {
      ...reinsurer,
      type: 'Reinsurer' as const,
      totalPrograms: relatedPrograms.length,
      totalTransactions: transactions.length,
      totalPremium: Math.round(totalPremium),
      averageQuotaShare: Math.round(averageQuotaShare * 10) / 10,
      averageLossRatio: Math.round(averageLossRatio * 10) / 10,
      dataValidationIssues,
      contractsCount,
      bdxUploadsCount
    };
  });

  return {
    reinsurers,
    loading: false,
    error: null
  };
}

export function useMGAs() {
  const mgas = mgasData.map(mga => {
    const relatedPrograms = programsData.filter(p => getMGAForProductLine(p.product_line) === mga.id);
    const transactions = createTransactionData().filter(t => t.mga_id === mga.id);
    const reinsurer = reinsurersData.find(r => r.id === mga.reinsurer_id);
    
    const totalPremium = relatedPrograms.reduce((sum, p) => sum + p.gross_earned_premium, 0);
    const averageQuotaShare = relatedPrograms.length > 0 ? relatedPrograms.reduce((sum, p) => sum + p.quota_share, 0) / relatedPrograms.length : 0;
    const averageLossRatio = relatedPrograms.length > 0 ? relatedPrograms.reduce((sum, p) => sum + p.reported_loss_ratio, 0) / relatedPrograms.length : 0;
    const dataValidationIssues = transactions.reduce((sum, t) => sum + t.dataValidationIssues, 0);
    const contractsCount = transactions.length;
    const bdxUploadsCount = transactions.reduce((sum, t) => sum + t.bdxUploadsCount, 0);
    
    return {
      ...mga,
      type: 'MGA' as const,
      reinsurer_name: reinsurer?.name || 'Unknown Reinsurer',
      totalPrograms: relatedPrograms.length,
      totalTransactions: transactions.length,
      totalPremium: Math.round(totalPremium),
      averageQuotaShare: Math.round(averageQuotaShare * 10) / 10,
      averageLossRatio: Math.round(averageLossRatio * 10) / 10,
      dataValidationIssues,
      contractsCount,
      bdxUploadsCount
    };
  });

  return {
    mgas,
    loading: false,
    error: null
  };
}

export function usePrograms() {
  const programs = programsData.map(program => {
    const transactions = createTransactionData().filter(t => t.program_id === program.id);
    const reinsurerId = getReinsurerForProgram(program.id);
    const mgaId = getMGAForProductLine(program.product_line);
    const reinsurer = reinsurersData.find(r => r.id === reinsurerId);
    const mga = mgasData.find(m => m.id === mgaId);
    
    const dataValidationIssues = transactions.reduce((sum, t) => sum + t.dataValidationIssues, 0);
    const contractsCount = transactions.length;
    const bdxUploadsCount = transactions.reduce((sum, t) => sum + t.bdxUploadsCount, 0);
    
    return {
      ...program,
      type: 'Program' as const,
      reinsurer_id: reinsurerId,
      reinsurer_name: reinsurer?.name || 'Unknown Reinsurer',
      mga_id: mgaId,
      mga_name: mga?.name || 'Unknown MGA',
      totalTransactions: transactions.length,
      totalPremium: program.gross_earned_premium,
      quotaShare: program.quota_share,
      lossRatio: program.reported_loss_ratio,
      dataValidationIssues,
      contractsCount,
      bdxUploadsCount
    };
  });

  return {
    programs,
    loading: false,
    error: null
  };
}

export function useTransactions() {
  const transactions = createTransactionData().map(transaction => ({
    ...transaction,
    type: 'Transaction' as const,
    totalPremium: transaction.premium
  }));

  return {
    transactions,
    loading: false,
    error: null
  };
}

// Combined hook for all entities
export function useAllEntities() {
  const { reinsurers } = useReinsurers();
  const { mgas } = useMGAs();
  const { programs } = usePrograms();
  const { transactions } = useTransactions();

  return {
    reinsurers,
    mgas,
    programs,
    transactions,
    loading: false,
    error: null
  };
}