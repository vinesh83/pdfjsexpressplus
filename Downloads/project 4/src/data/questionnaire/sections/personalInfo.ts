import { QuestionnaireSection } from '../../../types/questionnaire';

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