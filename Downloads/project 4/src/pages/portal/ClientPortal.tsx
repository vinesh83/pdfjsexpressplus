import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortalStore } from '../../store/portalStore';
import { useCaseStore } from '../../store/caseStore';
import { useQuestionnaireStore } from '../../store/questionnaireStore';
import { QuestionnaireResponse } from '../../types/questionnaire';

const ClientPortal = () => {
  const navigate = useNavigate();
  const { portalAccess, initializeStore, updatePortalStatus } = usePortalStore();
  const { cases } = useCaseStore();
  const { submitQuestionnaire } = useQuestionnaireStore();

  useEffect(() => {
    // Initialize store with mock leads if not already done
    initializeStore();
  }, [initializeStore]);

  // Convert portal access records to array and ensure dates are properly converted
  const portalClients = Object.values(portalAccess)
    .map(client => ({
      ...client,
      createdAt: new Date(client.createdAt),
      updatedAt: new Date(client.updatedAt)
    }))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleQuestionnaireSubmit = (clientId: string, response: QuestionnaireResponse) => {
    // Find the associated lead ID
    const clientCase = cases[clientId];
    if (!clientCase) {
      console.error('No case found for client:', clientId);
      return;
    }

    // Submit questionnaire with the lead ID
    submitQuestionnaire(clientCase.leadId, response);
    
    // Update portal status
    updatePortalStatus(clientId, {
      questionnaireStatus: 'completed',
      status: 'submitted'
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Client Portal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portalClients.map((client) => {
          // Find associated case
          const clientCase = Object.values(cases).find(
            c => c.portalId === client.id
          );

          return (
            <div
              key={client.id}
              onClick={() => navigate(`/portal/${client.id}`)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer p-6 border border-gray-100"
            >
              <div className="flex items-center space-x-4 mb-4">
                {client.imageUrl ? (
                  <img
                    src={client.imageUrl}
                    alt={`${client.clientInfo.firstName} ${client.clientInfo.lastName}`}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-lg">
                    {client.clientInfo.firstName.charAt(0)}
                    {client.clientInfo.lastName.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-900">
                    {client.clientInfo.firstName} {client.clientInfo.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{client.clientInfo.email || 'No email provided'}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Case Type:</span>
                  <span className="font-medium text-gray-900">
                    {client.caseType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="font-medium text-gray-900">
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Questionnaire:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.questionnaireStatus === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : client.questionnaireStatus === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {client.questionnaireStatus.split('_').map(
                      word => word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Created on {client.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}

        {portalClients.length === 0 && (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">No clients in the portal yet.</p>
            <p className="text-sm text-gray-400 mt-1">Add a new case from the Pipeline to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPortal;