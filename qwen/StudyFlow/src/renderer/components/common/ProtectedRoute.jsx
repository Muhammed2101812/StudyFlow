import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useUser.js';

const ProtectedRoute = () => {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!isLoggedIn && location.pathname !== '/user-select') {
      const timer = setTimeout(() => {
        navigate('/user-select');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate, location]);

  if (!isLoggedIn && location.pathname !== '/user-select') {
    return <div>Yükleniyor...</div>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
