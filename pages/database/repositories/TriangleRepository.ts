/**
 * Triangle Repository
 * Data access layer for Triangle entities
 */

import { query } from '../utils/connection';

export interface Triangle {
  id: string;
  valuation_id: string;
  triangle_name: string;
  triangle_type: 'paid' | 'reported' | 'incurred' | 'case' | 'ibnr' | 'ultimate';
  position: 'left' | 'center' | 'right';
  color: string;
  triangle_status: 'completed' | 'add' | 'pending-review' | 'in_progress' | 'error';
  data_json: {
    heatmap?: any;
    growth_curve?: any;
    mountain?: any;
    age_to_age?: any;
    data_completeness?: any;
    right_edge?: any;
  } | null;
  development_factors: Record<string, number> | null;
  ultimate_values: Record<string, number> | null;
  created_at: string;
  updated_at: string;
}

export class TriangleRepository {
  /**
   * Find all triangles with optional filtering
   */
  async findAll(): Promise<Triangle[]> {
    const query_text = `
      SELECT * FROM triangles
      ORDER BY created_at DESC
    `;

    try {
      const result = await query<Triangle>(query_text);
      return result.rows;
    } catch (error) {
      console.error('Error in TriangleRepository.findAll:', error);
      throw new Error('Failed to fetch triangles');
    }
  }

  /**
   * Find triangle by ID
   */
  async findById(id: string): Promise<Triangle | null> {
    const query_text = `SELECT * FROM triangles WHERE id = $1`;

    try {
      const result = await query<Triangle>(query_text, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error in TriangleRepository.findById:', error);
      throw new Error(`Failed to fetch triangle with id ${id}`);
    }
  }

  /**
   * Find triangle by triangle_name (UUID identifier)
   */
  async findByName(triangleName: string): Promise<Triangle | null> {
    const query_text = `SELECT * FROM triangles WHERE triangle_name = $1`;

    try {
      const result = await query<Triangle>(query_text, [triangleName]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error in TriangleRepository.findByName:', error);
      throw new Error(`Failed to fetch triangle with name ${triangleName}`);
    }
  }

  /**
   * Find all triangles for a valuation
   */
  async findByValuationId(valuationId: string): Promise<Triangle[]> {
    const query_text = `
      SELECT * FROM triangles
      WHERE valuation_id = $1
      ORDER BY position
    `;

    try {
      const result = await query<Triangle>(query_text, [valuationId]);
      return result.rows;
    } catch (error) {
      console.error('Error in TriangleRepository.findByValuationId:', error);
      throw new Error(`Failed to fetch triangles for valuation ${valuationId}`);
    }
  }

  /**
   * Find all completed triangles (for dropdown list)
   */
  async findAllCompleted(): Promise<{ value: string; label: string }[]> {
    const query_text = `
      SELECT triangle_name, triangle_type, position
      FROM triangles
      WHERE triangle_status = 'completed'
      ORDER BY created_at DESC
    `;

    try {
      const result = await query<{ triangle_name: string; triangle_type: string; position: string }>(query_text);
      return result.rows.map(row => ({
        value: row.triangle_name,
        label: row.triangle_name
      }));
    } catch (error) {
      console.error('Error in TriangleRepository.findAllCompleted:', error);
      throw new Error('Failed to fetch completed triangles');
    }
  }
}
