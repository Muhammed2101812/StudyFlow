import { useContext, useMemo } from 'react';
import { PlanContext } from '../contexts/PlanContext.jsx';
import planService from '../services/planService.js';
import dateHelpers from '../utils/dateHelpers.js';

export const usePlan = () => {
  const context = useContext(PlanContext);
  
  if (!context) {
    throw new Error('usePlan must be used within PlanProvider');
  }
  
  const {
    currentPlan,
    plans,
    loading,
    importPlan,
    switchPlan,
    deletePlan,
    refreshPlan
  } = context;

  // Bugünün programı
  const todayProgram = useMemo(() => {
    if (!currentPlan) return null;
    return planService.getTodayProgram(currentPlan.id);
  }, [currentPlan]);

  // Sınava kalan gün
  const daysUntilExam = useMemo(() => {
    if (!currentPlan || !currentPlan.examDate) return null;
    
    return dateHelpers.daysUntil(currentPlan.examDate);
  }, [currentPlan]);

  // Mevcut aşama
  const currentStage = useMemo(() => {
    if (!currentPlan) return null;
    return planService.getCurrentStage(currentPlan.id);
  }, [currentPlan]);

  // Plan ilerlemesi
  const planProgress = useMemo(() => {
    if (!currentPlan) return null;
    return planService.calculatePlanProgress(currentPlan.id);
  }, [currentPlan]);

  return {
    currentPlan,
    plans,
    loading,
    todayProgram,
    daysUntilExam,
    currentStage,
    planProgress,
    hasPlan: !!currentPlan,
    importPlan,
    switchPlan,
    deletePlan,
    refreshPlan
  };
};