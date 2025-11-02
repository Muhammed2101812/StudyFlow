import storageService from './storageService';
import { v4 as uuidv4 } from 'uuid';

/**
 * Exam Service
 * Handles mock exam management operations
 */

const examService = {
  /**
   * Get all exams for a user
   */
  async getAll(userId) {
    try {
      const exams = await storageService.getUserData(userId, 'exams') || [];
      return { success: true, data: Array.isArray(exams) ? exams : [] };
    } catch (error) {
      console.error('Error getting exams:', error);
      return { success: false, error: 'Denemeler yüklenemedi', data: [] };
    }
  },

  /**
   * Get exam by ID
   */
  async getById(userId, examId) {
    try {
      const exams = await storageService.getUserData(userId, 'exams') || [];
      const exam = exams.find((e) => e.id === examId);

      if (!exam) {
        return { success: false, error: 'Deneme bulunamadı' };
      }

      return { success: true, data: exam };
    } catch (error) {
      console.error('Error getting exam:', error);
      return { success: false, error: 'Deneme yüklenemedi' };
    }
  },

  /**
   * Save a new exam
   */
  async save(userId, examData) {
    try {
      const exams = await storageService.getUserData(userId, 'exams') || [];

      const newExam = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        ...examData,
      };

      exams.push(newExam);
      await storageService.setUserData(userId, 'exams', exams);

      return { success: true, data: newExam };
    } catch (error) {
      console.error('Error saving exam:', error);
      return { success: false, error: 'Deneme kaydedilemedi' };
    }
  },

  /**
   * Update an existing exam
   */
  async update(userId, examId, updates) {
    try {
      const exams = await storageService.getUserData(userId, 'exams') || [];
      const examIndex = exams.findIndex((e) => e.id === examId);

      if (examIndex === -1) {
        return { success: false, error: 'Deneme bulunamadı' };
      }

      exams[examIndex] = {
        ...exams[examIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      await storageService.setUserData(userId, 'exams', exams);

      return { success: true, data: exams[examIndex] };
    } catch (error) {
      console.error('Error updating exam:', error);
      return { success: false, error: 'Deneme güncellenemedi' };
    }
  },

  /**
   * Delete an exam
   */
  async delete(userId, examId) {
    try {
      const exams = await storageService.getUserData(userId, 'exams') || [];
      const filteredExams = exams.filter((e) => e.id !== examId);

      if (exams.length === filteredExams.length) {
        return { success: false, error: 'Deneme bulunamadı' };
      }

      await storageService.setUserData(userId, 'exams', filteredExams);

      return { success: true };
    } catch (error) {
      console.error('Error deleting exam:', error);
      return { success: false, error: 'Deneme silinemedi' };
    }
  },

  /**
   * Calculate summary statistics for exams
   */
  calculateSummary(exams) {
    if (!exams || exams.length === 0) {
      return {
        totalExams: 0,
        averageNet: 0,
        highestNet: { value: 0, date: null },
        lowestNet: { value: 0, date: null },
        trend: 'stable',
      };
    }

    const totalExams = exams.length;
    const nets = exams.map((e) => e.totalNet);
    const averageNet = nets.reduce((sum, net) => sum + net, 0) / totalExams;

    const highestNet = Math.max(...nets);
    const lowestNet = Math.min(...nets);
    const highestExam = exams.find((e) => e.totalNet === highestNet);
    const lowestExam = exams.find((e) => e.totalNet === lowestNet);

    // Calculate trend (last 3 exams vs previous 3)
    let trend = 'stable';
    if (exams.length >= 6) {
      const sortedExams = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));
      const recentThree = sortedExams.slice(-3);
      const previousThree = sortedExams.slice(-6, -3);

      const recentAvg = recentThree.reduce((sum, e) => sum + e.totalNet, 0) / 3;
      const previousAvg = previousThree.reduce((sum, e) => sum + e.totalNet, 0) / 3;

      if (recentAvg > previousAvg + 2) {
        trend = 'increasing';
      } else if (recentAvg < previousAvg - 2) {
        trend = 'decreasing';
      }
    }

    return {
      totalExams,
      averageNet: Number(averageNet.toFixed(2)),
      highestNet: {
        value: highestNet,
        date: highestExam?.date,
      },
      lowestNet: {
        value: lowestNet,
        date: lowestExam?.date,
      },
      trend,
    };
  },

  /**
   * Get subject-specific analysis
   */
  async getSubjectAnalysis(userId, subject) {
    try {
      const exams = await storageService.getUserData(userId, 'exams') || [];

      if (!exams || exams.length === 0) {
        return {
          success: true,
          data: {
            totalQuestions: 0,
            totalCorrect: 0,
            totalWrong: 0,
            totalEmpty: 0,
            averageNet: 0,
            successRate: 0,
          },
        };
      }

      const subjectData = exams
        .filter((exam) => exam.results && exam.results[subject])
        .map((exam) => exam.results[subject]);

      if (subjectData.length === 0) {
        return {
          success: true,
          data: {
            totalQuestions: 0,
            totalCorrect: 0,
            totalWrong: 0,
            totalEmpty: 0,
            averageNet: 0,
            successRate: 0,
          },
        };
      }

      const totalCorrect = subjectData.reduce((sum, d) => sum + d.correct, 0);
      const totalWrong = subjectData.reduce((sum, d) => sum + d.wrong, 0);
      const totalEmpty = subjectData.reduce((sum, d) => sum + d.empty, 0);
      const totalQuestions = totalCorrect + totalWrong + totalEmpty;
      const totalNet = subjectData.reduce((sum, d) => sum + d.net, 0);
      const averageNet = totalNet / subjectData.length;
      const successRate = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

      return {
        success: true,
        data: {
          totalQuestions,
          totalCorrect,
          totalWrong,
          totalEmpty,
          averageNet: Number(averageNet.toFixed(2)),
          successRate: Number(successRate.toFixed(2)),
        },
      };
    } catch (error) {
      console.error('Error getting subject analysis:', error);
      return { success: false, error: 'Ders analizi yüklenemedi' };
    }
  },

  /**
   * Get trend data for charts
   */
  async getTrendData(userId) {
    try {
      const exams = await storageService.getUserData(userId, 'exams') || [];

      if (!exams || exams.length === 0) {
        return { success: true, data: [] };
      }

      const sortedExams = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));

      const trendData = sortedExams.map((exam) => ({
        date: exam.date,
        name: exam.name,
        totalNet: exam.totalNet,
        ...exam.results,
      }));

      return { success: true, data: trendData };
    } catch (error) {
      console.error('Error getting trend data:', error);
      return { success: false, error: 'Trend verileri yüklenemedi' };
    }
  },

  /**
   * Get weak topics from all exams
   */
  async getWeakTopics(userId) {
    try {
      const exams = await storageService.getUserData(userId, 'exams') || [];

      if (!exams || exams.length === 0) {
        return { success: true, data: [] };
      }

      const allWeakTopics = [];

      exams.forEach((exam) => {
        if (exam.weakTopics && Array.isArray(exam.weakTopics)) {
          exam.weakTopics.forEach((topic) => {
            allWeakTopics.push(topic);
          });
        }
      });

      // Count frequency
      const topicCounts = {};
      allWeakTopics.forEach((topic) => {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      });

      // Sort by frequency
      const sortedTopics = Object.entries(topicCounts)
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count);

      return { success: true, data: sortedTopics };
    } catch (error) {
      console.error('Error getting weak topics:', error);
      return { success: false, error: 'Zayıf konular yüklenemedi' };
    }
  },
};

export default examService;
