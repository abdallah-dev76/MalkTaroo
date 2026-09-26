const ZODIAC_ORDER = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
];

// symmetric table: rows and columns follow ZODIAC_ORDER
const COMPATIBILITY_TABLE: number[][] = [
  [75, 45, 83, 42, 97, 50, 70, 55, 93, 47, 78, 67],
  [45, 80, 33, 97, 73, 90, 65, 88, 30, 98, 58, 85],
  [83, 33, 70, 65, 88, 60, 93, 28, 80, 68, 95, 53],
  [42, 97, 65, 75, 35, 90, 43, 94, 53, 83, 27, 98],
  [97, 73, 88, 35, 80, 35, 97, 58, 93, 35, 68, 38],
  [50, 90, 60, 90, 35, 70, 68, 88, 48, 95, 30, 88],
  [70, 65, 93, 43, 97, 68, 75, 35, 73, 55, 90, 88],
  [55, 88, 28, 94, 58, 88, 35, 80, 28, 95, 73, 97],
  [93, 30, 80, 53, 93, 48, 73, 28, 75, 60, 90, 63],
  [47, 98, 68, 83, 35, 95, 55, 95, 60, 75, 68, 88],
  [78, 58, 95, 27, 68, 30, 90, 73, 90, 68, 80, 45],
  [67, 85, 53, 98, 38, 88, 88, 97, 63, 88, 45, 80],
];

export const getCompatibilityPercentage = (
  firstZodiacId?: string,
  secondZodiacId?: string,
): number => {
  const row = ZODIAC_ORDER.indexOf(firstZodiacId ?? '');
  const col = ZODIAC_ORDER.indexOf(secondZodiacId ?? '');
  if (row === -1 || col === -1) {
    return 0;
  }
  return COMPATIBILITY_TABLE[row][col];
};

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
