-- Combined Database Schema for Reinsurance Application
-- Execute this file to create the complete database structure

-- Enable UUID extension for PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- For PostgreSQL 13+ use: CREATE EXTENSION IF NOT EXISTS "gen_random_uuid";

-- =============================================================================
-- 1. PRODUCT LINES (Reference Data)
-- =============================================================================

CREATE TABLE product_lines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_product_lines_name ON product_lines(name);

-- =============================================================================
-- 2. COMPANIES (Cedents and Reinsurers)
-- =============================================================================

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    company_type VARCHAR(20) NOT NULL CHECK (company_type IN ('ceding', 'reinsurer', 'both')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_companies_type ON companies(company_type);

-- =============================================================================
-- 3. PROGRAMS (Central Entity)
-- =============================================================================

CREATE TABLE programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    product_line_id INTEGER NOT NULL REFERENCES product_lines(id),
    current_loss_ratio DECIMAL(5,2),
    quota_share_premium DECIMAL(15,2),
    premium DECIMAL(15,2),
    owner VARCHAR(100),
    program_status VARCHAR(20) DEFAULT 'active' CHECK (program_status IN ('active', 'inactive', 'pending', 'cancelled')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_programs_name ON programs(name);
CREATE INDEX idx_programs_product_line ON programs(product_line_id);
CREATE INDEX idx_programs_status ON programs(program_status);
CREATE INDEX idx_programs_loss_ratio ON programs(current_loss_ratio);

-- =============================================================================
-- 4. TRANSACTIONS (Cessions/Risks)
-- =============================================================================

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    transaction_name VARCHAR(200) NOT NULL,
    ceding_company_id UUID NOT NULL REFERENCES companies(id),
    reinsurer_company_id UUID NOT NULL REFERENCES companies(id),
    effective_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    premium DECIMAL(15,2),
    transaction_status VARCHAR(20) NOT NULL DEFAULT 'active' 
        CHECK (transaction_status IN ('active', 'pending', 'draft', 'cancelled')),
    transaction_type VARCHAR(20) 
        CHECK (transaction_type IN ('brand-new', 'renewal')),
    subject_business TEXT,
    risk_period_start DATE,
    risk_period_end DATE,
    ramp_up_period_end DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_program ON transactions(program_id);
CREATE INDEX idx_transactions_status ON transactions(transaction_status);
CREATE INDEX idx_transactions_dates ON transactions(effective_date, expiry_date);
CREATE INDEX idx_transactions_ceding ON transactions(ceding_company_id);
CREATE INDEX idx_transactions_reinsurer ON transactions(reinsurer_company_id);

-- =============================================================================
-- 5. CONTRACTS (Legal Documents)
-- =============================================================================

CREATE TABLE contracts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    contract_name VARCHAR(200) NOT NULL,
    contract_type VARCHAR(50) NOT NULL 
        CHECK (contract_type IN ('reinsurance_trust', 'reinsurance_schedule', 'certificate', 'endorsement', 'other')),
    amended BOOLEAN DEFAULT FALSE,
    signed_date DATE,
    effective_date DATE,
    page_count INTEGER,
    document_url TEXT,
    contract_status VARCHAR(20) DEFAULT 'draft'
        CHECK (contract_status IN ('draft', 'pending', 'signed', 'executed', 'terminated')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contracts_transaction ON contracts(transaction_id);
CREATE INDEX idx_contracts_type ON contracts(contract_type);
CREATE INDEX idx_contracts_status ON contracts(contract_status);
CREATE INDEX idx_contracts_dates ON contracts(signed_date, effective_date);

-- =============================================================================
-- 6. BDX UPLOADS (Monthly Data)
-- =============================================================================

CREATE TABLE bdx_uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    document_type VARCHAR(20) NOT NULL CHECK (document_type IN ('policy', 'claims')),
    month DATE NOT NULL, -- Stored as first day of month
    upload_status VARCHAR(20) NOT NULL DEFAULT 'add'
        CHECK (upload_status IN ('success', 'error', 'progress', 'attention', 'add', 'prohibited')),
    file_name VARCHAR(255),
    file_url TEXT,
    uploaded_at TIMESTAMP,
    processed_at TIMESTAMP,
    error_message TEXT,
    data_summary JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bdx_transaction ON bdx_uploads(transaction_id);
CREATE INDEX idx_bdx_month ON bdx_uploads(month);
CREATE INDEX idx_bdx_status ON bdx_uploads(upload_status);
CREATE INDEX idx_bdx_type ON bdx_uploads(document_type);

ALTER TABLE bdx_uploads ADD CONSTRAINT unique_bdx_upload 
    UNIQUE (transaction_id, document_type, month);

-- =============================================================================
-- 7. VALUATIONS (Periodic Evaluations)
-- =============================================================================

CREATE TABLE valuations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    program_id UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    evaluation_date DATE NOT NULL,
    valuation_name VARCHAR(200),
    reported_loss_ratio DECIMAL(5,2),
    current_written_premium DECIMAL(15,2),
    official_status VARCHAR(20) NOT NULL DEFAULT 'none'
        CHECK (official_status IN ('reviewed', 'pending', 'none', 'in_progress')),
    valuation_type VARCHAR(20) DEFAULT 'quarterly'
        CHECK (valuation_type IN ('monthly', 'quarterly', 'semi_annual', 'annual', 'ad_hoc')),
    notes TEXT,
    created_by VARCHAR(100),
    reviewed_by VARCHAR(100),
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_valuations_program ON valuations(program_id);
CREATE INDEX idx_valuations_date ON valuations(evaluation_date);
CREATE INDEX idx_valuations_status ON valuations(official_status);
CREATE INDEX idx_valuations_type ON valuations(valuation_type);

ALTER TABLE valuations ADD CONSTRAINT unique_valuation_program_date 
    UNIQUE (program_id, evaluation_date);

-- =============================================================================
-- 8. TRIANGLES (Statistical Loss Development)
-- =============================================================================

CREATE TABLE triangles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    valuation_id UUID NOT NULL REFERENCES valuations(id) ON DELETE CASCADE,
    triangle_name VARCHAR(100) NOT NULL,
    triangle_type VARCHAR(50) NOT NULL 
        CHECK (triangle_type IN ('paid', 'reported', 'incurred', 'case', 'ibnr', 'ultimate')),
    position VARCHAR(20) NOT NULL 
        CHECK (position IN ('left', 'center', 'right')),
    color VARCHAR(7),
    triangle_status VARCHAR(20) NOT NULL DEFAULT 'add'
        CHECK (triangle_status IN ('completed', 'add', 'pending-review', 'in_progress', 'error')),
    data_json JSONB,
    development_factors JSONB,
    ultimate_values JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_triangles_valuation ON triangles(valuation_id);
CREATE INDEX idx_triangles_status ON triangles(triangle_status);
CREATE INDEX idx_triangles_type ON triangles(triangle_type);
CREATE INDEX idx_triangles_position ON triangles(position);

ALTER TABLE triangles ADD CONSTRAINT unique_triangle_valuation_position 
    UNIQUE (valuation_id, position);

-- =============================================================================
-- NOTES
-- =============================================================================

-- This schema implements the reinsurance data model with the following relationships:
-- 
-- PROGRAMS (central entity)
--   ├─ has many → TRANSACTIONS
--   │    ├─ has many → CONTRACTS
--   │    └─ has many → BDX_UPLOADS
--   └─ has many → VALUATIONS
--           └─ has many → TRIANGLES (typically 3: paid, reported, incurred)
-- 
-- PRODUCT_LINES categorize PROGRAMS
-- COMPANIES are referenced by TRANSACTIONS (ceding_company_id, reinsurer_company_id)
-- 
-- To populate with sample data, run the individual migration files 001-008 in order.
-- This combined schema file creates the structure without sample data.