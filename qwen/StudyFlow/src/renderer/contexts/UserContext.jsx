import React, { createContext, useState, useEffect } from 'react';
import userService from '../services/userService.js';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Initialize users from storage
  useEffect(() => {
    const storedUsers = userService.getAll();
    setUsers(storedUsers);

    // Check if there's a last active user or set first user as current
    const lastActiveUser = storedUsers.find(user => 
      user.lastActive === Math.max(...storedUsers.map(u => new Date(u.lastActive)))
    );
    
    if (lastActiveUser) {
      setCurrentUser(lastActiveUser);
    } else if (storedUsers.length > 0) {
      setCurrentUser(storedUsers[0]);
    }
  }, []);

  const createUser = (userData) => {
    const newUser = userService.create(userData);
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    return newUser;
  };

  const updateUser = (userId, updates) => {
    const updatedUser = userService.update(userId, updates);
    const updatedUsers = users.map(u => u.id === userId ? updatedUser : u);
    setUsers(updatedUsers);
    
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(updatedUser);
    }
    
    return updatedUser;
  };

  const deleteUser = (userId) => {
    userService.delete(userId);
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(updatedUsers.length > 0 ? updatedUsers[0] : null);
    }
  };

  const switchUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      userService.updateLastActive(user.id);
      setCurrentUser(user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    setCurrentUser,
    users,
    createUser,
    updateUser,
    deleteUser,
    switchUser,
    logout,
    isLoggedIn: !!currentUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };