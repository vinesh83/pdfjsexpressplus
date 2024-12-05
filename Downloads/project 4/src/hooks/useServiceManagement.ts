import { useState } from 'react';
import { Service } from '../types/services';

export const useServiceManagement = (initialServices: Service[] = []) => {
  const [services, setServices] = useState<Service[]>(initialServices);

  const addService = (service: Service) => {
    setServices(prevServices => [...prevServices, service]);
  };

  const updateService = (serviceId: string, updates: Partial<Service>) => {
    setServices(prevServices => 
      prevServices.map(service =>
        service.id === serviceId ? { ...service, ...updates } : service
      )
    );
  };

  const removeService = (serviceId: string) => {
    setServices(prevServices => 
      prevServices.filter(service => service.id !== serviceId)
    );
  };

  const calculateTotals = () => {
    return services.reduce((acc, service) => ({
      attorneyFees: acc.attorneyFees + service.attorneyFee,
      filingFees: acc.filingFees + service.filingFee,
      total: acc.total + service.attorneyFee + service.filingFee
    }), { attorneyFees: 0, filingFees: 0, total: 0 });
  };

  return {
    services,
    addService,
    updateService,
    removeService,
    calculateTotals
  };
};