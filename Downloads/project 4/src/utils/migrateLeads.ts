import { Lead } from '../types/leads';
import { usePortalStore } from '../store/portalStore';
import { MOCK_LEADS } from '../data/mockLeads';

export const migrateLeadsToPortal = () => {
  const { portalAccess, createPortalAccess } = usePortalStore.getState();
  
  // Process each lead
  MOCK_LEADS.forEach(lead => {
    // Check if portal access already exists for this lead
    const existingAccess = Object.values(portalAccess).find(
      access => 
        access.clientInfo.firstName === lead.firstName && 
        access.clientInfo.lastName === lead.lastName
    );

    if (!existingAccess) {
      // Create portal access for the lead
      createPortalAccess({
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
      }, lead.id); // Pass the lead ID when creating portal access
    }
  });
};