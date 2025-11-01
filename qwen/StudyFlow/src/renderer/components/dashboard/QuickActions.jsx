import React from 'react';
import Card from '../common/Card.jsx';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button.jsx';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'study',
      title: 'Çalışma Ekle',
      description: 'Günlük çalışmanızı kaydedin',
      icon: '📝',
      color: 'bg-blue-100 text-blue-600',
      onClick: () => navigate('/study')
    },
    {
      id: 'exam',
      title: 'Deneme Ekle',
      description: 'Yeni bir deneme sınavı girin',
      icon: '📋',
      color: 'bg-green-100 text-green-600',
      onClick: () => navigate('/exams')
    },
    {
      id: 'stats',
      title: 'İstatistikler',
      description: 'İlerleme durumunuzu görün',
      icon: '📊',
      color: 'bg-purple-100 text-purple-600',
      onClick: () => navigate('/stats')
    },
    {
      id: 'settings',
      title: 'Ayarlar',
      description: 'Profilinizi yönetin',
      icon: '⚙️',
      color: 'bg-gray-100 text-gray-600',
      onClick: () => navigate('/settings')
    }
  ];

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Hızlı Erişim</h3>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`${action.color} rounded-lg p-4 text-left transition-all hover:opacity-90 hover:shadow-md`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <h4 className="font-medium text-gray-900">{action.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default QuickActions;