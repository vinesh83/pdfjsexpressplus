import React from 'react';
import { Calendar, Flag, Baby, Globe2, Heart } from 'lucide-react';
import { Client } from '../../types/clients';
import BioInfoItem from './BioInfoItem';
import CollapsibleSection from '../common/CollapsibleSection';

interface ClientInfoCardProps {
  client: Client;
}

const ClientInfoCard = ({ client }: ClientInfoCardProps) => {
  const birthDate = new Date(client.birthInfo.dateOfBirth);
  const age = Math.floor((new Date().getTime() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  const bioInfo = [
    { icon: <Calendar className="w-4 h-4" />, label: 'DOB', value: birthDate.toLocaleDateString() },
    { icon: <Baby className="w-4 h-4" />, label: 'Age', value: `${age} years` },
    { icon: <Flag className="w-4 h-4" />, label: 'Citizenship', value: client.citizenship },
    { icon: <Heart className="w-4 h-4" />, label: 'Status', value: 'Married' },
    { icon: <Baby className="w-4 h-4" />, label: 'Children', value: client.contacts.filter(c => c.relationship === 'Child').length.toString() },
    { 
      icon: <Globe2 className="w-4 h-4" />, 
      label: 'Languages', 
      value: client.birthInfo.languages.join(', '),
      fullWidth: true
    }
  ];

  return (
    <CollapsibleSection title="Client Information">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Personal Information</h3>
        <div className="space-y-2">
          {bioInfo.map((info, index) => (
            <BioInfoItem
              key={index}
              icon={info.icon}
              label={info.label}
              value={info.value}
              fullWidth={info.fullWidth}
            />
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default ClientInfoCard;