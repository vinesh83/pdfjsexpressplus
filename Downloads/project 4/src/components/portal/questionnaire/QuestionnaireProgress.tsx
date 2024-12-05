import React from 'react';
import { CheckCircle } from 'lucide-react';

interface QuestionnaireProgressProps {
  currentSection: number;
  totalSections: number;
  sectionTitles: string[];
}

const QuestionnaireProgress: React.FC<QuestionnaireProgressProps> = ({
  currentSection,
  totalSections,
  sectionTitles
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {sectionTitles[currentSection]}
        </h2>
        <span className="text-sm text-gray-500">
          Section {currentSection + 1} of {totalSections}
        </span>
      </div>

      <div className="relative">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
            style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
          />
        </div>

        <div className="flex justify-between mt-2">
          {sectionTitles.map((title, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                index === currentSection
                  ? 'text-indigo-600'
                  : index < currentSection
                  ? 'text-green-600'
                  : 'text-gray-400'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {index < currentSection ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <div
                    className={`w-3 h-3 rounded-full ${
                      index === currentSection
                        ? 'bg-indigo-600'
                        : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
              <span className="text-xs mt-1 hidden md:block">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireProgress;