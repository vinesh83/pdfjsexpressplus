import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { usePortalStore } from '../../store/portalStore';
import { useCaseStore } from '../../store/caseStore';
import { useQuestionnaireStore } from '../../store/questionnaireStore';
import { ClipboardList, PenSquare } from 'lucide-react';

const ClientPortalView = () => {
  const { id } = useParams<{ id: string }>();
  const { getPortalAccess } = usePortalStore();
  const { cases } = useCaseStore();
  const { getQuestionnaireResponse } = useQuestionnaireStore();
  
  if (!id) {
    return <Navigate to="/portal" replace />;
  }

  const client = getPortalAccess(id);
  if (!client) {
    return <Navigate to="/portal" replace />;
  }

  const clientCase = Object.values(cases).find(c => c.portalId === id);
  const questionnaireResponse = getQuestionnaireResponse(id);
  const hasCompletedQuestionnaire = questionnaireResponse?.status === 'completed';

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-2xl">
          {client.clientInfo.firstName.charAt(0)}
          {client.clientInfo.lastName.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {client.clientInfo.firstName} {client.clientInfo.lastName}
          </h1>
          <p className="text-gray-600">Welcome to your immigration portal</p>
        </div>
      </div>

      {/* Questionnaire Banner */}
      <div className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 md:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-2">
              {hasCompletedQuestionnaire 
                ? 'Intake Questionnaire Completed'
                : 'Complete Your Intake Questionnaire'}
            </h2>
            <p className="text-indigo-100">
              {hasCompletedQuestionnaire
                ? 'Thank you for providing your information. You can review or edit your responses at any time.'
                : 'Help us better understand your case by providing essential information'}
            </p>
          </div>
          <Link
            to={`/portal/${id}/questionnaire`}
            className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors shadow-md"
          >
            {hasCompletedQuestionnaire ? (
              <>
                <PenSquare className="w-5 h-5 mr-2" />
                Edit Responses
              </>
            ) : (
              <>
                <ClipboardList className="w-5 h-5 mr-2" />
                Start Questionnaire
              </>
            )}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Case Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Case Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Case Type</label>
                  <p className="mt-1 text-gray-900">{client.caseType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Status</label>
                  <p className="mt-1 text-gray-900">{client.status}</p>
                </div>
              </div>
              {clientCase?.caseDetails?.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Description</label>
                  <p className="mt-1 text-gray-900">{clientCase.caseDetails.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to={`/portal/${id}/questionnaire`}
                className="w-full px-4 py-2 text-left text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex items-center"
              >
                {hasCompletedQuestionnaire ? (
                  <>
                    <PenSquare className="w-4 h-4 mr-2" />
                    Edit Questionnaire
                  </>
                ) : (
                  <>
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Complete Questionnaire
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortalView;