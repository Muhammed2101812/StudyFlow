import storageService from './storageService.js';
import { v4 as uuidv4 } from 'uuid';

const planService = {
  // Tüm planları getir
  getAll: () => {
    return storageService.get('plans') || [];
  },

  // ID ile plan getir
  getById: (planId) => {
    const plans = planService.getAll();
    return plans.find(p => p.id === planId);
  },

  // Plan import et (JSON'dan)
  import: async (filePath) => {
    try {
      // Electron IPC ile dosya okuma
      const planData = await window.electron.readFile(filePath);

      // Validasyon
      if (!planService.validate(planData)) {
        throw new Error('Invalid plan format');
      }

      // Mevcut planlara ekle
      const plans = planService.getAll();

      // Aynı ID kontrolü
      if (plans.some(p => p.id === planData.id)) {
        throw new Error('Plan already exists');
      }

      plans.push(planData);
      storageService.set('plans', plans);

      return planData;
    } catch (error) {
      console.error('Plan import error:', error);
      throw error;
    }
  },

  // Plan validasyonu
  validate: (planData) => {
    const required = ['id', 'name', 'examDate', 'subjects', 'stages'];
    return required.every(field => planData.hasOwnProperty(field));
  },

  // Kullanıcıya plan ata
  assignToUser: (userId, planId) => {
    const users = storageService.get('users') || [];
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
      users[userIndex].activePlan = planId;
      storageService.set('users', users);

      // Kullanıcı context'ini güncelleme burada yapılmaz, çünkü context harici bir dosyada
      // Bu işlem userService veya ilgili context içinde yapılmalı
    }
  },

  // Plan sil
  delete: (planId) => {
    const plans = planService.getAll();
    const filtered = plans.filter(p => p.id !== planId);
    storageService.set('plans', filtered);
  },

  // Bugünün programını getir
  getTodayProgram: (planId) => {
    const plan = planService.getById(planId);
    if (!plan) return null;

    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Tüm aşamalardaki günleri tara
    for (const stage of plan.stages) {
      for (const week of stage.weeks || []) {
        for (const day of week.days || []) {
          if (day.date === today) {
            return day;
          }
        }
      }
    }

    return null;
  },

  // Haftalık programı getir
  getWeekProgram: (planId, weekNumber) => {
    const plan = planService.getById(planId);
    if (!plan) return null;

    for (const stage of plan.stages) {
      for (const week of stage.weeks || []) {
        if (week.weekNumber === weekNumber) return week;
      }
    }

    return null;
  },

  // Plan ilerlemesini hesapla
  calculatePlanProgress: (planId, userId) => {
    // Not implemented yet - will be implemented later with progress data
    return {
      completedDays: 0,
      totalDays: 0,
      percentage: 0
    };
  },

  // Aşama getir
  getCurrentStage: (planId) => {
    const plan = planService.getById(planId);
    if (!plan) return null;

    // Today's date for comparison
    const today = new Date();

    for (const stage of plan.stages) {
      const startDate = new Date(stage.startDate);
      const endDate = new Date(stage.endDate);

      if (today >= startDate && today <= endDate) {
        return stage;
      }
    }

    return null;
  }
};

export default planService;