import progressService from './progressService.js';
import examService from './examService.js';

const statsService = {
  // Genel istatistikler
  getOverview: (userId) => {
    const progressData = progressService.getAll(userId);
    const examData = examService.getAll(userId);
    
    const summary = progressData.summary || {};
    const examSummary = examData.summary || {};
    
    return {
      totalStudyHours: summary.totalStudyHours || 0,
      totalQuestions: summary.totalQuestions || 0,
      totalCorrect: summary.totalCorrect || 0,
      totalWrong: summary.totalWrong || 0,
      totalNet: summary.totalNet || 0,
      daysStudied: summary.daysStudied || 0,
      currentStreak: summary.currentStreak || 0,
      longestStreak: summary.longestStreak || 0,
      totalExams: examSummary.totalExams || 0,
      averageNet: examSummary.averageNet || 0,
      highestNet: examSummary.highestNet || 0,
      lowestNet: examSummary.lowestNet || 0,
      lastStudyDate: summary.lastStudyDate,
      lastExamDate: examSummary.lastExamDate
    };
  },

  // Ders bazlı istatistikler
  getSubjectStats: (userId) => {
    const progressData = progressService.getAll(userId);
    const examData = examService.getAll(userId);
    
    // Get all unique subjects from both progress and exams
    const subjects = {};
    
    // Add subjects from progress logs
    Object.values(progressData.dailyLogs || {}).forEach(log => {
      if (log.subject) {
        if (!subjects[log.subject]) {
          subjects[log.subject] = {
            subject: log.subject,
            totalQuestions: 0,
            totalCorrect: 0,
            totalWrong: 0,
            totalNet: 0,
            totalHours: 0,
            sessionCount: 0
          };
        }
        
        const subject = subjects[log.subject];
        subject.totalQuestions += log.totalQuestions || 0;
        subject.totalCorrect += log.totalCorrect || 0;
        subject.totalWrong += log.totalWrong || 0;
        subject.totalNet += log.totalNet || 0;
        subject.totalHours += log.duration || 0;
        subject.sessionCount += 1;
      }
    });
    
    // Add subjects from exam results
    examData.exams.forEach(exam => {
      exam.results.forEach(result => {
        if (!subjects[result.subject]) {
          subjects[result.subject] = {
            subject: result.subject,
            totalQuestions: 0,
            totalCorrect: 0,
            totalWrong: 0,
            totalNet: 0,
            totalHours: 0,
            sessionCount: 0
          };
        }
        
        const subject = subjects[result.subject];
        subject.totalQuestions += result.totalQuestions;
        subject.totalCorrect += result.correct;
        subject.totalWrong += result.wrong;
        subject.totalNet += result.net;
        subject.sessionCount += 1;
      });
    });
    
    // Calculate averages
    Object.values(subjects).forEach(subject => {
      subject.averageNet = subject.sessionCount > 0 
        ? parseFloat((subject.totalNet / subject.sessionCount).toFixed(2))
        : 0;
      subject.successRate = subject.totalQuestions > 0 
        ? parseFloat(((subject.totalCorrect / subject.totalQuestions) * 100).toFixed(2))
        : 0;
    });
    
    return Object.values(subjects);
  },

  // Haftalık istatistikler
  getWeeklyStats: (userId, startDate = null, endDate = null) => {
    const progressData = progressService.getAll(userId);
    const logs = progressData.dailyLogs || {};
    
    const weeks = {};
    
    Object.entries(logs).forEach(([date, log]) => {
      // Check if date is within range if specified
      if (startDate && new Date(date) < new Date(startDate)) return;
      if (endDate && new Date(date) > new Date(endDate)) return;
      
      // Calculate week number (simplified)
      const dateObj = new Date(date);
      const weekKey = `${dateObj.getFullYear()}-W${getWeekNumber(dateObj)}`;
      
      if (!weeks[weekKey]) {
        weeks[weekKey] = {
          week: weekKey,
          totalHours: 0,
          totalQuestions: 0,
          totalCorrect: 0,
          totalWrong: 0,
          totalNet: 0
        };
      }
      
      const week = weeks[weekKey];
      week.totalHours += log.duration || 0;
      week.totalQuestions += log.totalQuestions || 0;
      week.totalCorrect += log.totalCorrect || 0;
      week.totalWrong += log.totalWrong || 0;
      week.totalNet += log.totalNet || 0;
    });
    
    return Object.values(weeks);
  },

  // Aylık istatistikler
  getMonthlyStats: (userId, startDate = null, endDate = null) => {
    const progressData = progressService.getAll(userId);
    const logs = progressData.dailyLogs || {};
    
    const months = {};
    
    Object.entries(logs).forEach(([date, log]) => {
      // Check if date is within range if specified
      if (startDate && new Date(date) < new Date(startDate)) return;
      if (endDate && new Date(date) > new Date(endDate)) return;
      
      // Calculate month
      const dateObj = new Date(date);
      const monthKey = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
      
      if (!months[monthKey]) {
        months[monthKey] = {
          month: monthKey,
          totalHours: 0,
          totalQuestions: 0,
          totalCorrect: 0,
          totalWrong: 0,
          totalNet: 0
        };
      }
      
      const month = months[monthKey];
      month.totalHours += log.duration || 0;
      month.totalQuestions += log.totalQuestions || 0;
      month.totalCorrect += log.totalCorrect || 0;
      month.totalWrong += log.totalWrong || 0;
      month.totalNet += log.totalNet || 0;
    });
    
    return Object.values(months);
  },

  // Trend analizi
  getTrendAnalysis: (userId, startDate = null, endDate = null) => {
    const progressData = progressService.getAll(userId);
    const examData = examService.getAll(userId);
    
    // Combine progress logs and exam data for trend analysis
    const allData = [];
    
    Object.entries(progressData.dailyLogs || {}).forEach(([date, log]) => {
      if (startDate && new Date(date) < new Date(startDate)) return;
      if (endDate && new Date(date) > new Date(endDate)) return;
      
      allData.push({
        date,
        type: 'study',
        value: log.totalNet || 0,
        hours: log.duration || 0,
        questions: log.totalQuestions || 0
      });
    });
    
    examData.exams.forEach(exam => {
      if (startDate && new Date(exam.date) < new Date(startDate)) return;
      if (endDate && new Date(exam.date) > new Date(endDate)) return;
      
      allData.push({
        date: exam.date,
        type: 'exam',
        value: exam.totalNet,
        hours: exam.duration,
        questions: exam.totalQuestions
      });
    });
    
    // Sort by date
    allData.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate trend (simplified - just linear regression)
    if (allData.length < 2) {
      return {
        data: allData,
        trend: 'stable',
        trendValue: 0
      };
    }
    
    // Basic trend calculation (simple slope)
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    allData.forEach((point, i) => {
      sumX += i;
      sumY += point.value;
      sumXY += i * point.value;
      sumXX += i * i;
    });
    
    const n = allData.length;
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    
    let trend = 'stable';
    if (slope > 0.5) trend = 'increasing';
    else if (slope < -0.5) trend = 'decreasing';
    
    return {
      data: allData,
      trend,
      trendValue: parseFloat(slope.toFixed(2))
    };
  }
};

// Helper function to calculate week number
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export default statsService;