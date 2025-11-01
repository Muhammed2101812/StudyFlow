import React from 'react';
import { useUser } from '../hooks/useUser.js';
import { usePlan } from '../hooks/usePlan.js';
import TodayProgram from '../components/dashboard/TodayProgram.jsx';
import WeeklySummary from '../components/dashboard/WeeklySummary.jsx';
import ExamCountdown from '../components/dashboard/ExamCountdown.jsx';
import QuickActions from '../components/dashboard/QuickActions.jsx';
import RecentActivity from '../components/dashboard/RecentActivity.jsx';
import StatsOverview from '../components/dashboard/StatsOverview.jsx';

const DashboardPage = () => {
  const { currentUser } = useUser();
  const { currentPlan } = usePlan();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Hoş Geldiniz, {currentUser?.name || 'Kullanıcı'}!</h2>
        <p className="text-gray-600">
          {currentPlan 
            ? `Bugünkü hedeflerinizi kontrol edin ve planınıza sadık kalın.`
            : 'Bir plan oluşturarak hedeflerinize ulaşmaya başlayın.'}
        </p>
      </div>

      <StatsOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TodayProgram />
          <WeeklySummary />
        </div>
        <div className="space-y-6">
          <ExamCountdown />
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;