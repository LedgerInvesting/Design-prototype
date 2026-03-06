-- Create MGAs table
CREATE TABLE mgas (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'MGA',
    product_line VARCHAR(100),
    country VARCHAR(100) NOT NULL,
    reinsurer_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mgas_reinsurer FOREIGN KEY (reinsurer_id) REFERENCES reinsurers(id)
);

-- Insert MGAs data (Animal-themed names)
INSERT INTO mgas (id, name, type, product_line, country, reinsurer_id) VALUES
('lion-underwriting', 'Lion Underwriting', 'MGA', 'Commercial Auto', 'USA', 'pineapple-re'),
('falcon-risk', 'Falcon Risk Services', 'MGA', 'Property', 'UK', 'pineapple-re'),
('wolf-specialty', 'Wolf Specialty MGA', 'MGA', 'Liability', 'Canada', 'mango-re'),
('eagle-insurance', 'Eagle Insurance Solutions', 'MGA', 'Professional Lines', 'USA', 'mango-re'),
('panther-underwriters', 'Panther Underwriters', 'MGA', 'Excess & Surplus', 'USA', 'blueberry-re'),
('buffalo-risk', 'Buffalo Risk Partners', 'MGA', 'Workers Comp', 'USA', 'blueberry-re'),
('shark-coverage', 'Shark Coverage Group', 'MGA', 'Marine', 'Netherlands', 'citrus-re'),
('rhino-assurance', 'Rhino Assurance Agency', 'MGA', 'Construction', 'Australia', 'citrus-re');

-- Add foreign key to programs table to link with MGAs
ALTER TABLE programs ADD COLUMN mga_id VARCHAR(50);
ALTER TABLE programs ADD CONSTRAINT fk_programs_mga 
    FOREIGN KEY (mga_id) REFERENCES mgas(id);

-- Update existing programs with MGA assignments (mapping based on product lines)
UPDATE programs SET mga_id = 'lion-underwriting' WHERE product_line = 'Commercial Auto';
UPDATE programs SET mga_id = 'falcon-risk' WHERE product_line = 'Property';
UPDATE programs SET mga_id = 'wolf-specialty' WHERE product_line IN ('General Liability', 'Casualty');
UPDATE programs SET mga_id = 'eagle-insurance' WHERE product_line IN ('Professional Indemnity', 'Management Liability', 'Financial Lines');
UPDATE programs SET mga_id = 'panther-underwriters' WHERE product_line IN ('Cyber', 'Life Sciences');
UPDATE programs SET mga_id = 'buffalo-risk' WHERE product_line = 'Workers Compensation';
UPDATE programs SET mga_id = 'shark-coverage' WHERE product_line IN ('Marine', 'Energy', 'Transportation');
UPDATE programs SET mga_id = 'rhino-assurance' WHERE product_line IN ('Environmental', 'Product Liability', 'Trade Credit', 'Agriculture', 'Surety', 'Aviation', 'Warranty');