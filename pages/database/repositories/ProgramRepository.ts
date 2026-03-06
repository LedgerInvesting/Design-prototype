/**
 * Program Repository
 * Data access layer for Program entities with full CRUD operations
 */

import { query, transaction, PoolClient } from '../utils/connection';
import { 
  Program, 
  CreateProgramDTO, 
  UpdateProgramDTO, 
  ProgramFilters,
  PaginatedResponse 
} from '../types';

export class ProgramRepository {
  /**
   * Find all programs with optional filtering and pagination
   */
  async findAll(filters?: ProgramFilters): Promise<PaginatedResponse<Program>> {
    let baseQuery = `
      SELECT
        p.*,
        pl.name as product_line_name,
        COUNT(DISTINCT t.id) as transaction_count,
        COUNT(DISTINCT v.id) as valuation_count
      FROM programs p
      LEFT JOIN product_lines pl ON p.product_line_id = pl.id
      LEFT JOIN transactions t ON p.id = t.program_id
      LEFT JOIN valuations v ON p.id = v.program_id
      WHERE 1=1
    `;

    const params: any[] = [];
    const conditions: string[] = [];

    // Apply filters
    if (filters?.search) {
      conditions.push(`p.name ILIKE $${params.length + 1}`);
      params.push(`%${filters.search}%`);
    }

    if (filters?.product_line_id) {
      conditions.push(`p.product_line_id = $${params.length + 1}`);
      params.push(filters.product_line_id);
    }

    if (filters?.program_status && filters.program_status.length > 0) {
      conditions.push(`p.program_status = ANY($${params.length + 1})`);
      params.push(filters.program_status);
    }

    if (filters?.loss_ratio_min !== undefined) {
      conditions.push(`p.current_loss_ratio >= $${params.length + 1}`);
      params.push(filters.loss_ratio_min);
    }

    if (filters?.loss_ratio_max !== undefined) {
      conditions.push(`p.current_loss_ratio <= $${params.length + 1}`);
      params.push(filters.loss_ratio_max);
    }

    if (filters?.premium_min !== undefined) {
      conditions.push(`p.premium >= $${params.length + 1}`);
      params.push(filters.premium_min);
    }

    if (filters?.premium_max !== undefined) {
      conditions.push(`p.premium <= $${params.length + 1}`);
      params.push(filters.premium_max);
    }

    if (filters?.owner) {
      conditions.push(`p.owner ILIKE $${params.length + 1}`);
      params.push(`%${filters.owner}%`);
    }

    // Add conditions to query
    if (conditions.length > 0) {
      baseQuery += ' AND ' + conditions.join(' AND ');
    }

    // Group by and order
    baseQuery += `
      GROUP BY p.id, pl.name 
      ORDER BY p.name
    `;

    // Get total count
    const countQuery = `
      SELECT COUNT(DISTINCT p.id) as total
      FROM programs p
      LEFT JOIN product_lines pl ON p.product_line_id = pl.id
      WHERE 1=1
      ${conditions.length > 0 ? ' AND ' + conditions.join(' AND ') : ''}
    `;

    // Apply pagination
    const limit = filters?.limit || 50;
    const offset = filters?.offset || 0;
    const page = Math.floor(offset / limit) + 1;

    baseQuery += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    try {
      // Execute both queries
      const [dataResult, countResult] = await Promise.all([
        query<Program>(baseQuery, params),
        query<{ total: string }>(countQuery, params.slice(0, -2)) // Remove limit/offset for count
      ]);

      const total = parseInt(countResult.rows[0]?.total || '0');
      const totalPages = Math.ceil(total / limit);

      return {
        data: dataResult.rows,
        pagination: {
          page,
          limit,
          total,
          totalPages
        },
        success: true
      };
    } catch (error) {
      console.error('Error in ProgramRepository.findAll:', error);
      throw new Error('Failed to fetch programs');
    }
  }

