const ClientPortalView = () => {
  const { id } = useParams<{ id: string }>();
  console.log('Portal ID:', id);
  
  const { getPortalAccess } = usePortalStore();
  const { cases } = useCaseStore();
  const { getQuestionnaireResponseByLeadId } = useQuestionnaireStore();
  
  const client = getPortalAccess(id);
  console.log('Client data:', client);
  
  const questionnaireResponse = getQuestionnaireResponseByLeadId(id);
  console.log('Questionnaire response:', questionnaireResponse);
  
  // ... rest of your component
}; 