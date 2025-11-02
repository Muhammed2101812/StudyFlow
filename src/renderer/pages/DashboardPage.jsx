import React from 'react';
import { useUser } from '../hooks/useUser';
import TodayProgram from '../components/dashboard/TodayProgram';
import WeeklySummary from '../components/dashboard/WeeklySummary';
import ExamCountdown from '../components/dashboard/ExamCountdown';
import QuickActions from '../components/dashboard/QuickActions';
import ExamStats from '../components/dashboard/ExamStats';

const DashboardPage = () => {
  const { currentUser } = useUser();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Hoş geldin, {currentUser?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Bugünkü hedeflerini tamamlamaya hazır mısın?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Today's Program */}
        <div className="lg:col-span-2 space-y-6">
          <TodayProgram />
          <WeeklySummary />
        </div>

        {/* Right Column - Stats and Actions */}
        <div className="space-y-6">
          <ExamCountdown />
          <ExamStats />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
