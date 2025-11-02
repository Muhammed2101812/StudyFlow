import { FileText, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import { useExams } from '../../hooks/useExams';

export default function ExamStats() {
  const { exams, summary, loading } = useExams();

  if (loading) {
    return (
      <Card>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }

  if (exams.length === 0) {
    return (
      <Card>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Deneme İstatistikleri</h2>
          </div>
          <div className="text-center py-4">
            <p className="text-gray-600 text-sm mb-3">Henüz deneme eklenmemiş</p>
            <Link
              to="/exams"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              İlk Denemeyi Ekle
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  const getTrendIcon = () => {
    if (summary.trend === 'increasing') {
      return <TrendingUp className="w-5 h-5 text-green-500" />;
    } else if (summary.trend === 'decreasing') {
      return <TrendingDown className="w-5 h-5 text-red-500" />;
    }
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const getTrendText = () => {
    if (summary.trend === 'increasing') {
      return 'Yükseliş';
    } else if (summary.trend === 'decreasing') {
      return 'Düşüş';
    }
    return 'Sabit';
  };

  const getTrendColor = () => {
    if (summary.trend === 'increasing') {
      return 'text-green-600';
    } else if (summary.trend === 'decreasing') {
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Deneme İstatistikleri</h2>
          </div>
          <Link
            to="/exams"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Tümünü Gör →
          </Link>
        </div>

        <div className="space-y-4">
          {/* Total Exams */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Toplam Deneme</span>
            <span className="text-lg font-bold text-gray-900">{summary.totalExams}</span>
          </div>

          {/* Average Net */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Ortalama Net</span>
            <span className="text-lg font-bold text-blue-600">{summary.averageNet}</span>
          </div>

          {/* Highest Net */}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">En Yüksek</span>
            <span className="text-lg font-bold text-green-600">
              {summary.highestNet.value}
            </span>
          </div>

          {/* Trend */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-600">Performans Trendi</span>
            <div className="flex items-center gap-2">
              {getTrendIcon()}
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {getTrendText()}
              </span>
            </div>
          </div>
        </div>

        {/* Last Exam Info */}
        {exams.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Son deneme: {new Date(exams[0].date).toLocaleDateString('tr-TR')}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
