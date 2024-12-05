import { NewCase } from '../types/case';
import { usePortalStore } from '../store/portalStore';

export const portalService = {
  async createPortalAccess(caseData: NewCase): Promise<string> {
    try {
      // Get existing portal access with same email if any
      const store = usePortalStore.getState();
      const existingAccess = Object.values(store.portalAccess).find(
        access => access.clientInfo.email === caseData.clientInfo.email
      );

      if (existingAccess) {
        return existingAccess.id;
      }

      // Create new portal access
      const portalId = await store.createPortalAccess(caseData);
      return portalId;
    } catch (error) {
      console.error('Error creating portal access:', error);
      throw error;
    }
  },

  async getPortalAccess(clientId: string) {
    try {
      return usePortalStore.getState().getPortalAccess(clientId);
    } catch (error) {
      console.error('Error getting portal access:', error);
      throw error;
    }
  }
};