# Database Design for Ledger Application

## 1. Data Analysis - Entities Identified

Based on analysis of all pages, here are the core entities and their relationships:

### **Core Entities Summary**

1. **Programs** (Business Section: Reports/Analytics)
   - Central entity representing insurance programs/deals
   - Source: `ReportsInsightsExplorer.tsx`

2. **Transactions** (Business Section: Reports)
   - Reinsurance transactions that belong to programs
   - Source: `ReportsTransactionManagement.tsx`, `ReportsNewTransactionForm.tsx`

3. **Contracts** (Business Section: Contracts)
   - Legal documents associated with transactions
   - Source: `ReportsContractsExplorer.tsx`

4. **Valuations** (Business Section: Analytics)
   - Evaluation records for programs at specific dates
   - Source: `AnalyticsValuationDashboard.tsx`, `AnalyticsValuationStatus.tsx`

5. **Triangles** (Business Section: Analytics)
   - Statistical triangles used for loss reserving
   - Source: `AnalyticsValuationStatus.tsx`, `AnalyticsTriangleDashboard.tsx`

6. **Bordereau Uploads** (Business Section: Reports)
   - Monthly premium/claims data uploads
   - Source: `ReportsBDXUpload.tsx`

7. **Product Lines** (Reference Data)
   - Categories for insurance products
   - Source: `ReportsInsightsExplorer.tsx`

8. **Companies** (Reference Data)
   - Ceding companies and reinsurers
   - Source: `ReportsTransactionManagement.tsx`

---

## 2. Entity Relationships Map

### **Hierarchical Structure (NEW)**
```
REINSURERS (Top Level)
    ↓ (1:M)
MGAS (Managing General Agents)
    ↓ (1:M)
PROGRAMS
    ↓ (1:M)              ↓ (1:M)
TRANSACTIONS        VALUATIONS
    ↓ (1:M)              ↓ (1:M)
CONTRACTS           TRIANGLES
    ↓ (1:M)
BDX_UPLOADS

PRODUCT_LINES → categorize PROGRAMS
COMPANIES (M:M with TRANSACTIONS via ceding_company_id and reinsurer_company_id)
```

### **Detailed Relationships**

#### **Hierarchical Chain:**
- **One Reinsurer** has many **MGAs**
- **One MGA** belongs to one **Reinsurer** and has many **Programs**
- **One Program** belongs to one **MGA** and has many **Transactions** and **Valuations**
- **One Transaction** has many **Contracts** and **BDX Uploads**
- **One Valuation** has many **Triangles** (typically 3: left/center/right positions)

#### **Reference Relationships:**
- **Product Lines** categorize **Programs**
- **Companies** are referenced by **Transactions** (as ceding company and reinsurer)
- **Programs** also have direct **reinsurer_id** foreign key for tracking

#### **Implementation Notes:**
- Aggregated metrics flow upward in the hierarchy (Program stats → MGA stats → Reinsurer stats)
- Entity selection in Reports Explorer supports all levels of the hierarchy
- Cross-page navigation preserves entity context and parent relationships

---

## 3. Database Schema Design

### **Table: `reinsurers`** - NEW
Reinsurance companies that provide reinsurance capacity

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | VARCHAR(50) | PRIMARY KEY | Unique identifier (e.g., 'pineapple-re') |
| `name` | VARCHAR(255) | NOT NULL | Reinsurer name (e.g., 'Pineapple Re') |
| `type` | VARCHAR(50) | NOT NULL, DEFAULT 'Reinsurer' | Entity type identifier |
| `country` | VARCHAR(100) | NOT NULL | Country of domicile |
| `rating` | VARCHAR(10) | | Credit rating (e.g., 'A-', 'A+') |
| `specialization` | TEXT | | Business specialization description |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

**Sample Data:**
```sql
'pineapple-re' → Pineapple Re (Bermuda, A-, Property-cat treaties)
'mango-re' → Mango Reinsurance Group (Switzerland, A, Specialty lines)
'blueberry-re' → Blueberry Re (USA, A+, Casualty and multiline quota share)
'citrus-re' → Citrus Re Corp (UK, A, Innovative structured reinsurance)
```

---

### **Table: `mgas`** - NEW
Managing General Agents that distribute insurance products

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | VARCHAR(50) | PRIMARY KEY | Unique identifier (e.g., 'lion-underwriting') |
| `name` | VARCHAR(255) | NOT NULL | MGA name (e.g., 'Lion Underwriting') |
| `type` | VARCHAR(50) | NOT NULL, DEFAULT 'MGA' | Entity type identifier |
| `product_line` | VARCHAR(100) | | Primary product line specialization |
| `country` | VARCHAR(100) | NOT NULL | Country of operation |
| `reinsurer_id` | VARCHAR(50) | FOREIGN KEY → reinsurers(id) | Parent reinsurer |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:**
- `fk_mgas_reinsurer` foreign key constraint

**Sample Data:**
```sql
'lion-underwriting' → Lion Underwriting (Commercial Auto, USA, pineapple-re)
'falcon-risk' → Falcon Risk Services (Property, UK, pineapple-re)
'wolf-specialty' → Wolf Specialty MGA (Liability, Canada, mango-re)
'eagle-insurance' → Eagle Insurance Solutions (Professional Lines, USA, mango-re)
'panther-underwriters' → Panther Underwriters (Excess & Surplus, USA, blueberry-re)
'buffalo-risk' → Buffalo Risk Partners (Workers Comp, USA, blueberry-re)
'shark-coverage' → Shark Coverage Group (Marine, Netherlands, citrus-re)
'rhino-assurance' → Rhino Assurance Agency (Construction, Australia, citrus-re)
```

---

