-- Migration: Create transactions table
-- Cessions or individual risks belonging to a Program

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

-- Create indexes for performance
CREATE INDEX idx_transactions_program ON transactions(program_id);
CREATE INDEX idx_transactions_status ON transactions(transaction_status);
CREATE INDEX idx_transactions_dates ON transactions(effective_date, expiry_date);
CREATE INDEX idx_transactions_ceding ON transactions(ceding_company_id);
CREATE INDEX idx_transactions_reinsurer ON transactions(reinsurer_company_id);

-- Insert sample transactions
INSERT INTO transactions (
    program_id, 
    transaction_name, 
    ceding_company_id, 
    reinsurer_company_id,
    effective_date, 
    expiry_date, 
    premium, 
    transaction_status,
    transaction_type,
    subject_business
) VALUES 
    (
        (SELECT id FROM programs WHERE name = 'Blue Commercial Auto 2020'),
        'CA-2024-001 Blue Fleet Coverage',
        (SELECT id FROM companies WHERE name = 'Plum Insurers LLC'),
        (SELECT id FROM companies WHERE name = 'Global Reinsurance Corp'),
        '2024-01-01',
        '2024-12-31',
        250000.00,
        'active',
        'renewal',
        'Commercial auto fleet coverage for transportation companies'
    ),
    (
        (SELECT id FROM programs WHERE name = 'Red Workers Comp 2021'),
        'WC-2024-002 Construction Coverage',
        (SELECT id FROM companies WHERE name = 'Guava Insurers LLC'),
        (SELECT id FROM companies WHERE name = 'Eagle Re LLC'),
        '2024-02-01',
        '2024-12-31',
        1400000.00,
        'active',
        'brand-new',
        'Workers compensation coverage for construction industry'
    ),
    (
        (SELECT id FROM programs WHERE name = 'Green Property Shield 2022'),
        'PROP-2024-003 Coastal Properties',
        (SELECT id FROM companies WHERE name = 'Berry Insurance Group'),
        (SELECT id FROM companies WHERE name = 'Atlantic Reinsurance'),
        '2024-03-01',
        '2025-03-01',
        450000.00,
        'pending',
        'renewal',
        'Property coverage for coastal residential and commercial properties'
    ),
    (
        (SELECT id FROM programs WHERE name = 'Yellow Liability Plus 2023'),
        'GL-2024-004 Manufacturing Liability',
        (SELECT id FROM companies WHERE name = 'Citrus Mutual Insurance'),
        (SELECT id FROM companies WHERE name = 'Pacific Re Solutions'),
        '2024-01-15',
        '2024-12-31',
        890000.00,
        'active',
        'brand-new',
        'General liability coverage for manufacturing operations'
    ),
    (
        (SELECT id FROM programs WHERE name = 'Purple Aviation Elite 2024'),
        'AV-2024-005 Regional Airlines',
        (SELECT id FROM companies WHERE name = 'Grape Valley Insurance'),
        (SELECT id FROM companies WHERE name = 'Continental Re Group'),
        '2024-04-01',
        '2025-04-01',
        1650000.00,
        'draft',
        'renewal',
        'Aviation hull and liability coverage for regional airlines'
    );