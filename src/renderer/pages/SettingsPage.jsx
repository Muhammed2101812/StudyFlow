import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useToast } from '../contexts/ToastContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { AVATAR_OPTIONS } from '../utils/constants';
import { validateName } from '../utils/validators';
import { User, Trash2, LogOut } from 'lucide-react';
import clsx from 'clsx';

const SettingsPage = () => {
  const { currentUser, updateUser, deleteUser, logout } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || AVATAR_OPTIONS[0]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
      </div>

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
