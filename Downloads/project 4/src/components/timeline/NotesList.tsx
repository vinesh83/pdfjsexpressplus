import React from 'react';
import { format } from 'date-fns';
import { X, Download, FileText } from 'lucide-react';
import { TimelineNote, NoteAttachment } from '../../types/timeline';

interface NotesListProps {
  notes: TimelineNote[];
  activeNoteId: string | null;
  onNoteSelect: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onDeleteAttachment: (noteId: string, attachmentId: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  activeNoteId,
  onNoteSelect,
  onDeleteNote,
  onDeleteAttachment
}) => {
  if (notes.length === 0) return null;

  return (
    <div className="mt-8">
      <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center justify-between">
        <span>Previous Notes</span>
        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
          {notes.length} {notes.length === 1 ? 'note' : 'notes'}
        </span>
      </h4>
      <div className="space-y-3">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`
              p-4 rounded-lg transition-all cursor-pointer relative group
              ${note.id === activeNoteId 
                ? 'bg-indigo-50 ring-2 ring-indigo-200'
                : 'bg-gray-50 hover:bg-gray-100'
              }
            `}
            onClick={() => onNoteSelect(note.id)}
          >
            <p className="text-sm text-gray-800 whitespace-pre-wrap">{note.content}</p>
            
            {/* Attachments */}
            {note.attachments && note.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {note.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-indigo-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.title}</p>
                        {attachment.description && (
                          <p className="text-xs text-gray-500">{attachment.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <a
                        href={attachment.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Download className="w-4 h-4 text-gray-500" />
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteAttachment(note.id, attachment.id);
                        }}
                        className="p-1 hover:bg-red-100 rounded-full text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>{format(note.updatedAt, 'MMM d, yyyy h:mm a')}</span>
              <span className="font-medium">{note.createdBy}</span>
            </div>
            
            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteNote(note.id);
              }}
              className="absolute top-2 right-2 p-1 rounded-full opacity-0 group-hover:opacity-100
                       hover:bg-red-100 text-red-500 transition-all duration-200"
              aria-label="Delete note"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;