import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Eye, Edit2, Trash2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { useUser } from '../../hooks/useUser';
import examService from '../../services/examService';
import { useToast } from '../../contexts/ToastContext';
import { SUBJECT_COLORS } from '../../utils/constants';

export default function ExamList({ onEdit }) {
  const { currentUser } = useUser();
  const { showToast } = useToast();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'net'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [selectedExam, setSelectedExam] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);

  useEffect(() => {
    loadExams();
  }, [currentUser]);

  const loadExams = async () => {
    if (!currentUser) return;

    setLoading(true);
    const response = await examService.getAll(currentUser.id);
    if (response.success) {
      setExams(response.data);
    } else {
      showToast(response.error || 'Denemeler yüklenemedi', 'error');
    }
    setLoading(false);
  };

  const getSortedExams = () => {
    const sorted = [...exams].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      } else {
        return sortOrder === 'desc' ? b.totalNet - a.totalNet : a.totalNet - b.totalNet;
      }
    });
    return sorted;
  };

  const handleDelete = async () => {
    if (!examToDelete) return;

    const response = await examService.delete(currentUser.id, examToDelete.id);
    if (response.success) {
      showToast('Deneme silindi', 'success');
      loadExams();
      setShowDeleteModal(false);
      setExamToDelete(null);
    } else {
      showToast(response.error || 'Silme işlemi başarısız', 'error');
    }
  };

  const getTrendIcon = () => {
    if (exams.length < 2) return null;

    const sorted = [...exams].sort((a, b) => new Date(a.date) - new Date(b.date));
    const lastTwo = sorted.slice(-2);

    if (lastTwo[1].totalNet > lastTwo[0].totalNet + 2) {
      return <TrendingUp className="w-5 h-5 text-green-500" />;
    } else if (lastTwo[1].totalNet < lastTwo[0].totalNet - 2) {
      return <TrendingDown className="w-5 h-5 text-red-500" />;
    }
    return <Minus className="w-5 h-5 text-gray-500" />;
  };

  const sortedExams = getSortedExams();
  const summary = examService.calculateSummary(exams);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (exams.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Henüz deneme eklenmemiş
        </h3>
        <p className="text-gray-600 mb-6">
          İlk deneme sonucunuzu ekleyerek performansınızı takip etmeye başlayın
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Toplam Deneme</div>
          <div className="text-2xl font-bold text-gray-900">{summary.totalExams}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Ortalama Net</div>
          <div className="text-2xl font-bold text-blue-600">{summary.averageNet}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">En Yüksek Net</div>
          <div className="text-2xl font-bold text-green-600">
            {summary.highestNet.value}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 mb-1">Trend</div>
              <div className="text-2xl font-bold text-gray-900">
                {summary.trend === 'increasing' && '📈'}
                {summary.trend === 'stable' && '➡️'}
                {summary.trend === 'decreasing' && '📉'}
              </div>
            </div>
            {getTrendIcon()}
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={sortBy === 'date' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => {
            if (sortBy === 'date') {
              setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
            } else {
              setSortBy('date');
              setSortOrder('desc');
            }
          }}
        >
          Tarihe Göre {sortBy === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
        </Button>
        <Button
          variant={sortBy === 'net' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => {
            if (sortBy === 'net') {
              setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
            } else {
              setSortBy('net');
              setSortOrder('desc');
            }
          }}
        >
          Net'e Göre {sortBy === 'net' && (sortOrder === 'desc' ? '↓' : '↑')}
        </Button>
      </div>

      {/* Exam List */}
      <div className="space-y-4">
        {sortedExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {exam.name}
                  </h3>
                  {exam.publisher && (
                    <span className="text-sm text-gray-500">({exam.publisher})</span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {format(new Date(exam.date), 'd MMMM yyyy', { locale: tr })}
                </div>

                {/* Subject Results */}
                <div className="flex flex-wrap gap-3 mb-3">
                  {Object.entries(exam.results).map(([subject, data]) => (
                    <div
                      key={subject}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50"
                      style={{
                        borderLeft: `4px solid ${SUBJECT_COLORS[subject] || '#6B7280'}`,
                      }}
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {subject}:
                      </span>
                      <span className="text-sm font-bold text-gray-900">
                        {data.net.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Net */}
              <div className="text-right ml-4">
                <div className="text-sm text-gray-600 mb-1">Toplam Net</div>
                <div className="text-3xl font-bold text-blue-600">
                  {exam.totalNet.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedExam(exam);
                  setShowDetailModal(true);
                }}
              >
                <Eye className="w-4 h-4 mr-1" />
                Detay
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(exam)}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Düzenle
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setExamToDelete(exam);
                  setShowDeleteModal(true);
                }}
              >
                <Trash2 className="w-4 h-4 mr-1 text-red-500" />
                <span className="text-red-500">Sil</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedExam && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedExam(null);
          }}
          title={selectedExam.name}
        >
          <div className="space-y-4">
            {/* General Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Tarih:</span>
                  <span className="ml-2 font-medium">
                    {format(new Date(selectedExam.date), 'd MMMM yyyy', { locale: tr })}
                  </span>
                </div>
                {selectedExam.publisher && (
                  <div>
                    <span className="text-gray-600">Yayınevi:</span>
                    <span className="ml-2 font-medium">{selectedExam.publisher}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Süre:</span>
                  <span className="ml-2 font-medium">{selectedExam.duration} dakika</span>
                </div>
                <div>
                  <span className="text-gray-600">Net Hesaplama:</span>
                  <span className="ml-2 font-medium">
                    {selectedExam.penaltyEnabled ? 'Yanlış siler' : 'Yanlış silmez'}
                  </span>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Ders
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Doğru
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Yanlış
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Boş
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Net
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(selectedExam.results).map(([subject, data]) => (
                    <tr key={subject}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: SUBJECT_COLORS[subject] }}
                          />
                          <span className="font-medium text-gray-900">{subject}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-gray-900">
                        {data.correct}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-900">
                        {data.wrong}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-900">
                        {data.empty}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-bold text-blue-600">
                          {data.net.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 font-bold text-gray-900" colSpan="4">
                      TOPLAM NET
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {selectedExam.totalNet.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Weak Topics */}
            {selectedExam.weakTopics && selectedExam.weakTopics.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Zayıf Konular</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExam.weakTopics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {selectedExam.notes && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Notlar</h4>
                <p className="text-gray-700 text-sm">{selectedExam.notes}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && examToDelete && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setExamToDelete(null);
          }}
        >
          <Modal.Header
            onClose={() => {
              setShowDeleteModal(false);
              setExamToDelete(null);
            }}
          >
            Denemeyi Sil
          </Modal.Header>
          <Modal.Body>
            <p className="text-gray-700">
              <strong>{examToDelete.name}</strong> isimli denemeyi silmek istediğinize emin
              misiniz? Bu işlem geri alınamaz.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 justify-end">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowDeleteModal(false);
                  setExamToDelete(null);
                }}
              >
                İptal
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Sil
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
