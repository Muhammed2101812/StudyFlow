import React from 'react';
import { useUser } from '../../hooks/useUser';
import { usePlan } from '../../hooks/usePlan';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser } = useUser();
  const { currentPlan } = usePlan();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-primary-600">📚 StudyFlow</h1>
        {currentPlan && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">{currentPlan.name}</span>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {currentUser && (
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{currentUser.avatar}</span>
            <span className="font-medium text-gray-700">{currentUser.name}</span>
          </div>
        )}

        <button
          onClick={() => navigate('/settings')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Settings size={20} className="text-gray-600" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
