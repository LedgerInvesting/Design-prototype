/**
 * Entities Data Hook for Reports Explorer
 * Provides hierarchical data structure: Reinsurers -> MGAs -> Programs -> Transactions
 * Includes aggregated metrics for each level
 */
import { useState, useEffect, useMemo } from 'react';

// Entity interfaces
export interface BaseEntity {
  id: string;
  name: string;
  type: 'Reinsurer' | 'MGA' | 'Program' | 'Transaction';
}

export interface Reinsurer extends BaseEntity {
  type: 'Reinsurer';
  country: string;
  rating?: string;
  specialization?: string;
  mgas: MGA[];
  metrics: EntityMetrics;
}

export interface MGA extends BaseEntity {
  type: 'MGA';
  product_line?: string;
  country: string;
  reinsurer_id: string;
  programs: Program[];
  metrics: EntityMetrics;
}

export interface Program extends BaseEntity {
  type: 'Program';
  product_line: string;
  inception_date: string;
  expiration_date: string;
  reinsurer_id: string;
  mga_id?: string;
  company_id: string;
  transactions: Transaction[];
  metrics: EntityMetrics;
}

export interface Transaction extends BaseEntity {
  type: 'Transaction';
  transaction_type: 'Premium' | 'Claims' | 'Commission' | 'Adjustment';
  amount: number;
  date: string;
  currency: string;
  program_id: string;
  metrics: EntityMetrics;
}

export interface EntityMetrics {
  cession: {
    premium: { value: string; growth: string; direction: 'up' | 'down' };
    remittance: { value: string; growth: string; direction: 'up' | 'down' };
    collateral: { value: string; growth: string; direction: 'up' | 'down' };
  };
  validation: {
    policies: { count: number; percent: string; level: 'excellent' | 'marginal' | 'concerning' };
    premium: { value: string; percent: string; level: 'excellent' | 'marginal' | 'concerning' };
    claims: { count: number; percent: string; level: 'excellent' | 'marginal' | 'concerning' };
    losses: { value: string; percent: string; level: 'excellent' | 'marginal' | 'concerning' };
  };
  dataIngestion: {
    lastUpdate: string;
    nextDue: string;
    status: 'current' | 'needs_review' | 'overdue';
  };
  contracts: {
    total: number;
    recent: number; // executed in past 30 days
  };
}

// Mock data generator for metrics
const generateMetrics = (entityType: string, entityId: string): EntityMetrics => {
  // Generate deterministic but varied data based on entity ID
  const hash = entityId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);

  const abs = Math.abs(hash);
  const premium = 20000000 + (abs % 50000000);
  const remittance = Math.floor(premium * 0.6);
  const collateral = Math.floor(premium * 0.2);

  const growthRate = 1 + ((abs % 200) - 100) / 1000; // Growth between -10% and +10%
  const direction = growthRate >= 1 ? 'up' : 'down';
  const growthPercent = Math.abs((growthRate - 1) * 100).toFixed(1);

  const validationLevel = (['excellent', 'marginal', 'concerning'] as const)[abs % 3];
  const policiesCount = 5 + (abs % 50);
  const claimsCount = 2 + (abs % 30);

  return {
    cession: {
      premium: { 
        value: `$${premium.toLocaleString()}`, 
        growth: `${growthPercent}%`, 
        direction 
      },
      remittance: { 
        value: `$${remittance.toLocaleString()}`, 
        growth: `${growthPercent}%`, 
        direction 
      },
      collateral: { 
        value: `$${collateral.toLocaleString()}`, 
        growth: `${(parseFloat(growthPercent) * 0.3).toFixed(1)}%`, 
        direction 
      }
    },
    validation: {
      policies: { count: policiesCount, percent: `+0.${abs % 99}%`, level: validationLevel },
      premium: { value: `$${(20000 + abs % 80000).toLocaleString()}`, percent: `+0.${abs % 99}%`, level: validationLevel },
      claims: { count: claimsCount, percent: `+0.${abs % 99}%`, level: validationLevel },
      losses: { value: `$${(30000 + abs % 100000).toLocaleString()}`, percent: `+0.${abs % 99}%`, level: validationLevel }
    },
    dataIngestion: {
      lastUpdate: '2025-03-31',
      nextDue: '11 days',
      status: (['current', 'needs_review', 'overdue'] as const)[abs % 3]
    },
    contracts: {
      total: 20 + (abs % 100),
      recent: 1 + (abs % 10)
    }
  };
};

