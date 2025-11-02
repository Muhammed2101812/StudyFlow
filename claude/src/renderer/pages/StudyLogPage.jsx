import React, { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { useToast } from '../contexts/ToastContext';
import Calendar from '../components/study/Calendar';
import StudyLogForm from '../components/study/StudyLogForm';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { Trash2, Calendar as CalendarIcon, Plus, Edit2 } from 'lucide-react';
import { format } from 'date-fns';
import { SUBJECT_COLORS } from '../utils/constants';

const StudyLogPage = () => {
  const { progress, getByDate, deleteStudyLog, refresh } = useProgress();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [logToDelete, setLogToDelete] = useState(null);
  const [editingLog, setEditingLog] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const logsForSelectedDate = getByDate(selectedDate);

  const handleDeleteClick = (log) => {
    setLogToDelete(log);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!logToDelete) return;

    const result = await deleteStudyLog(logToDelete.id);

    if (result.success) {
      toast.success('Çalışma silindi');
      setShowDeleteModal(false);
      setLogToDelete(null);
      refresh();
    } else {
      toast.error(result.error || 'Çalışma silinemedi');
    }
  };

  const handleEdit = (log) => {
    setEditingLog(log);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingLog(null);
    setShowForm(true);
  };

  const handleFormSaved = () => {
    setShowForm(false);
    setEditingLog(null);
    refresh();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Çalışma Günlüğü
        </h1>
        <p className="text-gray-600">
          Günlük çalışmalarınızı kaydedin ve ilerlemenizi takip edin
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <Calendar
            progress={progress}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>

        {/* Study Logs List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {format(selectedDate, 'dd MMMM yyyy, EEEE')}
            </h3>
            <Button
              onClick={handleAddNew}
              leftIcon={<Plus size={16} />}
              size="sm"
            >
              Yeni Çalışma Ekle
            </Button>
          </div>

          {logsForSelectedDate.length === 0 && !showForm && (
            <Card>
              <Card.Content>
                <div className="text-center py-8">
                  <CalendarIcon size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 mb-4">
                    Bu tarihte henüz çalışma kaydı yok
                  </p>
                  <Button onClick={handleAddNew} leftIcon={<Plus size={16} />}>
                    İlk Çalışmayı Ekle
                  </Button>
                </div>
              </Card.Content>
            </Card>
          )}

          {logsForSelectedDate.map((log) => (
            <Card key={log.id}>
              <Card.Content>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{log.topic || 'Çalışma'}</h4>
                      <p className="text-sm text-gray-500">
                        {log.duration} saat • {log.questionSets?.length || 0} soru seti
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(log)}
                        leftIcon={<Edit2 size={14} />}
                      >
                        Düzenle
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(log)}
                        leftIcon={<Trash2 size={14} />}
                        className="text-error hover:bg-error/10"
                      >
                        Sil
                      </Button>
                    </div>
                  </div>

                  {log.questionSets && log.questionSets.length > 0 && (
                    <div className="space-y-2">
                      {log.questionSets.map((set, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: SUBJECT_COLORS[set.subject] || '#6B7280' }}
                            />
                            <span className="font-medium text-gray-900">{set.subject}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-600">D: {set.correct}</span>
                            <span className="text-gray-600">Y: {set.wrong}</span>
                            <span className="font-semibold text-primary-600">
                              Net: {set.net?.toFixed(2) || 0}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {log.notes && (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                      {log.notes}
                    </p>
                  )}
                </div>
              </Card.Content>
            </Card>
          ))}

          {showForm && (
            <Card>
              <Card.Header>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {editingLog ? 'Çalışmayı Düzenle' : 'Yeni Çalışma Ekle'}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowForm(false);
                      setEditingLog(null);
                    }}
                  >
                    İptal
                  </Button>
                </div>
              </Card.Header>
              <Card.Content>
                <StudyLogForm
                  selectedDate={selectedDate}
                  existingLog={editingLog}
                  onSaved={handleFormSaved}
                />
              </Card.Content>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setLogToDelete(null);
        }}
      >
        <Modal.Header
          onClose={() => {
            setShowDeleteModal(false);
            setLogToDelete(null);
          }}
        >
          Çalışmayı Sil
        </Modal.Header>
        <Modal.Body>
          <p className="text-gray-700">
            {logToDelete && (
              <>
                <strong>{logToDelete.topic || 'Çalışma'}</strong> kaydını silmek
                istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </>
            )}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setShowDeleteModal(false);
                setLogToDelete(null);
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
    </div>
  );
};

export default StudyLogPage;
