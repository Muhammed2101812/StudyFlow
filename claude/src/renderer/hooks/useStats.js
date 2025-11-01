import { useState, useEffect, useMemo } from 'react';
import { useUser } from './useUser';
import statsService from '../services/statsService';

export function useStats(dateRange = null) {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  // Force refresh trigger
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Load stats when user or date range changes
  useEffect(() => {
    if (!currentUser) {
      setStats(null);
      setLoading(false);
      return;
    }

    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const overview = await statsService.getOverview(currentUser.id, dateRange);
        const subjectStats = await statsService.getSubjectStats(currentUser.id, dateRange);
        const trendData = await statsService.getTrendData(currentUser.id, 'exam');
        const weeklyTrendData = await statsService.getTrendData(currentUser.id, 'week');
        const weakTopics = await statsService.getWeakTopics(currentUser.id);
        const weeklyStats = await statsService.getWeeklyStats(currentUser.id);
        const monthlyStats = await statsService.getMonthlyStats(currentUser.id);

        setStats({
          overview,
          subjectStats,
          trendData,
          weeklyTrendData,
          weakTopics,
          weeklyStats,
          monthlyStats,
        });
      } catch (err) {
        console.error('useStats error:', err);
        setError('İstatistikler yüklenirken hata oluştu');
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [currentUser, dateRange, refreshKey]);

  return {
    stats,
    loading,
    error,
    refresh,
  };
}

export default useStats;
