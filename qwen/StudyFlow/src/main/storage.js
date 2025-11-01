import Store from 'electron-store';

const store = new Store({
  name: 'studyflow-data',
});

const storage = {
  get: (key) => store.get(key),
  set: (key, value) => store.set(key, value),
  delete: (key) => store.delete(key),
  has: (key) => store.has(key),
  clear: () => store.clear(),
  // convenience helpers used by renderer services
  getUserData: (userId, dataType) => store.get(`users.${userId}.${dataType}`),
  setUserData: (userId, dataType, data) => {
    store.set(`users.${userId}.${dataType}`, data);
  },
  initializeDefaults: () => {
    if (!store.has('users')) {
      store.set('users', []);
    }
    if (!store.has('plans')) {
      store.set('plans', []);
    }
  },
  exportAll: () => store.store,
  importAll: (data) => {
    store.store = data;
  }
};

export default storage;

