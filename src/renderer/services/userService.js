import { v4 as uuidv4 } from 'uuid';
import storageService from './storageService';

class UserService {
  async getAll() {
    const users = await storageService.get('users');
    // Ensure we always return an array
    if (!users || !Array.isArray(users)) {
      return [];
    }
    return users;
  }

  async getById(userId) {
    const users = await this.getAll();
    return users.find(u => u.id === userId) || null;
  }

  async create(userData) {
    const users = await this.getAll();

    const newUser = {
      id: uuidv4(),
      name: userData.name,
      avatar: userData.avatar || '👤',
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      activePlanId: null,
    };

    users.push(newUser);
    await storageService.set('users', users);

    // Initialize user data structure
    await storageService.initializeUser(newUser.id);

    return newUser;
  }

  async update(userId, updates) {
    const users = await this.getAll();
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
      throw new Error('Kullanıcı bulunamadı');
    }

    users[index] = {
      ...users[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await storageService.set('users', users);
    return users[index];
  }

  async delete(userId) {
    const users = await this.getAll();
    const filtered = users.filter(u => u.id !== userId);
    await storageService.set('users', filtered);

    // Delete user data
    await storageService.deleteUserData(userId);

    return true;
  }

  async updateLastActive(userId) {
    return await this.update(userId, {
      lastActive: new Date().toISOString(),
    });
  }
}

export default new UserService();
