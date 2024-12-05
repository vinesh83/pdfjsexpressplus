// Import existing sections
import { QuestionnaireSection } from '../types/questionnaire';

// Section 1A: Personal Information Confirmation
export const PERSONAL_INFO_CONFIRMATION: QuestionnaireSection = {
  id: 'personal_confirmation',
  title: 'Personal Information',
  description: 'Please review and update your personal information if needed.',
  questions: [
    {
      id: 'name_first',
      type: 'text',
      text: 'First Name',
      required: false
    },
    {
      id: 'name_middle',
      type: 'text',
      text: 'Middle Name',
      required: false
    },
    {
      id: 'name_last',
      type: 'text',
      text: 'Last Name',
      required: false
    },
    {
      id: 'dob',
      type: 'date',
      text: 'Date of Birth',
      required: false
    },
    {
      id: 'birth_country',
      type: 'select',
      text: 'Country of Birth',
      required: false,
      options: ['Mexico', 'El Salvador', 'Guatemala', 'Honduras', 'Nicaragua', 'Other']
    },
    {
      id: 'preferred_language',
      type: 'select',
      text: 'What is your preferred language?',
      required: false,
      options: ['English', 'Spanish', 'Other']
    },
    {
      id: 'needs_interpreter',
      type: 'radio',
      text: 'Do you need an interpreter?',
      required: false,
      options: ['Yes', 'No']
    },
    {
      id: 'email',
      type: 'email',
      text: 'Email Address',
      required: false
    },
    {
      id: 'phone',
      type: 'phone',
      text: 'Phone Number',
      required: false
    },
    {
      id: 'has_a_number',
      type: 'radio',
      text: 'Do you have an Alien Registration Number (A-Number)?',
      required: false,
      options: ['Yes', 'No', 'I don\'t know'],
      helpText: 'An A-Number is a unique 9-digit identifier assigned by USCIS, found on documents like a green card or employment authorization card.'
    },
    {
      id: 'a_number',
      type: 'text',
      text: 'A-Number',
      required: false,
      conditional: {
        dependsOn: 'has_a_number',
        showWhen: 'Yes'
      }
    }
  ]
};

// Section 1B: Client's Goals and Assistance Needed
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

// Section 2: Current Immigration Status
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

// Section 3: Immigration History
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

// Section 4: Deportation or Removal Proceedings
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

// Section 5: Criminal History
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

// Section 6: Special Circumstances
export const SPECIAL_CIRCUMSTANCES: QuestionnaireSection = {
  id: 'special_circumstances',
  title: 'Special Circumstances',
  description: 'This section gathers information about any special situations that may qualify you for certain immigration benefits or reliefs.',
  questions: [
    {
      id: 'fears_persecution',
      type: 'radio',
      text: 'Do you fear harm or persecution if returned to your home country?',
      required: false,
      options: ['Yes', 'No']
    },
    {
      id: 'victim_of_crime',
      type: 'radio',
      text: 'Have you or any immediate family member ever been the victim of a crime in the U.S.?',
      required: false,
      options: ['Yes', 'No']
    },
    {
      id: 'victim_of_trafficking',
      type: 'radio',
      text: 'Have you ever been a victim of human trafficking in the U.S. or en route to the U.S.?',
      required: false,
      options: ['Yes', 'No']
    },
    {
      id: 'health_problems',
      type: 'radio',
      text: 'Do you or any immediate family members have serious health conditions or disabilities?',
      required: false,
      options: ['Yes', 'No']
    }
  ]
};

// Section 7: Family Information
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

// Section 8: Additional Information
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

export const QUESTIONNAIRE_SECTIONS = [
  PERSONAL_INFO_CONFIRMATION,
  GOALS_AND_ASSISTANCE,
  CURRENT_STATUS,
  IMMIGRATION_HISTORY,
  DEPORTATION_PROCEEDINGS,
  CRIMINAL_HISTORY,
  SPECIAL_CIRCUMSTANCES,
  FAMILY_INFORMATION,
  ADDITIONAL_INFORMATION
];