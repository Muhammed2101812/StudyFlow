import { useState, useEffect } from 'react';
import progressService from '../services/progressService.js';

export const useProgress = (userId) => {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load progress data
  useEffect(() => {
    const fetchProgressData = async () => {
      if (!userId) return;
      
      setLoading(true);
      try {
        const data = progressService.getAll(userId);
        setProgressData(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [userId]);

  // Wrapper functions that update state after operations
  const saveStudyLog = async (logData) => {
    setLoading(true);
    try {
      const newLog = progressService.saveStudyLog(userId, logData);
      // Update local state
      setProgressData(prev => {
        const updatedLogs = {
          ...prev?.dailyLogs,
          [newLog.date]: newLog
        };
        const updatedSummary = progressService.calculateSummary(updatedLogs);
        return { dailyLogs: updatedLogs, summary: updatedSummary };
      });
      setError(null);
      return newLog;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateStudyLog = async (date, updates) => {
    setLoading(true);
    try {
      const updatedLog = progressService.updateStudyLog(userId, date, updates);
      // Update local state
      setProgressData(prev => {
        const updatedLogs = {
          ...prev?.dailyLogs,
          [updatedLog.date]: updatedLog
        };
        const updatedSummary = progressService.calculateSummary(updatedLogs);
        return { dailyLogs: updatedLogs, summary: updatedSummary };
      });
      setError(null);
      return updatedLog;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteStudyLog = async (date) => {
    setLoading(true);
    try {
      const success = progressService.deleteStudyLog(userId, date);
      if (success) {
        // Update local state
        setProgressData(prev => {
          const updatedLogs = { ...prev?.dailyLogs };
          delete updatedLogs[date];
          const updatedSummary = progressService.calculateSummary(updatedLogs);
          return { dailyLogs: updatedLogs, summary: updatedSummary };
        });
        setError(null);
      }
      return success;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getSubjectStats = (subject) => {
    return progressService.getSubjectStats(userId, subject);
  };

  const getTodayLog = () => {
    const today = new Date().toISOString().split('T')[0];
    return progressData?.dailyLogs?.[today] || null;
  };

  return {
    progressData,
    summary: progressData?.summary,
    dailyLogs: progressData?.dailyLogs || {},
    loading,
    error,
    saveStudyLog,
    updateStudyLog,
    deleteStudyLog,
    getSubjectStats,
    getTodayLog,
    refreshData: () => {
      if (userId) {
        const data = progressService.getAll(userId);
        setProgressData(data);
      }
    }
  };
};