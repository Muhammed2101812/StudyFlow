import React from 'react';
import { usePlan } from '../../hooks/usePlan.js';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card.jsx';
import Button from '../common/Button.jsx';
import { formatDate } from '../../utils/dateHelpers.js';
import { getSubjectColor, getSubjectIcon } from '../../utils/formatters.js';

const TodayProgram = () => {
  const { currentPlan, todayProgram } = usePlan();
  const navigate = useNavigate();

  const handleStartStudy = () => {
    navigate('/study');
  };

  const handleSkipDay = () => {
    // Skip functionality would be implemented here
    // For now we'll just navigate to the study page
    navigate('/study');
  };

  if (!currentPlan) {
    return (
      <Card>
        <div className="p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Bugün İçin Program Yok</h3>
          <p className="text-gray-500 mb-4">Lütfen önce bir plan seçin veya plan içe aktarın</p>
          <Button onClick={() => navigate('/plan-import')}>Plan Ekle</Button>
        </div>
      </Card>
    );
  }

  if (!todayProgram) {
    const today = new Date();
    const dayOfWeek = today.getDay();
    
    // If it's weekend, show a different message
    if (dayOfWeek === 0 || dayOfWeek === 1) { // Sunday or Monday
      return (
        <Card>
          <div className="p-6 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bugün Tatil 🎉</h3>
            <p className="text-gray-500 mb-4">Rahatlayın ve yarınki güne hazırlanın!</p>
            <Button onClick={() => navigate('/study')}>Geçmiş Çalışmaları Gör</Button>
          </div>
        </Card>
      );
    }
    
    return (
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Bugün İçin Program Yok</h3>
          <p className="text-gray-500 mb-4">Planınıza göre bugün için bir program bulunmamaktadır.</p>
          <div className="flex space-x-3">
            <Button onClick={() => navigate('/study')}>Manuel Çalışma Ekle</Button>
            <Button variant="secondary" onClick={handleSkipDay}>Atla</Button>
          </div>
        </div>
      </Card>
    );
  }

  const subjectColor = getSubjectColor(todayProgram.subject);
  const subjectIcon = getSubjectIcon(todayProgram.subject);

  return (
    <Card>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Bugünün Programı</h3>
            <p className="text-sm text-gray-500">{formatDate(todayProgram.date)}</p>
          </div>
          <div 
            className="text-2xl" 
            style={{ color: subjectColor }}
          >
            {subjectIcon}
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div>
            <p className="text-sm text-gray-500">Ders</p>
            <p 
              className="font-medium" 
              style={{ color: subjectColor }}
            >
              {todayProgram.subjectName || todayProgram.subject}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Konu</p>
            <p className="font-medium text-gray-900">{todayProgram.topic}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Tahmini Süre</p>
            <p className="font-medium text-gray-900">{todayProgram.duration} saat</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Hedef Soru</p>
            <p className="font-medium text-gray-900">{todayProgram.targetQuestions} soru</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button 
            variant="primary" 
            className="flex-1" 
            onClick={handleStartStudy}
          >
            Çalışmaya Başla
          </Button>
          <Button 
            variant="secondary" 
            onClick={handleSkipDay}
          >
            Atla
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TodayProgram;