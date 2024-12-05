import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare, 
  FileText,
  Copy,
  Clock,
  ChevronRight
} from 'lucide-react';
import AddTimelineEventForm from './AddTimelineEventForm';
import ClientSummary from './ClientSummary';
import TimelineCard from '../timeline/TimelineCard';
import CaseList from './CaseList';
import DocumentGrid from './DocumentGrid';
import FilingsList from './FilingsList';
import FormAssembly from '../forms/FormAssembly';
import ClientInfoCard from './ClientInfoCard';
import { Client } from '../../types/clients';
import { MOCK_FILINGS } from '../../data/mockFilings';

interface ClientProfileProps {
  client: Client;
  onClose: () => void;
}

const ClientProfile = ({ client, onClose }: ClientProfileProps) => {
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'forms' | 'documents'>('overview');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleAddEvent = (newEvent: any) => {
    setShowAddEventForm(false);
  };

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'forms' as const, label: 'Forms & Applications' },
    { id: 'documents' as const, label: 'Documents' }
  ];

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Get next deadline
  const getNextDeadline = () => {
    const activeCases = client.cases.filter(c => c.isActive);
    let nearestDeadline: Date | null = null;
    let deadlineText = '';

    activeCases.forEach(case_ => {
      case_.progress.stages.forEach(stage => {
        if (!stage.completed && stage.dueDate) {
          const dueDate = new Date(stage.dueDate);
          if (!nearestDeadline || dueDate < nearestDeadline) {
            nearestDeadline = dueDate;
            deadlineText = `${stage.name} due ${dueDate.toLocaleDateString()}`;
          }
        }
      });
    });

    return deadlineText;
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto bg-gray-50 rounded-xl shadow-xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between bg-white rounded-t-xl">
          {/* Left: Client Info */}
          <div className="flex items-center space-x-4">
            <img
              src={client.imageUrl}
              alt={client.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-100"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-gray-900">{client.name}</h2>
                <span className="text-xl" title={client.citizenship}>
                  {getFlagEmoji(client.countryCode)}
                </span>
              </div>
              <p className="text-gray-600">{client.email}</p>
            </div>
          </div>

          {/* Center: Status & Actions */}
          <div className="flex-1 flex items-center justify-center space-x-6">
            {/* Status Badges */}
            <div className="flex items-center space-x-3">
              {client.cases.some(c => c.isActive) && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Active Case
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {client.caseCount} Cases
              </span>
              {getNextDeadline() && (
                <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{getNextDeadline()}</span>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => {}} 
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Schedule Meeting"
              >
                <Calendar className="w-5 h-5" />
              </button>
              <button 
                onClick={() => {}} 
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Send Message"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowAddEventForm(true)} 
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Add Note"
              >
                <FileText className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right: Contact Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.location.href = `tel:${client.phone}`}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Call client"
            >
              <Phone className="w-5 h-5" />
            </button>
            <button
              onClick={() => window.location.href = `mailto:${client.email}`}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Email client"
            >
              <Mail className="w-5 h-5" />
            </button>
            <button
              onClick={() => copyToClipboard(`${client.name}\n${client.phone}\n${client.email}`, 'contact')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
              title="Copy contact info"
            >
              <Copy className="w-5 h-5" />
              {copiedField === 'contact' && (
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded">
                  Copied!
                </span>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors ml-2"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-12 gap-6">
              {/* Left Sidebar - Client Info & Timeline */}
              <div className="col-span-3 space-y-6">
                <ClientInfoCard client={client} />
                <TimelineCard 
                  events={client.timeline}
                  onAddEvent={() => setShowAddEventForm(true)}
                  compact={true}
                />
              </div>

              {/* Center - Cases */}
              <div className="col-span-6">
                <CaseList cases={client.cases} />
              </div>

              {/* Right Sidebar - Filings & Documents */}
              <div className="col-span-3 space-y-6">
                <FilingsList filings={MOCK_FILINGS} />
                <DocumentGrid documents={client.documents} />
                
                {!showAIAnalysis ? (
                  <button
                    onClick={() => setShowAIAnalysis(true)}
                    className="w-full py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    Generate AI Analysis
                  </button>
                ) : (
                  <ClientSummary client={client} />
                )}
              </div>
            </div>
          )}

          {activeTab === 'forms' && (
            <div className="max-w-5xl mx-auto">
              <FormAssembly />
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="max-w-5xl mx-auto">
              <DocumentGrid documents={client.documents} />
            </div>
          )}
        </div>
      </div>

      {showAddEventForm && (
        <AddTimelineEventForm
          onSubmit={handleAddEvent}
          onClose={() => setShowAddEventForm(false)}
        />
      )}
    </div>
  );
};

// Helper function to convert country code to flag emoji
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default ClientProfile;