### **Table: `product_lines`**
Reference data for insurance product categories

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY | Unique identifier |
| `name` | VARCHAR(100) | NOT NULL, UNIQUE | Product line name (e.g., "Private Passenger Auto") |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |

**Sample Data:**
```sql
1 → Private Passenger Auto
2 → Motor
3 → Workers' Compensation
4 → General Liability
5 → Commercial Auto
```

---

### **Table: `companies`**
Insurance and reinsurance companies

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `name` | VARCHAR(200) | NOT NULL | Company name |
| `company_type` | ENUM('ceding', 'reinsurer', 'both') | NOT NULL | Company classification |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Sample Data:**
```sql
uuid-1 → Plum Insurers LLC (ceding)
uuid-2 → Global Reinsurance Corp (reinsurer)
uuid-3 → Eagle Re LLC (reinsurer)
```

---

### **Table: `programs`** - UPDATED
Insurance programs (central entity) - now part of hierarchical structure

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `name` | VARCHAR(200) | NOT NULL | Program name |
| `product_line_id` | INTEGER | FOREIGN KEY → product_lines(id) | Product category |
| `current_loss_ratio` | DECIMAL(5,2) | | Current loss ratio percentage |
| `quota_share_premium` | DECIMAL(15,2) | | Quota share premium amount |
| `premium` | DECIMAL(15,2) | | Total premium amount |
| `owner` | VARCHAR(100) | | Program owner/manager |
| `program_status` | VARCHAR(20) | DEFAULT 'active', CHECK constraint | Program status (active, inactive, pending, cancelled) |
| `reinsurer_id` | VARCHAR(50) | FOREIGN KEY → reinsurers(id) | Associated reinsurer |
| `mga_id` | VARCHAR(50) | FOREIGN KEY → mgas(id) | Managing General Agent |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_programs_name` on `name`
- `idx_programs_product_line` on `product_line_id`
- `idx_programs_status` on `program_status`
- `idx_programs_loss_ratio` on `current_loss_ratio`

**Foreign Key Constraints:**
- `fk_programs_reinsurer` on `reinsurer_id`
- `fk_programs_mga` on `mga_id`

**Sample Data:**
```sql
uuid-1 → "Blue Commercial Auto 2020" (Motor, 75% loss ratio, $250K premium, lion-underwriting MGA, pineapple-re)
uuid-2 → "Red Worker's Comp 2021" (Workers' Comp, 100% loss ratio, $1.4M premium, buffalo-risk MGA, blueberry-re)
```

**Program Assignment Logic:**
- Programs are assigned to MGAs based on product line specialization
- Commercial Auto → Lion Underwriting
- Property → Falcon Risk Services  
- Liability/Casualty → Wolf Specialty MGA
- Professional Lines → Eagle Insurance Solutions
- Workers Compensation → Buffalo Risk Partners
- Marine/Energy/Transportation → Shark Coverage Group
- Construction/Environmental → Rhino Assurance Agency

---

### **Table: `transactions`**
Reinsurance transactions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `program_id` | UUID | FOREIGN KEY → programs(id) | Parent program |
| `transaction_name` | VARCHAR(200) | NOT NULL | Transaction name |
| `ceding_company_id` | UUID | FOREIGN KEY → companies(id) | Ceding company |
| `reinsurer_id` | UUID | FOREIGN KEY → companies(id) | Reinsurer |
| `effective_date` | DATE | NOT NULL | Contract effective date |
| `expiry_date` | DATE | NOT NULL | Contract expiry date |
| `premium` | DECIMAL(15,2) | | Transaction premium |
| `status` | ENUM('active', 'pending', 'draft', 'cancelled') | NOT NULL | Transaction status |
| `transaction_type` | ENUM('brand-new', 'renewal') | | Transaction type |
| `subject_business` | TEXT | | Description of subject business |
| `risk_period_start` | DATE | | Risk period start date |
| `risk_period_end` | DATE | | Risk period end date |
| `ramp_up_period_end` | DATE | | Ramp-up period end date |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_transactions_program` on `program_id`
- `idx_transactions_status` on `status`
- `idx_transactions_dates` on `effective_date, expiry_date`

**Sample Data:**
```sql
uuid-1 → "Blue Commercial Auto 2020" (Plum Insurers → Global Re, 01/01/2024-12/31/2024, Active)
uuid-2 → "Red Worker's Comp 2021" (Guava Insurers → Eagle Re, 02/01/2024-12/31/2024, Pending)
```

---

### **Table: `contracts`**
Legal contracts and documents

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `transaction_id` | UUID | FOREIGN KEY → transactions(id) | Parent transaction |
| `contract_name` | VARCHAR(200) | NOT NULL | Contract name |
| `contract_type` | ENUM('reinsurance_trust', 'reinsurance_schedule', 'other') | NOT NULL | Contract type |
| `amended` | BOOLEAN | DEFAULT FALSE | Whether contract is amended |
| `signed_date` | DATE | | Signature date |
| `effective_date` | DATE | | Contract effective date |
| `page_count` | INTEGER | | Number of pages in document |
| `document_url` | TEXT | | URL/path to contract document |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_contracts_transaction` on `transaction_id`
- `idx_contracts_type` on `contract_type`

**Sample Data:**
```sql
uuid-1 → "Liberty Mutual Re Trust 2024-A" (reinsurance_trust, Yes, 2024-01-10, 42 pages)
uuid-2 → "RS-2024-001 American Insurance Co." (reinsurance_schedule, Yes, 2023-12-28, 67 pages)
```

---

### **Table: `bdx_uploads`**
Bordereau (BDX) monthly uploads

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `transaction_id` | UUID | FOREIGN KEY → transactions(id) | Parent transaction |
| `document_type` | ENUM('policy', 'claims') | NOT NULL | Type of bordereau |
| `month` | DATE | NOT NULL | Month of data (stored as first day of month) |
| `status` | ENUM('success', 'error', 'progress', 'attention', 'add', 'prohibited') | NOT NULL | Upload status |
| `file_name` | VARCHAR(255) | | Original file name |
| `file_url` | TEXT | | URL/path to uploaded file |
| `uploaded_at` | TIMESTAMP | | Upload timestamp |
| `processed_at` | TIMESTAMP | | Processing completion timestamp |
| `error_message` | TEXT | | Error details if status is error |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_bdx_transaction` on `transaction_id`
- `idx_bdx_month` on `month`
- `idx_bdx_status` on `status`

**Unique Constraint:**
- `unique_bdx_upload` on (`transaction_id`, `document_type`, `month`)

**Sample Data:**
```sql
uuid-1 → Transaction X, policy, 2024-01, success, "policy_jan_2024.xlsx"
uuid-2 → Transaction X, claims, 2024-02, error, "claims_feb_2024.xlsx"
```

---

### **Table: `valuations`**
Valuation evaluations for programs

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `program_id` | UUID | FOREIGN KEY → programs(id) | Parent program |
| `evaluation_date` | DATE | NOT NULL | Valuation date |
| `reported_loss_ratio` | DECIMAL(5,2) | | Reported loss ratio |
| `current_written_premium` | DECIMAL(15,2) | | Current written premium |
| `official_status` | ENUM('reviewed', 'pending', 'none') | NOT NULL | Review status |
| `notes` | TEXT | | Valuation notes |
| `created_by` | VARCHAR(100) | | User who created valuation |
| `reviewed_by` | VARCHAR(100) | | User who reviewed valuation |
| `reviewed_at` | TIMESTAMP | | Review timestamp |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_valuations_program` on `program_id`
- `idx_valuations_date` on `evaluation_date`
- `idx_valuations_status` on `official_status`

**Unique Constraint:**
- `unique_valuation_program_date` on (`program_id`, `evaluation_date`)

**Sample Data:**
```sql
uuid-1 → Program X, 2024-12-31, reviewed
uuid-2 → Program X, 2024-11-30, pending
```

---

### **Table: `triangles`**
Loss development triangles for valuations

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `valuation_id` | UUID | FOREIGN KEY → valuations(id) | Parent valuation |
| `triangle_name` | VARCHAR(100) | NOT NULL | Triangle identifier (UUID-like) |
| `triangle_type` | VARCHAR(50) | | Triangle type (e.g., "paid", "incurred", "case") |
| `position` | ENUM('left', 'center', 'right') | NOT NULL | Visual position indicator |
| `color` | VARCHAR(7) | | Hex color for visualization |
| `status` | ENUM('completed', 'add', 'pending-review') | NOT NULL | Triangle status |
| `data_json` | JSONB | | Triangle data structure (chart data) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_triangles_valuation` on `valuation_id`
- `idx_triangles_status` on `status`

**Unique Constraint:**
- `unique_triangle_valuation_position` on (`valuation_id`, `position`)

**Sample Data:**
```sql
uuid-1 → Valuation 1, "cd12345e-6789...", paid, left, #BD8B11, completed
uuid-2 → Valuation 1, "ab67890f-1234...", incurred, center, #744DEB, completed
uuid-3 → Valuation 1, "ef34567g-5678...", case, right, #3DA3CB, add
```

**`data_json` Structure:**
```json
{
  "heatmap": [...],
  "growth_curve": [...],
  "mountain": [...],
  "age_to_age": [...]
}
```

---

## 4. Hierarchical Entity Implementation

### **4.1: Entity Hierarchy in Practice**

The application implements a four-level hierarchy:

```typescript
// hooks/useEntities.ts - Hierarchical data structure
interface EntityHierarchy {
  reinsurers: Reinsurer[];
  mgas: MGA[];
  programs: Program[];
  transactions: Transaction[];
}

// Example hierarchy:
Pineapple Re (Reinsurer)
├── Lion Underwriting (MGA - Commercial Auto)
│   ├── Blue Commercial Auto 2020 (Program)
│   │   ├── Transaction A
│   │   └── Transaction B
│   └── Green Commercial Auto 2021 (Program)
└── Falcon Risk Services (MGA - Property)
    ├── Red Property Program (Program)
    └── Yellow Property Program (Program)
```

### **4.2: Aggregated Metrics Flow**

Metrics are calculated bottom-up through the hierarchy:

```typescript
// Deterministic metrics generation using entity ID hashing
const generateMetrics = (entityId: string, entityType: string) => {
  const hash = simpleHash(entityId);
  return {
    cession: Math.floor(hash % 100) + 1,
    dataValidation: Math.floor((hash * 1.1) % 100) + 1,
    claims: Math.floor((hash * 1.2) % 100) + 1,
    insights: Math.floor((hash * 1.3) % 100) + 1,
    dataIngestion: Math.floor((hash * 1.4) % 100) + 1,
    contracts: Math.floor((hash * 1.5) % 100) + 1
  };
};
```

### **4.3: Cross-Page Data Flow**

```typescript
// Entity data passing between pages
interface EntityData {
  id: string;
  name: string;
  type: 'Reinsurer' | 'MGA' | 'Program' | 'Transaction';
  path: string; // Breadcrumb path showing hierarchy
  parents?: {
    reinsurer?: { id: string; name: string };
    mga?: { id: string; name: string };
    program?: { id: string; name: string };
  };
}
```

### **4.4: Database Relationships Implementation**

```sql
-- Migration 10: Reinsurers table creation
CREATE TABLE reinsurers (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'Reinsurer',
  country VARCHAR(100) NOT NULL,
  rating VARCHAR(10),
  specialization TEXT
);

-- Migration 11: MGAs table with reinsurer relationship
CREATE TABLE mgas (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'MGA',
  product_line VARCHAR(100),
  country VARCHAR(100) NOT NULL,
  reinsurer_id VARCHAR(50),
  CONSTRAINT fk_mgas_reinsurer FOREIGN KEY (reinsurer_id) REFERENCES reinsurers(id)
);

-- Programs table updated with MGA relationship
ALTER TABLE programs ADD COLUMN mga_id VARCHAR(50);
ALTER TABLE programs ADD CONSTRAINT fk_programs_mga 
  FOREIGN KEY (mga_id) REFERENCES mgas(id);
```

---

## 5. Implementation Plan

### **Phase 1: Database Setup**

#### **Step 1.1: Choose Database Technology**
**Recommendation: PostgreSQL**
- Excellent support for JSON/JSONB (for triangle data)
- Strong ACID compliance
- Great performance with proper indexing
- Free and open-source

**Alternative: SQLite (for prototyping)**
- Simpler setup
- File-based (good for development)
- Limited JSON support

#### **Step 1.2: Create Migration Scripts** - COMPLETED

Migration files have been created in the `database/` folder:

```
/Users/diegoleal/Desktop/Library/database/
├── migrations/
│   ├── 001_create_product_lines.sql
│   ├── 002_create_companies.sql
│   ├── 003_create_programs.sql
│   ├── 004_create_transactions.sql
│   ├── 005_create_contracts.sql
│   ├── 006_create_bdx_uploads.sql
│   ├── 007_create_valuations.sql
│   ├── 008_create_triangles.sql
│   ├── 009_create_combined_schema.sql (complete schema)
│   ├── 010_create_reinsurers_table.sql ✅ NEW
│   └── 011_create_mgas_table.sql ✅ NEW
├── schema.sql (combined schema)
└── README.md (setup instructions)
```

**Latest Migrations:**
- **Migration 10**: Creates reinsurers table with fruit-themed sample data (4 reinsurers)
- **Migration 11**: Creates MGAs table with animal-themed sample data (8 MGAs), establishes hierarchical relationships

#### **Step 1.3: Database Connection**

Install dependencies:
```bash
npm install pg # PostgreSQL client
# OR
npm install better-sqlite3 # SQLite client
```

Create connection utility:
```typescript
// database/connection.ts
import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ledger_db',
  user: process.env.DB_USER || 'ledger_user',
  password: process.env.DB_PASSWORD || 'password',
});
```

---

### **Phase 2: API Layer**

#### **Step 2.1: Create API Routes** - UPDATED

Use **Next.js API routes** or a separate **Express server**:

```
/Users/diegoleal/Desktop/Library/api/
├── reinsurers/           # NEW - Hierarchical top level
│   ├── index.ts          # GET /api/reinsurers (list with metrics)
│   ├── [id].ts           # GET /api/reinsurers/:id (with MGAs)
│   └── [id]/mgas.ts      # GET /api/reinsurers/:id/mgas
├── mgas/                 # NEW - Second level hierarchy
│   ├── index.ts          # GET /api/mgas (list with filters)
│   ├── [id].ts           # GET /api/mgas/:id (with programs)
│   └── [id]/programs.ts  # GET /api/mgas/:id/programs
├── programs/
│   ├── index.ts          # GET /api/programs (list with filters)
│   ├── [id].ts           # GET /api/programs/:id
│   ├── create.ts         # POST /api/programs
│   ├── [id]/transactions.ts  # GET /api/programs/:id/transactions
│   └── [id]/valuations.ts    # GET /api/programs/:id/valuations
├── entities/             # NEW - Unified entity endpoint
│   ├── index.ts          # GET /api/entities (hierarchical tree)
│   ├── search.ts         # GET /api/entities/search?q=query
│   └── metrics.ts        # GET /api/entities/metrics/:id
├── transactions/
│   ├── index.ts
│   ├── [id].ts
│   └── create.ts
├── valuations/
│   ├── index.ts
│   ├── [id].ts
│   └── create.ts
├── triangles/
│   ├── index.ts
│   ├── [id].ts
│   └── create.ts
└── ... (other entities)
```

### **NEW: Hierarchical API Endpoints**

#### **GET /api/entities** - Unified Entity Tree
Returns complete hierarchical structure with aggregated metrics:

```typescript
interface EntityTreeResponse {
  reinsurers: Array<{
    id: string;
    name: string;
    type: 'Reinsurer';
    country: string;
    rating: string;
    metrics: EntityMetrics;
    mgas: Array<{
      id: string;
      name: string;
      type: 'MGA';
      product_line: string;
      metrics: EntityMetrics;
      programs: Array<{
        id: string;
        name: string;
        type: 'Program';
        product_line_name: string;
        metrics: EntityMetrics;
        transactions: Transaction[];
      }>;
    }>;
  }>;
}

interface EntityMetrics {
  cession: number;
  dataValidation: number;
  claims: number;
  insights: number;
  dataIngestion: number;
  contracts: number;
}
```

#### **GET /api/entities/search?q=query&type=all** - Entity Search
Search across all entity types with highlighting:

```typescript
interface EntitySearchResponse {
  results: Array<{
    id: string;
    name: string;
    type: 'Reinsurer' | 'MGA' | 'Program' | 'Transaction';
    path: string; // e.g., "Pineapple Re > Lion Underwriting > Blue Auto 2020"
    parents: {
      reinsurer?: { id: string; name: string };
      mga?: { id: string; name: string };
      program?: { id: string; name: string };
    };
    metrics: EntityMetrics;
    match_score: number;
  }>;
  total: number;
}
```

#### **Step 2.2: Create Data Access Layer** - UPDATED

```typescript
// database/repositories/EntityRepository.ts - NEW
export class EntityRepository {
  async getHierarchicalTree(): Promise<EntityTreeResponse> {
    const query = `
      SELECT 
        r.id as reinsurer_id, r.name as reinsurer_name, r.country, r.rating,
        m.id as mga_id, m.name as mga_name, m.product_line,
        p.id as program_id, p.name as program_name, pl.name as product_line_name,
        p.current_loss_ratio, p.premium,
        COUNT(DISTINCT t.id) as transaction_count
      FROM reinsurers r
      LEFT JOIN mgas m ON r.id = m.reinsurer_id
      LEFT JOIN programs p ON m.id = p.mga_id
      LEFT JOIN product_lines pl ON p.product_line_id = pl.id
      LEFT JOIN transactions t ON p.id = t.program_id
      GROUP BY r.id, r.name, r.country, r.rating, m.id, m.name, m.product_line,
               p.id, p.name, pl.name, p.current_loss_ratio, p.premium
      ORDER BY r.name, m.name, p.name
    `;
    
    const result = await pool.query(query);
    return this.buildHierarchicalTree(result.rows);
  }

  private buildHierarchicalTree(rows: any[]): EntityTreeResponse {
    const reinsurersMap = new Map();
    
    rows.forEach(row => {
      if (!reinsurersMap.has(row.reinsurer_id)) {
        reinsurersMap.set(row.reinsurer_id, {
          id: row.reinsurer_id,
          name: row.reinsurer_name,
          type: 'Reinsurer',
          country: row.country,
          rating: row.rating,
          metrics: generateMetrics(row.reinsurer_id, 'Reinsurer'),
          mgas: new Map()
        });
      }
      
      // Build MGAs and Programs hierarchy...
    });
    
    return { reinsurers: Array.from(reinsurersMap.values()) };
  }

  async searchEntities(query: string, type?: string): Promise<EntitySearchResponse> {
    // Implementation for cross-entity search with full-text capabilities
  }
}

// database/repositories/ReinsurerRepository.ts - NEW
export class ReinsurerRepository {
  async findAll(): Promise<Reinsurer[]> {
    const query = `
      SELECT r.*, COUNT(DISTINCT m.id) as mga_count,
             COUNT(DISTINCT p.id) as program_count
      FROM reinsurers r
      LEFT JOIN mgas m ON r.id = m.reinsurer_id
      LEFT JOIN programs p ON m.id = p.mga_id
      GROUP BY r.id
      ORDER BY r.name
    `;
    const result = await pool.query(query);
    return result.rows.map(row => ({
      ...row,
      metrics: generateMetrics(row.id, 'Reinsurer')
    }));
  }

  async findByIdWithMGAs(id: string): Promise<ReinsurerWithMGAs | null> {
    const query = `
      SELECT r.*,
             json_agg(
               json_build_object(
                 'id', m.id,
                 'name', m.name,
                 'product_line', m.product_line,
                 'country', m.country,
                 'program_count', COALESCE(mga_programs.program_count, 0)
               )
             ) FILTER (WHERE m.id IS NOT NULL) as mgas
      FROM reinsurers r
      LEFT JOIN mgas m ON r.id = m.reinsurer_id
      LEFT JOIN (
        SELECT mga_id, COUNT(*) as program_count
        FROM programs
        GROUP BY mga_id
      ) mga_programs ON m.id = mga_programs.mga_id
      WHERE r.id = $1
      GROUP BY r.id
    `;
    
    const result = await pool.query(query, [id]);
    if (!result.rows[0]) return null;
    
    return {
      ...result.rows[0],
      metrics: generateMetrics(id, 'Reinsurer'),
      mgas: result.rows[0].mgas?.map(mga => ({
        ...mga,
        metrics: generateMetrics(mga.id, 'MGA')
      })) || []
    };
  }
}

// database/repositories/MGARepository.ts - NEW
export class MGARepository {
  async findAll(filters?: MGAFilters): Promise<MGA[]> {
    let query = `
      SELECT m.*, r.name as reinsurer_name,
             COUNT(DISTINCT p.id) as program_count
      FROM mgas m
      LEFT JOIN reinsurers r ON m.reinsurer_id = r.id
      LEFT JOIN programs p ON m.id = p.mga_id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    
    if (filters?.reinsurer_id) {
      query += ` AND m.reinsurer_id = $${params.length + 1}`;
      params.push(filters.reinsurer_id);
    }
    
    if (filters?.product_line) {
      query += ` AND m.product_line = $${params.length + 1}`;
      params.push(filters.product_line);
    }
    
    query += ` GROUP BY m.id, r.name ORDER BY m.name`;
    
    const result = await pool.query(query, params);
    return result.rows.map(row => ({
      ...row,
      metrics: generateMetrics(row.id, 'MGA')
    }));
  }

  async findByIdWithPrograms(id: string): Promise<MGAWithPrograms | null> {
    const query = `
      SELECT m.*, r.name as reinsurer_name,
             json_agg(
               json_build_object(
                 'id', p.id,
                 'name', p.name,
                 'product_line_name', pl.name,
                 'current_loss_ratio', p.current_loss_ratio,
                 'premium', p.premium,
                 'transaction_count', COALESCE(prog_trans.transaction_count, 0)
               )
             ) FILTER (WHERE p.id IS NOT NULL) as programs
      FROM mgas m
      LEFT JOIN reinsurers r ON m.reinsurer_id = r.id
      LEFT JOIN programs p ON m.id = p.mga_id
      LEFT JOIN product_lines pl ON p.product_line_id = pl.id
      LEFT JOIN (
        SELECT program_id, COUNT(*) as transaction_count
        FROM transactions
        GROUP BY program_id
      ) prog_trans ON p.id = prog_trans.program_id
      WHERE m.id = $1
      GROUP BY m.id, r.name
    `;
    
    const result = await pool.query(query, [id]);
    if (!result.rows[0]) return null;
    
    return {
      ...result.rows[0],
      metrics: generateMetrics(id, 'MGA'),
      programs: result.rows[0].programs?.map(program => ({
        ...program,
        metrics: generateMetrics(program.id, 'Program')
      })) || []
    };
  }
}
```

---

### **Phase 3: Frontend Integration**

#### **Step 3.1: Create Data Hooks** - UPDATED WITH HIERARCHICAL SUPPORT

```typescript
// hooks/useEntities.ts - IMPLEMENTED ✅
import { useState, useEffect, useMemo } from 'react';

interface EntityMetrics {
  cession: number;
  dataValidation: number;
  claims: number;
  insights: number;
  dataIngestion: number;
  contracts: number;
}

export interface Reinsurer {
  id: string;
  name: string;
  type: 'Reinsurer';
  country: string;
  rating: string;
  specialization: string;
  metrics: EntityMetrics;
}

export interface MGA {
  id: string;
  name: string;
  type: 'MGA';
  product_line: string;
  country: string;
  reinsurer_id: string;
  metrics: EntityMetrics;
}

export interface Program {
  id: string;
  name: string;
  type: 'Program';
  product_line_name: string;
  current_loss_ratio: number;
  premium: number;
  mga_id: string;
  reinsurer_id: string;
  metrics: EntityMetrics;
}

export interface Transaction {
  id: string;
  name: string;
  type: 'Transaction';
  program_id: string;
  status: string;
  effective_date: string;
  metrics: EntityMetrics;
}

/**
 * Central hook for managing hierarchical entity data
 * Used by Reports Explorer and other components needing entity relationships
 */
export const useEntities = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Build hierarchical structure from database data
  const entities = useMemo(() => {
    // Mock data representing database structure
    // In real implementation, this would fetch from /api/entities
    
    const reinsurers: Reinsurer[] = [
      {
        id: 'pineapple-re',
        name: 'Pineapple Re',
        type: 'Reinsurer',
        country: 'Bermuda',
        rating: 'A-',
        specialization: 'Property-cat treaties',
        metrics: generateMetrics('pineapple-re', 'Reinsurer')
      },
      // ... other reinsurers
    ];

    const mgas: MGA[] = [
      {
        id: 'lion-underwriting',
        name: 'Lion Underwriting',
        type: 'MGA',
        product_line: 'Commercial Auto',
        country: 'USA',
        reinsurer_id: 'pineapple-re',
        metrics: generateMetrics('lion-underwriting', 'MGA')
      },
      // ... other MGAs
    ];

    const programs: Program[] = [
      {
        id: 'prog-001',
        name: 'Blue Commercial Auto 2020',
        type: 'Program',
        product_line_name: 'Commercial Auto',
        current_loss_ratio: 75.00,
        premium: 250000,
        mga_id: 'lion-underwriting',
        reinsurer_id: 'pineapple-re',
        metrics: generateMetrics('prog-001', 'Program')
      },
      // ... other programs
    ];

    return { reinsurers, mgas, programs, transactions: [] };
  }, []);

  // Build tree data for dropdown selection
  const treeData = useMemo(() => {
    const tree: any[] = [];

    entities.reinsurers.forEach(reinsurer => {
      const reinsurerNode = {
        key: reinsurer.id,
        title: reinsurer.name,
        value: reinsurer.id,
        entityType: 'Reinsurer',
        data: reinsurer,
        children: []
      };

      entities.mgas
        .filter(mga => mga.reinsurer_id === reinsurer.id)
        .forEach(mga => {
          const mgaNode = {
            key: mga.id,
            title: mga.name,
            value: mga.id,
            entityType: 'MGA',
            data: mga,
            children: []
          };

          entities.programs
            .filter(program => program.mga_id === mga.id)
            .forEach(program => {
              const programNode = {
                key: program.id,
                title: program.name,
                value: program.id,
                entityType: 'Program',
                data: program,
                children: []
              };

              mgaNode.children.push(programNode);
            });

          reinsurerNode.children.push(mgaNode);
        });

      tree.push(reinsurerNode);
    });

    return tree;
  }, [entities]);

  // Helper function to get entity parents for breadcrumb display
  const getEntityParents = (entityId: string, entityType: string) => {
    const parents: any = {};

    if (entityType === 'Program') {
      const program = entities.programs.find(p => p.id === entityId);
      if (program) {
        const mga = entities.mgas.find(m => m.id === program.mga_id);
        const reinsurer = entities.reinsurers.find(r => r.id === program.reinsurer_id);
        
        if (mga) parents.mga = { id: mga.id, name: mga.name };
        if (reinsurer) parents.reinsurer = { id: reinsurer.id, name: reinsurer.name };
      }
    } else if (entityType === 'MGA') {
      const mga = entities.mgas.find(m => m.id === entityId);
      if (mga) {
        const reinsurer = entities.reinsurers.find(r => r.id === mga.reinsurer_id);
        if (reinsurer) parents.reinsurer = { id: reinsurer.id, name: reinsurer.name };
      }
    }

    return parents;
  };

  // Helper function to build entity path for breadcrumb display
  const getEntityPath = (entityId: string, entityType: string): string => {
    const parents = getEntityParents(entityId, entityType);
    const pathParts = [];

    if (parents.reinsurer) pathParts.push(parents.reinsurer.name);
    if (parents.mga) pathParts.push(parents.mga.name);
    
    // Add current entity name
    let currentEntityName = '';
    if (entityType === 'Reinsurer') {
      currentEntityName = entities.reinsurers.find(r => r.id === entityId)?.name || '';
    } else if (entityType === 'MGA') {
      currentEntityName = entities.mgas.find(m => m.id === entityId)?.name || '';
    } else if (entityType === 'Program') {
      currentEntityName = entities.programs.find(p => p.id === entityId)?.name || '';
    }
    
    if (currentEntityName) pathParts.push(currentEntityName);
    
    return pathParts.join(' > ');
  };

  // Set initial loading state
  useEffect(() => {
    setLoading(false);
  }, []);

  return {
    entities,
    treeData,
    loading,
    error,
    getEntityParents,
    getEntityPath
  };
};

// Deterministic metrics generation using entity ID hashing
const generateMetrics = (entityId: string, entityType: string): EntityMetrics => {
  const hash = simpleHash(entityId);
  return {
    cession: Math.floor(hash % 100) + 1,
    dataValidation: Math.floor((hash * 1.1) % 100) + 1,
    claims: Math.floor((hash * 1.2) % 100) + 1,
    insights: Math.floor((hash * 1.3) % 100) + 1,
    dataIngestion: Math.floor((hash * 1.4) % 100) + 1,
    contracts: Math.floor((hash * 1.5) % 100) + 1
  };
};

const simpleHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// hooks/usePrograms.ts - Updated to work with hierarchy
export const usePrograms = (filters?: ProgramFilters) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        let url = '/api/programs';
        
        // Add hierarchical filters
        if (filters?.mga_id) {
          url = `/api/mgas/${filters.mga_id}/programs`;
        } else if (filters?.reinsurer_id) {
          url = `/api/reinsurers/${filters.reinsurer_id}/programs`;
        }
        
        const response = await fetch(url + buildQueryString(filters));
        const data = await response.json();
        setPrograms(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [filters]);

  return { programs, loading, error };
};
```

#### **Step 3.2: Update Page Components**

Replace hardcoded data with API calls:

**Before:**
```typescript
// ReportsInsightsExplorer.tsx
const programsData: Program[] = [
  { id: '1', name: 'Blue Commercial Auto 2020', ... },
  // ... hardcoded data
];
```

**After:**
```typescript
// ReportsInsightsExplorer.tsx
import { usePrograms } from '@/hooks/usePrograms';

export const ReportsInsightsExplorer: React.FC = ({ onNavigateToPage }) => {
  const { programs, loading, error } = usePrograms();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Layout>
      {/* Use programs data */}
    </Layout>
  );
};
```

---

### **Phase 4: Migration Strategy**

#### **Option A: Gradual Migration (Recommended)**

1. **Week 1**: Set up database + API for Programs
2. **Week 2**: Migrate `ReportsInsightsExplorer` to use API
3. **Week 3**: Set up Transactions API + migrate transaction pages
4. **Week 4**: Set up Valuations/Triangles API + migrate analytics pages
5. **Week 5**: Set up Contracts/BDX API + complete migration

#### **Option B: Dual Mode**

Keep hardcoded data as fallback:

```typescript
const USE_API = process.env.NEXT_PUBLIC_USE_API === 'true';

const programs = USE_API
  ? usePrograms().programs  // From API
  : hardcodedProgramsData;  // Fallback
```

---

### **Phase 5: Advanced Features**

#### **5.1: Real-time Updates**
- Use WebSockets or Server-Sent Events for live data
- Update pages when data changes without refresh

#### **5.2: Caching Strategy**
- Implement Redis for frequently accessed data
- Cache program lists, valuation summaries

#### **5.3: Search & Filtering**
- Full-text search on program names, transaction names
- Advanced filters (date ranges, status, product lines)

#### **5.4: Data Validation**
- Use Zod or Yup for schema validation
- Validate data before database insertion

#### **5.5: Audit Logging**
- Track who created/updated/deleted records
- Add `audit_log` table for compliance

---

## 5. Technology Stack Recommendations

### **Backend**
- **Database**: PostgreSQL 15+
- **ORM (Optional)**: Prisma or Drizzle ORM
- **API Framework**: Next.js API Routes or Express.js
- **Validation**: Zod
- **Authentication**: NextAuth.js or Clerk

### **Frontend**
- **State Management**: React Query (TanStack Query) for server state
- **Forms**: React Hook Form
- **Date Handling**: date-fns or Day.js

### **DevOps**
- **Database Hosting**: Supabase, Neon, or Railway
- **Migrations**: node-pg-migrate or Prisma Migrate
- **Testing**: Jest + Testing Library

---

## 6. Sample Implementation Code

### **6.1: Create Program API Endpoint**

```typescript
// pages/api/programs/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { ProgramRepository } from '@/database/repositories/ProgramRepository';

