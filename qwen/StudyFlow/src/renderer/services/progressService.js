import storageService from './storageService.js';
import { v4 as uuidv4 } from 'uuid';

const progressService = {
  // Kullanıcının tüm ilerlemesini getir
  getAll: (userId) => {
    return storageService.getUserData(userId, 'progress') || { dailyLogs: {}, summary: {} };
  },
  
  // Belirli bir günün kaydını getir
  getByDate: (userId, date) => {
    const progress = progressService.getAll(userId);
    return progress.dailyLogs[date] || null;
  },
  
  // Çalışma kaydı kaydet
  saveStudyLog: (userId, logData) => {
    const progress = progressService.getAll(userId);
    const date = logData.date;
    
    // Yeni log oluştur
    const log = {
      id: uuidv4(),
      ...logData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Daily logs'a ekle
    progress.dailyLogs[date] = log;
    
    // Özeti güncelle
    progress.summary = progressService.calculateSummary(progress.dailyLogs);
    
    // Kaydet
    storageService.setUserData(userId, 'progress', progress);
    
    return log;
  },
  
  // Çalışma kaydı güncelle
  updateStudyLog: (userId, date, updates) => {
    const progress = progressService.getAll(userId);
    const existingLog = progress.dailyLogs[date];
    
    if (!existingLog) {
      throw new Error('Study log not found for the given date');
    }
    
    const updatedLog = {
      ...existingLog,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    // Daily logs'a güncelle
    progress.dailyLogs[date] = updatedLog;
    
    // Özeti güncelle
    progress.summary = progressService.calculateSummary(progress.dailyLogs);
    
    // Kaydet
    storageService.setUserData(userId, 'progress', progress);
    
    return updatedLog;
  },
  
  // Çalışma kaydı sil
  deleteStudyLog: (userId, date) => {
    const progress = progressService.getAll(userId);
    
    // Log varsa sil
    if (progress.dailyLogs[date]) {
      delete progress.dailyLogs[date];
      
      // Özeti güncelle
      progress.summary = progressService.calculateSummary(progress.dailyLogs);
      
      // Kaydet
      storageService.setUserData(userId, 'progress', progress);
      
      return true;
    }
    
    return false;
  },
  
  // Özet hesapla
  calculateSummary: (dailyLogs) => {
    const logs = Object.values(dailyLogs);
    
    let totalHours = 0;
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalNet = 0;
    let daysStudied = 0;
    
    logs.forEach(log => {
      if (log.completed) {
        daysStudied++;
      }
      totalHours += log.duration || 0;
      totalQuestions += log.totalQuestions || 0;
      totalCorrect += log.totalCorrect || 0;
      totalWrong += log.totalWrong || 0;
      totalNet += log.totalNet || 0;
    });
    
    const streak = progressService.calculateStreak(logs);
    
    return {
      totalStudyHours: parseFloat(totalHours.toFixed(2)),
      totalQuestions,
      totalCorrect,
      totalWrong,
      totalNet: parseFloat(totalNet.toFixed(2)),
      daysStudied,
      currentStreak: streak.current,
      longestStreak: streak.longest,
      lastStudyDate: logs.length > 0 ? logs[logs.length - 1].date : null
    };
  },
  
  // Streak hesapla
  calculateStreak: (logs) => {
    // Tarihlere göre sırala
    const sortedLogs = logs
      .filter(l => l.completed)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    for (let i = 0; i < sortedLogs.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(sortedLogs[i - 1].date);
        const currDate = new Date(sortedLogs[i].date);
        const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24); // Farkı gün cinsinden al
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      
      longestStreak = Math.max(longestStreak, tempStreak);
      
      // Son gün bugünse veya dünse current streak
      const today = new Date();
      const logDate = new Date(sortedLogs[i].date);
      const daysDiff = (today - logDate) / (1000 * 60 * 60 * 24);
      
      if (daysDiff <= 1) {
        currentStreak = tempStreak;
      }
    }
    
    return { current: currentStreak, longest: longestStreak };
  },
  
  // Ders bazlı istatistik
  getSubjectStats: (userId, subject) => {
    const progress = progressService.getAll(userId);
    const logs = Object.values(progress.dailyLogs)
      .filter(log => log.subject === subject);
    
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalHours = 0;
    let totalNet = 0;
    
    logs.forEach(log => {
      totalQuestions += log.totalQuestions || 0;
      totalCorrect += log.totalCorrect || 0;
      totalWrong += log.totalWrong || 0;
      totalHours += log.duration || 0;
      totalNet += log.totalNet || 0;
    });
    
    const successRate = totalQuestions > 0 
      ? ((totalCorrect / totalQuestions) * 100).toFixed(2)
      : 0;
    
    const averageNet = logs.length > 0 
      ? parseFloat((totalNet / logs.length).toFixed(2))
      : 0;
    
    return {
      subject,
      totalQuestions,
      totalCorrect,
      totalWrong,
      totalNet: parseFloat(totalNet.toFixed(2)),
      totalHours: parseFloat(totalHours.toFixed(2)),
      averageNet,
      successRate: parseFloat(successRate),
      sessionsCount: logs.length
    };
  }
};

export default progressService;