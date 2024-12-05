import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { NewCase } from '../types/case';
import { MOCK_LEADS } from '../data/mockLeads';

interface PortalAccess {
  id: string;
  leadId: string;
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  imageUrl?: string;
  caseType: string;
  status: 'pending' | 'active' | 'completed';
  questionnaireStatus: 'not_started' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

interface PortalStore {
  portalAccess: Record<string, PortalAccess>;
  initialized: boolean;
  createPortalAccess: (caseData: NewCase, leadId: string) => string;
  getPortalAccess: (clientId: string) => PortalAccess | null;
  updatePortalAccess: (clientId: string, updates: Partial<PortalAccess>) => void;
  initializeStore: () => void;
  resetStore: () => void;
}

const convertDates = (obj: any): any => {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (newObj[key] && typeof newObj[key] === 'object') {
      newObj[key] = convertDates(newObj[key]);
    } else if (
      typeof newObj[key] === 'string' && 
      (key === 'createdAt' || key === 'updatedAt')
    ) {
      newObj[key] = new Date(newObj[key]);
    }
  }
  return newObj;
};

export const usePortalStore = create<PortalStore>()(
  persist(
    (set, get) => ({
      portalAccess: {},
      initialized: false,

      resetStore: () => {
        set({ portalAccess: {}, initialized: false });
      },

      initializeStore: () => {
        if (get().initialized) return;

        get().resetStore();

        MOCK_LEADS.forEach(lead => {
          const portalId = uuidv4();
          const newAccess: PortalAccess = {
            id: portalId,
            leadId: lead.id,
            clientInfo: {
              firstName: lead.firstName,
              lastName: lead.lastName,
              phone: lead.phone || '',
              email: lead.email || ''
            },
            imageUrl: lead.imageUrl,
            caseType: lead.caseType,
            status: 'pending',
            questionnaireStatus: 'not_started',
            createdAt: new Date(),
            updatedAt: new Date()
          };

          set((state) => ({
            portalAccess: {
              ...state.portalAccess,
              [portalId]: newAccess
            }
          }));
        });

        set({ initialized: true });
      },
      
      createPortalAccess: (caseData: NewCase, leadId: string) => {
        const existingAccess = Object.values(get().portalAccess).find(
          access => access.leadId === leadId
        );

        if (existingAccess) {
          return existingAccess.id;
        }

        const portalId = uuidv4();
        const newAccess: PortalAccess = {
          id: portalId,
          leadId,
          clientInfo: {
            firstName: caseData.clientInfo.firstName,
            lastName: caseData.clientInfo.lastName,
            email: caseData.clientInfo.email,
            phone: caseData.clientInfo.phone
          },
          caseType: caseData.caseDetails.type,
          status: 'pending',
          questionnaireStatus: 'not_started',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set((state) => ({
          portalAccess: {
            ...state.portalAccess,
            [portalId]: newAccess
          }
        }));

        return portalId;
      },

      updatePortalAccess: (clientId: string, updates: Partial<PortalAccess>) => {
        const currentAccess = get().portalAccess[clientId];
        if (!currentAccess) return;

        set((state) => ({
          portalAccess: {
            ...state.portalAccess,
            [clientId]: {
              ...currentAccess,
              ...updates,
              updatedAt: new Date()
            }
          }
        }));
      },

      getPortalAccess: (clientId: string) => {
        const access = get().portalAccess[clientId];
        return access ? convertDates(access) : null;
      }
    }),
    {
      name: 'portal-storage',
      partialize: (state) => ({ 
        portalAccess: state.portalAccess,
        initialized: state.initialized 
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.portalAccess = Object.entries(state.portalAccess).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]: convertDates(value)
            }),
            {}
          );
        }
      }
    }
  )
);