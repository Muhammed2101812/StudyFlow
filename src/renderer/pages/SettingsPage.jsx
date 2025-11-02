import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { usePlan } from '../hooks/usePlan';
import { useToast } from '../contexts/ToastContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import PlanImport from '../components/common/PlanImport';
import { AVATAR_OPTIONS } from '../utils/constants';
import { validateName } from '../utils/validators';
import { User, Trash2, LogOut, BookOpen, Upload, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import clsx from 'clsx';

const SettingsPage = () => {
  const { currentUser, updateUser, deleteUser, logout } = useUser();
  const { plans, currentPlan, switchPlan, deletePlan } = usePlan();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || AVATAR_OPTIONS[0]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPlanImport, setShowPlanImport] = useState(false);
  const [showDeletePlanModal, setShowDeletePlanModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const nameError = validateName(name);
    if (nameError) {
      setError(nameError);
      toast.error(nameError);
      return;
    }

    setIsSaving(true);
    const result = await updateUser(currentUser.id, {
      name,
      avatar: selectedAvatar,
    });

    setIsSaving(false);

    if (result.success) {
      toast.success('Profil güncellendi!');
      setError('');
    } else {
      toast.error(result.error || 'Profil güncellenemedi');
    }
  };

  const handleDelete = async () => {
    const result = await deleteUser(currentUser.id);

    if (result.success) {
      toast.success('Hesap silindi');
      setShowDeleteModal(false);
      navigate('/user-select');
    } else {
      toast.error(result.error || 'Hesap silinemedi');
    }
  };

  const handleLogout = () => {
    logout();
    toast.info('Çıkış yapıldı');
    navigate('/user-select');
  };

  const handleSwitchPlan = async (planId) => {
    const result = await switchPlan(planId);
    if (result.success) {
      toast.success('Plan değiştirildi');
    } else {
      toast.error(result.error || 'Plan değiştirilemedi');
    }
  };

  const handleDeletePlan = async () => {
    if (!planToDelete) return;

    const result = await deletePlan(planToDelete.id);
    if (result.success) {
      toast.success('Plan silindi');
      setShowDeletePlanModal(false);
      setPlanToDelete(null);
    } else {
      toast.error(result.error || 'Plan silinemedi');
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Ayarlar</h1>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <Card.Header>
            <div className="flex items-center gap-2">
              <User size={20} />
              <h2 className="text-xl font-semibold">Profil Ayarları</h2>
            </div>
          </Card.Header>
          <Card.Content className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">{selectedAvatar}</div>
              <div>
                <h3 className="font-medium text-gray-900">{currentUser?.name}</h3>
                <p className="text-sm text-gray-500">
                  Oluşturulma: {currentUser?.createdAt && new Date(currentUser.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>

            <Input
              label="İsim"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="İsminizi girin"
              error={error}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar
              </label>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_OPTIONS.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={clsx(
                      'text-3xl p-2 rounded-lg border-2 transition-all',
                      selectedAvatar === avatar
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
          </Card.Content>
          <Card.Footer>
            <div className="flex justify-end">
              <Button onClick={handleSave} loading={isSaving}>
                Değişiklikleri Kaydet
              </Button>
            </div>
          </Card.Footer>
        </Card>

        {/* Account Actions */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Hesap İşlemleri</h2>
          </Card.Header>
          <Card.Content className="space-y-3">
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-medium text-gray-900">Kullanıcı Değiştir</h3>
                <p className="text-sm text-gray-500">Başka bir kullanıcı hesabına geç</p>
              </div>
              <Button variant="ghost" onClick={handleLogout} leftIcon={<LogOut size={16} />}>
                Kullanıcı Değiştir
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-error">Hesabı Sil</h3>
                  <p className="text-sm text-gray-500">
                    Tüm verileriniz kalıcı olarak silinecektir
                  </p>
                </div>
                <Button
                  variant="danger"
                  onClick={() => setShowDeleteModal(true)}
                  leftIcon={<Trash2 size={16} />}
                >
                  Hesabı Sil
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Plan Management */}
        <Card>
          <Card.Header>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={20} />
                <h2 className="text-xl font-semibold">Plan Yönetimi</h2>
              </div>
              <Button
                onClick={() => setShowPlanImport(true)}
                leftIcon={<Upload size={16} />}
              >
                Plan Import Et
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            {plans.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 mb-4">Henüz plan eklenmedi</p>
                <Button onClick={() => setShowPlanImport(true)}>
                  İlk Planı Import Et
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={clsx(
                      'border-2 rounded-lg p-4 transition-all',
                      currentPlan?.id === plan.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {plan.name}
                          </h3>
                          {currentPlan?.id === plan.id && (
                            <span className="px-2 py-0.5 bg-primary-500 text-white text-xs rounded-full">
                              Aktif
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>
                            📅 Sınav:{' '}
                            {format(new Date(plan.examDate), 'd MMMM yyyy', {
                              locale: tr,
                            })}
                          </span>
                          <span>📚 {plan.subjects.length} Ders</span>
                          {plan.totalWeeks && (
                            <span>🗓️ {plan.totalWeeks} Hafta</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {currentPlan?.id !== plan.id && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSwitchPlan(plan.id)}
                          >
                            Aktif Yap
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setPlanToDelete(plan);
                            setShowDeletePlanModal(true);
                          }}
                        >
                          <Trash size={16} className="text-error" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card.Content>
        </Card>
      </div>

      {/* Plan Import Modal */}
      <PlanImport
        isOpen={showPlanImport}
        onClose={() => setShowPlanImport(false)}
      />

      {/* Delete Plan Confirmation Modal */}
      <Modal
        isOpen={showDeletePlanModal}
        onClose={() => setShowDeletePlanModal(false)}
      >
        <Modal.Header onClose={() => setShowDeletePlanModal(false)}>
          Planı Sil
        </Modal.Header>
        <Modal.Body>
          <p className="text-gray-700">
            <strong>{planToDelete?.name}</strong> planını silmek istediğinizden
            emin misiniz?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setShowDeletePlanModal(false)}
            >
              İptal
            </Button>
            <Button variant="danger" onClick={handleDeletePlan}>
              Planı Sil
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header onClose={() => setShowDeleteModal(false)}>
          Hesabı Sil
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <p className="text-error font-medium">⚠️ Dikkat!</p>
              <p className="text-sm text-gray-700 mt-2">
                Bu işlem geri alınamaz. Tüm çalışma kayıtlarınız, deneme sınavlarınız
                ve istatistikleriniz kalıcı olarak silinecektir.
              </p>
            </div>
            <p className="text-gray-700">
              <strong>{currentUser?.name}</strong> hesabını silmek istediğinizden emin misiniz?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
              İptal
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Evet, Hesabı Sil
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SettingsPage;
