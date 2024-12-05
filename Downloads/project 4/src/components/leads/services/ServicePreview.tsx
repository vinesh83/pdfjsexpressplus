import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ServiceSettings } from '../../../types/services';

interface ServicePreviewProps {
  service: ServiceSettings;
}

const ServicePreview: React.FC<ServicePreviewProps> = ({ service }) => {
  return (
    <div className="bg-white p-4 rounded-lg border-2 border-indigo-100 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-indigo-900">{service.name}</span>
        <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">
          {service.type === 'form' ? 'Immigration Form' : 'Custom Service'}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="bg-gray-50 p-2 rounded">
          <span className="text-xs text-gray-500 block">Attorney Fee</span>
          <span className="font-medium text-gray-900">${service.defaultAttorneyFee}</span>
        </div>
        <div className="bg-gray-50 p-2 rounded">
          <span className="text-xs text-gray-500 block">Filing Fee</span>
          <span className="font-medium text-gray-900">${service.defaultFilingFee}</span>
        </div>
      </div>
      {service.description && (
        <div className="flex items-start space-x-2 text-xs text-gray-600 bg-blue-50 p-2 rounded">
          <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p>{service.description}</p>
        </div>
      )}
    </div>
  );
};

export default ServicePreview;