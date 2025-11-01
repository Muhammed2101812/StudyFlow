import { useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useToast } from '../contexts/ToastContext';
import useStats from '../hooks/useStats';
import exportService from '../services/exportService';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import OverviewStats from '../components/stats/OverviewStats';
import SubjectStats from '../components/stats/SubjectStats';
import { NetTrendChart, SubjectComparisonChart, WeeklyTrendChart } from '../components/stats/TrendChart';
import WeakTopics from '../components/stats/WeakTopics';
import DateRangeSelector from '../components/stats/DateRangeSelector';

export default function StatsPage() {
  const { currentUser } = useUser();
  const { showToast } = useToast();
  const [dateRange, setDateRange] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, subjects, trends
  const [exporting, setExporting] = useState(false);

  const { stats, loading, error, refresh } = useStats(dateRange);

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const handleExport = async () => {
    if (!currentUser) return;

    setExporting(true);
    try {
      const result = await exportService.exportAllData(currentUser.id);

      if (result.success) {
        const filename = exportService.generateFilename(currentUser.id, 'all');
        const saveResult = await exportService.saveToFile(result.data, filename);

        if (saveResult.success) {
          showToast('Veriler başarıyla dışa aktarıldı', 'success');
        } else {
          showToast(saveResult.error || 'Dosya kaydedilemedi', 'error');
        }
      } else {
        showToast(result.error || 'Dışa aktarma başarısız', 'error');
      }
    } catch (error) {
      console.error('Export error:', error);
      showToast('Dışa aktarma sırasında hata oluştu', 'error');
    } finally {
      setExporting(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Genel Bakış' },
    { id: 'subjects', label: 'Ders Bazlı' },
    { id: 'trends', label: 'Trend Analizi' },
  ];

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">Lütfen bir kullanıcı seçin</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İstatistikler</h1>
          <p className="text-gray-600 mt-1">
            Çalışma performansınızı ve ilerlemenizi inceleyin
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={refresh}
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Yenile
          </Button>
          <Button
            onClick={handleExport}
            variant="primary"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
            disabled={exporting}
          >
            {exporting ? 'Aktarılıyor...' : 'Dışa Aktar'}
          </Button>
        </div>
      </div>

      {/* Date Range Selector */}
      <DateRangeSelector onRangeChange={handleDateRangeChange} />

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Overview Stats Cards */}
            {stats?.overview && <OverviewStats stats={stats.overview} />}

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <NetTrendChart
                data={stats?.trendData || []}
                title="Net Gelişimi"
              />
              <WeakTopics topics={stats?.weakTopics || []} />
            </div>
          </>
        )}

        {activeTab === 'subjects' && (
          <>
            {/* Subject Stats Cards */}
            {stats?.subjectStats && <SubjectStats subjectStats={stats.subjectStats} />}

            {/* Subject Comparison Chart */}
            <SubjectComparisonChart
              data={stats?.subjectStats || {}}
              title="Ders Bazlı Performans Karşılaştırması"
            />
          </>
        )}

        {activeTab === 'trends' && (
          <>
            {/* Trend Charts */}
            <div className="grid grid-cols-1 gap-6">
              <NetTrendChart
                data={stats?.trendData || []}
                title="Deneme Performans Trendi"
              />
              <WeeklyTrendChart
                data={stats?.weeklyTrendData || []}
                title="Haftalık Net Ortalaması"
              />
              <SubjectComparisonChart
                data={stats?.subjectStats || {}}
                title="Ders Bazlı Ortalama Net"
              />
            </div>
          </>
        )}
      </div>

      {/* Empty State */}
      {stats && !stats.overview?.totalStudyDays && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-gray-600 mb-2">Henüz veri yok</p>
          <p className="text-sm text-gray-500">
            Çalışma kaydı ekleyerek istatistiklerinizi görüntülemeye başlayın
          </p>
        </div>
      )}
    </div>
  );
}
