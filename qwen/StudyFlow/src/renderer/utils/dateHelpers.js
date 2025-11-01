import { format, formatDistance, differenceInDays, isToday, isYesterday, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

// Tarih formatlama
export const formatDate = (date, formatStr = 'dd.MM.yyyy') => {
  return format(new Date(date), formatStr, { locale: tr });
};

// Göreceli tarih (2 gün önce, dün, bugün)
export const formatRelative = (date) => {
  const d = new Date(date);

  if (isToday(d)) return 'Bugün';
  if (isYesterday(d)) return 'Dün';

  return formatDistance(d, new Date(), { 
    addSuffix: true, 
    locale: tr 
  });
};

// Gün sayısı farkı
export const daysDifference = (date1, date2) => {
  return differenceInDays(new Date(date1), new Date(date2));
};

// Haftanın günü
export const getDayName = (date) => {
  return format(new Date(date), 'EEEE', { locale: tr });
};

// Ay adı
export const getMonthName = (date) => {
  return format(new Date(date), 'MMMM', { locale: tr });
};

// Haftanın başlangıç ve bitiş tarihleri
export const getWeekBounds = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Pazartesi başlangıç

  const monday = new Date(d.setDate(diff));
  const sunday = new Date(d.setDate(diff + 6));

  return { start: monday, end: sunday };
};

// Bugüne kalan gün sayısı
export const daysUntil = (targetDate) => {
  return differenceInDays(parseISO(targetDate), new Date());
};

// Plan tarih aralığı hesaplama
export const calculatePlanDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return differenceInDays(end, start) + 1; // +1 to include both start and end dates
};

// Bugünün plan gününü bulma
export const findTodayPlan = (planStages) => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  for (const stage of planStages || []) {
    for (const week of stage.weeks || []) {
      for (const day of week.days || []) {
        if (day.date === today) {
          return day;
        }
      }
    }
  }

  return null;
};

// Hafta numarası hesaplama
export const getWeekNumber = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

export default {
  formatDate,
  formatRelative,
  daysDifference,
  getDayName,
  getMonthName,
  getWeekBounds,
  daysUntil,
  calculatePlanDuration,
  findTodayPlan,
  getWeekNumber
};