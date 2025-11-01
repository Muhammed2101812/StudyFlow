// Net hesaplama
export const calculateNet = (correct, wrong, penaltyEnabled) => {
  if (penaltyEnabled !== undefined && penaltyEnabled) {
    return correct - (wrong / 4);
  }
  return correct;
};

// Başarı oranı hesaplama
export const calculateSuccessRate = (correct, total) => {
  if (total === 0) return 0;
  return (correct / total) * 100;
};

// İlerleme yüzdesi hesaplama
export const calculateProgressPercentage = (completed, total) => {
  if (total === 0) return 0;
  return (completed / total) * 100;
};

// Hedef fark hesaplama
export const calculateTargetDifference = (current, target) => {
  return target - current;
};

// Ortalama hesaplama
export const calculateAverage = (values) => {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

// Trend hesaplama (basit linear regression)
export const calculateTrend = (dataPoints) => {
  if (dataPoints.length < 2) return 0;
  
  const n = dataPoints.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  
  dataPoints.forEach((point, index) => {
    sumX += index;
    sumY += point;
    sumXY += index * point;
    sumXX += index * index;
  });
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  return slope;
};

export default {
  calculateNet,
  calculateSuccessRate,
  calculateProgressPercentage,
  calculateTargetDifference,
  calculateAverage,
  calculateTrend
};