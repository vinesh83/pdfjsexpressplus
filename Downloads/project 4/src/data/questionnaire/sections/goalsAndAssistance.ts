import { QuestionnaireSection } from '../../../types/questionnaire';

export const GOALS_AND_ASSISTANCE: QuestionnaireSection = {
  id: 'goals_assistance',
  title: 'Client\'s Goals and Assistance Needed',
  description: 'This section helps us understand what type of immigration assistance you are seeking.',
  questions: [
    {
      id: 'assistance_purpose',
      type: 'checkbox',
      text: 'Please select the primary reason(s) why you are seeking immigration assistance',
      required: false,
      options: [
        '"Fix Papers" or Get Legal Immigration Status',
        'Apply for Asylum',
        'Obtain a Green Card (Lawful Permanent Residence)',
        'Apply for U.S. Citizenship (Naturalization)',
        'Determine if You Are Already a U.S. Citizen',
        'Defend Against Deportation/Removal Proceedings',
        'Reopen or Appeal a Deportation/Removal Order',
        'Renew or Extend Current Immigration Status',
        'Address Pending Criminal Charges Affecting Immigration Status',
        'Apply for Family-Based Immigration Benefits',
        'Apply for U Visa or T Visa',
        'Obtain Work Authorization'
      ],
      helpText: 'Select all that apply'
    },
    {
      id: 'assistance_purpose_other',
      type: 'longText',
      text: 'Other (Please specify)',
      required: false
    }
  ]
};