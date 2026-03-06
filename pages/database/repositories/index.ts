/**
 * Database Repositories Index
 * Exports all repository classes for easy importing
 */

export { ProgramRepository } from './ProgramRepository';

// Export repository instances for direct use
export const programRepository = new ProgramRepository();

// TODO: Add other repositories as they are implemented
// export { TransactionRepository } from './TransactionRepository';
// export { ValuationRepository } from './ValuationRepository';
// export { TriangleRepository } from './TriangleRepository';
// export { ContractRepository } from './ContractRepository';
// export { BdxUploadRepository } from './BdxUploadRepository';
// export { CompanyRepository } from './CompanyRepository';
// export { ProductLineRepository } from './ProductLineRepository';