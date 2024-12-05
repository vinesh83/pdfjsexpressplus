import React from 'react';
import { useQuestionnaireStore } from '../../store/questionnaireStore';

interface IntakeTabProps {
  clientId: string;
}

const IntakeTab: React.FC<IntakeTabProps> = ({ clientId }) => {
  const { getQuestionnaireResponseByLeadId } = useQuestionnaireStore();
  const questionnaireResponse = getQuestionnaireResponseByLeadId(clientId);

  if (!questionnaireResponse) {
    return (
      <div className="p-6 text-center text-gray-500">
        No questionnaire response available
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        {Object.entries(questionnaireResponse.sections || {}).map(([sectionKey, section]) => (
          <div key={sectionKey} className="border-b border-gray-200 last:border-b-0 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {section.title}
            </h3>
            <div className="space-y-4">
              {Object.entries(section.answers || {}).map(([questionId, answer]) => (
                <div key={questionId}>
                  <div className="font-medium text-gray-700">{answer.question}</div>
                  <div className="mt-1 text-gray-900">{answer.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntakeTab;