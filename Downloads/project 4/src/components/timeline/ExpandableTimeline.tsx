import React, { useState } from 'react';
import { Maximize2, Minimize2, ArrowUpDown, Plus } from 'lucide-react';
import Timeline from './Timeline';
import { TimelineEvent } from '../../types/timeline';
import Portal from '../modals/Portal';

interface ExpandableTimelineProps {
  events: TimelineEvent[];
  onAddEvent?: () => void;
  compact?: boolean;
}

const ExpandableTimeline: React.FC<ExpandableTimelineProps> = ({ events, onAddEvent, compact = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChronological, setIsChronological] = useState(true);

  return (
    <div className="relative">
      {/* Base Timeline */}
      <div className={`relative transition-all duration-300 ease-in-out ${isExpanded ? 'invisible' : ''}`}>
        {/* Timeline Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsChronological(!isChronological)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              title={isChronological ? "Show newest first" : "Show oldest first"}
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>{isChronological ? 'Oldest First' : 'Latest First'}</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            {onAddEvent && (
              <button
                onClick={onAddEvent}
                className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            )}
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors group"
              title="Expand timeline"
            >
              <Maximize2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline">Expand</span>
            </button>
          </div>
        </div>

        <Timeline
          events={events}
          onAddEvent={onAddEvent}
          compact={compact}
        />
      </div>

      {/* Expanded Timeline in Portal */}
      {isExpanded && (
        <Portal>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative z-[70] w-full max-w-[90vw] h-[90vh] bg-white rounded-xl shadow-2xl p-6 overflow-hidden">
                {/* Expanded Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Timeline</h2>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsChronological(!isChronological)}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ArrowUpDown className="w-4 h-4" />
                      <span>{isChronological ? 'Oldest First' : 'Latest First'}</span>
                    </button>
                    {onAddEvent && (
                      <button
                        onClick={onAddEvent}
                        className="flex items-center space-x-2 px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Event</span>
                      </button>
                    )}
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Minimize"
                    >
                      <Minimize2 className="w-4 h-4" />
                      <span>Minimize</span>
                    </button>
                  </div>
                </div>

                {/* Timeline Content */}
                <div className="h-[calc(100%-4rem)] overflow-auto">
                  <Timeline
                    events={events}
                    onAddEvent={onAddEvent}
                    compact={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default ExpandableTimeline;