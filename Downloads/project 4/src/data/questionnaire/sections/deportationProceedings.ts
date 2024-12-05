import { QuestionnaireSection } from '../../../types/questionnaire';

export const DEPORTATION_PROCEEDINGS: QuestionnaireSection = {
  id: 'deportation_proceedings',
  title: 'Deportation or Removal Proceedings',
  description: 'Please provide information about any deportation or removal proceedings.',
  questions: [
    {
      id: 'has_deportation_proceedings',
      type: 'radio',
      text: 'Have you ever been placed in deportation or removal proceedings before an immigration judge?',
      required: false,
      options: ['Yes', 'No', 'I don\'t know'],
      helpText: 'This refers to cases where you received a Notice to Appear (NTA) and were required to present your case in immigration court.'
    }
  ]
};