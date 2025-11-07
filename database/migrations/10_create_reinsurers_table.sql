-- Create reinsurers table
CREATE TABLE reinsurers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'Reinsurer',
    country VARCHAR(100) NOT NULL,
    rating VARCHAR(10),
    specialization TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert reinsurers data (Fruit-themed names)
INSERT INTO reinsurers (id, name, type, country, rating, specialization) VALUES
('pineapple-re', 'Pineapple Re', 'Reinsurer', 'Bermuda', 'A-', 'Specializes in property-cat treaties.'),
('mango-re', 'Mango Reinsurance Group', 'Reinsurer', 'Switzerland', 'A', 'Strong presence in specialty lines.'),
('blueberry-re', 'Blueberry Re', 'Reinsurer', 'USA', 'A+', 'Focus on casualty and multiline quota share.'),
('citrus-re', 'Citrus Re Corp', 'Reinsurer', 'UK', 'A', 'Known for innovative structured reinsurance.');

-- Add foreign key to programs table to link with reinsurers
ALTER TABLE programs ADD COLUMN reinsurer_id VARCHAR(50);
ALTER TABLE programs ADD CONSTRAINT fk_programs_reinsurer 
    FOREIGN KEY (reinsurer_id) REFERENCES reinsurers(id);

-- Update existing programs with reinsurer assignments
UPDATE programs SET reinsurer_id = 'pineapple-re' WHERE id IN ('prog-001', 'prog-002', 'prog-003', 'prog-004', 'prog-005');
UPDATE programs SET reinsurer_id = 'mango-re' WHERE id IN ('prog-006', 'prog-007', 'prog-008', 'prog-009', 'prog-010');
UPDATE programs SET reinsurer_id = 'blueberry-re' WHERE id IN ('prog-011', 'prog-012', 'prog-013', 'prog-014', 'prog-015');
UPDATE programs SET reinsurer_id = 'citrus-re' WHERE id IN ('prog-016', 'prog-017', 'prog-018', 'prog-019', 'prog-020');