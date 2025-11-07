/**
 * Programs Data Hooks
 * React hooks for fetching and managing program data
 */

import { useState, useEffect, useCallback } from 'react';
import { Program, ProgramFilters, PaginatedResponse, CreateProgramDTO, UpdateProgramDTO } from '../database/types';

// API base URL - adjust for your environment
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

/**
 * Hook for fetching paginated programs list with filtering
 */
export function usePrograms(filters?: ProgramFilters) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0
  });

  const fetchPrograms = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      
      if (filters?.search) params.append('search', filters.search);
      if (filters?.product_line_id) params.append('product_line_id', filters.product_line_id.toString());
      if (filters?.program_status) {
        filters.program_status.forEach(status => params.append('program_status', status));
      }
      if (filters?.loss_ratio_min !== undefined) params.append('loss_ratio_min', filters.loss_ratio_min.toString());
      if (filters?.loss_ratio_max !== undefined) params.append('loss_ratio_max', filters.loss_ratio_max.toString());
      if (filters?.premium_min !== undefined) params.append('premium_min', filters.premium_min.toString());
      if (filters?.premium_max !== undefined) params.append('premium_max', filters.premium_max.toString());
      if (filters?.owner) params.append('owner', filters.owner);
      if (filters?.limit) params.append('limit', filters.limit.toString());
      if (filters?.offset) {
        const page = Math.floor(filters.offset / (filters.limit || 50)) + 1;
        params.append('page', page.toString());
      }

      const response = await fetch(`${API_BASE}/programs?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch programs: ${response.statusText}`);
      }

      const result: PaginatedResponse<Program> = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch programs');
      }

      setPrograms(result.data);
      setPagination(result.pagination);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  return {
    programs,
    loading,
    error,
    pagination,
    refetch: fetchPrograms
  };
}

/**
 * Hook for fetching a single program by ID
 */
export function useProgram(id: string | null) {
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProgram = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/programs/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Program not found');
        }
        throw new Error(`Failed to fetch program: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch program');
      }

      setProgram(result.data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error fetching program:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProgram();
  }, [fetchProgram]);

  return {
    program,
    loading,
    error,
    refetch: fetchProgram
  };
}

/**
 * Hook for creating programs
 */
export function useCreateProgram() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createProgram = useCallback(async (data: CreateProgramDTO): Promise<Program | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/programs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to create program: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to create program');
      }

      return result.data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error creating program:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createProgram,
    loading,
    error
  };
}

/**
 * Hook for updating programs
 */
export function useUpdateProgram() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProgram = useCallback(async (id: string, data: Partial<UpdateProgramDTO>): Promise<Program | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/programs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to update program: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to update program');
      }

      return result.data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error updating program:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    updateProgram,
    loading,
    error
  };
}

/**
 * Hook for deleting programs
 */
export function useDeleteProgram() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteProgram = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/programs/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete program: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to delete program');
      }

      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error deleting program:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    deleteProgram,
    loading,
    error
  };
}

/**
 * Hook for fetching program statistics
 */
export function useProgramStats() {
  const [stats, setStats] = useState<{
    total: number;
    by_status: Record<string, number>;
    by_product_line: Record<string, number>;
    avg_loss_ratio: number;
    total_premium: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/programs/stats`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch program stats: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch program stats');
      }

      setStats(result.data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error fetching program stats:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
}