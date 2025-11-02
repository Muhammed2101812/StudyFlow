import { useState, useEffect } from 'react';
import { useUser } from './useUser';
import examService from '../services/examService';

/**
 * useExams Hook
 * Manages exam data and provides computed properties
 */
export function useExams() {
  const { currentUser } = useUser();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load exams when user changes
  useEffect(() => {
    if (currentUser) {
      loadExams();
    } else {
      setExams([]);
      setLoading(false);
    }
  }, [currentUser]);

  const loadExams = async () => {
    if (!currentUser) return;

    setLoading(true);
    setError(null);

    const response = await examService.getAll(currentUser.id);

    if (response.success) {
      setExams(response.data);
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  // Computed properties
  const examsSorted = Array.isArray(exams) ? [...exams].sort((a, b) => new Date(b.date) - new Date(a.date)) : [];

  const summary = examService.calculateSummary(exams);

  const averageNet = summary.averageNet;

  const highestNet = summary.highestNet;

  const lowestNet = summary.lowestNet;

  const trend = summary.trend;

  const trendData = examsSorted.map((exam) => ({
    date: exam.date,
    name: exam.name,
    totalNet: exam.totalNet,
    results: exam.results,
  }));

  // Get subject-specific analysis
  const getSubjectAnalysis = async (subject) => {
    if (!currentUser) return null;
    const response = await examService.getSubjectAnalysis(currentUser.id, subject);
    return response.success ? response.data : null;
  };

  // Get weak topics
  const getWeakTopics = async () => {
    if (!currentUser) return [];
    const response = await examService.getWeakTopics(currentUser.id);
    return response.success ? response.data : [];
  };

  // Save exam
  const saveExam = async (examData) => {
    if (!currentUser) return { success: false, error: 'Kullanıcı bulunamadı' };

    const response = await examService.save(currentUser.id, examData);

    if (response.success) {
      await loadExams();
    }

    return response;
  };

  // Update exam
  const updateExam = async (examId, updates) => {
    if (!currentUser) return { success: false, error: 'Kullanıcı bulunamadı' };

    const response = await examService.update(currentUser.id, examId, updates);

    if (response.success) {
      await loadExams();
    }

    return response;
  };

  // Delete exam
  const deleteExam = async (examId) => {
    if (!currentUser) return { success: false, error: 'Kullanıcı bulunamadı' };

    const response = await examService.delete(currentUser.id, examId);

    if (response.success) {
      await loadExams();
    }

    return response;
  };

  // Get exam by ID
  const getExamById = (examId) => {
    return exams.find((exam) => exam.id === examId);
  };

  return {
    // Data
    exams,
    examsSorted,
    loading,
    error,

    // Computed properties
    summary,
    averageNet,
    highestNet,
    lowestNet,
    trend,
    trendData,

    // Methods
    loadExams,
    saveExam,
    updateExam,
    deleteExam,
    getExamById,
    getSubjectAnalysis,
    getWeakTopics,
  };
}

export default useExams;
