import storageService from './storageService';
import userService from './userService';

class PlanService {
  async getAll(userId) {
    if (!userId) {
      console.error('PlanService.getAll: userId is required');
      return [];
    }
    const plans = await storageService.getUserData(userId, 'plans');
    // Ensure we always return an array
    if (!plans || !Array.isArray(plans)) {
      return [];
    }
    return plans;
  }

  async getById(userId, planId) {
    const plans = await this.getAll(userId);
    return plans.find(p => p.id === planId) || null;
  }

  async import(userId, filePath) {
    try {
      if (!userId) {
        throw new Error('Kullanıcı ID gerekli');
      }

      // Read file using Electron API
      const result = await window.electronAPI.readFile(filePath);

      if (!result.success) {
        throw new Error(result.error);
      }

      const planData = JSON.parse(result.data);

      // Validate plan structure
      this.validate(planData);

      // Save plan to user's data
      const plans = await this.getAll(userId);

      // Check if plan already exists for this user
      const existingIndex = plans.findIndex(p => p.id === planData.id);
      if (existingIndex >= 0) {
        // Update existing plan
        plans[existingIndex] = planData;
      } else {
        // Add new plan
        plans.push(planData);
      }

      await storageService.setUserData(userId, 'plans', plans);

      return planData;
    } catch (error) {
      throw new Error(`Plan import edilemedi: ${error.message}`);
    }
  }

  validate(planData) {
    const required = ['id', 'name', 'examDate', 'subjects', 'stages'];

    for (const field of required) {
      if (!planData[field]) {
        throw new Error(`Gerekli alan eksik: ${field}`);
      }
    }

    if (!Array.isArray(planData.subjects)) {
      throw new Error('subjects bir dizi olmalıdır');
    }

    if (!Array.isArray(planData.stages)) {
      throw new Error('stages bir dizi olmalıdır');
    }

    return true;
  }

  async delete(userId, planId) {
    if (!userId) {
      throw new Error('Kullanıcı ID gerekli');
    }
    const plans = await this.getAll(userId);
    const filtered = plans.filter(p => p.id !== planId);
    await storageService.setUserData(userId, 'plans', filtered);
    return true;
  }

  async assignToUser(userId, planId) {
    return await userService.update(userId, { activePlanId: planId });
  }

  async getTodayProgram(userId, planId) {
    const plan = await this.getById(userId, planId);
    if (!plan) return null;

    const today = new Date();
    const dayOfWeek = today.getDay();

    // Sunday (0) and Monday (1) are rest days
    if (dayOfWeek === 0 || dayOfWeek === 1) {
      return null;
    }

    // Find current program based on date
    // This is a simplified version - full implementation would calculate
    // the week number and day based on plan start date

    return null; // Placeholder
  }
}

export default new PlanService();
