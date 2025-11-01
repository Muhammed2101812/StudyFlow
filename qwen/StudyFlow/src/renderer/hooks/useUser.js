import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  
  const {
    currentUser,
    setCurrentUser,
    users,
    createUser,
    updateUser,
    deleteUser,
    switchUser,
    logout,
    isLoggedIn
  } = context;
  
  return {
    currentUser,
    users,
    isLoggedIn,
    createUser,
    updateUser,
    deleteUser,
    switchUser,
    logout
  };
};