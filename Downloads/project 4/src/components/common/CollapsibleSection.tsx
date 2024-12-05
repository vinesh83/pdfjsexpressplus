import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  headerContent?: React.ReactNode;
}

const CollapsibleSection = ({ 
  title, 
  children, 
  defaultExpanded = true,
  headerContent 
}: CollapsibleSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div 
        className="p-6 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {headerContent}
        </div>
        <button
          className="p-1 hover:bg-gray-100 rounded-full transition-colors ml-4"
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-6">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;