  /**
   * Find a program by ID
   */
  async findById(id: string): Promise<Program | null> {
    const query_text = `
      SELECT
        p.*,
        pl.name as product_line_name,
        COUNT(DISTINCT t.id) as transaction_count,
        COUNT(DISTINCT v.id) as valuation_count
      FROM programs p
      LEFT JOIN product_lines pl ON p.product_line_id = pl.id
      LEFT JOIN transactions t ON p.id = t.program_id
      LEFT JOIN valuations v ON p.id = v.program_id
      WHERE p.id = $1
      GROUP BY p.id, pl.name
    `;

    try {
      const result = await query<Program>(query_text, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error in ProgramRepository.findById:', error);
      throw new Error(`Failed to fetch program with id ${id}`);
    }
  }

  /**
   * Create a new program
   */
  async create(data: CreateProgramDTO): Promise<Program> {
    const query_text = `
      INSERT INTO programs (
        name, 
        product_line_id, 
        current_loss_ratio, 
        quota_share_premium, 
        premium, 
        owner,
        program_status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const params = [
      data.name,
      data.product_line_id,
      data.current_loss_ratio || null,
      data.quota_share_premium || null,
      data.premium || null,
      data.owner || null,
      data.program_status || 'active'
    ];

    try {
      const result = await query<Program>(query_text, params);
      const program = result.rows[0];

      // Fetch the complete program with joined data
      return await this.findById(program.id) as Program;
    } catch (error) {
      console.error('Error in ProgramRepository.create:', error);
      throw new Error('Failed to create program');
    }
  }

  /**
   * Update an existing program
   */
  async update(id: string, data: UpdateProgramDTO): Promise<Program> {
    const updateFields: string[] = [];
    const params: any[] = [];

    // Build dynamic update query
    if (data.name !== undefined) {
      updateFields.push(`name = $${params.length + 1}`);
      params.push(data.name);
    }

    if (data.product_line_id !== undefined) {
      updateFields.push(`product_line_id = $${params.length + 1}`);
      params.push(data.product_line_id);
    }

    if (data.current_loss_ratio !== undefined) {
      updateFields.push(`current_loss_ratio = $${params.length + 1}`);
      params.push(data.current_loss_ratio);
    }

    if (data.quota_share_premium !== undefined) {
      updateFields.push(`quota_share_premium = $${params.length + 1}`);
      params.push(data.quota_share_premium);
    }

    if (data.premium !== undefined) {
      updateFields.push(`premium = $${params.length + 1}`);
      params.push(data.premium);
    }

    if (data.owner !== undefined) {
      updateFields.push(`owner = $${params.length + 1}`);
      params.push(data.owner);
    }

    if (data.program_status !== undefined) {
      updateFields.push(`program_status = $${params.length + 1}`);
      params.push(data.program_status);
    }

    if (updateFields.length === 0) {
      throw new Error('No fields to update');
    }

    // Add updated_at
    updateFields.push(`updated_at = NOW()`);

    const query_text = `
      UPDATE programs 
      SET ${updateFields.join(', ')}
      WHERE id = $${params.length + 1}
      RETURNING *
    `;

    params.push(id);

    try {
      const result = await query<Program>(query_text, params);
      
      if (result.rows.length === 0) {
        throw new Error(`Program with id ${id} not found`);
      }

      // Fetch the complete program with joined data
      return await this.findById(id) as Program;
    } catch (error) {
      console.error('Error in ProgramRepository.update:', error);
      throw new Error(`Failed to update program with id ${id}`);
    }
  }

  /**
   * Delete a program (soft delete by changing status)
   */
  async delete(id: string): Promise<void> {
    const query_text = `
      UPDATE programs 
      SET program_status = 'cancelled', updated_at = NOW()
      WHERE id = $1
      RETURNING id
    `;

    try {
      const result = await query(query_text, [id]);
      
      if (result.rows.length === 0) {
        throw new Error(`Program with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error in ProgramRepository.delete:', error);
      throw new Error(`Failed to delete program with id ${id}`);
    }
  }

  /**
   * Hard delete a program (permanently remove from database)
   * Use with caution - this will cascade delete all related data
   */
  async hardDelete(id: string): Promise<void> {
    const query_text = `DELETE FROM programs WHERE id = $1 RETURNING id`;

    try {
      const result = await query(query_text, [id]);
      
      if (result.rows.length === 0) {
        throw new Error(`Program with id ${id} not found`);
      }
    } catch (error) {
      console.error('Error in ProgramRepository.hardDelete:', error);
      throw new Error(`Failed to permanently delete program with id ${id}`);
    }
  }

  /**
   * Get program statistics
   */
  async getStats(): Promise<{
    total: number;
    by_status: Record<string, number>;
    by_product_line: Record<string, number>;
    avg_loss_ratio: number;
    total_premium: number;
  }> {
    const query_text = `
      SELECT 
        COUNT(*) as total,
        AVG(current_loss_ratio) as avg_loss_ratio,
        SUM(premium) as total_premium,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'status', program_status,
            'count', status_count
          )
        ) as status_stats,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'product_line', product_line_name,
            'count', product_line_count
          )
        ) as product_line_stats
      FROM (
        SELECT 
          p.*,
          pl.name as product_line_name,
          COUNT(*) OVER (PARTITION BY p.program_status) as status_count,
          COUNT(*) OVER (PARTITION BY pl.name) as product_line_count
        FROM programs p
        LEFT JOIN product_lines pl ON p.product_line_id = pl.id
      ) stats
    `;

    try {
      const result = await query(query_text);
      const row = result.rows[0];

      const by_status: Record<string, number> = {};
      const by_product_line: Record<string, number> = {};

      // Process status stats
      if (row.status_stats) {
        row.status_stats.forEach((stat: any) => {
          by_status[stat.status] = stat.count;
        });
      }

      // Process product line stats
      if (row.product_line_stats) {
        row.product_line_stats.forEach((stat: any) => {
          by_product_line[stat.product_line] = stat.count;
        });
      }

      return {
        total: parseInt(row.total || '0'),
        by_status,
        by_product_line,
        avg_loss_ratio: parseFloat(row.avg_loss_ratio || '0'),
        total_premium: parseFloat(row.total_premium || '0')
      };
    } catch (error) {
      console.error('Error in ProgramRepository.getStats:', error);
      throw new Error('Failed to get program statistics');
    }
  }
}