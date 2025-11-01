import React from 'react';
import Card from '../common/Card';
import { BarChart3, TrendingUp } from 'lucide-react';
import { SUBJECT_COLORS } from '../../utils/constants';

const WeeklySummary = () => {
  // Placeholder data for MVP
  const weekData = [
    { day: 'Sal', subject: 'Matematik', completed: true, questions: 45, duration: 3 },
    { day: 'Çar', subject: 'Türkçe', completed: true, questions: 50, duration: 2.5 },
    { day: 'Per', subject: 'Tarih', completed: false, questions: 0, duration: 0 },
    { day: 'Cum', subject: 'Coğrafya', completed: false, questions: 0, duration: 0 },
    { day: 'Cmt', subject: 'Vatandaşlık', completed: false, questions: 0, duration: 0 },
  ];

  const completedDays = weekData.filter(d => d.completed).length;
  const totalQuestions = weekData.reduce((sum, d) => sum + d.questions, 0);
  const totalHours = weekData.reduce((sum, d) => sum + d.duration, 0);

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 size={20} />
          Bu Haftanın Özeti
        </h3>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {/* Progress Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{completedDays}/5</div>
              <div className="text-xs text-gray-600">Gün</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{totalQuestions}</div>
              <div className="text-xs text-gray-600">Soru</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{totalHours}h</div>
              <div className="text-xs text-gray-600">Çalışma</div>
            </div>
          </div>

          {/* Daily Breakdown */}
          <div className="space-y-2">
            {weekData.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 text-center font-medium text-gray-700">
                    {day.day}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: SUBJECT_COLORS[day.subject] || '#6B7280' }}
                  />
                  <span className="text-sm text-gray-900">{day.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  {day.completed ? (
                    <>
                      <span className="text-sm text-gray-600">
                        {day.questions} soru
                      </span>
                      <span className="text-success">✓</span>
                    </>
                  ) : (
                    <span className="text-xs text-gray-400">Bekliyor</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Haftalık İlerleme</span>
              <span>{Math.round((completedDays / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedDays / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default WeeklySummary;
