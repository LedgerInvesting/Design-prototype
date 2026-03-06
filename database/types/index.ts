/**
 * Database Entity Types
 * TypeScript interfaces for all database entities
 */

// =============================================================================
// REFERENCE DATA TYPES
// =============================================================================

export interface ProductLine {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface Company {
  id: string; // UUID
  name: string;
  company_type: 'ceding' | 'reinsurer' | 'both';
  created_at: Date;
  updated_at: Date;
}

// =============================================================================
// CORE ENTITY TYPES
// =============================================================================

export interface Program {
  id: string; // UUID
  name: string;
  product_line_id: number;
  current_loss_ratio?: number;
  quota_share_premium?: number;
  premium?: number;
  owner?: string;
  program_status: 'active' | 'inactive' | 'pending' | 'cancelled';
  created_at: Date;
  updated_at: Date;
  
  // Joined fields (when querying with relationships)
  product_line_name?: string;
  transaction_count?: number;
  valuation_count?: number;
}

export interface Transaction {
  id: string; // UUID
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
  
  // Joined fields
  program_name?: string;
  ceding_company_name?: string;
  reinsurer_company_name?: string;
  contract_count?: number;
  bdx_upload_count?: number;
}

export interface Contract {
  id: string; // UUID
  transaction_id: string;
  contract_name: string;
  contract_type: 'reinsurance_trust' | 'reinsurance_schedule' | 'certificate' | 'endorsement' | 'other';
  amended: boolean;
  signed_date?: Date;
  effective_date?: Date;
  page_count?: number;
  document_url?: string;
  contract_status: 'draft' | 'pending' | 'signed' | 'executed' | 'terminated';
  created_at: Date;
  updated_at: Date;
  
  // Joined fields
  transaction_name?: string;
}

export interface BdxUpload {
  id: string; // UUID
  transaction_id: string;
  document_type: 'policy' | 'claims';
  month: Date; // First day of month
  upload_status: 'success' | 'error' | 'progress' | 'attention' | 'add' | 'prohibited';
  file_name?: string;
  file_url?: string;
  uploaded_at?: Date;
  processed_at?: Date;
  error_message?: string;
  data_summary?: {
    records?: number;
    total_premium?: number;
    total_claims?: number;
    policy_count?: number;
    claim_count?: number;
    [key: string]: any;
  };
  created_at: Date;
  updated_at: Date;
  
  // Joined fields
  transaction_name?: string;
}

export interface Valuation {
  id: string; // UUID
  program_id: string;
  evaluation_date: Date;
  valuation_name?: string;
  reported_loss_ratio?: number;
  current_written_premium?: number;
  official_status: 'reviewed' | 'pending' | 'none' | 'in_progress';
  valuation_type: 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'ad_hoc';
  notes?: string;
  created_by?: string;
  reviewed_by?: string;
  reviewed_at?: Date;
  created_at: Date;
  updated_at: Date;
  
  // Joined fields
  program_name?: string;
  triangle_count?: number;
}

export interface Triangle {
  id: string; // UUID
  valuation_id: string;
  triangle_name: string; // UUID-like identifier
  triangle_type: 'paid' | 'reported' | 'incurred' | 'case' | 'ibnr' | 'ultimate';
  position: 'left' | 'center' | 'right';
  color?: string; // Hex color
  triangle_status: 'completed' | 'add' | 'pending-review' | 'in_progress' | 'error';
  data_json?: {
    heatmap?: number[][];
    growth_curve?: { x: number; y: number }[];
    mountain?: { age: number; value: number }[];
    age_to_age?: number[];
    [key: string]: any;
  };
  development_factors?: {
    [key: string]: number; // e.g., "12_24": 1.50
  };
  ultimate_values?: {
    [key: string]: any;
  };
  created_at: Date;
  updated_at: Date;
  
  // Joined fields
  valuation_name?: string;
  program_name?: string;
}

// =============================================================================
// DATA TRANSFER OBJECTS (DTOs)
// =============================================================================

// Program DTOs
export interface CreateProgramDTO {
  name: string;
  product_line_id: number;
  current_loss_ratio?: number;
  quota_share_premium?: number;
  premium?: number;
  owner?: string;
  program_status?: 'active' | 'inactive' | 'pending' | 'cancelled';
}

export interface UpdateProgramDTO extends Partial<CreateProgramDTO> {
  id: string;
}

// Transaction DTOs
export interface CreateTransactionDTO {
  program_id: string;
  transaction_name: string;
  ceding_company_id: string;
  reinsurer_company_id: string;
  effective_date: Date;
  expiry_date: Date;
  premium?: number;
  transaction_status?: 'active' | 'pending' | 'draft' | 'cancelled';
  transaction_type?: 'brand-new' | 'renewal';
  subject_business?: string;
  risk_period_start?: Date;
  risk_period_end?: Date;
  ramp_up_period_end?: Date;
}

export interface UpdateTransactionDTO extends Partial<CreateTransactionDTO> {
  id: string;
}

// Valuation DTOs
export interface CreateValuationDTO {
  program_id: string;
  evaluation_date: Date;
  valuation_name?: string;
  reported_loss_ratio?: number;
  current_written_premium?: number;
  official_status?: 'reviewed' | 'pending' | 'none' | 'in_progress';
  valuation_type?: 'monthly' | 'quarterly' | 'semi_annual' | 'annual' | 'ad_hoc';
  notes?: string;
  created_by?: string;
}

export interface UpdateValuationDTO extends Partial<CreateValuationDTO> {
  id: string;
  reviewed_by?: string;
  reviewed_at?: Date;
}

// Triangle DTOs
export interface CreateTriangleDTO {
  valuation_id: string;
  triangle_name: string;
  triangle_type: 'paid' | 'reported' | 'incurred' | 'case' | 'ibnr' | 'ultimate';
  position: 'left' | 'center' | 'right';
  color?: string;
  triangle_status?: 'completed' | 'add' | 'pending-review' | 'in_progress' | 'error';
  data_json?: any;
  development_factors?: any;
  ultimate_values?: any;
}

export interface UpdateTriangleDTO extends Partial<CreateTriangleDTO> {
  id: string;
}

// =============================================================================
// FILTER INTERFACES
// =============================================================================

export interface ProgramFilters {
  search?: string;
  product_line_id?: number;
  program_status?: string[];
  loss_ratio_min?: number;
  loss_ratio_max?: number;
  premium_min?: number;
  premium_max?: number;
  owner?: string;
  limit?: number;
  offset?: number;
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

export interface ValuationFilters {
  program_id?: string;
  evaluation_date_from?: Date;
  evaluation_date_to?: Date;
  official_status?: string[];
  valuation_type?: string[];
  created_by?: string;
  reviewed_by?: string;
  limit?: number;
  offset?: number;
}

export interface TriangleFilters {
  valuation_id?: string;
  triangle_type?: string[];
  triangle_status?: string[];
  position?: string[];
  limit?: number;
  offset?: number;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
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

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
  details?: any;
}