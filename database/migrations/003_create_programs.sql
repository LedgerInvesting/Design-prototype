-- Migration: Create programs table
-- Central entity representing a reinsurance deal or program

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

-- Create indexes for performance
CREATE INDEX idx_programs_name ON programs(name);
CREATE INDEX idx_programs_product_line ON programs(product_line_id);
CREATE INDEX idx_programs_status ON programs(program_status);
CREATE INDEX idx_programs_loss_ratio ON programs(current_loss_ratio);

-- Insert sample programs based on application data
INSERT INTO programs (name, product_line_id, current_loss_ratio, quota_share_premium, premium, owner) VALUES 
    ('Blue Commercial Auto 2020', (SELECT id FROM product_lines WHERE name = 'Commercial Auto'), 75.00, 180000.00, 250000.00, 'Sarah Johnson'),
    ('Red Workers Comp 2021', (SELECT id FROM product_lines WHERE name = 'Workers Compensation'), 100.00, 950000.00, 1400000.00, 'Michael Chen'),
    ('Green Property Shield 2022', (SELECT id FROM product_lines WHERE name = 'Property'), 85.50, 320000.00, 450000.00, 'Emma Rodriguez'),
    ('Yellow Liability Plus 2023', (SELECT id FROM product_lines WHERE name = 'General Liability'), 92.25, 680000.00, 890000.00, 'David Kim'),
    ('Purple Aviation Elite 2024', (SELECT id FROM product_lines WHERE name = 'Aviation'), 68.75, 1200000.00, 1650000.00, 'Lisa Wang'),
    ('Orange Marine Coverage 2024', (SELECT id FROM product_lines WHERE name = 'Marine'), 78.30, 540000.00, 720000.00, 'Alex Thompson'),
    ('Silver Cyber Defense 2023', (SELECT id FROM product_lines WHERE name = 'Cyber'), 95.80, 275000.00, 380000.00, 'Rachel Davis'),
    ('Gold D&O Protection 2024', (SELECT id FROM product_lines WHERE name = 'Directors & Officers'), 82.40, 850000.00, 1120000.00, 'James Wilson'),
    ('Platinum Energy Shield 2022', (SELECT id FROM product_lines WHERE name = 'Energy'), 71.60, 1500000.00, 2100000.00, 'Maria Garcia'),
    ('Diamond Med Mal 2024', (SELECT id FROM product_lines WHERE name = 'Medical Professional Liability'), 88.90, 420000.00, 580000.00, 'Kevin Lee');