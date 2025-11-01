import React, { useState } from 'react';
import OverviewStats from '../components/stats/OverviewStats.jsx';
import SubjectStats from '../components/stats/SubjectStats.jsx';
import TrendChart from '../components/stats/TrendChart.jsx';

const StatsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('all'); // 'all', 'last7', 'last30', 'last90'

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">İstatistikler</h2>
            <p className="text-gray-600">Çalışma ve deneme istatistiklerinizi buradan takip edebilirsiniz.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">Tüm Zamanlar</option>
              <option value="last7">Son 7 Gün</option>
              <option value="last30">Son 30 Gün</option>
              <option value="last90">Son 90 Gün</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Genel Bakış
          </button>
          <button
            onClick={() => setActiveTab('subject')}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'subject'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Ders Bazlı
          </button>
          <button
            onClick={() => setActiveTab('trend')}
            className={`py-2 px-4 border-b-2 font-medium text-sm ${
              activeTab === 'trend'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Trend Analizi
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <OverviewStats />
      )}
      
      {activeTab === 'subject' && (
        <SubjectStats />
      )}
      
      {activeTab === 'trend' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart chartType="line" />
          <TrendChart chartType="area" />
        </div>
      )}
    </div>
  );
};

export default StatsPage;