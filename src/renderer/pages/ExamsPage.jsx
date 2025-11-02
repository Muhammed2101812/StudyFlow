import { useState } from 'react';
import ExamForm from '../components/exams/ExamForm';
import ExamList from '../components/exams/ExamList';
import { ExamProgressChart, SubjectComparisonChart } from '../components/exams/ExamChart';
import WeakTopicsAnalysis from '../components/exams/WeakTopicsAnalysis';
import Card from '../components/common/Card';
import { useExams } from '../hooks/useExams';

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState('list'); // 'add', 'list', or 'analytics'
  const [examToEdit, setExamToEdit] = useState(null);
  const { exams, examsSorted, loading } = useExams();

  const handleFormSuccess = () => {
    setActiveTab('list');
    setExamToEdit(null);
  };

  const handleEdit = (exam) => {
    setExamToEdit(exam);
    setActiveTab('add');
  };

  const handleCancelEdit = () => {
    setExamToEdit(null);
    setActiveTab('list');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Deneme Sınavları</h1>
        <p className="mt-2 text-gray-600">
          Deneme sınav sonuçlarınızı kaydedin ve performansınızı analiz edin
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => {
                setActiveTab('add');
                setExamToEdit(null);
              }}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === 'add'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {examToEdit ? 'Deneme Düzenle' : 'Deneme Ekle'}
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === 'list'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Deneme Listesi
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              Analiz
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'add' && (
          <ExamForm
            examToEdit={examToEdit}
            onSuccess={handleFormSuccess}
            onCancel={examToEdit ? handleCancelEdit : null}
          />
        )}

        {activeTab === 'list' && <ExamList onEdit={handleEdit} />}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : exams.length === 0 ? (
              <Card>
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Henüz analiz verisi yok
                  </h3>
                  <p className="text-gray-600">
                    Deneme ekledikten sonra performans analizlerinizi burada görebilirsiniz
                  </p>
                </div>
              </Card>
            ) : (
              <>
                {/* Progress Chart */}
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Net İlerleme Grafiği
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Denemelerinizde aldığınız toplam net puanların zaman içindeki değişimi
                    </p>
                    <ExamProgressChart data={examsSorted} />
                  </div>
                </Card>

                {/* Subject Comparison */}
                <Card>
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Ders Bazlı Ortalama Net
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Her dersteki ortalama net performansınızın karşılaştırması
                    </p>
                    <SubjectComparisonChart data={exams} />
                  </div>
                </Card>

                {/* Weak Topics Analysis */}
                <WeakTopicsAnalysis />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
