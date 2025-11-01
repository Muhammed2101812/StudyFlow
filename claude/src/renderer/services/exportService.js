import storageService from './storageService';
import progressService from './progressService';
import examService from './examService';
import userService from './userService';
import { format } from 'date-fns';

class ExportService {
  /**
   * Export all user data to JSON
   */
  async exportAllData(userId) {
    try {
      const user = await userService.getById(userId);
      const progress = progressService.getAll(userId);
      const exams = examService.getAll(userId);
      const settings = await storageService.getUserData(userId, 'settings');

      const exportData = {
        exportDate: new Date().toISOString(),
        exportVersion: '1.0.0',
        user: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          createdAt: user.createdAt,
        },
        progress,
        exams,
        settings,
        statistics: {
          totalStudyDays: progress.length,
          totalExams: exams.length,
          totalHours: progress.reduce((sum, p) => sum + (p.duration || 0), 0),
        },
      };

      return {
        success: true,
        data: exportData,
      };
    } catch (error) {
      console.error('Export all data error:', error);
      return {
        success: false,
        error: 'Veri dışa aktarılamadı',
      };
    }
  }

  /**
   * Export only progress data
   */
  async exportProgress(userId) {
    try {
      const user = await userService.getById(userId);
      const progress = progressService.getAll(userId);

      const exportData = {
        exportDate: new Date().toISOString(),
        exportType: 'progress',
        user: {
          id: user.id,
          name: user.name,
        },
        progress,
      };

      return {
        success: true,
        data: exportData,
      };
    } catch (error) {
      console.error('Export progress error:', error);
      return {
        success: false,
        error: 'Çalışma kayıtları dışa aktarılamadı',
      };
    }
  }

  /**
   * Export only exam data
   */
  async exportExams(userId) {
    try {
      const user = await userService.getById(userId);
      const exams = examService.getAll(userId);

      const exportData = {
        exportDate: new Date().toISOString(),
        exportType: 'exams',
        user: {
          id: user.id,
          name: user.name,
        },
        exams,
      };

      return {
        success: true,
        data: exportData,
      };
    } catch (error) {
      console.error('Export exams error:', error);
      return {
        success: false,
        error: 'Deneme kayıtları dışa aktarılamadı',
      };
    }
  }

  /**
   * Generate default filename for export
   */
  generateFilename(userId, exportType = 'all') {
    const dateStr = format(new Date(), 'yyyy-MM-dd');
    return `studyflow-${exportType}-${userId}-${dateStr}.json`;
  }

  /**
   * Save export data to file (Electron only)
   */
  async saveToFile(data, defaultFilename) {
    try {
      // Check if running in Electron
      if (typeof window === 'undefined' || !window.electronAPI) {
        // Browser fallback: download as blob
        this._downloadAsBlob(data, defaultFilename);
        return { success: true };
      }

      // Electron: use file save dialog
      const result = await window.electronAPI.saveFileDialog(defaultFilename);

      if (result.success && !result.data.canceled) {
        const filePath = result.data.filePath;
        const content = JSON.stringify(data, null, 2);

        const writeResult = await window.electronAPI.writeFile(filePath, content);

        if (writeResult.success) {
          return { success: true, filePath };
        } else {
          return { success: false, error: 'Dosya yazılamadı' };
        }
      }

      return { success: false, error: 'İptal edildi' };
    } catch (error) {
      console.error('Save to file error:', error);
      return { success: false, error: 'Dosya kaydedilemedi' };
    }
  }

  /**
   * Download data as blob (browser fallback)
   */
  _downloadAsBlob(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Import data from JSON
   */
  async importData(userId, importData) {
    try {
      // Validate import data structure
      if (!importData || typeof importData !== 'object') {
        return { success: false, error: 'Geçersiz veri formatı' };
      }

      // Import progress if available
      if (importData.progress && Array.isArray(importData.progress)) {
        await storageService.setUserData(userId, 'progress', importData.progress);
      }

      // Import exams if available
      if (importData.exams && Array.isArray(importData.exams)) {
        await storageService.setUserData(userId, 'exams', importData.exams);
      }

      // Import settings if available
      if (importData.settings && typeof importData.settings === 'object') {
        await storageService.setUserData(userId, 'settings', importData.settings);
      }

      return {
        success: true,
        message: 'Veriler başarıyla içe aktarıldı',
      };
    } catch (error) {
      console.error('Import data error:', error);
      return {
        success: false,
        error: 'Veriler içe aktarılamadı',
      };
    }
  }
}

export default new ExportService();
