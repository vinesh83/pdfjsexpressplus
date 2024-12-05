import { QuestionnaireResponse, QuestionnaireSection } from '../types/questionnaire';
import { QUESTIONNAIRE_SECTIONS } from '../data/questionnaire';

interface FormattedAnswer {
  questionId: string;
  question: string;
  value: string | string[];
}

interface FormattedSection {
  sectionId: string;
  title: string;
  answers: FormattedAnswer[];
}

export const formatQuestionnaireResponse = (response: QuestionnaireResponse): FormattedSection[] => {
  return response.sections.map(section => {
    const sectionConfig = QUESTIONNAIRE_SECTIONS.find(s => s.id === section.sectionId);
    if (!sectionConfig) return null;

    const answers = section.answers.map(answer => {
      const question = sectionConfig.questions.find(q => q.id === answer.questionId);
      return {
        questionId: answer.questionId,
        question: question?.text || 'Unknown Question',
        value: answer.value
      };
    });

    return {
      sectionId: section.sectionId,
      title: sectionConfig.title,
      answers
    };
  }).filter(Boolean) as FormattedSection[];
};

export const validateQuestionnaireResponse = (response: QuestionnaireResponse): boolean => {
  if (!response.clientId || !response.sections || !Array.isArray(response.sections)) {
    return false;
  }

  return response.sections.every(section => {
    if (!section.sectionId || !section.answers || !Array.isArray(section.answers)) {
      return false;
    }

    return section.answers.every(answer => 
      answer.questionId && 
      (typeof answer.value === 'string' || Array.isArray(answer.value))
    );
  });
};