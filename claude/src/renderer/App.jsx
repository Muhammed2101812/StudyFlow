import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { PlanProvider } from './contexts/PlanContext';
import { ToastProvider } from './contexts/ToastContext';
import AppRouter from './router';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <UserProvider>
          <PlanProvider>
            <AppRouter />
          </PlanProvider>
        </UserProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
