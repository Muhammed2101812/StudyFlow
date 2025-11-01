import React from 'react';
import { useUser } from '../../hooks/useUser.js';

const Navbar = () => {
  const { currentUser } = useUser();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-800">StudyFlow</h1>
        </div>
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{currentUser.avatar}</span>
              <span className="text-sm text-gray-600">{currentUser.name}</span>
            </div>
          ) : (
            <span className="text-sm text-gray-600">Kullanıcı Yok</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
