import React, { useState } from 'react';
import Modal from '../common/Modal.jsx';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';

// Avatar options
const avatarOptions = [
  '👤', '👨', '👩', '🧑', '👦', '👧', '👱', '👴', '👵', '👲', '👳', '👮', '👷', '💂', '🕵️', '👩‍💼', '👨‍💼', '👩‍🔬', '👨‍🔬', '👩‍💻', '👨‍💻', '👩‍🎨', '👨‍🎨', '👩‍🚀', '👨‍🚀', '👩‍🚒', '👨‍🚒', '🎅', '🤶', '🧙', '🧚', '🧛', '🧜', '🧞', '🧟', '💆', '💇', '🚶', '🏃', '💃', '🕺', '🕴️', '👯', '🧖', '🧗', '🤺', '🏇', '⛷️', '🏂', '🏌️', '🏄', '🚣', '🏊', '⛹️', '🏋️', '🚴', '🚵', '🤸', '🤼', '🤽', '🤾', '🤹', '🧘', '🛀', '🛌', '👤', '👥', '👪', '🗣️', '👤', '👣'
];

const CreateUser = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👤');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Lütfen bir isim girin');
      return;
    }
    
    if (name.trim().length < 2) {
      setError('İsim en az 2 karakter uzunluğunda olmalıdır');
      return;
    }
    
    if (name.trim().length > 50) {
      setError('İsim en fazla 50 karakter uzunluğunda olmalıdır');
      return;
    }

    onCreate({ name: name.trim(), avatar: selectedAvatar });
    setName('');
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Yeni Kullanıcı Oluştur">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Kullanıcı Adı"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          placeholder="Adınızı girin"
          autoFocus
          error={error}
        />
        
        <div>
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
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            İptal
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            Oluştur
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateUser;