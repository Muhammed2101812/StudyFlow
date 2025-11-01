import { v4 as uuidv4 } from 'uuid';
import storageService from './storageService';

class UserService {
  getAll() {
    return storageService.get('users') || [];
  }

  getById(userId) {
    const users = this.getAll();
    return users.find(u => u.id === userId) || null;
  }

  create(userData) {
    const users = this.getAll();

    const newUser = {
      id: uuidv4(),
      name: userData.name,
      avatar: userData.avatar || '👤',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      activePlanId: null,
    };

    users.push(newUser);
    storageService.set('users', users);

    // Initialize user data structure
    storageService.initializeUser(newUser.id);

    return newUser;
  }

  update(userId, updates) {
    const users = this.getAll();
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
      throw new Error('Kullanıcı bulunamadı');
    }

    users[index] = {
      ...users[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    storageService.set('users', users);
    return users[index];
  }

  delete(userId) {
    const users = this.getAll();
    const filtered = users.filter(u => u.id !== userId);
    storageService.set('users', filtered);

    // Delete user data
    storageService.deleteUserData(userId);

    return true;
  }

  updateLastActive(userId) {
    return this.update(userId, {
      lastActive: new Date().toISOString(),
    });
  }
}

export default new UserService();
