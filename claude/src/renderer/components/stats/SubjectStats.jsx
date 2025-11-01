import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Card from '../common/Card';

export default function SubjectStats({ subjectStats }) {
  if (!subjectStats) {
    return null;
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'decreasing':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTrendText = (trend) => {
    switch (trend) {
      case 'increasing':
        return 'Yükseliş';
      case 'decreasing':
        return 'Düşüş';
      default:
        return 'Sabit';
    }
  };

  const subjects = Object.values(subjectStats);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {subjects.map((subject) => (
        <Card key={subject.subject} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: subject.color }}
              ></div>
              <h3 className="text-lg font-semibold text-gray-900">
                {subject.subject}
              </h3>
            </div>
            <div className="flex items-center gap-1">
              {getTrendIcon(subject.trend)}
              <span className="text-xs text-gray-600">{getTrendText(subject.trend)}</span>
            </div>
          </div>

          <div className="space-y-3">
            {/* Total Net */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Toplam Net</span>
              <span className="text-lg font-bold text-gray-900">
                {subject.totalNet}
              </span>
            </div>

            {/* Average Net */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Ort. Net (Sınav)</span>
              <span className="text-md font-semibold text-gray-700">
                {subject.avgExamNet}
              </span>
            </div>

            {/* Success Rate */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Başarı Oranı</span>
                <span className="text-sm font-medium text-gray-700">
                  %{subject.successRate}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${subject.successRate}%`,
                    backgroundColor: subject.color,
                  }}
                ></div>
              </div>
            </div>

            {/* Study Hours */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Çalışma Saati</span>
              <span className="text-sm font-medium text-gray-700">
                {subject.studyHours} saat
              </span>
            </div>

            {/* Question Stats */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Toplam Soru: {subject.totalQuestions}</span>
                <span>{subject.sessionCount} oturum</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span className="text-green-600">{subject.totalCorrect} D</span>
                <span className="text-red-600">{subject.totalWrong} Y</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
