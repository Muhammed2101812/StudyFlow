import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Çalışma Günlüğü', path: '/study', icon: '📝' },
    { name: 'Deneme Sınavları', path: '/exams', icon: '📋' },
    { name: 'İstatistikler', path: '/stats', icon: '📈' },
    { name: 'Ayarlar', path: '/settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Menü</h2>
      </div>
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;