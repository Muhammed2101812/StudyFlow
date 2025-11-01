import React from 'react';
import Card from '../common/Card.jsx';
import { useUser } from '../../hooks/useUser.js';
import { usePlan } from '../../hooks/usePlan.js';

const StatsOverview = () => {
  const { currentUser } = useUser();
  const { currentPlan } = usePlan();

  // Mock data for stats - in real implementation this would come from progress/exam services
  const stats = [
    { 
      id: 'hours', 
      title: 'Toplam Saat', 
      value: '87', 
      icon: '⏱️', 
      color: 'text-blue-500',
      change: '+5 bu hafta'
    },
    { 
      id: 'questions', 
      title: 'Toplam Soru', 
      value: '3245', 
      icon: '🔢', 
      color: 'text-green-500',
      change: '+120 bu hafta'
    },
    { 
      id: 'net', 
      title: 'Ortalama Net', 
      value: '63.25', 
      icon: '🎯', 
      color: 'text-purple-500',
      change: '+2.1 bu hafta'
    },
    { 
      id: 'streak', 
      title: 'Gün Serisi', 
      value: '5', 
      icon: '🔥', 
      color: 'text-red-500',
      change: 'Rekor: 12 gün'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.id}>
          <div className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;