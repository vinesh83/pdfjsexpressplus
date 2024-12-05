import React from 'react';
import { Save, Upload } from 'lucide-react';

interface NoteEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  onClear: () => void;
  onAttachPDF: () => void;
  isSaving: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  content,
  onChange,
  onSave,
  onClear,
  onAttachPDF,
  isSaving
}) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add your note here..."
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 
                   resize-none bg-white transition-shadow duration-200 hover:shadow-sm"
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          {content.length} characters
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onAttachPDF}
          className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors
                   flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Attach PDF</span>
        </button>

        <div className="flex space-x-2">
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Clear
          </button>
          <button
            onClick={onSave}
            disabled={isSaving || !content.trim()}
            className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                     transition-all disabled:opacity-50 disabled:hover:bg-indigo-600 
                     flex items-center space-x-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Note'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;