const programRepo = new ProgramRepository();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { search, productLineId, minLossRatio, maxLossRatio } = req.query;

      const programs = await programRepo.findAll({
        search: search as string,
        productLineId: productLineId ? parseInt(productLineId as string) : undefined,
        lossRatioRange: minLossRatio && maxLossRatio
          ? [parseFloat(minLossRatio as string), parseFloat(maxLossRatio as string)]
          : undefined
      });

      res.status(200).json(programs);
    } catch (error) {
      console.error('Error fetching programs:', error);
      res.status(500).json({ error: 'Failed to fetch programs' });
    }
  } else if (req.method === 'POST') {
    try {
      const program = await programRepo.create(req.body);
      res.status(201).json(program);
    } catch (error) {
      console.error('Error creating program:', error);
      res.status(500).json({ error: 'Failed to create program' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

### **6.2: Program Repository**

```typescript
// database/repositories/ProgramRepository.ts
import { pool } from '../connection';
import { Program, ProgramFilters, CreateProgramDTO } from '@/types';

export class ProgramRepository {
  async findAll(filters?: ProgramFilters): Promise<Program[]> {
    let query = `
      SELECT
        p.*,
        pl.name as product_line_name,
        COUNT(DISTINCT t.id) as transaction_count
      FROM programs p
      LEFT JOIN product_lines pl ON p.product_line_id = pl.id
      LEFT JOIN transactions t ON p.id = t.program_id
      WHERE 1=1
    `;

    const params: any[] = [];

    if (filters?.search) {
      query += ` AND p.name ILIKE $${params.length + 1}`;
      params.push(`%${filters.search}%`);
    }

    if (filters?.productLineId) {
      query += ` AND p.product_line_id = $${params.length + 1}`;
      params.push(filters.productLineId);
    }

    if (filters?.lossRatioRange) {
      query += ` AND p.current_loss_ratio BETWEEN $${params.length + 1} AND $${params.length + 2}`;
      params.push(filters.lossRatioRange[0], filters.lossRatioRange[1]);
    }

    query += ` GROUP BY p.id, pl.name ORDER BY p.name`;

    const result = await pool.query(query, params);
    return result.rows;
  }

  async findById(id: string): Promise<Program | null> {
    const query = `
      SELECT p.*, pl.name as product_line_name
      FROM programs p
      LEFT JOIN product_lines pl ON p.product_line_id = pl.id
      WHERE p.id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async create(data: CreateProgramDTO): Promise<Program> {
    const query = `
      INSERT INTO programs (name, product_line_id, current_loss_ratio, quota_share_premium, premium, owner)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const result = await pool.query(query, [
      data.name,
      data.productLineId,
      data.currentLossRatio,
      data.quotaSharePremium,
      data.premium,
      data.owner
    ]);

    return result.rows[0];
  }
}
```

---

## 7. Next Steps

### **Immediate Actions:**

1. **Review & Approve Schema** - Discuss this design with the team
2. **Set up PostgreSQL** - Install locally or use hosted service
3. **Create Migration Files** - Write SQL scripts for all tables
4. **Implement One Entity End-to-End** - Start with Programs as proof of concept
5. **Test API Integration** - Ensure API works with one page first
6. **Gradually Migrate Pages** - Move one page at a time to reduce risk

### **Questions to Resolve:**

1. Do you want to use an ORM (Prisma/Drizzle) or raw SQL?
2. Should we support offline mode with local caching?
3. Do you need multi-user support with authentication?
4. What's your preference: Next.js API routes vs. separate Express server?
5. Should triangle chart data be stored as JSON or normalized tables?

---

## 8. Benefits of This Design

✅ **Normalized Structure** - Reduces data duplication
✅ **Scalable** - Can handle growing data volumes
✅ **Flexible Queries** - Easy to filter, search, and aggregate
✅ **Maintains Relationships** - Clear connections between entities
✅ **Type-Safe** - Can generate TypeScript types from schema
✅ **Performance** - Proper indexes for fast queries
✅ **Future-Proof** - Easy to extend with new features

---

## 9. Implementation Status Summary

### **✅ COMPLETED**
- **Database Schema**: Hierarchical structure with reinsurers and MGAs tables
- **Migration Files**: 11 migration files including new hierarchical relationships
- **Frontend Hook**: `useEntities.ts` implemented with hierarchical data management
- **Page Integration**: Reports Explorer updated to use hierarchical entity selection
- **Cross-Page Data Flow**: Entity data passing between Reports Explorer and Cash Settlement
- **Parent Relationships**: Dynamic "Part of" breadcrumb display
- **Deterministic Metrics**: Hash-based consistent metrics generation

### **📋 IMPLEMENTATION ROADMAP**
1. **Phase 1 (COMPLETED)**: Database structure and migrations
2. **Phase 2 (READY)**: API layer implementation with hierarchical endpoints
3. **Phase 3 (IN PROGRESS)**: Frontend integration with existing pages
4. **Phase 4 (PENDING)**: Real database connection and API endpoints
5. **Phase 5 (FUTURE)**: Advanced features (caching, search, real-time updates)

### **🎯 CURRENT WORKING STRUCTURE**
```
Reinsurer (e.g., Pineapple Re)
  ├─ MGA (e.g., Lion Underwriting - Commercial Auto)
  │   ├─ Program (e.g., Blue Commercial Auto 2020)
  │   │   ├─ Transaction A
  │   │   ├─ Transaction B
  │   │   └─ Valuations/Triangles
  │   └─ Program (e.g., Green Commercial Auto 2021)
  └─ MGA (e.g., Falcon Risk Services - Property)
      ├─ Program (Red Property Program)
      └─ Program (Yellow Property Program)
```

### **🔗 KEY FILES CREATED/UPDATED**
- `database/migrations/010_create_reinsurers_table.sql` ✅ NEW
- `database/migrations/011_create_mgas_table.sql` ✅ NEW  
- `hooks/useEntities.ts` ✅ IMPLEMENTED
- `pages/ReportsExplorer.tsx` ✅ UPDATED (hierarchical entity selection)
- `pages/ReportsCashSettlement.tsx` ✅ UPDATED (dynamic entity display)
- `pages/App.tsx` ✅ UPDATED (entity data flow)

### **🚀 NEXT STEPS**
1. **Connect to Real Database**: Replace mock data with actual API calls
2. **Implement API Endpoints**: Create the hierarchical endpoints documented above
3. **Add Search Functionality**: Implement cross-entity search capabilities
4. **Performance Optimization**: Add caching and query optimization
5. **Test Data Integration**: Ensure all pages work with real database relationships

**Ready to implement Phase 2 (API Layer) or continue with additional frontend integration!**
