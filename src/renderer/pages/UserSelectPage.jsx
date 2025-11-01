import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useToast } from '../contexts/ToastContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import { AVATAR_OPTIONS } from '../utils/constants';
import { validateName } from '../utils/validators';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

const UserSelectPage = () => {
  const { users, switchUser, createUser } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [error, setError] = useState('');

  const handleSelectUser = async (userId) => {
    const result = await switchUser(userId);
    if (result.success) {
      toast.success('Kullanıcı değiştirildi');
      navigate('/');
    } else {
      toast.error(result.error || 'Kullanıcı değiştirilemedi');
    }
  };

  const handleCreateUser = async () => {
    const nameError = validateName(newUserName);
    if (nameError) {
      setError(nameError);
      return;
    }

    const result = await createUser({
      name: newUserName,
      avatar: selectedAvatar,
    });

    if (result.success) {
      toast.success('Kullanıcı oluşturuldu!');
      setShowCreateModal(false);
      setNewUserName('');
      setSelectedAvatar(AVATAR_OPTIONS[0]);
      setError('');
      navigate('/');
    } else {
      setError(result.error);
      toast.error(result.error || 'Kullanıcı oluşturulamadı');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📚 StudyFlow
          </h1>
          <p className="text-gray-600">Kullanıcı seçin veya yeni kullanıcı oluşturun</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <Card
              key={user.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleSelectUser(user.id)}
            >
              <Card.Content className="text-center py-8">
                <div className="text-6xl mb-4">{user.avatar}</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h3>
              </Card.Content>
            </Card>
          ))}

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-dashed border-gray-300"
            onClick={() => setShowCreateModal(true)}
          >
            <Card.Content className="text-center py-8">
              <div className="flex flex-col items-center justify-center space-y-2 text-gray-500">
                <Plus size={48} />
                <span className="font-medium">Yeni Kullanıcı</span>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <Modal.Header onClose={() => setShowCreateModal(false)}>
          Yeni Kullanıcı Oluştur
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Input
              label="İsim"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="İsminizi girin"
              error={error}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar Seçin
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
              İptal
            </Button>
            <Button onClick={handleCreateUser}>Oluştur</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserSelectPage;
