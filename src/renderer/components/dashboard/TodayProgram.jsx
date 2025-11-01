import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlan } from '../../hooks/usePlan';
import Card from '../common/Card';
import Button from '../common/Button';
import { Calendar, Clock, BookOpen, Target } from 'lucide-react';

const TodayProgram = () => {
  const { currentPlan } = usePlan();
  const navigate = useNavigate();

  const today = new Date();
  const dayOfWeek = today.getDay();
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  // Sunday (0) and Monday (1) are rest days
  const isRestDay = dayOfWeek === 0 || dayOfWeek === 1;

  if (!currentPlan) {
    return (
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar size={20} />
            Bugünün Programı
          </h3>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-8">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 mb-4">Plan seçilmedi</p>
            <Button onClick={() => navigate('/settings')}>
              Plan Seç veya Import Et
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }

  if (isRestDay) {
    return (
      <Card>
        <Card.Header>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar size={20} />
            Bugünün Programı
          </h3>
        </Card.Header>
        <Card.Content>
          <div className="text-center py-8">
            <span className="text-6xl mb-4 block">🌴</span>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">
              Dinlenme Günü
            </h4>
            <p className="text-gray-600">
              Bugün {dayNames[dayOfWeek]}. Hafta sonunuzun tadını çıkarın!
            </p>
          </div>
        </Card.Content>
      </Card>
    );
  }

  // For MVP, show placeholder for today's program
  // In full implementation, this would calculate from plan data
  return (
    <Card>
      <Card.Header>
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar size={20} />
          Bugünün Programı - {dayNames[dayOfWeek]}
        </h3>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xl font-bold text-gray-900">Matematik</h4>
              <span className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full">
                Bugün
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <BookOpen size={16} />
                <span className="font-medium">Konu:</span>
                <span>Limit ve Süreklilik</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={16} />
                <span className="font-medium">Süre:</span>
                <span>3 saat</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Target size={16} />
                <span className="font-medium">Hedef:</span>
                <span>50 soru</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => navigate('/study')}
            >
              Çalışmaya Başla
            </Button>
            <Button variant="ghost">
              Atla
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default TodayProgram;
