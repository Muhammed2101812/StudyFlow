import React, { createContext, useState, useEffect } from 'react';
import planService from '../services/planService';
import { useUser } from '../hooks/useUser';

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const { currentUser } = useUser();
  const [currentPlan, setCurrentPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadPlans();
    }
  }, [currentUser]);

  const loadPlans = async () => {
    setLoading(true);
    try {
      const allPlans = await planService.getAll();
      setPlans(allPlans);

      // Load user's active plan
      if (currentUser?.activePlanId) {
        const active = allPlans.find(p => p.id === currentUser.activePlanId);
        setCurrentPlan(active || null);
      }
    } catch (error) {
      console.error('Failed to load plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const importPlan = async (filePath) => {
    try {
      const plan = await planService.import(filePath);
      setPlans([...plans, plan]);
      return { success: true, data: plan };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const switchPlan = async (planId) => {
    try {
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        setCurrentPlan(plan);
        // Update user's active plan
        if (currentUser) {
          await planService.assignToUser(currentUser.id, planId);
        }
        return { success: true };
      }
      return { success: false, error: 'Plan bulunamadı' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deletePlan = async (planId) => {
    try {
      await planService.delete(planId);
      setPlans(plans.filter(p => p.id !== planId));
      if (currentPlan?.id === planId) {
        setCurrentPlan(null);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    currentPlan,
    plans,
    loading,
    importPlan,
    switchPlan,
    deletePlan,
    refreshPlan: loadPlans,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};
