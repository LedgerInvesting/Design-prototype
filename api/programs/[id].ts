/**
 * Individual Program API Endpoint
 * Handles operations for specific programs by ID
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { programRepository } from '../../database/repositories';
import { UpdateProgramDTO } from '../../database/types';

/**
 * API Route Handler for /api/programs/[id]
 * Supports GET (fetch by ID), PUT (update), and DELETE (soft delete)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Program ID is required'
      });
    }

    switch (req.method) {
      case 'GET':
        return await handleGetProgram(id, res);
      case 'PUT':
        return await handleUpdateProgram(id, req, res);
      case 'DELETE':
        return await handleDeleteProgram(id, res);
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({
          success: false,
          message: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('Program API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Handle GET /api/programs/[id]
 * Returns a specific program by ID
 */
async function handleGetProgram(id: string, res: NextApiResponse) {
  try {
    const program = await programRepository.findById(id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: `Program with ID ${id} not found`
      });
    }

    return res.status(200).json({
      data: program,
      success: true
    });
  } catch (error) {
    console.error('Error fetching program:', error);
    throw error;
  }
}

/**
 * Handle PUT /api/programs/[id]
 * Updates a specific program
 */
async function handleUpdateProgram(id: string, req: NextApiRequest, res: NextApiResponse) {
  try {
    const updateData: UpdateProgramDTO = {
      id,
      ...req.body
    };

    // Validation
    if (updateData.current_loss_ratio && (updateData.current_loss_ratio < 0 || updateData.current_loss_ratio > 999)) {
      return res.status(400).json({
        success: false,
        message: 'Loss ratio must be between 0 and 999'
      });
    }

    if (updateData.premium && updateData.premium < 0) {
      return res.status(400).json({
        success: false,
        message: 'Premium must be non-negative'
      });
    }

    if (updateData.quota_share_premium && updateData.quota_share_premium < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quota share premium must be non-negative'
      });
    }

    if (updateData.program_status && !['active', 'inactive', 'pending', 'cancelled'].includes(updateData.program_status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid program status'
      });
    }

    // Update program
    const updatedProgram = await programRepository.update(id, updateData);

    return res.status(200).json({
      data: updatedProgram,
      success: true,
      message: 'Program updated successfully'
    });
  } catch (error) {
    console.error('Error updating program:', error);
    
    // Handle specific errors
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: `Program with ID ${id} not found`
      });
    }

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

    if (error instanceof Error && error.message.includes('No fields to update')) {
      return res.status(400).json({
        success: false,
        message: 'No fields provided for update'
      });
    }

    throw error;
  }
}

/**
 * Handle DELETE /api/programs/[id]
 * Soft deletes a program (sets status to cancelled)
 */
async function handleDeleteProgram(id: string, res: NextApiResponse) {
  try {
    await programRepository.delete(id);

    return res.status(200).json({
      success: true,
      message: 'Program deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting program:', error);
    
    if (error instanceof Error && error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: `Program with ID ${id} not found`
      });
    }

    throw error;
  }
}