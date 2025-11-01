import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage.jsx';
import UserSelectPage from './pages/UserSelectPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import StudyLogPage from './pages/StudyLogPage.jsx';
import ExamsPage from './pages/ExamsPage.jsx';
import StatsPage from './pages/StatsPage.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import Layout from './components/layout/Layout.jsx';

const router = createBrowserRouter([
  {
    path: '/user-select',
    element: <UserSelectPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'study',
            element: <StudyLogPage />,
          },
          {
            path: 'exams',
            element: <ExamsPage />,
          },
          {
            path: 'stats',
            element: <StatsPage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
        ]
      }
    ]
  },
  {
    path: '*',
    element: <div>404 - Sayfa Bulunamadı</div>,
  },
]);

export default router;
