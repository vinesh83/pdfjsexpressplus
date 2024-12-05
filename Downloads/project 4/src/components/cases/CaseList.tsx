import React from 'react';
import { Case } from '../../types/clients';
import CaseListItem from './CaseListItem';
import CollapsibleSection from '../common/CollapsibleSection';

interface CaseListProps {
  cases: Case[];
}

const CaseList = ({ cases }: CaseListProps) => {
  const activeCases = cases.filter(c => c.isActive);
  const archivedCases = cases.filter(c => !c.isActive);

  return (
    <CollapsibleSection title="Cases">
      {/* Active Cases */}
      {activeCases.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Active Cases</h3>
          <div className="space-y-4">
            {activeCases.map(case_ => (
              <CaseListItem key={case_.id} case_={case_} />
            ))}
          </div>
        </div>
      )}

      {/* Archived Cases */}
      {archivedCases.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Archived Cases</h3>
          <div className="space-y-4">
            {archivedCases.map(case_ => (
              <CaseListItem key={case_.id} case_={case_} />
            ))}
          </div>
        </div>
      )}
    </CollapsibleSection>
  );
};

export default CaseList;