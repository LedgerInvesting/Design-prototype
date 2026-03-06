/**
 * Database Connection Utilities
 * Handles PostgreSQL connections with proper error handling and connection pooling
 */

import { Pool, PoolClient, QueryResult } from 'pg';

// Database configuration interface
interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: boolean;
  max?: number; // Maximum number of clients in the pool
  idleTimeoutMillis?: number; // How long a client is allowed to remain idle
  connectionTimeoutMillis?: number; // How long to wait when connecting a new client
}

// Get database configuration from environment variables
function getDatabaseConfig(): DatabaseConfig {
  const config: DatabaseConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'ledger_db',
    user: process.env.DB_USER || 'ledger_user',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.DB_SSL === 'true',
    max: parseInt(process.env.DB_POOL_MAX || '20'),
    idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'),
    connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '2000'),
  };

  // Handle connection string format (for hosted services like Supabase)
  if (process.env.DB_URL) {
    return {
      connectionString: process.env.DB_URL,
      ssl: config.ssl ? { rejectUnauthorized: false } : false,
      max: config.max,
      idleTimeoutMillis: config.idleTimeoutMillis,
      connectionTimeoutMillis: config.connectionTimeoutMillis,
    } as any;
  }

  return config;
}

// Create the connection pool
const pool = new Pool(getDatabaseConfig());

// Handle pool events
pool.on('connect', (client) => {
  console.log('New database client connected');
});

pool.on('error', (err, client) => {
  console.error('Unexpected database client error:', err);
  process.exit(-1);
});

/**
 * Execute a query with automatic connection management
 */
export async function query<T = any>(
  text: string, 
  params?: any[]
): Promise<QueryResult<T>> {
  const start = Date.now();
  
  try {
    const result = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    
    console.log('Query executed:', {
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      duration: `${duration}ms`,
      rows: result.rowCount
    });
    
    return result;
  } catch (error) {
    const duration = Date.now() - start;
    console.error('Query error:', {
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      duration: `${duration}ms`,
      error: error instanceof Error ? error.message : error
    });
    throw error;
  }
}

/**
 * Get a client from the pool for transaction management
 */
export async function getClient(): Promise<PoolClient> {
  return pool.connect();
}

/**
 * Execute multiple queries within a transaction
 */
export async function transaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Check if database connection is healthy
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const result = await query('SELECT 1 as health');
    return result.rows[0]?.health === 1;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

/**
 * Close all connections in the pool (for graceful shutdown)
 */
export async function closePool(): Promise<void> {
  try {
    await pool.end();
    console.log('Database pool closed successfully');
  } catch (error) {
    console.error('Error closing database pool:', error);
  }
}

/**
 * Get pool status information
 */
export function getPoolStats() {
  return {
    totalCount: pool.totalCount,
    idleCount: pool.idleCount,
    waitingCount: pool.waitingCount,
  };
}

// Export the pool for direct access if needed
export { pool };

// Export types for use in other modules
export type { PoolClient, QueryResult };