import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext.jsx';
import { PlanProvider } from './contexts/PlanContext.jsx';
import { ToastProvider } from './components/common/Toast.jsx';
import router from './router.jsx';
import './styles/tailwind.css';

function App() {
  return (
    <UserProvider>
      <PlanProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </PlanProvider>
    </UserProvider>
  );
}

export default App;