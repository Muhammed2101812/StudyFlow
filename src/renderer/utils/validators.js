/**
 * Validate user name
 * @param {string} name - User name to validate
 * @returns {string|null} Error message or null if valid
 */
export function validateName(name) {
  if (!name || name.trim().length === 0) {
    return 'İsim boş olamaz';
  }

  if (name.length < 2) {
    return 'İsim en az 2 karakter olmalıdır';
  }

  if (name.length > 50) {
    return 'İsim en fazla 50 karakter olabilir';
  }

  return null;
}

/**
 * Validate question count
 * @param {number} correct - Correct answers
 * @param {number} wrong - Wrong answers
 * @param {number} total - Total questions
 * @returns {string|null} Error message or null if valid
 */
export function validateQuestionCount(correct, wrong, total) {
  if (correct < 0 || wrong < 0) {
    return 'Soru sayıları negatif olamaz';
  }

  if (correct + wrong > total) {
    return 'Doğru + Yanlış toplam soru sayısından fazla olamaz';
  }

  return null;
}

/**
 * Validate duration
 * @param {number} duration - Duration in hours
 * @returns {string|null} Error message or null if valid
 */
export function validateDuration(duration) {
  if (duration < 0) {
    return 'Süre negatif olamaz';
  }

  if (duration > 24) {
    return 'Süre 24 saatten fazla olamaz';
  }

  return null;
}
