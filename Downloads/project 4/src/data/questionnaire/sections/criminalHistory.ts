import { QuestionnaireSection } from '../../../types/questionnaire';

export const CRIMINAL_HISTORY: QuestionnaireSection = {
  id: 'criminal_history',
  title: 'Criminal History',
  description: 'Please provide information about any arrests, charges, or convictions.',
  questions: [
    {
      id: 'has_criminal_history',
      type: 'radio',
      text: 'Have you ever been arrested, charged, or convicted of a crime or offense in the United States or any other country?',
      required: false,
      options: ['Yes', 'No']
    }
  ]
};