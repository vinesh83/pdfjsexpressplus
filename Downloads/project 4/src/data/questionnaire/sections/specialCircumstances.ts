import { QuestionnaireSection } from '../../../types/questionnaire';

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