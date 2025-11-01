import React, { createContext, useState, useEffect } from 'react';
import planService from '../services/planService.js';

const PlanContext = createContext();

const PlanProvider = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize plans from storage
  useEffect(() => {
    const storedPlans = planService.getAll();
    setPlans(storedPlans);
  }, []);

  const importPlan = async (filePath) => {
    setLoading(true);
    try {
      const newPlan = await planService.import(filePath);
      const updatedPlans = [...plans, newPlan];
      setPlans(updatedPlans);
      return newPlan;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const switchPlan = (planId) => {
    if (!planId) {
      setCurrentPlan(null);
      return;
    }
    
    const plan = planService.getById(planId);
    if (plan) {
      setCurrentPlan(plan);
    }
  };

  const deletePlan = (planId) => {
    planService.delete(planId);
    const updatedPlans = plans.filter(p => p.id !== planId);
    setPlans(updatedPlans);
    
    if (currentPlan && currentPlan.id === planId) {
      setCurrentPlan(updatedPlans.length > 0 ? updatedPlans[0] : null);
    }
  };

  const refreshPlan = () => {
    const updatedPlans = planService.getAll();
    setPlans(updatedPlans);
  };

  const value = {
    currentPlan,
    setCurrentPlan,
    plans,
    loading,
    importPlan,
    switchPlan,
    deletePlan,
    refreshPlan
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
};

export { PlanContext, PlanProvider };