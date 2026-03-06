-- Migration: Create companies table
-- Entities representing cedents and reinsurers

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    company_type VARCHAR(20) NOT NULL CHECK (company_type IN ('ceding', 'reinsurer', 'both')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX idx_companies_name ON companies(name);
CREATE INDEX idx_companies_type ON companies(company_type);

-- Insert sample companies from the application data
INSERT INTO companies (name, company_type) VALUES 
    -- Ceding companies
    ('Plum Insurers LLC', 'ceding'),
    ('Guava Insurers LLC', 'ceding'),
    ('Berry Insurance Group', 'ceding'),
    ('Citrus Mutual Insurance', 'ceding'),
    ('Grape Valley Insurance', 'ceding'),
    ('Apple State Insurance', 'ceding'),
    ('Orange County Mutual', 'ceding'),
    ('Peach Tree Insurance', 'ceding'),
    ('Cherry Hill Insurance', 'ceding'),
    ('Lime Green Insurance', 'ceding'),
    
    -- Reinsurers
    ('Global Reinsurance Corp', 'reinsurer'),
    ('Eagle Re LLC', 'reinsurer'),
    ('Atlantic Reinsurance', 'reinsurer'),
    ('Pacific Re Solutions', 'reinsurer'),
    ('Continental Re Group', 'reinsurer'),
    ('Summit Reinsurance', 'reinsurer'),
    ('Horizon Re Ltd', 'reinsurer'),
    ('Pinnacle Reinsurance', 'reinsurer'),
    ('Meridian Re Corp', 'reinsurer'),
    ('Apex Reinsurance', 'reinsurer'),
    
    -- Companies that can be both
    ('Liberty Mutual Re', 'both'),
    ('AIG Re', 'both'),
    ('Swiss Re America', 'both'),
    ('Munich Re US', 'both'),
    ('Hannover Re', 'both');