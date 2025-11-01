import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Card from '../common/Card';
import examService from '../../services/examService';
import { useUser } from '../../hooks/useUser';

export default function WeakTopicsAnalysis() {
  const { currentUser } = useUser();
  const [weakTopics, setWeakTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeakTopics();
  }, [currentUser]);

  const loadWeakTopics = async () => {
    if (!currentUser) return;

    setLoading(true);
    const response = await examService.getWeakTopics(currentUser.id);

    if (response.success) {
      setWeakTopics(response.data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <Card>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </Card>
    );
  }

  if (weakTopics.length === 0) {
    return (
      <Card>
        <div className="text-center py-8">
          <div className="text-gray-400 text-5xl mb-3">✅</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Harika! Zayıf konu yok
          </h3>
          <p className="text-gray-600 text-sm">
            Denemelerinizde belirttiğiniz zayıf konu bulunmamaktadır
          </p>
        </div>
      </Card>
    );
  }

  // Get top 10 weak topics
  const topWeakTopics = weakTopics.slice(0, 10);

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-900">
            Zayıf Konular
          </h2>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Denemelerinizde en sık tekrar eden zayıf konularınız
        </p>

        <div className="space-y-3">
          {topWeakTopics.map((item, index) => {
            const maxCount = topWeakTopics[0].count;
            const percentage = (item.count / maxCount) * 100;

            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">{item.topic}</span>
                  <span className="text-gray-600">
                    {item.count} {item.count === 1 ? 'kez' : 'kez'}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {weakTopics.length > 10 && (
          <p className="mt-4 text-xs text-gray-500 text-center">
            +{weakTopics.length - 10} konu daha
          </p>
        )}
      </div>
    </Card>
  );
}
