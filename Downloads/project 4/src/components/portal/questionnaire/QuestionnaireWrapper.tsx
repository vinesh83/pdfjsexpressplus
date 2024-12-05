import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { usePortalStore } from '../../../store/portalStore';
import IntakeQuestionnaire from './IntakeQuestionnaire';
import { QUESTIONNAIRE_SECTIONS } from '../../../data/questionnaire';
import { QuestionnaireClient } from '../../../types/portal';
import { useQuestionnaireStore } from '../../../store/questionnaireStore';

const QuestionnaireWrapper = () => {
  const { id } = useParams<{ id: string }>();
  const { getPortalAccess } = usePortalStore();
  const { getQuestionnaireResponse } = useQuestionnaireStore();

  if (!id) {
    return <Navigate to="/portal" replace />;
  }

  const portalAccess = getPortalAccess(id);
  if (!portalAccess) {
    return <Navigate to="/portal" replace />;
  }

  // Get existing responses if any
  const savedResponses = getQuestionnaireResponse(id);

  // Transform portal access data into the format expected by the questionnaire
  const client: QuestionnaireClient = {
    id: portalAccess.id,
    firstName: portalAccess.clientInfo.firstName,
    lastName: portalAccess.clientInfo.lastName,
    email: portalAccess.clientInfo.email,
    phone: portalAccess.clientInfo.phone,
    birthInfo: {
      dateOfBirth: portalAccess.birthInfo?.dateOfBirth || '',
      countryOfBirth: portalAccess.birthInfo?.countryOfBirth || '',
      citizenship: portalAccess.birthInfo?.citizenship || '',
      gender: portalAccess.birthInfo?.gender || 'Male',
      languages: portalAccess.birthInfo?.languages || [],
      preferredLanguage: portalAccess.birthInfo?.preferredLanguage || 'English'
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Intake Questionnaire</h1>
        <p className="text-gray-600 mt-2">
          Please complete all sections of this questionnaire. Your responses will help us better understand your case.
        </p>
      </div>

      <IntakeQuestionnaire
        clientId={id}
        client={client}
        savedResponses={savedResponses}
      />
    </>
  );
};

export default QuestionnaireWrapper;