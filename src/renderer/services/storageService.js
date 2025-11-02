// StorageService - Uses IPC to communicate with main process
// Falls back to localStorage for browser development
class StorageService {
  constructor() {
    this.isElectron = typeof window !== 'undefined' && window.electronAPI;
    if (!this.isElectron) {
      console.warn('Running in browser mode - using localStorage fallback');
      this.localData = this._loadFromLocalStorage();
    }
  }

  _loadFromLocalStorage() {
    try {
      const data = localStorage.getItem('studyflow-data');
      return data ? JSON.parse(data) : {
        users: [],
        plans: [],
        settings: { theme: 'light', language: 'tr' }
      };
    } catch (e) {
      return {
        users: [],
        plans: [],
        settings: { theme: 'light', language: 'tr' }
      };
    }
  }

  _saveToLocalStorage() {
    try {
      localStorage.setItem('studyflow-data', JSON.stringify(this.localData));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  // Generic methods
  async get(key) {
    if (this.isElectron) {
      return await window.electronAPI.store.get(key);
    } else {
      // localStorage fallback
      const keys = key.split('.');
      let value = this.localData;
      for (const k of keys) {
        value = value?.[k];
      }
      return value;
    }
  }

  async set(key, value) {
    if (this.isElectron) {
      return await window.electronAPI.store.set(key, value);
    } else {
      // localStorage fallback
      const keys = key.split('.');
      let obj = this.localData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) obj[keys[i]] = {};
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      this._saveToLocalStorage();
      return true;
    }
  }

  async delete(key) {
    if (this.isElectron) {
      return await window.electronAPI.store.delete(key);
    } else {
      // localStorage fallback
      const keys = key.split('.');
      let obj = this.localData;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj?.[keys[i]];
        if (!obj) return true;
      }
      delete obj[keys[keys.length - 1]];
      this._saveToLocalStorage();
      return true;
    }
  }

  async has(key) {
    if (this.isElectron) {
      return await window.electronAPI.store.has(key);
    } else {
      // localStorage fallback
      const value = await this.get(key);
      return value !== undefined;
    }
  }

  async clear() {
    if (this.isElectron) {
      return await window.electronAPI.store.clear();
    } else {
      // localStorage fallback
      this.localData = {
        users: [],
        plans: [],
        settings: { theme: 'light', language: 'tr' }
      };
      this._saveToLocalStorage();
      return true;
    }
  }

  // User data methods
  async getUserData(userId, dataType) {
    const data = await this.get(`user_${userId}.${dataType}`);
    return data || null;
  }

  async setUserData(userId, dataType, data) {
    return await this.set(`user_${userId}.${dataType}`, data);
  }

  async deleteUserData(userId) {
    // Delete all user-related data
    return await this.delete(`user_${userId}`);
  }

  // Initialize user structure
  async initializeUser(userId) {
    await this.setUserData(userId, 'progress', []);
    await this.setUserData(userId, 'exams', []);
    await this.setUserData(userId, 'settings', {
      penaltyEnabled: true,
      notifications: true,
    });
  }

  // Get all data (for export)
  async getAllData() {
    if (this.isElectron) {
      return await window.electronAPI.store.getAll();
    } else {
      return this.localData;
    }
  }

  // Import all data (from backup)
  async importData(data) {
    const promises = Object.keys(data).map(key =>
      this.set(key, data[key])
    );
    await Promise.all(promises);
  }
}

export default new StorageService();
