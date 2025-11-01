import React, { useState } from 'react';
import Button from '../components/common/Button.jsx';
import ExamForm from '../components/exams/ExamForm.jsx';
import ExamList from '../components/exams/ExamList.jsx';
import ExamDetail from '../components/exams/ExamDetail.jsx';
import { useUser } from '../hooks/useUser.js';
import { useToast } from '../components/common/Toast.jsx';
import examService from '../services/examService.js';

const ExamsPage = () => {
  const { currentUser } = useUser();
  const [activeTab, setActiveTab] = useState('list'); // 'form' or 'list'
  const [selectedExam, setSelectedExam] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const toast = useToast();

  // Get exams data
  const examsData = examService.getAll(currentUser?.id);
  const exams = examsData.exams || [];

  const handleSaveExam = (examData) => {
    try {
      if (selectedExam) {
        examService.update(currentUser.id, selectedExam.id, examData);
        toast.success('Deneme başarıyla güncellendi!');
      } else {
        examService.save(currentUser.id, examData);
        toast.success('Deneme başarıyla kaydedildi!');
      }
      setActiveTab('list');
      setSelectedExam(null);
    } catch (error) {
      toast.error('Deneme kaydedilirken bir hata oluştu: ' + error.message);
    }
  };

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setActiveTab('form');
  };

  const handleViewExam = (exam) => {
    setSelectedExam(exam);
    setShowDetailModal(true);
  };

  const handleDeleteExam = (examId) => {
    if (window.confirm('Bu denemeyi silmek istediğinize emin misiniz?')) {
      try {
        examService.delete(currentUser.id, examId);
        toast.success('Deneme başarıyla silindi!');
      } catch (error) {
        toast.error('Deneme silinirken bir hata oluştu: ' + error.message);
      }
    }
  };

  const handleCancelForm = () => {
    setActiveTab('list');
    setSelectedExam(null);
  };

  const handleAddNewExam = () => {
    setSelectedExam(null);
    setActiveTab('form');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Deneme Sınavları</h2>
            <p className="text-gray-600">Deneme sınavı sonuçlarınızı buradan takip edebilirsiniz.</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'list'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Deneme Listesi
            </button>
            <button
              onClick={handleAddNewExam}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'form'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Yeni Deneme Ekle
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'form' ? (
        <ExamForm
          initialData={selectedExam}
          onSave={handleSaveExam}
          onCancel={handleCancelForm}
        />
      ) : (
        <ExamList
          exams={exams}
          onEdit={handleEditExam}
          onDelete={handleDeleteExam}
          onView={handleViewExam}
        />
      )}

      {/* Exam Detail Modal */}
      {showDetailModal && selectedExam && (
        <ExamDetail
          exam={selectedExam}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          onEdit={(exam) => {
            setShowDetailModal(false);
            handleEditExam(exam);
          }}
        />
      )}
    </div>
  );
};

export default ExamsPage;