import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import UserSelectPage from './pages/UserSelectPage';
import DashboardPage from './pages/DashboardPage';
import StudyLogPage from './pages/StudyLogPage';
import ExamsPage from './pages/ExamsPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import { useUser } from './hooks/useUser';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useUser();

  if (!currentUser) {
    return <Navigate to="/user-select" replace />;
  }

  return <Layout>{children}</Layout>;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/user-select" element={<UserSelectPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/study"
        element={
          <ProtectedRoute>
            <StudyLogPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/exams"
        element={
          <ProtectedRoute>
            <ExamsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stats"
        element={
          <ProtectedRoute>
            <StatsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
