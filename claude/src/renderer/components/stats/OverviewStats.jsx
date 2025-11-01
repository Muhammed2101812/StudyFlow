import { Clock, Target, TrendingUp, Flame, Calendar, Award } from 'lucide-react';
import Card from '../common/Card';

export default function OverviewStats({ stats }) {
  if (!stats) {
    return null;
  }

  const statCards = [
    {
      title: 'Toplam Çalışma Saati',
      value: `${stats.totalHours} saat`,
      icon: <Clock className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Toplam Soru',
      value: stats.totalQuestions,
      subtitle: `${stats.totalCorrect} Doğru / ${stats.totalWrong} Yanlış`,
      icon: <Target className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Ortalama Net',
      value: stats.averageNet,
      subtitle: `${stats.totalExams} deneme ortalaması`,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Çalışma Serisi',
      value: `${stats.currentStreak} gün`,
      subtitle: `En uzun: ${stats.longestStreak} gün`,
      icon: <Flame className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Tutarlılık',
      value: `%${stats.consistencyPercentage}`,
      subtitle: 'Son 30 günde',
      icon: <Calendar className="w-6 h-6" />,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      title: 'Plan İlerleme',
      value: `%${stats.planProgress?.percentage || 0}`,
      subtitle: `${stats.planProgress?.completedDays || 0}/${stats.planProgress?.totalDays || 0} gün`,
      icon: <Award className="w-6 h-6" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((card, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-2">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
              {card.subtitle && (
                <p className="text-sm text-gray-500">{card.subtitle}</p>
              )}
            </div>
            <div className={`${card.bgColor} ${card.color} p-3 rounded-lg`}>
              {card.icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
