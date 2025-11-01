import Store from 'electron-store';

const store = new Store({
  name: 'studyflow-data',
  defaults: {
    users: [],
    plans: [],
    settings: {
      theme: 'light',
      language: 'tr',
    },
  },
});

class StorageService {
  // Generic methods
  get(key) {
    return store.get(key);
  }

  set(key, value) {
    store.set(key, value);
  }

  delete(key) {
    store.delete(key);
  }

  has(key) {
    return store.has(key);
  }

  clear() {
    store.clear();
  }

  // User data methods
  getUserData(userId, dataType) {
    return this.get(`user_${userId}.${dataType}`) || null;
  }

  setUserData(userId, dataType, data) {
    this.set(`user_${userId}.${dataType}`, data);
  }

  deleteUserData(userId) {
    // Delete all user-related data
    this.delete(`user_${userId}`);
  }

  // Initialize user structure
  initializeUser(userId) {
    this.setUserData(userId, 'progress', []);
    this.setUserData(userId, 'exams', []);
    this.setUserData(userId, 'settings', {
      penaltyEnabled: true,
      notifications: true,
    });
  }

  // Get all data (for export)
  getAllData() {
    return store.store;
  }

  // Import all data (from backup)
  importData(data) {
    Object.keys(data).forEach(key => {
      this.set(key, data[key]);
    });
  }
}

export default new StorageService();
