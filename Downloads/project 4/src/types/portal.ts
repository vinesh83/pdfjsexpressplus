import { NewCase } from './case';

export interface PortalAccess {
  id: string;
  leadId?: string; // Add leadId to track connection
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  caseType: string;
  status: 'pending' | 'active' | 'completed';
  questionnaireStatus: 'not_started' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  birthInfo?: {
    dateOfBirth?: string;
    countryOfBirth?: string;
    citizenship?: string;
    gender?: string;
    languages?: string[];
    preferredLanguage?: string;
  };
}

export interface QuestionnaireClient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthInfo: {
    dateOfBirth: string;
    countryOfBirth: string;
    citizenship: string;
    gender: string;
    languages: string[];
    preferredLanguage: string;
  };
}