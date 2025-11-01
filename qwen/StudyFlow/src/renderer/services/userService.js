import storageService from './storageService.js';
import { v4 as uuidv4 } from 'uuid';

const userService = {
  // Tüm kullanıcıları getir
  getAll: () => {
    return storageService.get('users') || [];
  },

  // ID ile kullanıcı getir
  getById: (userId) => {
    const users = userService.getAll();
    return users.find(u => u.id === userId);
  },

  // Yeni kullanıcı oluştur
  create: (userData) => {
    const users = userService.getAll();
    const newUser = {
      id: uuidv4(),
      name: userData.name,
      avatar: userData.avatar || '👤',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      activePlan: null,
      settings: {
        theme: 'light',
        language: 'tr',
        penaltyDefault: true
      }
    };

    users.push(newUser);
    storageService.set('users', users);

    // Kullanıcı için klasör yapısı oluştur
    storageService.set(`users.${newUser.id}.progress`, {});
    storageService.set(`users.${newUser.id}.exams`, { exams: [] });
    storageService.set(`users.${newUser.id}.settings`, newUser.settings);

    return newUser;
  },

  // Kullanıcı güncelle
  update: (userId, updates) => {
    const users = userService.getAll();
    const index = users.findIndex(u => u.id === userId);

    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      storageService.set('users', users);
      return users[index];
    }

    throw new Error('User not found');
  },

  // Kullanıcı sil (verileriyle birlikte)
  delete: (userId) => {
    const users = userService.getAll();
    const filtered = users.filter(u => u.id !== userId);
    storageService.set('users', filtered);

    // Kullanıcı verilerini temizle
    storageService.delete(`users.${userId}`);
  },

  // Last active güncelle
  updateLastActive: (userId) => {
    userService.update(userId, {
      lastActive: new Date().toISOString()
    });
  }
};

export default userService;