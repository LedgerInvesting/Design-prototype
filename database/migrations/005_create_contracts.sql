-- Migration: Create contracts table
-- Legal documents associated with a Transaction

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

-- Create indexes for performance
CREATE INDEX idx_contracts_transaction ON contracts(transaction_id);
CREATE INDEX idx_contracts_type ON contracts(contract_type);
CREATE INDEX idx_contracts_status ON contracts(contract_status);
CREATE INDEX idx_contracts_dates ON contracts(signed_date, effective_date);

-- Insert sample contracts
INSERT INTO contracts (
    transaction_id,
    contract_name,
    contract_type,
    amended,
    signed_date,
    effective_date,
    page_count,
    contract_status
) VALUES 
    (
        (SELECT id FROM transactions WHERE transaction_name = 'CA-2024-001 Blue Fleet Coverage'),
        'Liberty Mutual Re Trust 2024-A',
        'reinsurance_trust',
        TRUE,
        '2024-01-10',
        '2024-01-01',
        42,
        'executed'
    ),
    (
        (SELECT id FROM transactions WHERE transaction_name = 'CA-2024-001 Blue Fleet Coverage'),
        'Schedule A - Commercial Auto Terms',
        'reinsurance_schedule',
        FALSE,
        '2024-01-08',
        '2024-01-01',
        15,
        'executed'
    ),
    (
        (SELECT id FROM transactions WHERE transaction_name = 'WC-2024-002 Construction Coverage'),
        'RS-2024-001 American Insurance Co.',
        'reinsurance_schedule',
        TRUE,
        '2023-12-28',
        '2024-02-01',
        67,
        'executed'
    ),
    (
        (SELECT id FROM transactions WHERE transaction_name = 'PROP-2024-003 Coastal Properties'),
        'Property Master Agreement 2024',
        'reinsurance_trust',
        FALSE,
        NULL,
        '2024-03-01',
        38,
        'pending'
    ),
    (
        (SELECT id FROM transactions WHERE transaction_name = 'GL-2024-004 Manufacturing Liability'),
        'GL Certificate of Reinsurance',
        'certificate',
        FALSE,
        '2024-01-20',
        '2024-01-15',
        8,
        'signed'
    ),
    (
        (SELECT id FROM transactions WHERE transaction_name = 'AV-2024-005 Regional Airlines'),
        'Aviation Reinsurance Treaty 2024',
        'reinsurance_trust',
        FALSE,
        NULL,
        '2024-04-01',
        95,
        'draft'
    );