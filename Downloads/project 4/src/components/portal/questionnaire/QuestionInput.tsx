import React from 'react';
import { Question } from '../../../types/questionnaire';

interface QuestionInputProps {
  question: Question;
  value?: string | string[];
  onChange: (value: string | string[]) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  question,
  value,
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const handleCheckboxChange = (option: string) => {
    const currentValue = (value as string[]) || [];
    const newValue = currentValue.includes(option)
      ? currentValue.filter(v => v !== option)
      : [...currentValue, option];
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">
        {question.text}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {question.helpText && (
        <p className="text-sm text-gray-500">{question.helpText}</p>
      )}

      {question.type === 'text' && (
        <input
          type="text"
          value={value as string || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      )}

      {question.type === 'longText' && (
        <textarea
          value={value as string || ''}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      )}

      {question.type === 'date' && (
        <input
          type="date"
          value={value as string || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      )}

      {question.type === 'select' && question.options && (
        <select
          value={value as string || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select an option</option>
          {question.options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {question.type === 'radio' && question.options && (
        <div className="space-y-2">
          {question.options.map(option => (
            <label key={option} className="flex items-center space-x-3">
              <input
                type="radio"
                checked={value === option}
                onChange={() => onChange(option)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'checkbox' && question.options && (
        <div className="space-y-2">
          {question.options.map(option => (
            <label key={option} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={(value as string[] || []).includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === 'phone' && (
        <input
          type="tel"
          value={value as string || ''}
          onChange={handleChange}
          pattern={question.validation?.pattern}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      )}

      {question.type === 'email' && (
        <input
          type="email"
          value={value as string || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      )}
    </div>
  );
};

export default QuestionInput;