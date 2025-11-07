/**
 * Program Statistics API Endpoint
 * Returns aggregated statistics about programs
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { programRepository } from '../../database/repositories';

/**
 * API Route Handler for /api/programs/stats
 * Returns program statistics and aggregations
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({
        success: false,
        message: `Method ${req.method} not allowed`
      });
    }

    return await handleGetProgramStats(req, res);
  } catch (error) {
    console.error('Program stats API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Handle GET /api/programs/stats
 * Returns comprehensive program statistics
 */
async function handleGetProgramStats(req: NextApiRequest, res: NextApiResponse) {
  try {
    const stats = await programRepository.getStats();

    return res.status(200).json({
      data: stats,
      success: true,
      message: 'Program statistics retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching program stats:', error);
    throw error;
  }
}