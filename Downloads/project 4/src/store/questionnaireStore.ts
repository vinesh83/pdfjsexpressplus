import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuestionnaireResponse } from '../types/questionnaire';

interface QuestionnaireState {
  responses: Record<string, QuestionnaireResponse>;
  submitQuestionnaire: (leadId: string, response: QuestionnaireResponse) => void;
  getQuestionnaireResponseByLeadId: (leadId: string) => QuestionnaireResponse | null;
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set, get) => ({
      responses: {},
      
      submitQuestionnaire: (leadId, response) => {
        set((state) => ({
          responses: {
            ...state.responses,
            [leadId]: {
              ...response,
              submittedAt: new Date().toISOString(),
              leadId
            },
          },
        }));
      },

      getQuestionnaireResponseByLeadId: (leadId) => {
        const state = get();
        if (!leadId) {
          console.warn('No leadId provided to getQuestionnaireResponseByLeadId');
          return null;
        }
        return state.responses[leadId] || null;
      },
    }),
    {
      name: 'questionnaire-storage',
      version: 1,
    }
  )
);

