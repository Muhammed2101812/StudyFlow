import { useContext } from 'react';
import { PlanContext } from '../contexts/PlanContext';

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error('usePlan must be used within PlanProvider');
  }

  return context;
};
