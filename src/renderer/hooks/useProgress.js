import { useState, useEffect } from 'react';
import { useUser } from './useUser';
import progressService from '../services/progressService';
import { format } from 'date-fns';

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

  const loadProgress = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const allProgress = await progressService.getAll(currentUser.id);
      const summaryData = await progressService.calculateSummary(currentUser.id);

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
      const saved = await progressService.saveStudyLog(currentUser.id, logData);
      await loadProgress(); // Refresh data
      return { success: true, data: saved };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateStudyLog = async (id, updates) => {
    if (!currentUser) {
      return { success: false, error: 'Kullanıcı bulunamadı' };
    }

    try {
      const updated = await progressService.updateStudyLog(currentUser.id, id, updates);
      await loadProgress(); // Refresh data
      return { success: true, data: updated };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteStudyLog = async (id) => {
    if (!currentUser) {
      return { success: false, error: 'Kullanıcı bulunamadı' };
    }

    try {
      await progressService.deleteStudyLog(currentUser.id, id);
      await loadProgress(); // Refresh data
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getByDate = (date) => {
    if (!currentUser || !progress) return [];
    // Search through already-loaded progress array - returns all logs for that date
    const dateStr = date instanceof Date ? format(date, 'yyyy-MM-dd') : date;
    return progress.filter(p => p.date === dateStr);
  };

  const getSubjectStats = async (subject) => {
    if (!currentUser) return null;
    return await progressService.getSubjectStats(currentUser.id, subject);
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
