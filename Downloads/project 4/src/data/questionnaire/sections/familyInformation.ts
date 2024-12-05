import { QuestionnaireSection } from '../../../types/questionnaire';

export const FAMILY_INFORMATION: QuestionnaireSection = {
  id: 'family_information',
  title: 'Family Information',
  description: 'This section gathers information about your family relationships.',
  questions: [
    {
      id: 'marital_status',
      type: 'select',
      text: 'What is your current marital status?',
      required: false,
      options: [
        'Single/Never Married',
        'Married',
        'Married but Separated',
        'Divorced',
        'Widowed'
      ]
    },
    {
      id: 'serious_relationship',
      type: 'radio',
      text: 'Are you currently in a serious relationship with someone you live with?',
      required: false,
      options: ['Yes', 'No']
    }
  ]
};