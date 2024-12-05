import React from 'react';
import { Service } from '../../../types/services';

interface ServiceCardProps {
  service: Service;
  contactName?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, contactName }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div className="min-w-0 flex-1">
          <h5 className="font-medium text-gray-900 truncate">{service.name}</h5>
          <span className="text-sm text-gray-500">
            Assigned to: {service.assignedToType === 'client' ? 'Client' : contactName}
          </span>
        </div>
        <div className="flex items-center space-x-4 ml-4">
          <div className="text-right">
            <div className="text-xs text-gray-500">Attorney Fee</div>
            <div className="font-medium">{service.attorneyFee}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Filing Fee</div>
            <div className="font-medium">{service.filingFee}</div>
          </div>
        </div>
      </div>
      {service.disclaimer && (
        <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
          {service.disclaimer}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;