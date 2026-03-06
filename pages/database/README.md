# Database Setup Guide

## Overview

This database implementation follows the reinsurance data model structure defined in `temp/reinsurance_data_model.md`. It provides a complete schema for managing reinsurance programs, transactions, contracts, valuations, and related data.

## Database Schema

### Entity Relationships

```
PROGRAMS (central entity)
  ├─ has many → TRANSACTIONS
  │    ├─ has many → CONTRACTS
  │    └─ has many → BDX_UPLOADS
  └─ has many → VALUATIONS
          └─ has many → TRIANGLES (typically 3: paid, reported, incurred)

PRODUCT_LINES categorize PROGRAMS
COMPANIES are referenced by TRANSACTIONS (ceding_company_id, reinsurer_company_id)
```

### Core Tables

1. **product_lines** - Reference data for insurance categories
2. **companies** - Ceding companies and reinsurers
3. **programs** - Central entity representing reinsurance deals
4. **transactions** - Individual risks/cessions within programs
5. **contracts** - Legal documents associated with transactions
6. **bdx_uploads** - Monthly premium and claims data uploads
7. **valuations** - Periodic evaluations at the program level
8. **triangles** - Statistical loss development outputs from valuations

## Setup Options

### Option 1: PostgreSQL (Recommended for Production)

1. **Install PostgreSQL 15+**
   ```bash
   # macOS with Homebrew
   brew install postgresql@15
   brew services start postgresql@15
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql-15 postgresql-contrib
   ```

2. **Create Database and User**
   ```sql
   -- Connect as postgres user
   sudo -u postgres psql
   
   -- Create database
   CREATE DATABASE ledger_db;
   
   -- Create user
   CREATE USER ledger_user WITH PASSWORD 'your_secure_password';
   
   -- Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE ledger_db TO ledger_user;
   GRANT CREATE ON SCHEMA public TO ledger_user;
   
   -- Exit
   \q
   ```

3. **Run Migrations**
   ```bash
   # Create tables with sample data
   psql -h localhost -U ledger_user -d ledger_db -f migrations/001_create_product_lines.sql
   psql -h localhost -U ledger_user -d ledger_db -f migrations/002_create_companies.sql
   psql -h localhost -U ledger_user -d ledger_db -f migrations/003_create_programs.sql
   psql -h localhost -U ledger_user -d ledger_db -f migrations/004_create_transactions.sql
   psql -h localhost -U ledger_user -d ledger_db -f migrations/005_create_contracts.sql
   psql -h localhost -U ledger_user -d ledger_db -f migrations/006_create_bdx_uploads.sql
   psql -h localhost -U ledger_user -d ledger_db -f migrations/007_create_valuations.sql
   psql -h localhost -U ledger_user -d ledger_db -f migrations/008_create_triangles.sql
   
   # OR create just the schema (no sample data)
   psql -h localhost -U ledger_user -d ledger_db -f migrations/009_create_combined_schema.sql
   ```

### Option 2: SQLite (Good for Development/Prototyping)

1. **Install Dependencies**
   ```bash
   cd design-library
   npm install better-sqlite3 @types/better-sqlite3
   ```

2. **Create Database**
   ```bash
   # Create SQLite database file
   touch database/ledger.db
   
   # Apply schema (modify SQL for SQLite compatibility)
   sqlite3 database/ledger.db < migrations/009_create_combined_schema.sql
   ```

### Option 3: Hosted PostgreSQL (Easy Setup)

**Supabase (Recommended):**
1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection details
4. Run migrations through Supabase SQL editor or via connection string

**Other Options:**
- Neon (neon.tech)
- Railway (railway.app)
- PlanetScale (planetscale.com)

## Environment Variables

Create a `.env.local` file in your project root:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ledger_db
DB_USER=ledger_user
DB_PASSWORD=your_secure_password
DB_SSL=false

# For Supabase or hosted services
# DB_URL=postgresql://username:password@host:port/database?sslmode=require
```

## Next Steps

After setting up the database:

1. **Install Database Client**
   ```bash
   cd design-library
   npm install pg @types/pg
   # OR for SQLite
   npm install better-sqlite3 @types/better-sqlite3
   ```

2. **Create Connection Utilities** (see connection.ts)
3. **Implement Repositories** (see repositories/)
4. **Create API Endpoints** (see api/)
5. **Update Pages to Use Real Data**

## Migration Files

- `001_create_product_lines.sql` - Product line reference data
- `002_create_companies.sql` - Ceding companies and reinsurers
- `003_create_programs.sql` - Insurance programs with sample data
- `004_create_transactions.sql` - Reinsurance transactions
- `005_create_contracts.sql` - Legal contracts and documents
- `006_create_bdx_uploads.sql` - Monthly BDX uploads with status tracking
- `007_create_valuations.sql` - Program valuations and assessments
- `008_create_triangles.sql` - Statistical triangles with JSON data
- `009_create_combined_schema.sql` - Complete schema without sample data

## Verification

Test your setup:

```sql
-- Check tables exist
\dt

-- View sample data
SELECT p.name, pl.name as product_line, p.current_loss_ratio
FROM programs p
JOIN product_lines pl ON p.product_line_id = pl.id
LIMIT 5;

-- Check relationships
SELECT 
    prog.name as program_name,
    COUNT(DISTINCT t.id) as transaction_count,
    COUNT(DISTINCT v.id) as valuation_count
FROM programs prog
LEFT JOIN transactions t ON prog.id = t.program_id
LEFT JOIN valuations v ON prog.id = v.program_id
GROUP BY prog.id, prog.name;
```

## Troubleshooting

**PostgreSQL Connection Issues:**
- Ensure PostgreSQL service is running
- Check firewall settings for port 5432
- Verify user permissions

**Migration Errors:**
- Check PostgreSQL version (UUID support requires 13+)
- Ensure proper user privileges
- Run migrations in correct order

**Sample Data Issues:**
- Foreign key constraints require parent data exists first
- Check that product_lines and companies are populated before programs

## Performance Notes

- All tables include appropriate indexes for common queries
- JSONB columns in triangles and bdx_uploads support efficient JSON operations
- UUIDs provide better distribution for sharded setups
- Consider connection pooling for production (pg pool)

## Security Considerations

- Use environment variables for connection details
- Enable SSL for production connections
- Implement proper user authentication and authorization
- Regularly backup database data
- Use connection pooling to prevent connection exhaustion