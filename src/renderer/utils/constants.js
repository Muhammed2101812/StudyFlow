/**
 * Application Constants
 */

// Subject colors for visual consistency
export const SUBJECT_COLORS = {
  Türkçe: '#EF4444', // red-500
  Matematik: '#3B82F6', // blue-500
  Tarih: '#8B5CF6', // purple-500
  Coğrafya: '#10B981', // green-500
  Vatandaşlık: '#F59E0B', // amber-500
  Güncel: '#6B7280', // gray-500
};

// Question counts per subject for KPSS
export const SUBJECT_QUESTIONS = {
  Türkçe: 30,
  Matematik: 30,
  Tarih: 27,
  Coğrafya: 18,
  Vatandaşlık: 9,
  Güncel: 6,
};

// Avatar options for user profiles
export const AVATAR_OPTIONS = [
  '😊', '😎', '🤓', '🧐', '🤗', '🥳',
  '😺', '🐶', '🐼', '🦊', '🐨', '🦁',
  '🌟', '⚡', '🔥', '💪', '🎯', '🚀',
];

// Days of week (Turkish)
export const DAYS_OF_WEEK = [
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
  'Pazar',
];

// Rest days (no study program)
export const REST_DAYS = ['Pazar', 'Pazartesi'];

// Toast notification duration (ms)
export const TOAST_DURATION = 4000;

// Date format strings
export const DATE_FORMATS = {
  DISPLAY: 'dd MMMM yyyy',
  SHORT: 'dd.MM.yyyy',
  INPUT: 'yyyy-MM-dd',
};

// Validation constraints
export const VALIDATION = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_DURATION: 0.1,
  MAX_DURATION: 24,
  MIN_QUESTIONS: 0,
  MAX_QUESTIONS: 1000,
};

// Chart colors
export const CHART_COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  grid: '#E5E7EB',
};

// Trend indicators
export const TREND_INDICATORS = {
  increasing: '📈',
  stable: '➡️',
  decreasing: '📉',
};

export default {
  SUBJECT_COLORS,
  SUBJECT_QUESTIONS,
  AVATAR_OPTIONS,
  DAYS_OF_WEEK,
  REST_DAYS,
  TOAST_DURATION,
  DATE_FORMATS,
  VALIDATION,
  CHART_COLORS,
  TREND_INDICATORS,
};
