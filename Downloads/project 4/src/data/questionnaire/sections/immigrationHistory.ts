import { QuestionnaireSection } from '../../../types/questionnaire';

export const IMMIGRATION_HISTORY: QuestionnaireSection = {
  id: 'immigration_history',
  title: 'Immigration History',
  description: 'Please provide information about your entries to the United States.',
  questions: [
    {
      id: 'entry_attempts',
      type: 'select',
      text: 'How many times have you tried to enter the United States?',
      required: false,
      options: ['1', '2', '3', '4', '5', 'More than 5']
    }
  ]
};