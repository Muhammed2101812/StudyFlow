import React, { useState } from 'react';
import { useUser } from '../hooks/useUser.js';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';
import Modal from '../components/common/Modal.jsx';

// Avatar options (same as in CreateUser)
const avatarOptions = [
  '👤', '👨', '👩', '🧑', '👦', '👧', '👱', '👴', '👵', '👲', '👳', '👮', '👷', '💂', '🕵️', '👩‍💼', '👨‍💼', '👩‍🔬', '👨‍🔬', '👩‍💻', '👨‍💻', '👩‍🎨', '👨‍🎨', '👩‍🚀', '👨‍🚀', '👩‍🚒', '👨‍🚒', '🎅', '🤶', '🧙', '🧚', '🧛', '🧜', '🧞', '🧟', '💆', '💇', '🚶', '🏃', '💃', '🕺', '🕴️', '👯', '🧖', '🧗', '🤺', '🏇', '⛷️', '🏂', '🏌️', '🏄', '🚣', '🏊', '⛹️', '🏋️', '🚴', '🚵', '🤸', '🤼', '🤽', '🤾', '🤹', '🧘', '🛀', '🛌', '👤', '👥', '👪', '🗣️', '👤', '👣'
];

const SettingsPage = () => {
  const { currentUser, updateUser, deleteUser } = useUser();
  const [editingName, setEditingName] = useState(currentUser?.name || '');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar || '👤');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  if (!currentUser) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800">Ayarlar</h2>
        <p className="text-gray-600">Lütfen önce bir kullanıcı seçin.</p>
      </div>
    );
  }

  const handleSave = () => {
    if (editingName.trim() && editingName.trim().length >= 2 && editingName.trim().length <= 50) {
      updateUser(currentUser.id, {
        name: editingName.trim(),
        avatar: selectedAvatar
      });
      setSaveStatus('Bilgiler başarıyla kaydedildi!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleDeleteUser = () => {
    deleteUser(currentUser.id);
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profil Ayarları</h2>
        
        {saveStatus && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {saveStatus}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Kullanıcı Adı"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              placeholder="Adınızı girin"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar
            </label>
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{selectedAvatar}</div>
              <Button
                variant="secondary"
                onClick={() => document.getElementById('avatar-selector').scrollIntoView({ behavior: 'smooth' })}
              >
                Değiştir
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6" id="avatar-selector">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Avatar Seçin
          </label>
          <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto p-2 border border-gray-300 rounded-md">
            {avatarOptions.map((avatar, index) => (
              <div
                key={index}
                className={`text-2xl p-2 rounded cursor-pointer flex items-center justify-center ${
                  selectedAvatar === avatar
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'hover:bg-gray-100 border border-gray-200'
                }`}
                onClick={() => setSelectedAvatar(avatar)}
              >
                {avatar}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <Button
            variant="primary"
            onClick={handleSave}
          >
            Kaydet
          </Button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Hesap Silme</h3>
          <p className="text-gray-600 mb-4">
            Bu kullanıcıyı ve tüm verilerini silmek üzeresiniz. Bu işlem geri alınamaz.
          </p>
          <Button
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Hesabı Sil
          </Button>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal 
          isOpen={showDeleteModal} 
          onClose={() => setShowDeleteModal(false)} 
          title="Hesabı Sil"
        >
          <p className="mb-4">
            <strong>{currentUser.name}</strong> kullanıcısını ve tüm verilerini silmek istediğinize emin misiniz? 
            Bu işlem geri alınamaz.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              İptal
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteUser}
            >
              Sil
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SettingsPage;