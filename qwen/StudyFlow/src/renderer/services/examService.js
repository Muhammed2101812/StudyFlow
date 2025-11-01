import storageService from './storageService.js';
import { v4 as uuidv4 } from 'uuid';
import { calculateNet } from '../utils/calculations.js';

const examService = {
  // Tüm denemeleri getir
  getAll: (userId) => {
    const data = storageService.getUserData(userId, 'exams') || { exams: [], summary: {} };
    return data;
  },
  
  // ID ile deneme getir
  getById: (userId, examId) => {
    const data = examService.getAll(userId);
    return data.exams.find(e => e.id === examId) || null;
  },
  
  // Deneme kaydet
  save: (userId, examData) => {
    const data = examService.getAll(userId);
    
    const exam = {
      id: uuidv4(),
      ...examData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Calculate totals and net for each subject
    exam.results = examData.results.map(result => {
      const net = calculateNet(result.correct, result.wrong, examData.penaltyEnabled);
      const successRate = result.totalQuestions > 0 ? (result.correct / result.totalQuestions) * 100 : 0;
      
      return {
        ...result,
        net: parseFloat(net.toFixed(2)),
        successRate: parseFloat(successRate.toFixed(2))
      };
    });
    
    // Calculate total values
    exam.totalQuestions = exam.results.reduce((sum, r) => sum + r.totalQuestions, 0);
    exam.totalCorrect = exam.results.reduce((sum, r) => sum + r.correct, 0);
    exam.totalWrong = exam.results.reduce((sum, r) => sum + r.wrong, 0);
    exam.totalBlank = exam.results.reduce((sum, r) => sum + r.blank, 0);
    exam.totalNet = exam.results.reduce((sum, r) => sum + r.net, 0);
    exam.overallSuccessRate = exam.totalQuestions > 0 ? (exam.totalCorrect / exam.totalQuestions) * 100 : 0;
    
    data.exams.push(exam);
    
    // Özeti güncelle
    data.summary = examService.calculateSummary(data.exams);
    
    storageService.setUserData(userId, 'exams', data);
    
    return exam;
  },
  
  // Deneme güncelle
  update: (userId, examId, updates) => {
    const data = examService.getAll(userId);
    const index = data.exams.findIndex(e => e.id === examId);
    
    if (index !== -1) {
      // Calculate totals and net for each subject
      const updatedExam = {
        ...data.exams[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      updatedExam.results = updates.results.map(result => {
        const net = calculateNet(result.correct, result.wrong, updates.penaltyEnabled);
        const successRate = result.totalQuestions > 0 ? (result.correct / result.totalQuestions) * 100 : 0;
        
        return {
          ...result,
          net: parseFloat(net.toFixed(2)),
          successRate: parseFloat(successRate.toFixed(2))
        };
      });
      
      // Calculate total values
      updatedExam.totalQuestions = updatedExam.results.reduce((sum, r) => sum + r.totalQuestions, 0);
      updatedExam.totalCorrect = updatedExam.results.reduce((sum, r) => sum + r.correct, 0);
      updatedExam.totalWrong = updatedExam.results.reduce((sum, r) => sum + r.wrong, 0);
      updatedExam.totalBlank = updatedExam.results.reduce((sum, r) => sum + r.blank, 0);
      updatedExam.totalNet = updatedExam.results.reduce((sum, r) => sum + r.net, 0);
      updatedExam.overallSuccessRate = updatedExam.totalQuestions > 0 ? (updatedExam.totalCorrect / updatedExam.totalQuestions) * 100 : 0;
      
      data.exams[index] = updatedExam;
      
      data.summary = examService.calculateSummary(data.exams);
      storageService.setUserData(userId, 'exams', data);
      
      return updatedExam;
    }
    
    throw new Error('Exam not found');
  },
  
  // Deneme sil
  delete: (userId, examId) => {
    const data = examService.getAll(userId);
    const initialLength = data.exams.length;
    data.exams = data.exams.filter(e => e.id !== examId);
    
    if (data.exams.length === initialLength) {
      return false; // Exam not found
    }
    
    data.summary = examService.calculateSummary(data.exams);
    storageService.setUserData(userId, 'exams', data);
    return true;
  },
  
  // Özet hesapla
  calculateSummary: (exams) => {
    if (exams.length === 0) {
      return {
        totalExams: 0,
        averageNet: 0,
        highestNet: 0,
        lowestNet: 0,
        trend: 'stable',
        lastExamDate: null
      };
    }
    
    const sorted = [...exams].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    const totalNet = exams.reduce((sum, e) => sum + e.totalNet, 0);
    const averageNet = totalNet / exams.length;
    const highestNet = Math.max(...exams.map(e => e.totalNet));
    const lowestNet = Math.min(...exams.map(e => e.totalNet));
    
    // Trend hesapla (son 4 deneme)
    let trend = 'stable';
    if (exams.length >= 4) {
      const recent = sorted.slice(-4);
      const firstTwo = (recent[0].totalNet + recent[1].totalNet) / 2;
      const lastTwo = (recent[2].totalNet + recent[3].totalNet) / 2;
      const diff = lastTwo - firstTwo;
      
      if (diff > 5) trend = 'increasing';
      else if (diff < -5) trend = 'decreasing';
    }
    
    return {
      totalExams: exams.length,
      averageNet: parseFloat(averageNet.toFixed(2)),
      highestNet: parseFloat(highestNet.toFixed(2)),
      lowestNet: parseFloat(lowestNet.toFixed(2)),
      trend,
      lastExamDate: sorted[sorted.length - 1].date
    };
  },
  
  // Ders bazlı deneme analizi
  getSubjectAnalysis: (userId, subject) => {
    const data = examService.getAll(userId);
    const subjectResults = data.exams.flatMap(exam =>
      exam.results.filter(r => r.subject === subject)
    );
    
    if (subjectResults.length === 0) return null;
    
    const totalNet = subjectResults.reduce((sum, r) => sum + r.net, 0);
    const averageNet = totalNet / subjectResults.length;
    const averageSuccess = subjectResults.reduce((sum, r) => sum + r.successRate, 0) / subjectResults.length;
    
    return {
      subject,
      examsCount: subjectResults.length,
      averageNet: parseFloat(averageNet.toFixed(2)),
      averageSuccessRate: parseFloat(averageSuccess.toFixed(2)),
      highest: Math.max(...subjectResults.map(r => r.net)),
      lowest: Math.min(...subjectResults.map(r => r.net))
    };
  },
  
  // Trend verisi
  getTrendData: (userId) => {
    const data = examService.getAll(userId);
    return data.exams
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(exam => ({
        date: exam.date,
        net: exam.totalNet,
        examName: exam.name
      }));
  },
  
  // Zayıf konular tespiti (basitçe en düşük netli konular)
  getWeakTopics: (userId) => {
    const data = examService.getAll(userId);
    // This is a simplified version - in a real implementation you would track topic-level data
    // For now, we'll return subjects with lowest average nets
    const subjects = [...new Set(data.exams.flatMap(exam => exam.results.map(r => r.subject)))];
    
    const subjectNets = subjects.map(subject => {
      const subjectResults = data.exams.flatMap(exam => 
        exam.results.filter(r => r.subject === subject)
      );
      
      if (subjectResults.length === 0) return null;
      
      const avgNet = subjectResults.reduce((sum, r) => sum + r.net, 0) / subjectResults.length;
      
      return {
        subject,
        avgNet: parseFloat(avgNet.toFixed(2)),
        totalExams: subjectResults.length
      };
    }).filter(Boolean).sort((a, b) => a.avgNet - b.avgNet); // Lowest first
    
    return subjectNets.slice(0, 3); // Top 3 weak subjects
  }
};

export default examService;