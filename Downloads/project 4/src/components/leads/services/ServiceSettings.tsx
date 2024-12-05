import React, { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';
import { ServiceSettings as ServiceSettingsType } from '../../../types/services';
import { v4 as uuidv4 } from 'uuid';

interface ServiceSettingsPanelProps {
  settings: ServiceSettingsType[];
  onSave: (settings: ServiceSettingsType[]) => void;
}

const ServiceSettingsPanel: React.FC<ServiceSettingsPanelProps> = ({ settings, onSave }) => {
  const [editedSettings, setEditedSettings] = useState(settings);
  const [newService, setNewService] = useState<Partial<ServiceSettingsType>>({
    type: 'form'
  });

  const handleAddService = () => {
    if (!newService.name || !newService.defaultAttorneyFee) return;

    const service: ServiceSettingsType = {
      id: uuidv4(),
      name: newService.name,
      type: newService.type || 'form',
      defaultAttorneyFee: Number(newService.defaultAttorneyFee),
      defaultFilingFee: Number(newService.defaultFilingFee) || 0,
      description: newService.description
    };

    setEditedSettings([...editedSettings, service]);
    setNewService({ type: 'form' });
  };

  const handleDeleteService = (id: string) => {
    setEditedSettings(editedSettings.filter(s => s.id !== id));
  };

  const handleUpdateService = (id: string, updates: Partial<ServiceSettingsType>) => {
    setEditedSettings(editedSettings.map(service => 
      service.id === id ? { ...service, ...updates } : service
    ));
  };

  const handleSave = () => {
    onSave(editedSettings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Service Settings</h3>
        <button 
          onClick={handleSave}
          className="btn-primary flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Add New Service */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h4 className="font-medium">Add New Service</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Name
            </label>
            <input
              type="text"
              value={newService.name || ''}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="e.g., I-130 Petition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={newService.type}
              onChange={(e) => setNewService({ ...newService, type: e.target.value as 'form' | 'custom' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="form">Immigration Form</option>
              <option value="custom">Custom Service</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Attorney Fee
            </label>
            <input
              type="number"
              value={newService.defaultAttorneyFee || ''}
              onChange={(e) => setNewService({ ...newService, defaultAttorneyFee: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Filing Fee
            </label>
            <input
              type="number"
              value={newService.defaultFilingFee || ''}
              onChange={(e) => setNewService({ ...newService, defaultFilingFee: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="0.00"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={newService.description || ''}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={2}
            placeholder="Optional description..."
          />
        </div>
        <button
          onClick={handleAddService}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Existing Services */}
      <div className="space-y-4">
        <h4 className="font-medium">Existing Services</h4>
        {editedSettings.map((service) => (
          <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-medium">{service.name}</h5>
                <span className="text-sm text-gray-500">{service.type === 'form' ? 'Immigration Form' : 'Custom Service'}</span>
              </div>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="p-1 hover:bg-red-50 rounded-full text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Attorney Fee
                </label>
                <input
                  type="number"
                  value={service.defaultAttorneyFee}
                  onChange={(e) => handleUpdateService(service.id, { defaultAttorneyFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Filing Fee
                </label>
                <input
                  type="number"
                  value={service.defaultFilingFee}
                  onChange={(e) => handleUpdateService(service.id, { defaultFilingFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            {service.description && (
              <p className="text-sm text-gray-600">{service.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSettingsPanel;