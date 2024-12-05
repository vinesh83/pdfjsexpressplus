export interface QuestionnaireAnswer {
  question: string;
  value: string | string[];
}

export interface QuestionnaireSection {
  title: string;
  answers: Record<string, QuestionnaireAnswer>;
}

export interface QuestionnaireResponse {
  leadId?: string;
  submittedAt?: string;
  sections: Record<string, QuestionnaireSection>;
}