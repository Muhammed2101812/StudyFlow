const storageService = {
  // Generic operations (sync via preload IPC)
  get: (key) => window.electron?.store?.getSync?.(key),
  set: (key, value) => window.electron?.store?.setSync?.(key, value),
  delete: (key) => window.electron?.store?.deleteSync?.(key),
  has: (key) => {
    const val = window.electron?.store?.getSync?.(key);
    return val !== undefined;
  },
  clear: () => {
    // Minimal clear implementation for current app structure
    window.electron?.store?.setSync?.('users', []);
    window.electron?.store?.setSync?.('plans', []);
  },

  // User specific
  getUserData: (userId, dataType) => {
    return window.electron?.store?.getSync?.(`users.${userId}.${dataType}`);
  },

  setUserData: (userId, dataType, data) => {
    window.electron?.store?.setSync?.(`users.${userId}.${dataType}`, data);
  },

  // Initialize default structure
  initializeDefaults: () => {
    if (!storageService.has('users')) {
      storageService.set('users', []);
    }
    if (!storageService.has('plans')) {
      storageService.set('plans', []);
    }
  },
};

// Initialize default structure
storageService.initializeDefaults();

export default storageService;
