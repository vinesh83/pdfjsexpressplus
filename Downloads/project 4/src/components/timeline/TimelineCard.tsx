import React from 'react';
import Timeline from './Timeline';
import { TimelineEvent } from '../../types/timeline';
import CollapsibleSection from '../common/CollapsibleSection';
import ExpandableTimeline from './ExpandableTimeline';

interface TimelineCardProps {
  events: TimelineEvent[];
  onAddEvent?: () => void;
  compact?: boolean;
}

const TimelineCard = ({ events, onAddEvent, compact = false }: TimelineCardProps) => {
  return (
    <CollapsibleSection 
      title="Timeline" 
      defaultExpanded={!compact}
    >
      <ExpandableTimeline 
        events={events}
        onAddEvent={onAddEvent}
        compact={compact}
      />
    </CollapsibleSection>
  );
};

export default TimelineCard;