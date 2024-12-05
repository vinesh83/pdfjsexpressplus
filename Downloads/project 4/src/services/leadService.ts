import { Lead } from '../types/leads';
import { useCaseStore } from '../store/caseStore';
import { usePortalStore } from '../store/portalStore';
import { NewCase } from '../types/case';
import { MOCK_LEADS } from '../data/mockLeads';

export const leadService = {
  async getLeadsByStatus(status: string, page = 1): Promise<{ leads: Lead[]; hasMore: boolean }> {
    // Filter mock leads by status
    const filteredLeads = MOCK_LEADS.filter(lead => lead.status === status);
    const pageSize = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
      leads: filteredLeads.slice(startIndex, endIndex),
      hasMore: endIndex < filteredLeads.length
    };
  },

  async addLead(lead: Omit<Lead, 'id'>): Promise<string> {
    try {
      // Create case data from lead
      const caseData: NewCase = {
        clientType: lead.isReturning ? 'existing' : 'new',
        clientInfo: {
          firstName: lead.firstName,
          lastName: lead.lastName,
          phone: lead.phone || '',
          email: lead.email || ''
        },
        birthInfo: {
          month: '',
          day: '',
          year: '',
          countryOfBirth: lead.citizenship,
          citizenship: lead.citizenship,
          gender: 'Male',
          languages: [],
          preferredLanguage: 'English'
        },
        contact: {
          type: 'client',
          contacts: []
        },
        caseDetails: {
          type: lead.caseType,
          description: '',
          leadSource: lead.leadSource || 'Meta',
          notes: ''
        }
      };

      // Generate a unique ID for the lead
      const leadId = `lead-${Date.now()}`;

      // First create portal access
      const portalStore = usePortalStore.getState();
      const portalId = portalStore.createPortalAccess(caseData, leadId);

      // Then create case with portal ID
      const caseStore = useCaseStore.getState();
      const caseId = caseStore.addCase({
        ...caseData,
        portalId
      });

      return leadId;
    } catch (error) {
      console.error('Error adding lead:', error);
      throw error;
    }
  },

  async updateLead(leadId: string, updates: Partial<Lead>): Promise<void> {
    // Find portal access for this lead
    const portalStore = usePortalStore.getState();
    const portalAccess = Object.values(portalStore.portalAccess).find(
      access => access.leadId === leadId
    );

    if (portalAccess) {
      // Update portal access if needed
      if (updates.questionnaire) {
        portalStore.updatePortalAccess(portalAccess.id, {
          questionnaireStatus: updates.questionnaire === 'completed' ? 'completed' : 'in_progress'
        });
      }
    }
  }
};