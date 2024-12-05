import React from 'react';
import { QuestionnaireSection } from '../../../types/questionnaire';
import { QuestionnaireClient } from '../../../types/portal';
import QuestionInput from './QuestionInput';

interface QuestionSectionProps {
  section: QuestionnaireSection;
  responses: {
    questionId: string;
    value: string | string[];
  }[];
  onAnswer: (questionId: string, value: string | string[]) => void;
  clientData: QuestionnaireClient;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({
  section,
  responses,
  onAnswer,
  clientData
}) => {
  const getPrePopulatedValue = (questionId: string) => {
    // First check if there's a response already
    const existingResponse = responses.find(r => r.questionId === questionId);
    if (existingResponse) return existingResponse.value;

    // If no response, check if we should pre-populate from client data
    if (section.id === 'personal_confirmation') {
      switch (questionId) {
        case 'name_first_correction':
          return clientData.firstName;
        case 'name_last_correction':
          return clientData.lastName;
        case 'dob_correction':
          return clientData.birthInfo.dateOfBirth;
        case 'birth_country_correction':
          return clientData.birthInfo.countryOfBirth;
        case 'preferred_language':
          return clientData.birthInfo.preferredLanguage;
        case 'email_correction':
          return clientData.email;
        case 'phone_correction':
          return clientData.phone;
        default:
          return '';
      }
    }

    return '';
  };

  return (
    <div className="space-y-6">
      {section.description && (
        <p className="text-sm text-gray-600">{section.description}</p>
      )}

      <div className="space-y-8">
        {section.questions.map((question) => {
          const value = getPrePopulatedValue(question.id);
          
          // For confirmation questions, show the current value
          if (question.id.endsWith('_confirmation')) {
            const fieldName = question.id.replace('_confirmation', '');
            let currentValue = '';
            
            switch (fieldName) {
              case 'name':
                currentValue = `${clientData.firstName} ${clientData.lastName}`;
                break;
              case 'dob':
                currentValue = clientData.birthInfo.dateOfBirth;
                break;
              case 'birth_country':
                currentValue = clientData.birthInfo.countryOfBirth;
                break;
              case 'contact':
                currentValue = `Email: ${clientData.email}\nPhone: ${clientData.phone}`;
                break;
            }
            
            if (currentValue) {
              return (
                <div key={question.id} className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Current {fieldName.replace('_', ' ')}:</p>
                    <p className="text-sm text-gray-900 mt-1">{currentValue}</p>
                  </div>
                  <QuestionInput
                    question={question}
                    value={value}
                    onChange={(value) => onAnswer(question.id, value)}
                  />
                </div>
              );
            }
          }
          
          return (
            <QuestionInput
              key={question.id}
              question={question}
              value={value}
              onChange={(value) => onAnswer(question.id, value)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuestionSection;