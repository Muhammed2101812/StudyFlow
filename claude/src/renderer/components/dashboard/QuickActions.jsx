import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import { BookOpen, FileText, BarChart3, Settings } from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: BookOpen,
      label: 'Çalışma Ekle',
      description: 'Günlük çalışmanızı kaydedin',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      onClick: () => navigate('/study'),
    },
    {
      icon: FileText,
      label: 'Deneme Ekle',
      description: 'Deneme sınavı sonucu girin',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      onClick: () => navigate('/exams'),
    },
    {
      icon: BarChart3,
      label: 'İstatistikler',
      description: 'İlerlemenizi görüntüleyin',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      onClick: () => navigate('/stats'),
    },
    {
      icon: Settings,
      label: 'Ayarlar',
      description: 'Profil ve plan ayarları',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      onClick: () => navigate('/settings'),
    },
  ];

  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold">Hızlı İşlemler</h3>
      </Card.Header>
      <Card.Content>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`${action.bgColor} rounded-lg p-4 text-left hover:shadow-md transition-all duration-200 group`}
            >
              <action.icon
                size={24}
                className={`${action.color} mb-2 group-hover:scale-110 transition-transform`}
              />
              <h4 className="font-medium text-gray-900 mb-1">
                {action.label}
              </h4>
              <p className="text-xs text-gray-600">
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default QuickActions;
