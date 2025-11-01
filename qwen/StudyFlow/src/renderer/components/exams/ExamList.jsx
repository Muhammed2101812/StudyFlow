import React from 'react';
import { formatDate } from '../../utils/dateHelpers.js';
import { useNavigate } from 'react-router-dom';

const ExamList = ({ exams, onEdit, onDelete, onView }) => {
  const navigate = useNavigate();

  if (!exams || exams.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz deneme yok</h3>
        <p className="text-gray-500 mb-4">Bu kullanıcıya ait deneme sınavı kaydı bulunmamaktadır.</p>
        <button 
          onClick={() => navigate('/exams')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          İlk Deneme Ekle
        </button>
      </div>
    );
  }

  // Sort exams by date (newest first)
  const sortedExams = [...exams].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deneme</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam Net</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ders Bazlı Net'ler</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedExams.map((exam) => (
              <tr key={exam.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(exam.date)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{exam.name}</div>
                  {exam.publisher && (
                    <div className="text-sm text-gray-500">{exam.publisher} {exam.examNumber ? `Deneme ${exam.examNumber}` : ''}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-lg font-bold text-blue-600">{exam.totalNet.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {exam.results.slice(0, 4).map((result, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                        title={`${result.subjectName || result.subject}: ${result.net.toFixed(2)} net`}
                      >
                        {result.subjectName?.substring(0, 3) || result.subject.substring(0, 3)}: {result.net.toFixed(1)}
                      </span>
                    ))}
                    {exam.results.length > 4 && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-800">
                        +{exam.results.length - 4} daha
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => onView(exam)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Detayı Gör
                    </button>
                    <button 
                      onClick={() => onEdit(exam)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Düzenle
                    </button>
                    <button 
                      onClick={() => onDelete(exam.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamList;