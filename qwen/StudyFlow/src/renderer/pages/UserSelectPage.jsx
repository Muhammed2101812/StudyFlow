import React, { useState } from 'react';
import UserCard from '../components/user/UserCard.jsx';
import CreateUser from '../components/user/CreateUser.jsx';
import { useUser } from '../hooks/useUser.js';

const UserSelectPage = () => {
  const { users, switchUser, createUser } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateUser = (userData) => {
    createUser(userData);
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">StudyFlow'a Hoş Geldiniz</h1>
          <p className="text-gray-600">Devam etmek için bir kullanıcı seçin veya yeni bir kullanıcı oluşturun</p>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => switchUser(user.id)}
            />
          ))}
          
          {/* Create New User Card */}
          <div 
            className="bg-white rounded-lg shadow border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 cursor-pointer hover:border-blue-400 transition-colors"
            onClick={() => setShowCreateModal(true)}
          >
            <div className="text-4xl mb-3">➕</div>
            <h3 className="text-lg font-medium text-gray-700">Yeni Kullanıcı</h3>
            <p className="text-gray-500 text-sm mt-1">Tıklayarak oluşturun</p>
          </div>
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <CreateUser
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserSelectPage;