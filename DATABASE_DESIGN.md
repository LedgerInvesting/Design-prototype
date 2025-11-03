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

```
PRODUCT_LINES
    ↓ (1:M)
PROGRAMS
    ↓ (1:M)              ↓ (1:M)
TRANSACTIONS        VALUATIONS
    ↓ (1:M)              ↓ (1:M)
CONTRACTS           TRIANGLES
    ↓ (1:M)
BDX_UPLOADS

COMPANIES (M:M with TRANSACTIONS via ceding_company_id and reinsurer_id)
```

### **Detailed Relationships**

- **One Program** has many **Transactions**
- **One Program** has many **Valuations**
- **One Transaction** has many **Contracts**
- **One Transaction** has many **BDX Uploads**
- **One Valuation** has many **Triangles** (typically 3: left/center/right positions)
- **Product Lines** categorize **Programs**
- **Companies** are referenced by **Transactions** (as ceding company and reinsurer)

---

## 3. Database Schema Design

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

### **Table: `programs`**
Insurance programs (central entity)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `name` | VARCHAR(200) | NOT NULL | Program name |
| `product_line_id` | INTEGER | FOREIGN KEY → product_lines(id) | Product category |
| `current_loss_ratio` | DECIMAL(5,2) | | Current loss ratio percentage |
| `quota_share_premium` | DECIMAL(15,2) | | Quota share premium amount |
| `premium` | DECIMAL(15,2) | | Total premium amount |
| `owner` | VARCHAR(100) | | Program owner/manager |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_programs_name` on `name`
- `idx_programs_product_line` on `product_line_id`

**Sample Data:**
```sql
uuid-1 → "Blue Commercial Auto 2020" (Motor, 75% loss ratio, $250K premium)
uuid-2 → "Red Worker's Comp 2021" (Workers' Comp, 100% loss ratio, $1.4M premium)
```

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

## 4. Implementation Plan

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

#### **Step 1.2: Create Migration Scripts**

Create a `database/` folder with migration files:

```
E:\Ledger design library\database\
├── migrations\
│   ├── 001_create_product_lines.sql
│   ├── 002_create_companies.sql
│   ├── 003_create_programs.sql
│   ├── 004_create_transactions.sql
│   ├── 005_create_contracts.sql
│   ├── 006_create_bdx_uploads.sql
│   ├── 007_create_valuations.sql
│   ├── 008_create_triangles.sql
│   └── 009_seed_data.sql
├── schema.sql (combined schema)
└── README.md (setup instructions)
```

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

#### **Step 2.1: Create API Routes**

Use **Next.js API routes** or a separate **Express server**:

```
E:\Ledger design library\api\
├── programs\
│   ├── index.ts          # GET /api/programs (list with filters)
│   ├── [id].ts           # GET /api/programs/:id
│   └── create.ts         # POST /api/programs
├── transactions\
│   ├── index.ts
│   ├── [id].ts
│   └── create.ts
├── valuations\
│   ├── index.ts
│   ├── [id].ts
│   └── create.ts
├── triangles\
│   ├── index.ts
│   ├── [id].ts
│   └── create.ts
└── ... (other entities)
```

#### **Step 2.2: Create Data Access Layer**

```typescript
// database/repositories/ProgramRepository.ts
export class ProgramRepository {
  async findAll(filters?: ProgramFilters): Promise<Program[]> {
    // SQL query with filtering
  }

  async findById(id: string): Promise<Program | null> {
    // SQL query by ID
  }

  async create(data: CreateProgramDTO): Promise<Program> {
    // INSERT query
  }

  async update(id: string, data: UpdateProgramDTO): Promise<Program> {
    // UPDATE query
  }

  async delete(id: string): Promise<void> {
    // DELETE query
  }
}
```

---

### **Phase 3: Frontend Integration**

#### **Step 3.1: Create Data Hooks**

```typescript
// hooks/usePrograms.ts
import { useState, useEffect } from 'react';

export const usePrograms = (filters?: ProgramFilters) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/programs' + buildQueryString(filters));
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

**Ready to implement? Let me know which phase you'd like to start with!**
