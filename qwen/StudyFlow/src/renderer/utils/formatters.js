// Plan display formatları
export const formatPlanName = (name) => {
  return name || 'Adsız Plan';
};

export const formatPlanDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return `${diffDays} gün`;
};

export const formatExamDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Subject color mapping
export const getSubjectColor = (subjectId) => {
  const colorMap = {
    turkce: '#EF4444',      // red-500
    matematik: '#3B82F6',   // blue-500
    tarih: '#8B5CF6',       // violet-500
    cografya: '#10B981',    // emerald-500
    vatandaslik: '#F59E0B', // amber-500
    guncel: '#6B7280',      // gray-500
    sosyal: '#8B5CF6',      // violet-500
    fen: '#10B981',         // emerald-500
    tink: '#8B5CF6',        // violet-500
    din: '#F59E0B',         // amber-500
    ingilizce: '#6B7280',   // gray-500
    yabanci_dil: '#6B7280'  // gray-500
  };
  
  return colorMap[subjectId] || '#6B7280'; // default gray
};

export const getSubjectIcon = (subjectId) => {
  const iconMap = {
    turkce: '📚',
    matematik: '🔢',
    tarih: '🏛️',
    cografya: '🌍',
    vatandaslik: '🏛️',
    guncel: '📰',
    sosyal: '🏛️',
    fen: '🔬',
    tink: '🏛️',
    din: '⛪',
    ingilizce: '🌐',
    yabanci_dil: '🌐'
  };
  
  return iconMap[subjectId] || '❓';
};

// Stage name formatting
export const formatStageName = (name) => {
  return name || 'Adsız Aşama';
};

export const formatStageDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return '';
  
  const start = new Date(startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  const end = new Date(endDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
  
  return `${start} - ${end}`;
};

export default {
  formatPlanName,
  formatPlanDuration,
  formatExamDate,
  getSubjectColor,
  getSubjectIcon,
  formatStageName,
  formatStageDuration
};