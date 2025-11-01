import { useState, useEffect, useMemo } from 'react';
import { useUser } from '../contexts/UserContext';
import statsService from '../services/statsService';

export function useStats(dateRange = null) {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Force refresh trigger
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Compute stats based on current user and date range
  const stats = useMemo(() => {
    if (!currentUser) {
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const overview = statsService.getOverview(currentUser.id, dateRange);
      const subjectStats = statsService.getSubjectStats(currentUser.id, dateRange);
      const trendData = statsService.getTrendData(currentUser.id, 'exam');
      const weeklyTrendData = statsService.getTrendData(currentUser.id, 'week');
      const weakTopics = statsService.getWeakTopics(currentUser.id);
      const weeklyStats = statsService.getWeeklyStats(currentUser.id);
      const monthlyStats = statsService.getMonthlyStats(currentUser.id);

      return {
        overview,
        subjectStats,
        trendData,
        weeklyTrendData,
        weakTopics,
        weeklyStats,
        monthlyStats,
      };
    } catch (err) {
      console.error('useStats error:', err);
      setError('İstatistikler yüklenirken hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentUser, dateRange, refreshKey]);

  return {
    stats,
    loading,
    error,
    refresh,
  };
}

export default useStats;
