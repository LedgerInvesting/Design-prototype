-- Migration: Create bdx_uploads table
-- Monthly data uploads associated with Transactions (premium and claims reporting)

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
    data_summary JSONB, -- Store summary stats like record count, total premium, etc.
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_bdx_transaction ON bdx_uploads(transaction_id);
CREATE INDEX idx_bdx_month ON bdx_uploads(month);
CREATE INDEX idx_bdx_status ON bdx_uploads(upload_status);
CREATE INDEX idx_bdx_type ON bdx_uploads(document_type);

-- Unique constraint to prevent duplicate uploads for same transaction/type/month
ALTER TABLE bdx_uploads ADD CONSTRAINT unique_bdx_upload 
    UNIQUE (transaction_id, document_type, month);

-- Insert sample BDX uploads for the past year
INSERT INTO bdx_uploads (
    transaction_id,
    document_type,
    month,
    upload_status,
    file_name,
    uploaded_at,
    processed_at,
    data_summary
) VALUES 
    -- CA-2024-001 Blue Fleet Coverage uploads
    (
        (SELECT id FROM transactions WHERE transaction_name = 'CA-2024-001 Blue Fleet Coverage'),
        'policy',
        '2024-01-01',
        'success',
        'blue_fleet_policy_jan_2024.xlsx',
        '2024-02-05 09:30:00',
        '2024-02-05 09:45:00',
        '{"records": 1247, "total_premium": 18750.00, "policy_count": 342}'
    ),
    (
        (SELECT id FROM transactions WHERE transaction_name = 'CA-2024-001 Blue Fleet Coverage'),
        'claims',
        '2024-01-01',
        'success',
        'blue_fleet_claims_jan_2024.xlsx',
        '2024-02-05 10:15:00',
        '2024-02-05 10:30:00',
        '{"records": 89, "total_claims": 14200.00, "claim_count": 23}'
    ),
    (
        (SELECT id FROM transactions WHERE transaction_name = 'CA-2024-001 Blue Fleet Coverage'),
        'policy',
        '2024-02-01',
        'success',
        'blue_fleet_policy_feb_2024.xlsx',
        '2024-03-03 08:45:00',
        '2024-03-03 09:00:00',
        '{"records": 1156, "total_premium": 19200.00, "policy_count": 338}'
    ),
    
    -- WC-2024-002 Construction Coverage uploads
    (
        (SELECT id FROM transactions WHERE transaction_name = 'WC-2024-002 Construction Coverage'),
        'policy',
        '2024-02-01',
        'success',
        'construction_wc_policy_feb_2024.xlsx',
        '2024-03-08 14:20:00',
        '2024-03-08 14:35:00',
        '{"records": 2340, "total_premium": 125000.00, "policy_count": 89}'
    ),
    (
        (SELECT id FROM transactions WHERE transaction_name = 'WC-2024-002 Construction Coverage'),
        'claims',
        '2024-02-01',
        'error',
        'construction_wc_claims_feb_2024.xlsx',
        '2024-03-08 15:00:00',
        NULL,
        NULL
    ),
    
    -- Property coverage uploads
    (
        (SELECT id FROM transactions WHERE transaction_name = 'PROP-2024-003 Coastal Properties'),
        'policy',
        '2024-03-01',
        'progress',
        'coastal_prop_policy_mar_2024.xlsx',
        '2024-04-02 11:30:00',
        NULL,
        NULL
    ),
    
    -- Current month - add status for missing uploads
    (
        (SELECT id FROM transactions WHERE transaction_name = 'CA-2024-001 Blue Fleet Coverage'),
        'policy',
        '2024-11-01',
        'add',
        NULL,
        NULL,
        NULL,
        NULL
    ),
    (
        (SELECT id FROM transactions WHERE transaction_name = 'CA-2024-001 Blue Fleet Coverage'),
        'claims',
        '2024-11-01',
        'add',
        NULL,
        NULL,
        NULL,
        NULL
    );