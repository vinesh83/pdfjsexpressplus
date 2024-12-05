import { QuestionnaireSection } from '../../../types/questionnaire';

export const CURRENT_STATUS: QuestionnaireSection = {
  id: 'current_status',
  title: 'Current Immigration Status',
  description: 'Please provide information about your current immigration status.',
  questions: [
    {
      id: 'current_status',
      type: 'select',
      text: 'What is your current immigration status?',
      required: false,
      options: [
        'U.S. Citizen',
        'Green Card (Lawful Permanent Resident)',
        'Entered with a visa and still in valid status',
        'Entered with a visa but has overstayed (visa expired)',
        'Currently has DACA (Deferred Action for Childhood Arrivals)',
        'Had DACA, but it expired and was not renewed',
        'Currently has Temporary Protected Status (TPS)',
        'Had TPS, but it expired and was not renewed',
        'Currently has Asylee Status (granted asylum)',
        'Currently has U Nonimmigrant Status (U Visa)',
        'Currently has T Nonimmigrant Status (T Visa)',
        'Was granted Parole',
        'Parole expired',
        'Undocumented (never had any legal status in the U.S.)',
        'Other',
        'I don\'t know'
      ]
    }
  ]
};