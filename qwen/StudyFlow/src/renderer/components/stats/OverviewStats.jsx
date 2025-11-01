import React from 'react';
import { useUser } from '../../hooks/useUser.js';
import statsService from '../../services/statsService.js';

const OverviewStats = () => {
  const { currentUser } = useUser();
  
  if (!currentUser) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">Kullanıcı bilgisi bulunamadı.</p>
      </div>
    );
  }
  
  const overview = statsService.getOverview(currentUser.id);

  const stats = [
    {
      id: 'hours',
      title: 'Toplam Çalışma Saati',
      value: overview.totalStudyHours,
      unit: 'saat',
      icon: '⏱️',
      color: 'text-blue-500',
      description: `${overview.daysStudied} gün boyunca`
    },
    {
      id: 'questions',
      title: 'Toplam Soru',
      value: overview.totalQuestions,
      unit: 'soru',
      icon: '🔢',
      color: 'text-green-500',
      description: `${overview.totalCorrect} doğru / ${overview.totalWrong} yanlış`
    },
    {
      id: 'net',
      title: 'Ortalama Net',
      value: overview.averageNet ? overview.averageNet.toFixed(2) : overview.totalNet && overview.totalQuestions ? (overview.totalNet / Math.max(1, Math.floor(overview.totalQuestions/30))).toFixed(2) : '0.00',
      unit: 'net',
      icon: '🎯',
      color: 'text-purple-500',
      description: 'Deneme bazında'
    },
    {
      id: 'streak',
      title: 'Çalışma Serisi',
      value: overview.currentStreak,
      unit: 'gün',
      icon: '🔥',
      color: 'text-red-500',
      description: `Rekor: ${overview.longestStreak} gün`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white rounded-lg shadow p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="ml-1 text-sm font-medium text-gray-500">{stat.unit}</p>
              </div>
              <p className="mt-1 text-xs text-gray-500">{stat.description}</p>
            </div>
            <span className={`text-2xl ${stat.color}`}>{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewStats;