import React, { createContext, useState, useEffect } from 'react';
import userService from '../services/userService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const allUsers = await userService.getAll();
      setUsers(allUsers);

      // Auto-login last active user if exists
      if (allUsers.length > 0) {
        const lastActive = allUsers.sort((a, b) =>
          new Date(b.lastActive) - new Date(a.lastActive)
        )[0];
        setCurrentUser(lastActive);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      const newUser = await userService.create(userData);
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      return { success: true, data: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateUser = async (userId, updates) => {
    try {
      const updated = await userService.update(userId, updates);
      setUsers(users.map(u => u.id === userId ? updated : u));
      if (currentUser?.id === userId) {
        setCurrentUser(updated);
      }
      return { success: true, data: updated };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteUser = async (userId) => {
    try {
      await userService.delete(userId);
      setUsers(users.filter(u => u.id !== userId));
      if (currentUser?.id === userId) {
        setCurrentUser(null);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const switchUser = async (userId) => {
    try {
      const user = users.find(u => u.id === userId);
      if (user) {
        await userService.updateLastActive(userId);
        setCurrentUser(user);
        return { success: true };
      }
      return { success: false, error: 'Kullanıcı bulunamadı' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    users,
    loading,
    createUser,
    updateUser,
    deleteUser,
    switchUser,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
