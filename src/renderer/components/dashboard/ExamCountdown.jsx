import React from 'react';
import { usePlan } from '../../hooks/usePlan';
import Card from '../common/Card';
import { Calendar, Clock } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';
import { tr } from 'date-fns/locale';

const ExamCountdown = () => {
  const { currentPlan } = usePlan();

  if (!currentPlan) {
    return (
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar size={20} />
            Sınava Kalan
          </h3>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-4">
            <p className="text-gray-600">Plan seçilmedi</p>
          </div>
        </Card.Content>
      </Card>
    );
  }

  const today = new Date();
  const examDate = new Date(currentPlan.examDate);
  const daysLeft = differenceInDays(examDate, today);

  const motivationMessages = [
    'Her gün bir adım daha yakınsın! 💪',
    'Başarı senin için kaçınılmaz! 🎯',
    'İnanç + Çalışma = Başarı 🌟',
    'Hedefe odaklan! 🚀',
    'Sen yapabilirsin! 💡',
  ];

  const randomMessage = motivationMessages[Math.floor(Math.random() * motivationMessages.length)];

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar size={20} />
          {currentPlan.name}
        </h3>
      </Card.Header>
      <Card.Content>
        <div className="text-center space-y-4">
          {/* Countdown */}
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl p-6">
            <div className="text-6xl font-bold mb-2">{daysLeft}</div>
            <div className="text-primary-100 text-sm uppercase tracking-wide">
              GÜN KALDI
            </div>
          </div>

          {/* Exam Date */}
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <Clock size={16} />
            <span className="text-sm">
              {format(examDate, 'd MMMM yyyy, EEEE', { locale: tr })}
            </span>
          </div>

          {/* Motivation */}
          <div className="bg-primary-50 rounded-lg p-3">
            <p className="text-sm text-primary-900 font-medium">
              {randomMessage}
            </p>
          </div>

          {/* Progress Ring (Simplified) */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {currentPlan.totalWeeks || 0}
              </div>
              <div className="text-xs text-gray-600">Toplam Hafta</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {currentPlan.subjects?.length || 0}
              </div>
              <div className="text-xs text-gray-600">Ders</div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ExamCountdown;
