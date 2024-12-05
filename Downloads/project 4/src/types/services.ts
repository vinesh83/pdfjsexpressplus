export interface ServiceSettings {
  id: string;
  name: string;
  type: 'form' | 'custom';
  defaultAttorneyFee: number;
  defaultFilingFee: number;
  description?: string;
}

export interface Service {
  id: string;
  serviceId: string;
  name: string;
  type: 'form' | 'custom';
  attorneyFee: number;
  filingFee: number;
  disclaimer?: string;
  assignedTo: string; // client ID or contact ID
  assignedToType: 'client' | 'contact';
}

export interface ServiceGroup {
  clientId: string;
  services: Service[];
}