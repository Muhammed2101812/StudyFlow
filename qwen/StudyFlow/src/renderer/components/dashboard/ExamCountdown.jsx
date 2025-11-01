import React from 'react';
import Card from '../common/Card.jsx';
import { usePlan } from '../../hooks/usePlan.js';
import { daysUntil } from '../../utils/dateHelpers.js';

const ExamCountdown = () => {
  const { currentPlan, daysUntilExam } = usePlan();

  // Motivational messages based on days until exam
  const getMotivationalMessage = (days) => {
    if (days === null) return "Planınızı seçin";
    if (days > 300) return "Harika başlangıç! Planlı çalışmanın gücü inanılmazdır.";
    if (days > 200) return "Devam edin! Güçlü bir temel oluşturuyorsunuz.";
    if (days > 100) return "İyi gidiyorsunuz! Her gün bir adım daha yaklaşıyorsunuz.";
    if (days > 50) return "Harikasınız! Azim ve kararlılık başarıyı getirir.";
    if (days > 20) return "Sınav yaklaşıyor! Odaklanmışsınız ve hazır olacaksınız.";
    if (days > 7) return "Neredeyse burada! Tüm emekleriniz karşılığını bulacak.";
    if (days > 1) return "Sınav çok yaklaştı! Son kozları kullanma zamanı.";
    if (days === 1) return "Yarın sınav! Sizi gururla izliyoruz.";
    if (days === 0) return "Bugün sınav günü! En iyiini yapacaksınız!";
    return "Sınav tamamlandı! Başarılarınız için tebrikler!";
  };

  if (!currentPlan) {
    return (
      <Card className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Sınav Tarihi</h3>
        <p className="text-gray-500 mb-4">Plan seçili değil</p>
        <p className="text-sm text-gray-400">Lütfen bir plan seçin</p>
      </Card>
    );
  }

  const motivationalMessage = getMotivationalMessage(daysUntilExam);

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Sınava Kalan Süre</h3>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">
              {daysUntilExam !== null ? Math.abs(daysUntilExam) : '--'}
              <span className="text-lg font-normal"> gün</span>
            </p>
            <p className="text-sm text-gray-500">{currentPlan.name}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">
              {daysUntilExam > 0 ? 'Kalan' : 'Geçen'} Süre
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-bold">
                {daysUntilExam !== null && daysUntilExam > 0 ? 
                  `-${daysUntilExam}` : 
                  `+${Math.abs(daysUntilExam)}`}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-700 italic">{motivationalMessage}</p>
        </div>
      </div>
    </Card>
  );
};

export default ExamCountdown;