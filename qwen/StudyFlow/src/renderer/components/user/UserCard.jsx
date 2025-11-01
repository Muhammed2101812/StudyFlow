import React from 'react';

const UserCard = ({ user, onClick }) => {
  // Format last active date to relative time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Bugün';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Dün';
    } else {
      return date.toLocaleDateString('tr-TR');
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 overflow-hidden"
      onClick={onClick}
    >
      <div className="p-6 flex flex-col items-center">
        <div className="text-5xl mb-3">{user.avatar}</div>
        <h3 className="text-lg font-medium text-gray-800">{user.name}</h3>
        <p className="text-gray-500 text-sm mt-1">Son aktif: {formatDate(user.lastActive)}</p>
      </div>
    </div>
  );
};

export default UserCard;