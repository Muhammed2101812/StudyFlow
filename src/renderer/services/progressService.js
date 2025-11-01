import storageService from './storageService';
import { format } from 'date-fns';

class ProgressService {
  getAll(userId) {
    return storageService.getUserData(userId, 'progress') || [];
  }

  getByDate(userId, date) {
    const dateStr = format(new Date(date), 'yyyy-MM-dd');
    const allProgress = this.getAll(userId);
    return allProgress.find(p => p.date === dateStr) || null;
  }

  saveStudyLog(userId, logData) {
    try {
      const allProgress = this.getAll(userId);
      const dateStr = format(new Date(logData.date), 'yyyy-MM-dd');

      // Check if entry already exists for this date
      const existingIndex = allProgress.findIndex(p => p.date === dateStr);

      const studyLog = {
        date: dateStr,
        topic: logData.topic || '',
        duration: parseFloat(logData.duration) || 0,
        questionSets: logData.questionSets || [],
        completed: logData.completed || false,
        notes: logData.notes || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (existingIndex !== -1) {
        // Update existing entry
        allProgress[existingIndex] = {
          ...allProgress[existingIndex],
          ...studyLog,
          createdAt: allProgress[existingIndex].createdAt, // Keep original creation time
        };
      } else {
        // Add new entry
        allProgress.push(studyLog);
      }

      // Sort by date (newest first)
      allProgress.sort((a, b) => new Date(b.date) - new Date(a.date));

      storageService.setUserData(userId, 'progress', allProgress);
      return studyLog;
    } catch (error) {
      throw new Error(`Çalışma kaydedilemedi: ${error.message}`);
    }
  }

  updateStudyLog(userId, date, updates) {
    try {
      const allProgress = this.getAll(userId);
      const dateStr = format(new Date(date), 'yyyy-MM-dd');
      const index = allProgress.findIndex(p => p.date === dateStr);

      if (index === -1) {
        throw new Error('Kayıt bulunamadı');
      }

      allProgress[index] = {
        ...allProgress[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      storageService.setUserData(userId, 'progress', allProgress);
      return allProgress[index];
    } catch (error) {
      throw new Error(`Çalışma güncellenemedi: ${error.message}`);
    }
  }

  deleteStudyLog(userId, date) {
    try {
      const allProgress = this.getAll(userId);
      const dateStr = format(new Date(date), 'yyyy-MM-dd');
      const filtered = allProgress.filter(p => p.date !== dateStr);

      storageService.setUserData(userId, 'progress', filtered);
      return true;
    } catch (error) {
      throw new Error(`Çalışma silinemedi: ${error.message}`);
    }
  }

  calculateSummary(userId) {
    const allProgress = this.getAll(userId);

    const summary = {
      totalHours: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      totalWrong: 0,
      totalNet: 0,
      daysStudied: allProgress.length,
      currentStreak: 0,
      longestStreak: 0,
    };

    allProgress.forEach(log => {
      summary.totalHours += log.duration || 0;

      log.questionSets?.forEach(set => {
        summary.totalQuestions += (set.correct || 0) + (set.wrong || 0);
        summary.totalCorrect += set.correct || 0;
        summary.totalWrong += set.wrong || 0;
        summary.totalNet += set.net || 0;
      });
    });

    // Calculate streak
    const streaks = this.calculateStreak(allProgress);
    summary.currentStreak = streaks.current;
    summary.longestStreak = streaks.longest;

    return summary;
  }

  calculateStreak(logs) {
    if (logs.length === 0) {
      return { current: 0, longest: 0 };
    }

    // Sort by date ascending
    const sortedLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedLogs.length; i++) {
      const currentDate = new Date(sortedLogs[i].date);
      currentDate.setHours(0, 0, 0, 0);

      if (i > 0) {
        const prevDate = new Date(sortedLogs[i - 1].date);
        prevDate.setHours(0, 0, 0, 0);

        const dayDiff = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));

        if (dayDiff === 1 || dayDiff === 2) {
          // Allow 1 day gap (rest day)
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }

      // Check if this is part of current streak (includes today or yesterday)
      const daysSinceToday = Math.floor((today - currentDate) / (1000 * 60 * 60 * 24));
      if (daysSinceToday <= 1 && i === sortedLogs.length - 1) {
        currentStreak = tempStreak;
      }
    }

    longestStreak = Math.max(longestStreak, tempStreak);

    return { current: currentStreak, longest: longestStreak };
  }

  getSubjectStats(userId, subject) {
    const allProgress = this.getAll(userId);

    const stats = {
      totalQuestions: 0,
      totalCorrect: 0,
      totalWrong: 0,
      totalNet: 0,
      totalHours: 0,
      sessionsCount: 0,
      averageNet: 0,
      successRate: 0,
    };

    allProgress.forEach(log => {
      let hasSubject = false;

      log.questionSets?.forEach(set => {
        if (set.subject === subject) {
          hasSubject = true;
          stats.totalCorrect += set.correct || 0;
          stats.totalWrong += set.wrong || 0;
          stats.totalNet += set.net || 0;
          stats.totalQuestions += (set.correct || 0) + (set.wrong || 0);
        }
      });

      if (hasSubject) {
        stats.sessionsCount++;
        stats.totalHours += log.duration || 0;
      }
    });

    if (stats.sessionsCount > 0) {
      stats.averageNet = stats.totalNet / stats.sessionsCount;
    }

    if (stats.totalQuestions > 0) {
      stats.successRate = (stats.totalCorrect / stats.totalQuestions) * 100;
    }

    return stats;
  }
}

export default new ProgressService();
