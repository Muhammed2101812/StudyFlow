import { useState, useEffect } from 'react';
import examService from '../services/examService.js';

export const useExams = (userId) => {
  const [examsData, setExamsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load exam data
  useEffect(() => {
    const fetchExamsData = async () => {
      if (!userId) return;
      
      setLoading(true);
      try {
        const data = examService.getAll(userId);
        setExamsData(data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExamsData();
  }, [userId]);

  // Wrapper functions that update state after operations
  const saveExam = async (examData) => {
    setLoading(true);
    try {
      const newExam = examService.save(userId, examData);
      // Update local state
      setExamsData(prev => {
        const updatedExams = [...(prev?.exams || []), newExam];
        const updatedSummary = examService.calculateSummary(updatedExams);
        return { exams: updatedExams, summary: updatedSummary };
      });
      setError(null);
      return newExam;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateExam = async (examId, updates) => {
    setLoading(true);
    try {
      const updatedExam = examService.update(userId, examId, updates);
      // Update local state
      setExamsData(prev => {
        const updatedExams = prev?.exams?.map(exam => 
          exam.id === examId ? updatedExam : exam
        ) || [];
        const updatedSummary = examService.calculateSummary(updatedExams);
        return { exams: updatedExams, summary: updatedSummary };
      });
      setError(null);
      return updatedExam;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteExam = async (examId) => {
    setLoading(true);
    try {
      const success = examService.delete(userId, examId);
      if (success) {
        // Update local state
        setExamsData(prev => {
          const updatedExams = prev?.exams?.filter(exam => exam.id !== examId) || [];
          const updatedSummary = examService.calculateSummary(updatedExams);
          return { exams: updatedExams, summary: updatedSummary };
        });
        setError(null);
      }
      return success;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getSubjectAnalysis = (subject) => {
    return examService.getSubjectAnalysis(userId, subject);
  };

  const getTrendData = () => {
    return examService.getTrendData(userId);
  };

  const getWeakTopics = () => {
    return examService.getWeakTopics(userId);
  };

  // Computed properties
  const examsSorted = examsData?.exams
    ? [...examsData.exams].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const averageNet = examsData?.summary?.averageNet || 0;
  const highestNet = examsData?.summary?.highestNet || 0;
  const lowestNet = examsData?.summary?.lowestNet || 0;
  const totalExams = examsData?.summary?.totalExams || 0;

  return {
    exams: examsData?.exams || [],
    examsSorted,
    summary: examsData?.summary,
    loading,
    error,
    saveExam,
    updateExam,
    deleteExam,
    getSubjectAnalysis,
    getTrendData,
    getWeakTopics,
    averageNet,
    highestNet,
    lowestNet,
    totalExams,
    refreshData: () => {
      if (userId) {
        const data = examService.getAll(userId);
        setExamsData(data);
      }
    }
  };
};