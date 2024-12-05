import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { Service, ServiceSettings } from '../../../types/services';
import { v4 as uuidv4 } from 'uuid';

interface ServiceSelectorProps {
  availableServices: ServiceSettings[];
  selectedServices: Service[];
  clientId: string;
  contacts: Array<{ id: string; name: string }>;
  onAddService: (service: Service) => void;
  onUpdateService: (serviceId: string, updates: Partial<Service>) => void;
  onRemoveService: (serviceId: string) => void;
  compact?: boolean;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  availableServices,
  selectedServices,
  clientId,
  contacts,
  onAddService,
  compact = false
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [assignedTo, setAssignedTo] = useState(clientId);
  const [assignedToType, setAssignedToType] = useState<'client' | 'contact'>('client');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customService, setCustomService] = useState({
    name: '',
    attorneyFee: '',
    filingFee: ''
  });

  const handleAddService = () => {
    if (showCustomForm) {
      if (!customService.name || !customService.attorneyFee) return;

      const newService: Service = {
        id: uuidv4(),
        serviceId: uuidv4(),
        name: customService.name,
        type: 'custom',
        attorneyFee: Number(customService.attorneyFee),
        filingFee: Number(customService.filingFee) || 0,
        assignedTo,
        assignedToType
      };

      onAddService(newService);
      setCustomService({ name: '', attorneyFee: '', filingFee: '' });
      setShowCustomForm(false);
    } else {
      const serviceTemplate = availableServices.find(s => s.id === selectedServiceId);
      if (!serviceTemplate) return;

      const newService: Service = {
        id: uuidv4(),
        serviceId: serviceTemplate.id,
        name: serviceTemplate.name,
        type: serviceTemplate.type,
        attorneyFee: serviceTemplate.defaultAttorneyFee,
        filingFee: serviceTemplate.defaultFilingFee,
        assignedTo,
        assignedToType
      };

      onAddService(newService);
      setSelectedServiceId('');
    }
  };

  const selectedService = availableServices.find(s => s.id === selectedServiceId);

  return (
    <div className="flex flex-col h-full">
      {/* Service Type Toggle */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setShowCustomForm(false)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            !showCustomForm 
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Select Service
        </button>
        <button
          onClick={() => setShowCustomForm(true)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
            showCustomForm 
              ? 'bg-indigo-100 text-indigo-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Custom Service
        </button>
      </div>

      {/* Service Selection Content */}
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {showCustomForm ? (
            // Custom Service Form
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  value={customService.name}
                  onChange={(e) => setCustomService({ ...customService, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter custom service name..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attorney Fee
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={customService.attorneyFee}
                      onChange={(e) => setCustomService({ ...customService, attorneyFee: e.target.value })}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filing Fee
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={customService.filingFee}
                      onChange={(e) => setCustomService({ ...customService, filingFee: e.target.value })}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Service Selection Group
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Service Type
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className={`
                  w-full px-3 py-2 border rounded-lg transition-colors
                  ${selectedServiceId ? 'border-indigo-300 ring-1 ring-indigo-500' : 'border-gray-300'}
                  focus:ring-2 focus:ring-indigo-500
                `}
              >
                <option value="">Choose a service...</option>
                <optgroup label="Immigration Forms">
                  {availableServices
                    .filter(s => s.type === 'form')
                    .map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))
                  }
                </optgroup>
                <optgroup label="Custom Services">
                  {availableServices
                    .filter(s => s.type === 'custom')
                    .map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))
                  }
                </optgroup>
              </select>

              {selectedService && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-900">{selectedService.name}</span>
                    <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                      {selectedService.type === 'form' ? 'Immigration Form' : 'Custom Service'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-white p-2 rounded border border-gray-100">
                      <span className="text-xs text-gray-500 block">Attorney Fee</span>
                      <span className="font-medium text-gray-900">{selectedService.defaultAttorneyFee}</span>
                    </div>
                    <div className="bg-white p-2 rounded border border-gray-100">
                      <span className="text-xs text-gray-500 block">Filing Fee</span>
                      <span className="font-medium text-gray-900">{selectedService.defaultFilingFee}</span>
                    </div>
                  </div>
                  {selectedService.description && (
                    <div className="flex items-start space-x-2 text-xs text-gray-600 bg-white p-2 rounded border border-gray-100">
                      <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      <p>{selectedService.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Assignment Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Assign Service To
        </label>
        <select
          value={assignedTo}
          onChange={(e) => {
            setAssignedTo(e.target.value);
            setAssignedToType(e.target.value === clientId ? 'client' : 'contact');
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value={clientId}>Client (Primary)</option>
          <optgroup label="Related Contacts">
            {contacts.map(contact => (
              <option key={contact.id} value={contact.id}>
                {contact.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleAddService}
        disabled={showCustomForm ? !customService.name || !customService.attorneyFee : !selectedServiceId}
        className={`
          w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg
          transition-all duration-200 relative overflow-hidden
          ${(showCustomForm && customService.name && customService.attorneyFee) || (!showCustomForm && selectedServiceId)
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">
          {showCustomForm 
            ? customService.name ? 'Add Custom Service' : 'Enter Service Details Above'
            : selectedServiceId ? 'Add Selected Service' : 'Select a Service Above'
          }
        </span>
      </button>
    </div>
  );
};

export default ServiceSelector;