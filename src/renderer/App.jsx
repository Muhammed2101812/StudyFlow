import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { PlanProvider } from './contexts/PlanContext';
import AppRouter from './router';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <PlanProvider>
          <AppRouter />
        </PlanProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
