import storageService from './storageService';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

class ProgressService {
  async getAll(userId) {
    const progress = await storageService.getUserData(userId, 'progress');
    // Ensure we always return an array
    if (!progress || !Array.isArray(progress)) {
      return [];
    }
    return progress;
  }

  async getByDate(userId, date) {
    const dateStr = format(new Date(date), 'yyyy-MM-dd');
    const allProgress = await this.getAll(userId);
    return allProgress.filter(p => p.date === dateStr);
  }

  async getById(userId, id) {
    const allProgress = await this.getAll(userId);
    return allProgress.find(p => p.id === id) || null;
  }

  async saveStudyLog(userId, logData) {
    try {
      const allProgress = await this.getAll(userId);
      const dateStr = format(new Date(logData.date), 'yyyy-MM-dd');

      // If logData has an ID, it's an update; otherwise, it's a new entry
      const isUpdate = !!logData.id;

      const studyLog = {
        id: logData.id || uuidv4(),
        date: dateStr,
        topic: logData.topic || '',
        duration: parseFloat(logData.duration) || 0,
        questionSets: logData.questionSets || [],
        completed: logData.completed || false,
        notes: logData.notes || '',
        createdAt: logData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (isUpdate) {
        // Update existing entry by ID
        const existingIndex = allProgress.findIndex(p => p.id === logData.id);
        if (existingIndex !== -1) {
          allProgress[existingIndex] = {
            ...allProgress[existingIndex],
            ...studyLog,
            createdAt: allProgress[existingIndex].createdAt, // Keep original creation time
          };
        } else {
          throw new Error('Güncellenecek kayıt bulunamadı');
        }
      } else {
        // Add new entry (always creates a new record)
        allProgress.push(studyLog);
      }

      // Sort by date and createdAt (newest first)
      allProgress.sort((a, b) => {
        const dateCompare = new Date(b.date) - new Date(a.date);
        if (dateCompare !== 0) return dateCompare;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      await storageService.setUserData(userId, 'progress', allProgress);
      return studyLog;
    } catch (error) {
      throw new Error(`Çalışma kaydedilemedi: ${error.message}`);
    }
  }

  async updateStudyLog(userId, id, updates) {
    try {
      const allProgress = await this.getAll(userId);
      const index = allProgress.findIndex(p => p.id === id);

      if (index === -1) {
        throw new Error('Kayıt bulunamadı');
      }

      allProgress[index] = {
        ...allProgress[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await storageService.setUserData(userId, 'progress', allProgress);
      return allProgress[index];
    } catch (error) {
      throw new Error(`Çalışma güncellenemedi: ${error.message}`);
    }
  }

  async deleteStudyLog(userId, id) {
    try {
      const allProgress = await this.getAll(userId);
      const filtered = allProgress.filter(p => p.id !== id);

      await storageService.setUserData(userId, 'progress', filtered);
      return true;
    } catch (error) {
      throw new Error(`Çalışma silinemedi: ${error.message}`);
    }
  }

  async calculateSummary(userId) {
    const allProgress = await this.getAll(userId);

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

  async getSubjectStats(userId, subject) {
    const allProgress = await this.getAll(userId);

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
