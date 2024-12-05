import { useState, useEffect, useMemo } from 'react';
import { useTimelineNotesStore } from '../store/timelineNotesStore';
import { NoteAttachment } from '../types/timeline';

export const useTimelineNotes = (eventId: string) => {
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const { 
    notes, 
    activeNoteId, 
    isExpanded, 
    activeEventId,
    addNote, 
    updateNote, 
    deleteNote,
    addAttachment,
    deleteAttachment,
    setActiveNote, 
    toggleExpanded 
  } = useTimelineNotesStore();

  const eventNotes = useMemo(() => 
    Object.values(notes).filter(note => note.eventId === eventId),
    [notes, eventId]
  );

  const activeNote = useMemo(() => 
    activeNoteId ? notes[activeNoteId] : null,
    [notes, activeNoteId]
  );

  const handleSave = async (): Promise<string | undefined> => {
    if (!content.trim()) return;
    
    setIsSaving(true);
    try {
      let noteId: string;
      if (activeNoteId) {
        await updateNote(activeNoteId, content);
        noteId = activeNoteId;
      } else {
        noteId = await addNote(eventId, content);
      }
      setContent('');
      setActiveNote(null);
      return noteId;
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    setContent('');
    setActiveNote(null);
  };

  useEffect(() => {
    if (activeNote) {
      setContent(activeNote.content);
    } else {
      setContent('');
    }
  }, [activeNote]);

  return {
    content,
    setContent,
    isSaving,
    eventNotes,
    activeNote,
    isExpanded,
    activeEventId,
    activeNoteId,
    handleSave,
    handleClear,
    deleteNote,
    addAttachment,
    deleteAttachment,
    setActiveNote,
    toggleExpanded
  };
};