// Stable mock data
const MOCK_ENTITIES = {
  reinsurers: [
    { id: 'pineapple-re', name: 'Pineapple Re', country: 'Bermuda', rating: 'A-', specialization: 'Specializes in property-cat treaties.' },
    { id: 'mango-re', name: 'Mango Reinsurance Group', country: 'Switzerland', rating: 'A', specialization: 'Strong presence in specialty lines.' },
    { id: 'blueberry-re', name: 'Blueberry Re', country: 'USA', rating: 'A+', specialization: 'Focus on casualty and multiline quota share.' },
    { id: 'citrus-re', name: 'Citrus Re Corp', country: 'UK', rating: 'A', specialization: 'Known for innovative structured reinsurance.' }
  ],
  mgas: [
    { id: 'lion-underwriting', name: 'Lion Underwriting', product_line: 'Commercial Auto', country: 'USA', reinsurer_id: 'pineapple-re' },
    { id: 'falcon-risk', name: 'Falcon Risk Services', product_line: 'Property', country: 'UK', reinsurer_id: 'pineapple-re' },
    { id: 'wolf-specialty', name: 'Wolf Specialty MGA', product_line: 'Liability', country: 'Canada', reinsurer_id: 'mango-re' },
    { id: 'eagle-insurance', name: 'Eagle Insurance Solutions', product_line: 'Professional Lines', country: 'USA', reinsurer_id: 'mango-re' },
    { id: 'panther-underwriters', name: 'Panther Underwriters', product_line: 'Excess & Surplus', country: 'USA', reinsurer_id: 'blueberry-re' },
    { id: 'buffalo-risk', name: 'Buffalo Risk Partners', product_line: 'Workers Comp', country: 'USA', reinsurer_id: 'blueberry-re' },
    { id: 'shark-coverage', name: 'Shark Coverage Group', product_line: 'Marine', country: 'Netherlands', reinsurer_id: 'citrus-re' },
    { id: 'rhino-assurance', name: 'Rhino Assurance Agency', product_line: 'Construction', country: 'Australia', reinsurer_id: 'citrus-re' }
  ],
  programs: [
    // Pineapple Re programs (via Lion and Falcon MGAs)
    { id: 'prog-001', name: 'Auto Liability Treaty 2025', product_line: 'Commercial Auto', inception_date: '2025-01-01', expiration_date: '2025-12-31', reinsurer_id: 'pineapple-re', mga_id: 'lion-underwriting', company_id: 'comp-001' },
    { id: 'prog-002', name: 'Property Cat Treaty 2025', product_line: 'Property', inception_date: '2025-01-01', expiration_date: '2025-12-31', reinsurer_id: 'pineapple-re', mga_id: 'falcon-risk', company_id: 'comp-002' },
    { id: 'prog-003', name: 'Fleet Coverage Program', product_line: 'Commercial Auto', inception_date: '2025-02-01', expiration_date: '2026-01-31', reinsurer_id: 'pineapple-re', mga_id: 'lion-underwriting', company_id: 'comp-003' },
    { id: 'prog-004', name: 'Commercial Property Shield', product_line: 'Property', inception_date: '2025-01-15', expiration_date: '2026-01-14', reinsurer_id: 'pineapple-re', mga_id: 'falcon-risk', company_id: 'comp-004' },
    { id: 'prog-005', name: 'Auto Risk Protection Plus', product_line: 'Commercial Auto', inception_date: '2025-03-01', expiration_date: '2026-02-28', reinsurer_id: 'pineapple-re', mga_id: 'lion-underwriting', company_id: 'comp-005' },
    
    // Mango Re programs (via Wolf and Eagle MGAs)
    { id: 'prog-006', name: 'General Liability Excess', product_line: 'General Liability', inception_date: '2025-01-01', expiration_date: '2025-12-31', reinsurer_id: 'mango-re', mga_id: 'wolf-specialty', company_id: 'comp-006' },
    { id: 'prog-007', name: 'Professional Indemnity Cover', product_line: 'Professional Indemnity', inception_date: '2025-01-01', expiration_date: '2025-12-31', reinsurer_id: 'mango-re', mga_id: 'eagle-insurance', company_id: 'comp-007' },
    { id: 'prog-008', name: 'Liability Protection Program', product_line: 'Casualty', inception_date: '2025-02-15', expiration_date: '2026-02-14', reinsurer_id: 'mango-re', mga_id: 'wolf-specialty', company_id: 'comp-008' },
    { id: 'prog-009', name: 'Management Liability Suite', product_line: 'Management Liability', inception_date: '2025-01-31', expiration_date: '2026-01-30', reinsurer_id: 'mango-re', mga_id: 'eagle-insurance', company_id: 'comp-009' },
    { id: 'prog-010', name: 'Financial Lines Portfolio', product_line: 'Financial Lines', inception_date: '2025-03-15', expiration_date: '2026-03-14', reinsurer_id: 'mango-re', mga_id: 'eagle-insurance', company_id: 'comp-010' },

    // Blueberry Re programs (via Panther and Buffalo MGAs)
    { id: 'prog-011', name: 'Cyber Risk Shield', product_line: 'Cyber', inception_date: '2025-01-01', expiration_date: '2025-12-31', reinsurer_id: 'blueberry-re', mga_id: 'panther-underwriters', company_id: 'comp-011' },
    { id: 'prog-012', name: 'Workers Comp Treaty', product_line: 'Workers Compensation', inception_date: '2025-01-01', expiration_date: '2025-12-31', reinsurer_id: 'blueberry-re', mga_id: 'buffalo-risk', company_id: 'comp-012' },
    { id: 'prog-013', name: 'Life Sciences E&O', product_line: 'Life Sciences', inception_date: '2025-02-01', expiration_date: '2026-01-31', reinsurer_id: 'blueberry-re', mga_id: 'panther-underwriters', company_id: 'comp-013' },
    { id: 'prog-014', name: 'Construction Workers Cover', product_line: 'Workers Compensation', inception_date: '2025-01-20', expiration_date: '2026-01-19', reinsurer_id: 'blueberry-re', mga_id: 'buffalo-risk', company_id: 'comp-014' },
    { id: 'prog-015', name: 'Cyber Security Plus', product_line: 'Cyber', inception_date: '2025-03-10', expiration_date: '2026-03-09', reinsurer_id: 'blueberry-re', mga_id: 'panther-underwriters', company_id: 'comp-015' },

    // Citrus Re programs (via Shark and Rhino MGAs)
    { id: 'prog-016', name: 'Marine Cargo Treaty', product_line: 'Marine', inception_date: '2025-01-01', expiration_date: '2025-12-31', reinsurer_id: 'citrus-re', mga_id: 'shark-coverage', company_id: 'comp-016' },
    { id: 'prog-017', name: 'Environmental Liability Cover', product_line: 'Environmental', inception_date: '2025-01-01', expiration_date: '2025-12-31', reinsurer_id: 'citrus-re', mga_id: 'rhino-assurance', company_id: 'comp-017' },
    { id: 'prog-018', name: 'Energy Sector Protection', product_line: 'Energy', inception_date: '2025-02-10', expiration_date: '2026-02-09', reinsurer_id: 'citrus-re', mga_id: 'shark-coverage', company_id: 'comp-018' },
    { id: 'prog-019', name: 'Construction Bond Program', product_line: 'Surety', inception_date: '2025-01-25', expiration_date: '2026-01-24', reinsurer_id: 'citrus-re', mga_id: 'rhino-assurance', company_id: 'comp-019' },
    { id: 'prog-020', name: 'Aviation Hull & Liability', product_line: 'Aviation', inception_date: '2025-03-20', expiration_date: '2026-03-19', reinsurer_id: 'citrus-re', mga_id: 'rhino-assurance', company_id: 'comp-020' }
  ]
};

