import { QuestionnaireSection } from '../../../types/questionnaire';

export const ADDITIONAL_INFORMATION: QuestionnaireSection = {
  id: 'additional_information',
  title: 'Additional Information',
  description: 'Please provide any additional information that may be relevant to your case.',
  questions: [
    {
      id: 'has_deadlines',
      type: 'radio',
      text: 'Do you have any upcoming deadlines or court dates related to your immigration case?',
      required: false,
      options: ['Yes', 'No']
    },
    {
      id: 'additional_details',
      type: 'longText',
      text: 'Please provide any additional information about your situation or the assistance you are seeking',
      required: false,
      helpText: 'Include any specific concerns, questions, or details that may help us better understand your needs.'
    }
  ]
};