import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { PlanProvider } from './contexts/PlanContext';
import { ToastProvider } from './contexts/ToastContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import AppRouter from './router';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ToastProvider>
          <UserProvider>
            <PlanProvider>
              <AppRouter />
            </PlanProvider>
          </UserProvider>
        </ToastProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
