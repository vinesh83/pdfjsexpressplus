import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { NewCase } from '../types/case';

interface Case extends NewCase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'new' | 'in_progress' | 'completed';
}

interface CaseStore {
  cases: Record<string, Case>;
  addCase: (caseData: NewCase) => string;
  getCase: (id: string) => Case | null;
  updateCase: (id: string, updates: Partial<Case>) => void;
}

// Helper function to convert dates in an object
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

export const useCaseStore = create<CaseStore>()(
  persist(
    (set, get) => ({
      cases: {},

      addCase: (caseData: NewCase) => {
        const caseId = uuidv4();
        const newCase: Case = {
          ...caseData,
          id: caseId,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'new'
        };

        set((state) => ({
          cases: {
            ...state.cases,
            [caseId]: newCase
          }
        }));

        return caseId;
      },

      getCase: (id: string) => {
        const case_ = get().cases[id];
        return case_ ? convertDates(case_) : null;
      },

      updateCase: (id: string, updates: Partial<Case>) => {
        set((state) => ({
          cases: {
            ...state.cases,
            [id]: {
              ...state.cases[id],
              ...updates,
              updatedAt: new Date()
            }
          }
        }));
      }
    }),
    {
      name: 'case-storage',
      partialize: (state) => ({ cases: state.cases }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert dates when rehydrating from storage
          state.cases = Object.entries(state.cases).reduce(
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