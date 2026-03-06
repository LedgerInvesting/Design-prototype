/**
 * Mock Database
 * Simulates database responses with realistic reinsurance data
 * Replace this with actual database calls when ready
 *
 * NOTE: This file contains fake data that matches the structure from the database migrations.
 * When switching to real database, simply replace mockTriangles with actual database queries.
 */

import { Triangle } from './repositories/TriangleRepository';

/**
 * Helper function to generate varied chart data for each triangle
 * This creates realistic variations so each triangle shows different data
 */
function generateTriangleData(seed: number) {
  const multiplier = 0.7 + (seed % 7) * 0.1; // Range: 0.7 to 1.3
  const offset = (seed % 5) * 5; // Range: 0 to 20

  return {
    // Data Completeness - dots showing which periods have data
    data_completeness: [
      { x: 0, y: 0 }, { x: 3, y: 0 }, { x: 6, y: 0 }, { x: 9, y: 0 }, { x: 12, y: 0 }, { x: 15, y: 0 }, { x: 18, y: 0 }, { x: 21, y: 0 },
      { x: 0, y: 3 }, { x: 3, y: 3 }, { x: 6, y: 3 }, { x: 9, y: 3 }, { x: 12, y: 3 }, { x: 15, y: 3 }, { x: 18, y: 3 }, { x: 21, y: 3 },
      { x: 0, y: 6 }, { x: 3, y: 6 }, { x: 6, y: 6 }, { x: 9, y: 6 }, { x: 12, y: 6 }, { x: 15, y: 6 },
      { x: 0, y: 9 }, { x: 3, y: 9 }, { x: 6, y: 9 }, { x: 9, y: 9 }, { x: 12, y: 9 },
    ],

    // Right Edge - premium and loss ratios over time
    right_edge: [
      { period: "Jan 18", premium: 6.0 * multiplier, ratioA: 60 + offset, ratioB: 58 + offset },
      { period: "Jul 18", premium: 6.5 * multiplier, ratioA: 30 + offset, ratioB: 28 + offset },
      { period: "Jan 19", premium: 6.2 * multiplier, ratioA: 90 + offset, ratioB: 88 + offset },
      { period: "Jul 19", premium: 6.0 * multiplier, ratioA: 50 + offset, ratioB: 48 + offset },
      { period: "Jan 20", premium: 6.3 * multiplier, ratioA: 45 + offset, ratioB: 42 + offset },
      { period: "Jul 20", premium: 6.7 * multiplier, ratioA: 70 + offset, ratioB: 68 + offset },
      { period: "Jan 21", premium: 6.8 * multiplier, ratioA: 35 + offset, ratioB: 30 + offset },
      { period: "Jul 21", premium: 7.0 * multiplier, ratioA: 55 + offset, ratioB: 50 + offset },
      { period: "Jan 22", premium: 7.0 * multiplier, ratioA: 40 + offset, ratioB: 35 + offset },
      { period: "Jul 22", premium: 6.5 * multiplier, ratioA: 45 + offset, ratioB: 40 + offset },
      { period: "Jan 23", premium: 8.5 * multiplier, ratioA: 35 + offset, ratioB: 30 + offset },
      { period: "Jul 23", premium: 9.0 * multiplier, ratioA: 20 + offset, ratioB: 10 + offset },
    ],

    // Heatmap - loss development by period and lag
    heatmap: [
      // Period: 07-23 (8 points)
      { period: '07-23', lag: 0, value: (45 + offset) * multiplier },
      { period: '07-23', lag: 3, value: (52 + offset) * multiplier },
      { period: '07-23', lag: 6, value: (58 + offset) * multiplier },
      { period: '07-23', lag: 9, value: (62 + offset) * multiplier },
      { period: '07-23', lag: 12, value: (64 + offset) * multiplier },
      { period: '07-23', lag: 15, value: (65 + offset) * multiplier },
      { period: '07-23', lag: 18, value: (66 + offset) * multiplier },
      { period: '07-23', lag: 21, value: (66.5 + offset) * multiplier },
      // Period: 10-23 (8 points)
      { period: '10-23', lag: 0, value: (48 + offset) * multiplier },
      { period: '10-23', lag: 3, value: (54 + offset) * multiplier },
      { period: '10-23', lag: 6, value: (60 + offset) * multiplier },
      { period: '10-23', lag: 9, value: (63 + offset) * multiplier },
      { period: '10-23', lag: 12, value: (66 + offset) * multiplier },
      { period: '10-23', lag: 15, value: (67 + offset) * multiplier },
      { period: '10-23', lag: 18, value: (67.8 + offset) * multiplier },
      { period: '10-23', lag: 21, value: (68 + offset) * multiplier },
      // Period: 01-24 (6 points)
      { period: '01-24', lag: 0, value: (50 + offset) * multiplier },
      { period: '01-24', lag: 3, value: (56 + offset) * multiplier },
      { period: '01-24', lag: 6, value: (61 + offset) * multiplier },
      { period: '01-24', lag: 9, value: (65 + offset) * multiplier },
      { period: '01-24', lag: 12, value: (67 + offset) * multiplier },
      { period: '01-24', lag: 15, value: (68.5 + offset) * multiplier },
      // Period: 04-24 (5 points)
      { period: '04-24', lag: 0, value: (52 + offset) * multiplier },
      { period: '04-24', lag: 3, value: (58 + offset) * multiplier },
      { period: '04-24', lag: 6, value: (63 + offset) * multiplier },
      { period: '04-24', lag: 9, value: (66 + offset) * multiplier },
      { period: '04-24', lag: 12, value: (68 + offset) * multiplier },
    ],

    // Growth Curve - cumulative loss development
    growth_curve: [
      // Period 07-23
      { period: '07-23', lag: 0, lossRatio: (45 + offset) * multiplier, color: '#0f9342' },
      { period: '07-23', lag: 3, lossRatio: (52 + offset) * multiplier, color: '#0f9342' },
      { period: '07-23', lag: 6, lossRatio: (58 + offset) * multiplier, color: '#0f9342' },
      { period: '07-23', lag: 9, lossRatio: (62 + offset) * multiplier, color: '#0f9342' },
      { period: '07-23', lag: 12, lossRatio: (64 + offset) * multiplier, color: '#0f9342' },
      { period: '07-23', lag: 15, lossRatio: (65 + offset) * multiplier, color: '#0f9342' },
      { period: '07-23', lag: 18, lossRatio: (66 + offset) * multiplier, color: '#0f9342' },
      { period: '07-23', lag: 21, lossRatio: (66.5 + offset) * multiplier, color: '#0f9342' },
      // Period 10-23
      { period: '10-23', lag: 0, lossRatio: (48 + offset) * multiplier, color: '#42c172' },
      { period: '10-23', lag: 3, lossRatio: (54 + offset) * multiplier, color: '#42c172' },
      { period: '10-23', lag: 6, lossRatio: (60 + offset) * multiplier, color: '#42c172' },
      { period: '10-23', lag: 9, lossRatio: (63 + offset) * multiplier, color: '#42c172' },
      { period: '10-23', lag: 12, lossRatio: (66 + offset) * multiplier, color: '#42c172' },
      { period: '10-23', lag: 15, lossRatio: (67 + offset) * multiplier, color: '#42c172' },
      { period: '10-23', lag: 18, lossRatio: (67.8 + offset) * multiplier, color: '#42c172' },
      { period: '10-23', lag: 21, lossRatio: (68 + offset) * multiplier, color: '#42c172' },
      // Period 01-24
      { period: '01-24', lag: 0, lossRatio: (50 + offset) * multiplier, color: '#7fe9b2' },
      { period: '01-24', lag: 3, lossRatio: (56 + offset) * multiplier, color: '#7fe9b2' },
      { period: '01-24', lag: 6, lossRatio: (61 + offset) * multiplier, color: '#7fe9b2' },
      { period: '01-24', lag: 9, lossRatio: (65 + offset) * multiplier, color: '#7fe9b2' },
      { period: '01-24', lag: 12, lossRatio: (67 + offset) * multiplier, color: '#7fe9b2' },
      { period: '01-24', lag: 15, lossRatio: (68.5 + offset) * multiplier, color: '#7fe9b2' },
    ],

    // Mountain - paid vs incurred over development months
    mountain: [
      // Lag 0 months
      { period: new Date('2023-07-01').getTime(), lag: 0, value: (45 + offset) * multiplier },
      { period: new Date('2023-10-01').getTime(), lag: 0, value: (48 + offset) * multiplier },
      { period: new Date('2024-01-01').getTime(), lag: 0, value: (52 + offset) * multiplier },
      { period: new Date('2024-04-01').getTime(), lag: 0, value: (50 + offset) * multiplier },
      // Lag 3 months
      { period: new Date('2023-07-01').getTime(), lag: 3, value: (52 + offset) * multiplier },
      { period: new Date('2023-10-01').getTime(), lag: 3, value: (55 + offset) * multiplier },
      { period: new Date('2024-01-01').getTime(), lag: 3, value: (58 + offset) * multiplier },
      { period: new Date('2024-04-01').getTime(), lag: 3, value: (56 + offset) * multiplier },
      // Lag 6 months
      { period: new Date('2023-07-01').getTime(), lag: 6, value: (58 + offset) * multiplier },
      { period: new Date('2023-10-01').getTime(), lag: 6, value: (60 + offset) * multiplier },
      { period: new Date('2024-01-01').getTime(), lag: 6, value: (63 + offset) * multiplier },
      { period: new Date('2024-04-01').getTime(), lag: 6, value: (61 + offset) * multiplier },
      // Lag 9 months
      { period: new Date('2023-07-01').getTime(), lag: 9, value: (62 + offset) * multiplier },
      { period: new Date('2023-10-01').getTime(), lag: 9, value: (64 + offset) * multiplier },
      { period: new Date('2024-01-01').getTime(), lag: 9, value: (66 + offset) * multiplier },
      { period: new Date('2024-04-01').getTime(), lag: 9, value: (64 + offset) * multiplier },
      // Lag 12 months
      { period: new Date('2023-07-01').getTime(), lag: 12, value: (64 + offset) * multiplier },
      { period: new Date('2023-10-01').getTime(), lag: 12, value: (66 + offset) * multiplier },
      { period: new Date('2024-01-01').getTime(), lag: 12, value: (68 + offset) * multiplier },
      { period: new Date('2024-04-01').getTime(), lag: 12, value: (67 + offset) * multiplier },
      // Lag 15 months
      { period: new Date('2023-07-01').getTime(), lag: 15, value: (65 + offset) * multiplier },
      { period: new Date('2023-10-01').getTime(), lag: 15, value: (67 + offset) * multiplier },
      { period: new Date('2024-01-01').getTime(), lag: 15, value: (69 + offset) * multiplier },
      // Lag 18 months
      { period: new Date('2023-07-01').getTime(), lag: 18, value: (66 + offset) * multiplier },
      { period: new Date('2023-10-01').getTime(), lag: 18, value: (68 + offset) * multiplier },
      // Lag 21 months
      { period: new Date('2023-07-01').getTime(), lag: 21, value: (67 + offset) * multiplier },
    ],

    // Age-to-Age Factors - development factors with multiple observations per lag
    age_to_age: [
      // Lag 3 months (high variation early)
      { lag: 3, factor: 1.45 * (0.95 + multiplier * 0.1), period: '07-23' },
      { lag: 3, factor: 1.52 * (0.95 + multiplier * 0.1), period: '10-23' },
      { lag: 3, factor: 1.38 * (0.95 + multiplier * 0.1), period: '01-24' },
      { lag: 3, factor: 1.48 * (0.95 + multiplier * 0.1), period: '04-24' },
      { lag: 3, factor: 1.41 * (0.95 + multiplier * 0.1), period: '07-24' },
      { lag: 3, factor: 1.55 * (0.95 + multiplier * 0.1), period: '10-24' },
      // Lag 6 months (decreasing variation)
      { lag: 6, factor: 1.28 * (0.95 + multiplier * 0.1), period: '07-23' },
      { lag: 6, factor: 1.32 * (0.95 + multiplier * 0.1), period: '10-23' },
      { lag: 6, factor: 1.25 * (0.95 + multiplier * 0.1), period: '01-24' },
      { lag: 6, factor: 1.30 * (0.95 + multiplier * 0.1), period: '04-24' },
      { lag: 6, factor: 1.27 * (0.95 + multiplier * 0.1), period: '07-24' },
      { lag: 6, factor: 1.33 * (0.95 + multiplier * 0.1), period: '10-24' },
      // Lag 9 months
      { lag: 9, factor: 1.18 * (0.95 + multiplier * 0.1), period: '07-23' },
      { lag: 9, factor: 1.22 * (0.95 + multiplier * 0.1), period: '10-23' },
      { lag: 9, factor: 1.16 * (0.95 + multiplier * 0.1), period: '01-24' },
      { lag: 9, factor: 1.20 * (0.95 + multiplier * 0.1), period: '04-24' },
      { lag: 9, factor: 1.19 * (0.95 + multiplier * 0.1), period: '07-24' },
      { lag: 9, factor: 1.21 * (0.95 + multiplier * 0.1), period: '10-24' },
      // Lag 12 months (approaching 1.0)
      { lag: 12, factor: 1.12 * (0.95 + multiplier * 0.1), period: '07-23' },
      { lag: 12, factor: 1.15 * (0.95 + multiplier * 0.1), period: '10-23' },
      { lag: 12, factor: 1.10 * (0.95 + multiplier * 0.1), period: '01-24' },
      { lag: 12, factor: 1.13 * (0.95 + multiplier * 0.1), period: '04-24' },
      { lag: 12, factor: 1.11 * (0.95 + multiplier * 0.1), period: '07-24' },
      { lag: 12, factor: 1.14 * (0.95 + multiplier * 0.1), period: '10-24' },
      // Lag 15 months (stabilizing)
      { lag: 15, factor: 1.08 * (0.95 + multiplier * 0.1), period: '07-23' },
      { lag: 15, factor: 1.10 * (0.95 + multiplier * 0.1), period: '10-23' },
      { lag: 15, factor: 1.06 * (0.95 + multiplier * 0.1), period: '01-24' },
      { lag: 15, factor: 1.09 * (0.95 + multiplier * 0.1), period: '04-24' },
      { lag: 15, factor: 1.07 * (0.95 + multiplier * 0.1), period: '07-24' },
      // Lag 18 months (very stable)
      { lag: 18, factor: 1.04 * (0.95 + multiplier * 0.1), period: '07-23' },
      { lag: 18, factor: 1.06 * (0.95 + multiplier * 0.1), period: '10-23' },
      { lag: 18, factor: 1.03 * (0.95 + multiplier * 0.1), period: '01-24' },
      { lag: 18, factor: 1.05 * (0.95 + multiplier * 0.1), period: '04-24' },
      // Lag 21 months (minimal change)
      { lag: 21, factor: 1.02 * (0.95 + multiplier * 0.1), period: '07-23' },
      { lag: 21, factor: 1.03 * (0.95 + multiplier * 0.1), period: '10-23' },
      { lag: 21, factor: 1.01 * (0.95 + multiplier * 0.1), period: '01-24' },
    ],
  };
}

