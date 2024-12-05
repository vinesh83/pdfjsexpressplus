import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BioInfoItemProps {
  icon: React.ReactElement<LucideIcon>;
  label: string;
  value: string;
  fullWidth?: boolean;
}

const BioInfoItem: React.FC<BioInfoItemProps> = ({ icon, label, value, fullWidth = false }) => {
  return (
    <div 
      className={`
        bg-gray-50 rounded-md p-3
        ${fullWidth ? 'block space-y-1' : 'flex items-center space-x-3'}
      `}
    >
      <div className="text-gray-400 flex-shrink-0 flex items-center space-x-3">
        {icon}
        <p className="text-xs text-gray-500">{label}</p>
      </div>
      {fullWidth ? (
        <p className="text-sm font-medium text-gray-900 break-words mt-1">
          {value}
        </p>
      ) : (
        <div className="min-w-0 flex-1 flex justify-end">
          <p className="text-sm font-medium text-gray-900 break-words">
            {value}
          </p>
        </div>
      )}
    </div>
  );
};

export default BioInfoItem;