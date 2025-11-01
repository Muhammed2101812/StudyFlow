import { useState } from 'react';
import ExamForm from '../components/exams/ExamForm';
import ExamList from '../components/exams/ExamList';

export default function ExamsPage() {
  const [activeTab, setActiveTab] = useState('list'); // 'add' or 'list'
  const [examToEdit, setExamToEdit] = useState(null);

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
      </div>
    </div>
  );
}
