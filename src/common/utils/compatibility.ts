// maps a compatibility percentage to its translation key, in 10% buckets
export const getCompatibilityLabelKey = (percentage: number): string => {
  const clamped = Math.max(0, Math.min(100, percentage));

  if (clamped <= 10) {
    return 'compatibilityLabels.veryLow';
  }
  if (clamped <= 20) {
    return 'compatibilityLabels.low';
  }
  if (clamped <= 30) {
    return 'compatibilityLabels.weak';
  }
  if (clamped <= 40) {
    return 'compatibilityLabels.belowAverage';
  }
  if (clamped <= 50) {
    return 'compatibilityLabels.average';
  }
  if (clamped <= 60) {
    return 'compatibilityLabels.aboveAverage';
  }
  if (clamped <= 70) {
    return 'compatibilityLabels.good';
  }
  if (clamped <= 80) {
    return 'compatibilityLabels.strong';
  }
  if (clamped <= 90) {
    return 'compatibilityLabels.excellent';
  }
  return 'compatibilityLabels.perfectMatch';
};
