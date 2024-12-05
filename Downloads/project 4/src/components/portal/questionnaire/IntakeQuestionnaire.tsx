import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionnaireResponse } from '../../../types/questionnaire';
import { QuestionnaireClient } from '../../../types/portal';
import QuestionnaireProgress from './QuestionnaireProgress';
import QuestionSection from './QuestionSection';
import { QUESTIONNAIRE_SECTIONS } from '../../../data/questionnaire';
import { useQuestionnaireStore } from '../../../store/questionnaireStore';
import SubmissionConfirmation from './SubmissionConfirmation';

interface IntakeQuestionnaireProps {
  clientId: string;
  client: QuestionnaireClient;
  savedResponses?: QuestionnaireResponse;
}

const IntakeQuestionnaire = ({ clientId, client, savedResponses }: IntakeQuestionnaireProps) => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [responses, setResponses] = useState<QuestionnaireResponse>(() => {
    if (savedResponses) {
      return savedResponses;
    }

    return {
      clientId,
      sections: QUESTIONNAIRE_SECTIONS.map(section => {
        const answers = [];
        
        if (section.id === 'personal_confirmation') {
          answers.push(
            { 
              questionId: 'name_first', 
              value: client.firstName 
            },
            { 
              questionId: 'name_middle', 
              value: '' 
            },
            { 
              questionId: 'name_last', 
              value: client.lastName 
            },
            { 
              questionId: 'dob', 
              value: client.birthInfo.dateOfBirth 
            },
            { 
              questionId: 'birth_country', 
              value: client.birthInfo.countryOfBirth 
            },
            { 
              questionId: 'preferred_language', 
              value: client.birthInfo.preferredLanguage 
            },
            { 
              questionId: 'email', 
              value: client.email 
            },
            { 
              questionId: 'phone', 
              value: client.phone 
            }
          );
        }
        
        return {
          sectionId: section.id,
          answers
        };
      }),
      status: savedResponses?.status || 'not_started',
      lastUpdated: new Date()
    };
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitQuestionnaire = useQuestionnaireStore(state => state.submitQuestionnaire);
  const updateQuestionnaireStatus = useQuestionnaireStore(state => state.updateQuestionnaireStatus);

  // Save progress whenever responses change
  useEffect(() => {
    const saveProgress = async () => {
      try {
        const updatedResponses = {
          ...responses,
          status: 'in_progress',
          lastUpdated: new Date()
        };
        await submitQuestionnaire(clientId, updatedResponses);
        await updateQuestionnaireStatus(clientId, 'in_progress');
      } catch (err) {
        console.error('Error saving progress:', err);
      }
    };

    if (responses.status !== 'completed') {
      saveProgress();
    }
  }, [responses, clientId, submitQuestionnaire, updateQuestionnaireStatus]);

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setResponses(prev => {
      const newSections = [...prev.sections];
      const currentSectionResponses = newSections[currentSection];
      
      const existingAnswerIndex = currentSectionResponses.answers
        .findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex >= 0) {
        currentSectionResponses.answers[existingAnswerIndex].value = value;
      } else {
        currentSectionResponses.answers.push({ questionId, value });
      }

      return {
        ...prev,
        sections: newSections,
        status: 'in_progress',
        lastUpdated: new Date()
      };
    });
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Submit final responses
      const finalResponses = {
        ...responses,
        status: 'completed',
        lastUpdated: new Date()
      };

      await submitQuestionnaire(clientId, finalResponses);
      await updateQuestionnaireStatus(clientId, 'completed');
      setShowConfirmation(true);
    } catch (err) {
      console.error('Error submitting questionnaire:', err);
      setError('Failed to submit questionnaire. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    setShowConfirmation(false);
  };

  const handleClose = () => {
    navigate(`/portal/${clientId}`);
  };

  const isCurrentSectionValid = () => {
    const currentSectionQuestions = QUESTIONNAIRE_SECTIONS[currentSection].questions;
    const currentSectionAnswers = responses.sections[currentSection].answers;

    return currentSectionQuestions.every(question => {
      if (!question.required) return true;
      const answer = currentSectionAnswers.find(a => a.questionId === question.id);
      return answer && answer.value && (
        Array.isArray(answer.value) ? answer.value.length > 0 : answer.value.trim() !== ''
      );
    });
  };

  const canProceed = isCurrentSectionValid();
  const isLastSection = currentSection === QUESTIONNAIRE_SECTIONS.length - 1;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <QuestionnaireProgress
          currentSection={currentSection}
          totalSections={QUESTIONNAIRE_SECTIONS.length}
          sectionTitles={QUESTIONNAIRE_SECTIONS.map(s => s.title)}
        />
      </div>

      <div className="p-6">
        <QuestionSection
          section={QUESTIONNAIRE_SECTIONS[currentSection]}
          responses={responses.sections[currentSection].answers}
          onAnswer={handleAnswer}
          clientData={client}
        />
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <button
          onClick={() => setCurrentSection(prev => prev - 1)}
          disabled={currentSection === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
          >
            Save Progress
          </button>

          {!isLastSection ? (
            <button
              onClick={() => setCurrentSection(prev => prev + 1)}
              disabled={!canProceed}
              className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed || saving}
              className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Submitting...' : 'Submit Questionnaire'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-t border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {showConfirmation && (
        <SubmissionConfirmation
          onEdit={handleEdit}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default IntakeQuestionnaire;