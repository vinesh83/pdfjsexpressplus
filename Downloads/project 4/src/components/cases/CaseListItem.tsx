import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, CheckCircle2, Circle } from 'lucide-react';
import { Case } from '../../types/clients';

interface CaseListItemProps {
  case_: Case;
}

const CaseListItem = ({ case_ }: CaseListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const progress = Math.round((case_.progress.currentStage / case_.progress.totalStages) * 100);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Collapsed Header */}
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleToggle}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Collapse case details' : 'Expand case details'}
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>
            <div>
              <h4 className="font-medium text-gray-900">{case_.title}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-600">{case_.type}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                  {case_.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {case_.progress && (
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          {/* Strategy & Instructions */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Strategy</h5>
              <p className="text-sm text-gray-600">{case_.strategy}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Instructions</h5>
              <p className="text-sm text-gray-600">{case_.instructions}</p>
            </div>
          </div>

          {/* Progress Timeline */}
          {case_.progress && (
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-sm font-medium text-gray-900">Progress</h5>
                <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                  Stage {case_.progress.currentStage} of {case_.progress.totalStages}
                </span>
              </div>

              <div className="relative flex justify-between items-start">
                {case_.progress.stages.map((stage, index) => {
                  const isCompleted = index + 1 <= case_.progress.currentStage;
                  const isCurrent = index + 1 === case_.progress.currentStage;
                  
                  return (
                    <div 
                      key={stage.id} 
                      className={`
                        flex flex-col items-center relative group
                        ${index === 0 ? 'flex-1' : index === case_.progress.stages.length - 1 ? 'flex-1' : 'flex-[2]'}
                      `}
                    >
                      <div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center z-10
                          transition-all duration-200 
                          ${isCompleted 
                            ? 'bg-indigo-500 text-white' 
                            : isCurrent
                            ? 'bg-white border-2 border-indigo-500 text-indigo-500'
                            : 'bg-white border-2 border-gray-200 text-gray-400'
                          }
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </div>

                      <div className="mt-3 text-center">
                        <p className={`
                          text-sm font-medium
                          ${isCurrent ? 'text-indigo-600' : 'text-gray-600'}
                        `}>
                          {stage.name}
                        </p>
                        {stage.dueDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Due: {formatDate(stage.dueDate)}
                          </p>
                        )}
                      </div>

                      {/* Stage Description Tooltip */}
                      <div className="absolute bottom-full mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="bg-gray-900 text-white text-xs rounded py-2 px-3 max-w-[200px]">
                          <p className="font-medium">{stage.name}</p>
                          <p className="text-gray-300 mt-1">{stage.description}</p>
                          {stage.estimatedDuration && (
                            <p className="text-gray-300 mt-1">
                              Est. Duration: {stage.estimatedDuration}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* USCIS Status */}
          {case_.uscisStatus && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <h5 className="text-sm font-medium text-gray-900">USCIS Status</h5>
                  <span className="px-3 py-1 rounded-full text-sm bg-white/50">
                    Form {case_.uscisStatus.form}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  Last Updated: {formatDate(case_.uscisStatus.lastUpdated)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <p className="text-sm text-gray-600">{case_.uscisStatus.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Receipt Number</p>
                    <p className="text-sm text-gray-600">{case_.uscisStatus.receiptNumber}</p>
                  </div>
                  {case_.uscisStatus.processingCenter && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Processing Center</p>
                      <p className="text-sm text-gray-600">{case_.uscisStatus.processingCenter}</p>
                    </div>
                  )}
                </div>

                <div>
                  {case_.uscisStatus.estimatedProcessingTime && (
                    <div className="bg-white/50 rounded-lg p-4 mb-4">
                      <p className="text-sm font-medium text-gray-700">Processing Time</p>
                      <p className="text-sm text-gray-600">{case_.uscisStatus.estimatedProcessingTime}</p>
                    </div>
                  )}

                  {case_.uscisStatus.alerts && case_.uscisStatus.alerts.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Important Alerts</p>
                      {case_.uscisStatus.alerts.map((alert, index) => (
                        <div
                          key={index}
                          className="bg-white/50 rounded-lg p-3 text-sm text-gray-600"
                        >
                          {alert}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CaseListItem;