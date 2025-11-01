import { AlertTriangle } from 'lucide-react';
import Card from '../common/Card';

export default function WeakTopics({ topics }) {
  if (!topics || topics.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">Zayıf Konular</h3>
        </div>
        <div className="flex items-center justify-center h-32 text-gray-500">
          Henüz zayıf konu kaydı yok
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Zayıf Konular (En Sık Tekrarlananlar)
        </h3>
      </div>

      <div className="space-y-3">
        {topics.map((topic, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                  {index + 1}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {topic.topic}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {topic.count} kez
                </span>
                <span className="text-xs font-medium text-orange-600">
                  %{topic.percentage}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${topic.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {topics.length > 0 && (
        <div className="mt-4 p-3 bg-orange-50 rounded-lg">
          <p className="text-xs text-orange-800">
            💡 Bu konulara daha fazla odaklanarak performansınızı artırabilirsiniz.
          </p>
        </div>
      )}
    </Card>
  );
}
