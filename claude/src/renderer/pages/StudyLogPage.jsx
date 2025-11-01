import React, { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { useToast } from '../contexts/ToastContext';
import Calendar from '../components/study/Calendar';
import StudyLogForm from '../components/study/StudyLogForm';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const StudyLogPage = () => {
  const { progress, getByDate, deleteStudyLog, refresh } = useProgress();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const existingLog = getByDate(selectedDate);

  const handleDelete = async () => {
    const result = await deleteStudyLog(selectedDate);

    if (result.success) {
      toast.success('Çalışma silindi');
      setShowDeleteModal(false);
      refresh();
    } else {
      toast.error(result.error || 'Çalışma silinemedi');
    }
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

          {existingLog && (
            <div className="mt-4">
              <Button
                variant="danger"
                onClick={() => setShowDeleteModal(true)}
                leftIcon={<Trash2 size={16} />}
                className="w-full"
              >
                Seçili Günü Sil
              </Button>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <Card>
            <Card.Header>
              <div className="flex items-center gap-2">
                <CalendarIcon size={20} />
                <h3 className="text-lg font-semibold">Çalışma Detayları</h3>
              </div>
            </Card.Header>
            <Card.Content>
              <StudyLogForm
                selectedDate={selectedDate}
                existingLog={existingLog}
                onSaved={refresh}
              />
            </Card.Content>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header onClose={() => setShowDeleteModal(false)}>
          Çalışmayı Sil
        </Modal.Header>
        <Modal.Body>
          <p className="text-gray-700">
            <strong>{format(selectedDate, 'dd MMMM yyyy')}</strong> tarihindeki
            çalışma kaydını silmek istediğinizden emin misiniz?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
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
