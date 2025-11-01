import React, { useState } from 'react';
import Calendar from '../components/study/Calendar.jsx';
import StudyLogForm from '../components/study/StudyLogForm.jsx';
import { useUser } from '../hooks/useUser.js';
import { usePlan } from '../hooks/usePlan.js';
import { useToast } from '../components/common/Toast.jsx';
import progressService from '../services/progressService.js';

const StudyLogPage = () => {
  const { currentUser } = useUser();
  const { currentPlan } = usePlan();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentLog, setCurrentLog] = useState(null);
  const toast = useToast();

  // Get completed dates from progress service for calendar display
  const progressData = progressService.getAll(currentUser?.id);
  const completedDates = Object.keys(progressData?.dailyLogs || {}).filter(date => {
    return progressData.dailyLogs[date].completed;
  });

  const handleDaySelect = (date) => {
    setSelectedDate(date);
    
    // Check if there's an existing log for this date
    const existingLog = progressService.getByDate(currentUser.id, date);
    if (existingLog) {
      setCurrentLog(existingLog);
      setShowForm(true);
    } else {
      setCurrentLog(null);
      setShowForm(true);
    }
  };

  const handleSaveLog = (logData) => {
    try {
      if (currentLog) {
        progressService.updateStudyLog(currentUser.id, logData.date, logData);
        toast.success('Çalışma başarıyla güncellendi!');
      } else {
        progressService.saveStudyLog(currentUser.id, logData);
        toast.success('Çalışma başarıyla kaydedildi!');
      }
      
      // Refresh the selected date's log
      const updatedLog = progressService.getByDate(currentUser.id, logData.date);
      setCurrentLog(updatedLog);
      setSelectedDate(logData.date);
    } catch (error) {
      toast.error('Çalışma kaydedilirken bir hata oluştu: ' + error.message);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentLog(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Çalışma Günlüğü</h2>
        <p className="text-gray-600">
          Günlük çalışmalarınızı buradan takip edebilir ve yeni çalışma girişleri yapabilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Calendar 
            onDaySelect={handleDaySelect}
            selectedDate={selectedDate}
            completedDates={completedDates}
          />
        </div>
        
        <div className="lg:col-span-2">
          {showForm ? (
            <StudyLogForm
              initialData={currentLog}
              onSave={handleSaveLog}
              onCancel={handleCancelForm}
            />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Bir gün seçin</h3>
              <p className="text-gray-500">
                Takvimden bir gün seçerek o güne ait çalışma girişi yapabilir veya mevcut kaydı düzenleyebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyLogPage;