import progressService from './progressService';
import examService from './examService';
import { SUBJECT_COLORS } from '../utils/constants';
import { calculateNet } from '../utils/calculations';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
  differenceInDays,
  subDays,
  format
} from 'date-fns';

class StatsService {
  /**
   * Get overview statistics for a user
   */
  getOverview(userId, dateRange = null) {
    const progress = progressService.getAll(userId);
    const exams = examService.getAll(userId);

    // Filter by date range if provided
    const filteredProgress = dateRange
      ? this._filterByDateRange(progress, dateRange)
      : progress;

    const filteredExams = dateRange
      ? this._filterByDateRange(exams, dateRange)
      : exams;

    // Total study hours
    const totalHours = filteredProgress.reduce((sum, p) => sum + (p.duration || 0), 0);

    // Total questions
    let totalCorrect = 0;
    let totalWrong = 0;
    filteredProgress.forEach(p => {
      p.questionSets?.forEach(qs => {
        totalCorrect += qs.correct || 0;
        totalWrong += qs.wrong || 0;
      });
    });

    // Calculate average net from exams
    const avgNet = filteredExams.length > 0
      ? filteredExams.reduce((sum, e) => sum + (e.totalNet || 0), 0) / filteredExams.length
      : 0;

    // Study consistency (streak)
    const streak = this._calculateStreak(progress);

    // Plan progress
    const planProgress = this._calculatePlanProgress(userId, progress);

    return {
      totalHours: totalHours.toFixed(1),
      totalQuestions: totalCorrect + totalWrong,
      totalCorrect,
      totalWrong,
      totalNet: calculateNet(totalCorrect, totalWrong, true),
      averageNet: avgNet.toFixed(2),
      currentStreak: streak.current,
      longestStreak: streak.longest,
      consistencyPercentage: streak.percentage,
      planProgress,
      totalStudyDays: filteredProgress.length,
      totalExams: filteredExams.length,
    };
  }

  /**
   * Get subject-specific statistics
   */
  getSubjectStats(userId, dateRange = null) {
    const progress = progressService.getAll(userId);
    const exams = examService.getAll(userId);

    const filteredProgress = dateRange
      ? this._filterByDateRange(progress, dateRange)
      : progress;

    const filteredExams = dateRange
      ? this._filterByDateRange(exams, dateRange)
      : exams;

    const subjects = Object.keys(SUBJECT_COLORS);
    const stats = {};

    subjects.forEach(subject => {
      // Get question sets for this subject from progress
      const questionSets = [];
      filteredProgress.forEach(p => {
        p.questionSets?.forEach(qs => {
          if (qs.subject === subject) {
            questionSets.push(qs);
          }
        });
      });

      // Calculate totals
      const totalCorrect = questionSets.reduce((sum, qs) => sum + (qs.correct || 0), 0);
      const totalWrong = questionSets.reduce((sum, qs) => sum + (qs.wrong || 0), 0);
      const totalQuestions = totalCorrect + totalWrong;
      const totalNet = calculateNet(totalCorrect, totalWrong, true);

      // Calculate study hours for this subject
      const studyHours = filteredProgress.reduce((sum, p) => {
        const hasSubject = p.questionSets?.some(qs => qs.subject === subject);
        return sum + (hasSubject ? (p.duration || 0) : 0);
      }, 0);

      // Calculate average net per session
      const avgNet = questionSets.length > 0
        ? totalNet / questionSets.length
        : 0;

      // Calculate success rate
      const successRate = totalQuestions > 0
        ? (totalCorrect / totalQuestions * 100)
        : 0;

      // Get exam statistics for this subject
      const examNets = [];
      filteredExams.forEach(exam => {
        if (exam.results && exam.results[subject]) {
          examNets.push(exam.results[subject].net || 0);
        }
      });

      const avgExamNet = examNets.length > 0
        ? examNets.reduce((sum, n) => sum + n, 0) / examNets.length
        : 0;

      // Calculate trend
      const trend = this._calculateTrend(examNets);

      stats[subject] = {
        subject,
        color: SUBJECT_COLORS[subject],
        totalQuestions,
        totalCorrect,
        totalWrong,
        totalNet: totalNet.toFixed(2),
        avgNet: avgNet.toFixed(2),
        avgExamNet: avgExamNet.toFixed(2),
        studyHours: studyHours.toFixed(1),
        successRate: successRate.toFixed(1),
        trend,
        sessionCount: questionSets.length,
        examCount: examNets.length,
      };
    });

    return stats;
  }

  /**
   * Get trend data for charts
   */
  getTrendData(userId, groupBy = 'week') {
    const exams = examService.getAll(userId);

    if (exams.length === 0) {
      return [];
    }

    // Sort exams by date
    const sortedExams = [...exams].sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );

    if (groupBy === 'week') {
      return this._groupByWeek(sortedExams);
    } else if (groupBy === 'month') {
      return this._groupByMonth(sortedExams);
    }

    // Default: return individual exam data points
    return sortedExams.map(exam => ({
      date: format(parseISO(exam.date), 'dd MMM'),
      fullDate: exam.date,
      net: exam.totalNet || 0,
      name: exam.name,
    }));
  }

  /**
   * Get weekly statistics
   */
  getWeeklyStats(userId) {
    const progress = progressService.getAll(userId);
    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const weekProgress = progress.filter(p => {
      const date = parseISO(p.date);
      return isWithinInterval(date, { start: weekStart, end: weekEnd });
    });

    const totalHours = weekProgress.reduce((sum, p) => sum + (p.duration || 0), 0);
    const totalDays = weekProgress.length;

    return {
      totalHours: totalHours.toFixed(1),
      totalDays,
      avgHoursPerDay: totalDays > 0 ? (totalHours / totalDays).toFixed(1) : '0.0',
      weekStart: format(weekStart, 'dd MMM'),
      weekEnd: format(weekEnd, 'dd MMM'),
    };
  }

  /**
   * Get monthly statistics
   */
  getMonthlyStats(userId) {
    const progress = progressService.getAll(userId);
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const monthProgress = progress.filter(p => {
      const date = parseISO(p.date);
      return isWithinInterval(date, { start: monthStart, end: monthEnd });
    });

    const totalHours = monthProgress.reduce((sum, p) => sum + (p.duration || 0), 0);
    const totalDays = monthProgress.length;

    return {
      totalHours: totalHours.toFixed(1),
      totalDays,
      avgHoursPerDay: totalDays > 0 ? (totalHours / totalDays).toFixed(1) : '0.0',
      monthName: format(monthStart, 'MMMM yyyy'),
    };
  }

  /**
   * Get weak topics analysis
   */
  getWeakTopics(userId) {
    const exams = examService.getAll(userId);
    const topicsMap = new Map();

    exams.forEach(exam => {
      exam.weakTopics?.forEach(topic => {
        const count = topicsMap.get(topic) || 0;
        topicsMap.set(topic, count + 1);
      });
    });

    // Convert to array and sort by frequency
    const topics = Array.from(topicsMap.entries())
      .map(([topic, count]) => ({
        topic,
        count,
        percentage: ((count / exams.length) * 100).toFixed(1),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10

    return topics;
  }

  /**
   * Calculate study streak
   */
  _calculateStreak(progress) {
    if (progress.length === 0) {
      return { current: 0, longest: 0, percentage: 0 };
    }

    // Sort by date (newest first)
    const sorted = [...progress].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check current streak
    for (let i = 0; i < sorted.length; i++) {
      const date = parseISO(sorted[i].date);
      const expectedDate = subDays(today, i);

      if (format(date, 'yyyy-MM-dd') === format(expectedDate, 'yyyy-MM-dd')) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate longest streak
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const currentDate = parseISO(sorted[i].date);
        const prevDate = parseISO(sorted[i - 1].date);
        const dayDiff = differenceInDays(prevDate, currentDate);

        if (dayDiff === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate consistency percentage (last 30 days)
    const thirtyDaysAgo = subDays(today, 30);
    const recentProgress = progress.filter(p => {
      const date = parseISO(p.date);
      return date >= thirtyDaysAgo;
    });
    const percentage = (recentProgress.length / 30) * 100;

    return {
      current: currentStreak,
      longest: longestStreak,
      percentage: percentage.toFixed(1),
    };
  }

  /**
   * Calculate plan progress
   */
  _calculatePlanProgress(userId, progress) {
    // This would need plan data - for now return placeholder
    const completedDays = progress.length;
    const totalDays = 180; // Placeholder
    const percentage = (completedDays / totalDays) * 100;

    return {
      completedDays,
      totalDays,
      remainingDays: totalDays - completedDays,
      percentage: percentage.toFixed(1),
    };
  }

  /**
   * Calculate trend from array of values
   */
  _calculateTrend(values) {
    if (values.length < 2) return 'stable';

    const recent = values.slice(-3); // Last 3 values
    const older = values.slice(-6, -3); // Previous 3 values

    if (older.length === 0) return 'stable';

    const recentAvg = recent.reduce((sum, v) => sum + v, 0) / recent.length;
    const olderAvg = older.reduce((sum, v) => sum + v, 0) / older.length;

    const diff = recentAvg - olderAvg;
    const threshold = olderAvg * 0.05; // 5% threshold

    if (diff > threshold) return 'increasing';
    if (diff < -threshold) return 'decreasing';
    return 'stable';
  }

  /**
   * Filter data by date range
   */
  _filterByDateRange(data, dateRange) {
    if (!dateRange || !dateRange.start || !dateRange.end) {
      return data;
    }

    const start = parseISO(dateRange.start);
    const end = parseISO(dateRange.end);

    return data.filter(item => {
      const date = parseISO(item.date);
      return isWithinInterval(date, { start, end });
    });
  }

  /**
   * Group exams by week
   */
  _groupByWeek(exams) {
    const weeks = new Map();

    exams.forEach(exam => {
      const date = parseISO(exam.date);
      const weekKey = format(startOfWeek(date, { weekStartsOn: 1 }), 'yyyy-MM-dd');

      if (!weeks.has(weekKey)) {
        weeks.set(weekKey, []);
      }
      weeks.get(weekKey).push(exam);
    });

    return Array.from(weeks.entries()).map(([weekKey, weekExams]) => {
      const avgNet = weekExams.reduce((sum, e) => sum + (e.totalNet || 0), 0) / weekExams.length;
      return {
        week: format(parseISO(weekKey), 'dd MMM'),
        net: avgNet.toFixed(2),
        count: weekExams.length,
      };
    });
  }

  /**
   * Group exams by month
   */
  _groupByMonth(exams) {
    const months = new Map();

    exams.forEach(exam => {
      const date = parseISO(exam.date);
      const monthKey = format(startOfMonth(date), 'yyyy-MM');

      if (!months.has(monthKey)) {
        months.set(monthKey, []);
      }
      months.get(monthKey).push(exam);
    });

    return Array.from(months.entries()).map(([monthKey, monthExams]) => {
      const avgNet = monthExams.reduce((sum, e) => sum + (e.totalNet || 0), 0) / monthExams.length;
      return {
        month: format(parseISO(monthKey + '-01'), 'MMM yyyy'),
        net: avgNet.toFixed(2),
        count: monthExams.length,
      };
    });
  }
}

export default new StatsService();
