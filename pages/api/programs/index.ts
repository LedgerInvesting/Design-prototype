/**
 * Programs API Endpoint
 * Handles CRUD operations for reinsurance programs
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { programRepository } from '../../database/repositories';
import { ProgramFilters, CreateProgramDTO } from '../../database/types';

/**
 * API Route Handler for /api/programs
 * Supports GET (list with filters) and POST (create new program)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return await handleGetPrograms(req, res);
      case 'POST':
        return await handleCreateProgram(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({
          success: false,
          message: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('Programs API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Handle GET /api/programs
 * Returns paginated list of programs with optional filtering
 */
async function handleGetPrograms(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      search,
      product_line_id,
      program_status,
      loss_ratio_min,
      loss_ratio_max,
      premium_min,
      premium_max,
      owner,
      page = '1',
      limit = '50'
    } = req.query;

    // Build filters object
    const filters: ProgramFilters = {
      limit: Math.min(parseInt(limit as string), 100), // Cap at 100 for performance
      offset: (parseInt(page as string) - 1) * parseInt(limit as string)
    };

    if (search) {
      filters.search = search as string;
    }

    if (product_line_id) {
      filters.product_line_id = parseInt(product_line_id as string);
    }

    if (program_status) {
      filters.program_status = Array.isArray(program_status) 
        ? program_status as string[]
        : [program_status as string];
    }

    if (loss_ratio_min) {
      filters.loss_ratio_min = parseFloat(loss_ratio_min as string);
    }

    if (loss_ratio_max) {
      filters.loss_ratio_max = parseFloat(loss_ratio_max as string);
    }

    if (premium_min) {
      filters.premium_min = parseFloat(premium_min as string);
    }

    if (premium_max) {
      filters.premium_max = parseFloat(premium_max as string);
    }

    if (owner) {
      filters.owner = owner as string;
    }

    // Fetch programs
    const result = await programRepository.findAll(filters);

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
}

/**
 * Handle POST /api/programs
 * Creates a new program
 */
async function handleCreateProgram(req: NextApiRequest, res: NextApiResponse) {
  try {
    const programData: CreateProgramDTO = req.body;

    // Basic validation
    if (!programData.name || !programData.product_line_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name and product_line_id'
      });
    }

    // Additional validation
    if (programData.current_loss_ratio && (programData.current_loss_ratio < 0 || programData.current_loss_ratio > 999)) {
      return res.status(400).json({
        success: false,
        message: 'Loss ratio must be between 0 and 999'
      });
    }

    if (programData.premium && programData.premium < 0) {
      return res.status(400).json({
        success: false,
        message: 'Premium must be non-negative'
      });
    }

    if (programData.quota_share_premium && programData.quota_share_premium < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quota share premium must be non-negative'
      });
    }

    // Create program
    const program = await programRepository.create(programData);

    return res.status(201).json({
      data: program,
      success: true,
      message: 'Program created successfully'
    });
  } catch (error) {
    console.error('Error creating program:', error);
    
    // Handle specific database errors
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return res.status(409).json({
        success: false,
        message: 'Program with this name already exists'
      });
    }

    if (error instanceof Error && error.message.includes('foreign key')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product line ID'
      });
    }

    throw error;
  }
}