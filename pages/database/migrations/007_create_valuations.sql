-- Migration: Create valuations table
-- Periodic evaluations or runs (monthly, quarterly, yearly) executed at the Program level

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

-- Create indexes for performance
CREATE INDEX idx_valuations_program ON valuations(program_id);
CREATE INDEX idx_valuations_date ON valuations(evaluation_date);
CREATE INDEX idx_valuations_status ON valuations(official_status);
CREATE INDEX idx_valuations_type ON valuations(valuation_type);

-- Unique constraint to prevent duplicate valuations for same program/date
ALTER TABLE valuations ADD CONSTRAINT unique_valuation_program_date 
    UNIQUE (program_id, evaluation_date);

-- Insert sample valuations
INSERT INTO valuations (
    program_id,
    evaluation_date,
    valuation_name,
    reported_loss_ratio,
    current_written_premium,
    official_status,
    valuation_type,
    notes,
    created_by,
    reviewed_by,
    reviewed_at
) VALUES 
    -- Blue Commercial Auto 2020 valuations
    (
        (SELECT id FROM programs WHERE name = 'Blue Commercial Auto 2020'),
        '2024-12-31',
        'Q4 2024 Year-End Valuation',
        75.25,
        250000.00,
        'reviewed',
        'quarterly',
        'Strong performance with manageable loss ratio. Recommend continuation.',
        'Sarah Johnson',
        'Michael Chen',
        '2025-01-05 16:30:00'
    ),
    (
        (SELECT id FROM programs WHERE name = 'Blue Commercial Auto 2020'),
        '2024-09-30',
        'Q3 2024 Quarterly Review',
        73.80,
        187500.00,
        'reviewed',
        'quarterly',
        'Positive trend in loss development. Claims frequency stable.',
        'Sarah Johnson',
        'Michael Chen',
        '2024-10-08 14:20:00'
    ),
    
    -- Red Workers Comp 2021 valuations
    (
        (SELECT id FROM programs WHERE name = 'Red Workers Comp 2021'),
        '2024-12-31',
        'Year-End Assessment 2024',
        98.50,
        1400000.00,
        'pending',
        'annual',
        'High loss ratio requires attention. Investigating large claims impact.',
        'Emma Rodriguez',
        NULL,
        NULL
    ),
    (
        (SELECT id FROM programs WHERE name = 'Red Workers Comp 2021'),
        '2024-06-30',
        'Mid-Year Review 2024',
        102.30,
        700000.00,
        'reviewed',
        'semi_annual',
        'Elevated loss ratio due to several large construction site incidents.',
        'Emma Rodriguez',
        'David Kim',
        '2024-07-15 11:45:00'
    ),
    
    -- Green Property Shield 2022 valuations
    (
        (SELECT id FROM programs WHERE name = 'Green Property Shield 2022'),
        '2024-11-30',
        'Pre-Renewal Assessment',
        85.75,
        450000.00,
        'reviewed',
        'ad_hoc',
        'Favorable results for coastal property exposure. Weather events minimal impact.',
        'Lisa Wang',
        'Alex Thompson',
        '2024-12-02 09:15:00'
    ),
    
    -- Yellow Liability Plus 2023 valuations
    (
        (SELECT id FROM programs WHERE name = 'Yellow Liability Plus 2023'),
        '2024-10-31',
        'Q3 Manufacturing Review',
        91.60,
        668000.00,
        'in_progress',
        'quarterly',
        'Currently analyzing impact of new manufacturing processes on liability exposure.',
        'Rachel Davis',
        NULL,
        NULL
    ),
    
    -- Purple Aviation Elite 2024 valuations
    (
        (SELECT id FROM programs WHERE name = 'Purple Aviation Elite 2024'),
        '2024-08-31',
        'Initial Performance Review',
        68.90,
        825000.00,
        'reviewed',
        'quarterly',
        'Excellent initial performance for aviation portfolio. Low claims frequency.',
        'James Wilson',
        'Maria Garcia',
        '2024-09-10 13:30:00'
    );