export const useEntities = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Build hierarchical structure
  const entities = useMemo(() => {
    try {
      // Create sample transactions for each program
      const generateTransactions = (programId: string): Transaction[] => {
        const hash = programId.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0);
        
        const transactionCount = 3 + (Math.abs(hash) % 8); // 3-10 transactions per program
        const transactions: Transaction[] = [];
        
        for (let i = 0; i < transactionCount; i++) {
          const transactionId = `${programId}-tx-${(i + 1).toString().padStart(3, '0')}`;
          const types: Transaction['transaction_type'][] = ['Premium', 'Claims', 'Commission', 'Adjustment'];
          const transactionType = types[Math.abs(hash + i) % types.length];
          
          transactions.push({
            id: transactionId,
            name: `${transactionType} Transaction ${i + 1}`,
            type: 'Transaction',
            transaction_type: transactionType,
            amount: 10000 + (Math.abs(hash + i) % 500000),
            date: `2025-${(Math.abs(hash + i) % 12 + 1).toString().padStart(2, '0')}-${(Math.abs(hash + i) % 28 + 1).toString().padStart(2, '0')}`,
            currency: 'USD',
            program_id: programId,
            metrics: generateMetrics('Transaction', transactionId)
          });
        }
        
        return transactions;
      };

      // Build programs with transactions and metrics
      const programsWithData: Program[] = MOCK_ENTITIES.programs.map(prog => ({
        ...prog,
        type: 'Program' as const,
        transactions: generateTransactions(prog.id),
        metrics: generateMetrics('Program', prog.id)
      }));

      // Build MGAs with their programs and aggregated metrics
      const mgasWithData: MGA[] = MOCK_ENTITIES.mgas.map(mga => {
        const mgaPrograms = programsWithData.filter(prog => prog.mga_id === mga.id);
        return {
          ...mga,
          type: 'MGA' as const,
          programs: mgaPrograms,
          metrics: generateMetrics('MGA', mga.id)
        };
      });

      // Build Reinsurers with their MGAs and aggregated metrics
      const reinsurersWithData: Reinsurer[] = MOCK_ENTITIES.reinsurers.map(reinsurer => {
        const reinsurerMgas = mgasWithData.filter(mga => mga.reinsurer_id === reinsurer.id);
        return {
          ...reinsurer,
          type: 'Reinsurer' as const,
          mgas: reinsurerMgas,
          metrics: generateMetrics('Reinsurer', reinsurer.id)
        };
      });

      return {
        reinsurers: reinsurersWithData,
        mgas: mgasWithData,
        programs: programsWithData,
        // Flatten all transactions for direct access
        transactions: programsWithData.flatMap(prog => prog.transactions)
      };
    } catch (err) {
      console.error('Error building entities structure:', err);
      setError('Failed to load entities data');
      return { reinsurers: [], mgas: [], programs: [], transactions: [] };
    }
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Helper functions to find entities
  const findEntityById = (id: string, type: BaseEntity['type']) => {
    switch (type) {
      case 'Reinsurer':
        return entities.reinsurers.find(r => r.id === id);
      case 'MGA':
        return entities.mgas.find(m => m.id === id);
      case 'Program':
        return entities.programs.find(p => p.id === id);
      case 'Transaction':
        return entities.transactions.find(t => t.id === id);
      default:
        return null;
    }
  };

  // Get all children of an entity
  const getEntityChildren = (entity: BaseEntity) => {
    switch (entity.type) {
      case 'Reinsurer':
        const reinsurer = entity as Reinsurer;
        return reinsurer.mgas;
      case 'MGA':
        const mga = entity as MGA;
        return mga.programs;
      case 'Program':
        const program = entity as Program;
        return program.transactions;
      case 'Transaction':
        return [];
      default:
        return [];
    }
  };

  return {
    entities,
    loading,
    error,
    findEntityById,
    getEntityChildren
  };
};

export default useEntities;