// Mock triangles data - this simulates what would come from the database
// Each triangle gets a unique seed to generate varied data
export const mockTriangles: Triangle[] = [
  // Triangle 1: cd12345e...
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    valuation_id: '550e8400-e29b-41d4-a716-446655440100',
    triangle_name: 'cd12345e-6789-012b-345c-6d7cd12345e-6789-01...',
    triangle_type: 'paid',
    position: 'left',
    color: '#BD8B11',
    triangle_status: 'completed',
    data_json: generateTriangleData(1),
    development_factors: { '12_24': 1.50, '24_36': 1.20, '36_48': 1.10, '48_60': 1.05 },
    ultimate_values: null,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },

  // Triangle 2: ef56789a...
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    valuation_id: '550e8400-e29b-41d4-a716-446655440100',
    triangle_name: 'ef56789a-bcde-f012-3456-789ef56789a-bcde-f0...',
    triangle_type: 'paid',
    position: 'left',
    color: '#BD8B11',
    triangle_status: 'completed',
    data_json: generateTriangleData(2),
    development_factors: { '12_24': 1.50, '24_36': 1.20, '36_48': 1.10, '48_60': 1.05 },
    ultimate_values: null,
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z'
  },

  // Triangle 3: gh78901b...
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    valuation_id: '550e8400-e29b-41d4-a716-446655440101',
    triangle_name: 'gh78901b-cdef-2345-6789-01gh78901b-cdef-23...',
    triangle_type: 'incurred',
    position: 'center',
    color: '#744DEB',
    triangle_status: 'completed',
    data_json: generateTriangleData(3),
    development_factors: { '12_24': 1.50, '24_36': 1.22, '36_48': 1.09, '48_60': 1.04 },
    ultimate_values: null,
    created_at: '2024-01-17T10:00:00Z',
    updated_at: '2024-01-17T10:00:00Z'
  },

  // Triangle 4: ij90123c...
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    valuation_id: '550e8400-e29b-41d4-a716-446655440102',
    triangle_name: 'ij90123c-def0-4567-890a-bcij90123c-def0-45...',
    triangle_type: 'paid',
    position: 'left',
    color: '#BD8B11',
    triangle_status: 'completed',
    data_json: generateTriangleData(4),
    development_factors: { '12_24': 1.50, '24_36': 1.20, '36_48': 1.10, '48_60': 1.05 },
    ultimate_values: null,
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z'
  },

  // Triangle 5: kl12345d...
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    valuation_id: '550e8400-e29b-41d4-a716-446655440103',
    triangle_name: 'kl12345d-ef01-6789-abcd-efkl12345d-ef01-67...',
    triangle_type: 'incurred',
    position: 'center',
    color: '#744DEB',
    triangle_status: 'completed',
    data_json: generateTriangleData(5),
    development_factors: { '12_24': 1.50, '24_36': 1.20, '36_48': 1.10, '48_60': 1.05 },
    ultimate_values: null,
    created_at: '2024-01-19T10:00:00Z',
    updated_at: '2024-01-19T10:00:00Z'
  },

  // Triangle 6: mn34567e...
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    valuation_id: '550e8400-e29b-41d4-a716-446655440104',
    triangle_name: 'mn34567e-f012-890a-bcde-f0mn34567e-f012-89...',
    triangle_type: 'paid',
    position: 'left',
    color: '#BD8B11',
    triangle_status: 'completed',
    data_json: generateTriangleData(6),
    development_factors: { '12_24': 1.50, '24_36': 1.20, '36_48': 1.10, '48_60': 1.05 },
    ultimate_values: null,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  },

  // Triangle 7: op56789f...
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    valuation_id: '550e8400-e29b-41d4-a716-446655440105',
    triangle_name: 'op56789f-0123-abc4-def5-67op56789f-0123-ab...',
    triangle_type: 'case',
    position: 'right',
    color: '#3DA3CB',
    triangle_status: 'completed',
    data_json: generateTriangleData(7),
    development_factors: { '12_24': 1.52, '24_36': 1.18, '36_48': 1.11, '48_60': 1.06 },
    ultimate_values: null,
    created_at: '2024-01-21T10:00:00Z',
    updated_at: '2024-01-21T10:00:00Z'
  },

  // Triangle 8: qr78901g...
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    valuation_id: '550e8400-e29b-41d4-a716-446655440106',
    triangle_name: 'qr78901g-h234-cdef-5678-90qr78901g-h234-cd...',
    triangle_type: 'paid',
    position: 'left',
    color: '#BD8B11',
    triangle_status: 'completed',
    data_json: generateTriangleData(8),
    development_factors: { '12_24': 1.50, '24_36': 1.20, '36_48': 1.10, '48_60': 1.05 },
    ultimate_values: null,
    created_at: '2024-01-22T10:00:00Z',
    updated_at: '2024-01-22T10:00:00Z'
  },

  // Triangle 9: st90123h...
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    valuation_id: '550e8400-e29b-41d4-a716-446655440107',
    triangle_name: 'st90123h-i345-def6-7890-abst90123h-i345-de...',
    triangle_type: 'incurred',
    position: 'center',
    color: '#744DEB',
    triangle_status: 'completed',
    data_json: generateTriangleData(9),
    development_factors: { '12_24': 1.50, '24_36': 1.20, '36_48': 1.10, '48_60': 1.05 },
    ultimate_values: null,
    created_at: '2024-01-23T10:00:00Z',
    updated_at: '2024-01-23T10:00:00Z'
  }
];

/**
 * Mock Triangle Repository
 * Simulates database access without actual database connection
 */
export class MockTriangleRepository {
  /**
   * Find all completed triangles for dropdown
   */
  async findAllCompleted(): Promise<{ value: string; label: string }[]> {
    // Simulate async database call
    await new Promise(resolve => setTimeout(resolve, 10));

    return mockTriangles
      .filter(t => t.triangle_status === 'completed')
      .map(t => ({
        value: t.triangle_name,
        label: t.triangle_name
      }));
  }

  /**
   * Find triangle by triangle_name
   */
  async findByName(triangleName: string): Promise<Triangle | null> {
    // Simulate async database call
    await new Promise(resolve => setTimeout(resolve, 10));

    const triangle = mockTriangles.find(t => t.triangle_name === triangleName);
    return triangle || null;
  }

  /**
   * Find all triangles
   */
  async findAll(): Promise<Triangle[]> {
    // Simulate async database call
    await new Promise(resolve => setTimeout(resolve, 10));

    return mockTriangles;
  }
}

// Export singleton instance
export const triangleRepository = new MockTriangleRepository();
