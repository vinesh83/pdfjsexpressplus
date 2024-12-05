import React, { useState } from 'react';
import { ServiceSettings } from '../../../types/services';
import ServiceSelector from './ServiceSelector';
import ServiceSettingsPanel from './ServiceSettings';
import ServiceCard from './ServiceCard';
import ServiceSummary from './ServiceSummary';
import { useServiceManagement } from '../../../hooks/useServiceManagement';

interface ServicesTabProps {
  clientId: string;
  clientName: string;
  contacts: Array<{ id: string; name: string }>;
}

const DEFAULT_SERVICES: ServiceSettings[] = [
  {
    id: '1',
    name: 'I-130 Petition for Alien Relative',
    type: 'form',
    defaultAttorneyFee: 2500,
    defaultFilingFee: 535,
    description: 'Petition for qualifying relatives of U.S. citizens and LPRs'
  },
  {
    id: '2',
    name: 'I-485 Adjustment of Status',
    type: 'form',
    defaultAttorneyFee: 3500,
    defaultFilingFee: 1225,
    description: 'Application to Register Permanent Residence'
  }
];

const ServicesTab: React.FC<ServicesTabProps> = ({ clientId, clientName, contacts }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [serviceSettings, setServiceSettings] = useState<ServiceSettings[]>(DEFAULT_SERVICES);
  const { services, addService, updateService, removeService, calculateTotals } = useServiceManagement();

  const handleSaveSettings = (newSettings: ServiceSettings[]) => {
    setServiceSettings(newSettings);
    setShowSettings(false);
  };

  const handleSendQuote = async (notes: string) => {
    // TODO: Implement quote sending functionality
    console.log('Sending quote with notes:', notes);
    const quoteData = {
      services,
      totals: calculateTotals(),
      notes,
      clientId,
      clientName,
      sentAt: new Date()
    };
    // Add API call here to send quote
    console.log('Quote data:', quoteData);
  };

  if (showSettings) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => setShowSettings(false)}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            ← Back to Services
          </button>
        </div>
        <ServiceSettingsPanel
          settings={serviceSettings}
          onSave={handleSaveSettings}
        />
      </div>
    );
  }

  const totals = calculateTotals();

  return (
    <div className="grid grid-cols-12 h-full divide-x divide-gray-200">
      {/* Left Panel - Service Selection */}
      <div className="col-span-4 bg-gray-50">
        <div className="sticky top-0 bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Add Services</h2>
            <button
              onClick={() => setShowSettings(true)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Settings
            </button>
          </div>
        </div>

        <div className="p-4">
          <ServiceSelector
            availableServices={serviceSettings}
            selectedServices={services}
            clientId={clientId}
            contacts={contacts}
            onAddService={addService}
            onUpdateService={updateService}
            onRemoveService={removeService}
            compact={true}
          />
        </div>
      </div>

      {/* Right Panel - Selected Services & Summary */}
      <div className="col-span-8 flex flex-col bg-white">
        {/* Selected Services List */}
        <div className="flex-1">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
            <h2 className="text-lg font-semibold">Selected Services</h2>
          </div>
          
          <div className="p-4">
            {services.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No services selected yet. Add services from the left panel.
              </div>
            ) : (
              <div className="grid gap-3">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    contactName={contacts.find(c => c.id === service.assignedTo)?.name}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Fixed Summary Footer */}
        <div className="border-t border-gray-200">
          <ServiceSummary 
            {...totals}
            services={services}
            clientName={clientName}
            onSendQuote={handleSendQuote}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesTab;