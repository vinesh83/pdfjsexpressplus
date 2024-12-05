import { useState, useEffect } from 'react';
import { portalService } from '../services/portalService';
import { NewCase } from '../types/case';

export const usePortalAccess = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPortalAccess = async (caseData: NewCase) => {
    try {
      setLoading(true);
      setError(null);
      const portalId = await portalService.createPortalAccess(caseData);
      return portalId;
    } catch (err) {
      setError('Failed to create portal access');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPortalAccess,
    loading,
    error
  };
};