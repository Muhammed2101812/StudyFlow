import { useState, useEffect } from 'react';
import { useUser } from './useUser';
import progressService from '../services/progressService';

export const useProgress = () => {
  const { currentUser } = useUser();
  const [progress, setProgress] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      loadProgress();
    }
  }, [currentUser]);

  const loadProgress = () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const allProgress = progressService.getAll(currentUser.id);
      const summaryData = progressService.calculateSummary(currentUser.id);

      setProgress(allProgress);
      setSummary(summaryData);
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveStudyLog = async (logData) => {
    if (!currentUser) {
      return { success: false, error: 'Kullanıcı bulunamadı' };
    }

    try {
      const saved = progressService.saveStudyLog(currentUser.id, logData);
      loadProgress(); // Refresh data
      return { success: true, data: saved };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateStudyLog = async (date, updates) => {
    if (!currentUser) {
      return { success: false, error: 'Kullanıcı bulunamadı' };
    }

    try {
      const updated = progressService.updateStudyLog(currentUser.id, date, updates);
      loadProgress(); // Refresh data
      return { success: true, data: updated };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteStudyLog = async (date) => {
    if (!currentUser) {
      return { success: false, error: 'Kullanıcı bulunamadı' };
    }

    try {
      progressService.deleteStudyLog(currentUser.id, date);
      loadProgress(); // Refresh data
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getByDate = (date) => {
    if (!currentUser) return null;
    return progressService.getByDate(currentUser.id, date);
  };

  const getSubjectStats = (subject) => {
    if (!currentUser) return null;
    return progressService.getSubjectStats(currentUser.id, subject);
  };

  return {
    progress,
    summary,
    loading,
    saveStudyLog,
    updateStudyLog,
    deleteStudyLog,
    getByDate,
    getSubjectStats,
    refresh: loadProgress,
  };
};
