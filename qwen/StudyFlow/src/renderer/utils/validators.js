// Validate user name
export const validateName = (name) => {
  if (!name || name.trim().length < 2) {
    return 'İsim en az 2 karakter olmalıdır';
  }
  if (name.length > 50) {
    return 'İsim en fazla 50 karakter olabilir';
  }
  return null;
};

// Validate question count
export const validateQuestionCount = (count, min = 0, max = 1000) => {
  if (count === '' || count === null || count === undefined) {
    return 'Soru sayısı boş bırakılamaz';
  }

  const num = Number(count);

  if (isNaN(num)) {
    return 'Geçerli bir sayı giriniz';
  }
  if (num < min) {
    return `En az ${min} soru girmelisiniz`;
  }
  if (num > max) {
    return `En fazla ${max} soru girebilirsiniz`;
  }
  return null;
};

// Validate duration
export const validateDuration = (duration, min = 0, max = 24) => {
  if (duration === '' || duration === null || duration === undefined) {
    return 'Süre boş bırakılamaz';
  }

  const num = Number(duration);

  if (isNaN(num)) {
    return 'Geçerli bir sayı giriniz';
  }
  if (num < min) {
    return `En az ${min} saat girmelisiniz`;
  }
  if (num > max) {
    return `En fazla ${max} saat girebilirsiniz`;
  }
  return null;
};

// Validate date
export const validateDate = (date) => {
  if (!date) {
    return 'Tarih boş bırakılamaz';
  }

  const d = new Date(date);

  if (isNaN(d.getTime())) {
    return 'Geçerli bir tarih giriniz';
  }

  return null;
};

// Validate answers (correct/wrong)
export const validateAnswers = (correct, wrong, total) => {
  const c = Number(correct);
  const w = Number(wrong);
  const t = Number(total);

  if (isNaN(c) || isNaN(w)) {
    return 'Geçerli sayılar giriniz';
  }

  if (c < 0 || w < 0) {
    return 'Negatif sayı girilemez';
  }

  if (c + w > t) {
    return 'Doğru + yanlış toplam soru sayısından fazla olamaz';
  }

  return null;
};

export default {
  validateName,
  validateQuestionCount,
  validateDuration,
  validateDate,
  validateAnswers
};