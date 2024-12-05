import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTimelineNotes } from '../../hooks/useTimelineNotes';
import Portal from '../modals/Portal';
import PDFUploadForm from './PDFUploadForm';
import NoteEditor from './NoteEditor';
import NotesList from './NotesList';
import { NoteAttachment } from '../../types/timeline';

interface TimelineEventNotesProps {
  eventId: string;
}

export const TimelineEventNotes: React.FC<TimelineEventNotesProps> = ({ eventId }) => {
  const [showPDFUpload, setShowPDFUpload] = useState(false);
  const {
    content,
    setContent,
    isSaving,
    eventNotes,
    isExpanded,
    activeEventId,
    activeNoteId,
    handleSave,
    handleClear,
    deleteNote,
    setActiveNote,
    toggleExpanded,
    addAttachment,
    deleteAttachment
  } = useTimelineNotes(eventId);

  // Only show notes panel if this event is active
  if (!isExpanded || activeEventId !== eventId) return null;

  const handlePDFButtonClick = () => {
    setShowPDFUpload(true);
  };

  const handlePDFUpload = async (attachment: NoteAttachment) => {
    try {
      let noteId = activeNoteId;
      if (activeNoteId) {
        await addAttachment(activeNoteId, attachment);
      } else {
        // First save the note, then add the attachment
        noteId = await handleSave();
        if (noteId) {
          await addAttachment(noteId, attachment);
        }
      }
      setShowPDFUpload(false);
      // After successful upload, set this note as active to refresh the view
      if (noteId) {
        setActiveNote(noteId);
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Panel Container */}
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col bg-white shadow-xl">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                  <h3 className="text-lg font-medium text-gray-900">Event Notes</h3>
                  <button
                    onClick={toggleExpanded}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close notes panel"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-4">
                    <NoteEditor
                      content={content}
                      onChange={setContent}
                      onSave={handleSave}
                      onClear={handleClear}
                      onAttachPDF={handlePDFButtonClick}
                      isSaving={isSaving}
                    />

                    <NotesList
                      notes={eventNotes}
                      activeNoteId={activeNoteId}
                      onNoteSelect={setActiveNote}
                      onDeleteNote={deleteNote}
                      onDeleteAttachment={deleteAttachment}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Upload Modal */}
      {showPDFUpload && (
        <Portal>
          <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/50" onClick={() => setShowPDFUpload(false)} />
              <div className="relative z-[70] w-full max-w-md">
                <PDFUploadForm
                  onUpload={handlePDFUpload}
                  onCancel={() => setShowPDFUpload(false)}
                />
              </div>
            </div>
          </div>
        </Portal>
      )}
    </Portal>
  );
};