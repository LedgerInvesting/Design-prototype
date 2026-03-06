-- Migration: Create product_lines table
-- Reference data categorizing Programs (e.g., Property, Liability, Auto)

CREATE TABLE product_lines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_product_lines_name ON product_lines(name);

-- Insert standard reinsurance product lines
INSERT INTO product_lines (name) VALUES 
    ('Private Passenger Auto'),
    ('Commercial Auto'),
    ('Workers Compensation'),
    ('General Liability'),
    ('Professional Liability'),
    ('Property'),
    ('Marine'),
    ('Aviation'),
    ('Cyber'),
    ('Directors & Officers'),
    ('Errors & Omissions'),
    ('Medical Professional Liability'),
    ('Product Liability'),
    ('Environmental'),
    ('Surety'),
    ('Credit'),
    ('Political Risk'),
    ('Trade Credit'),
    ('Agriculture'),
    ('Energy');