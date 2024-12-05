import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MOCK_CLIENTS } from '../../data/mockClients';
import IntakeQuestionnaire from '../../components/portal/questionnaire/IntakeQuestionnaire';
import { QUESTIONNAIRE_SECTIONS } from '../../data/questionnaireSections';

const IntakeQuestionnairePage = () => {
  const { id } = useParams<{ id: string }>();
  const client = MOCK_CLIENTS.find(c => c.id === id);

  if (!client) {
    return <Navigate to="/portal" replace />;
  }

  const handleSave = async (responses: any) => {
    // TODO: Implement save functionality
    console.log('Saving responses:', responses);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Intake Questionnaire</h1>
        <p className="text-gray-600 mt-2">
          Please complete all sections of this questionnaire. Your responses will help us better understand your case.
        </p>
      </div>

      <IntakeQuestionnaire
        clientId={client.id}
        client={client}
        sections={QUESTIONNAIRE_SECTIONS}
        onSave={handleSave}
      />
    </div>
  );
};

export default IntakeQuestionnairePage;