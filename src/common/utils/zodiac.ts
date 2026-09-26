// [month, day] each sign starts on, ordered from January
const ZODIAC_START_DATES: [number, number, string][] = [
  [1, 20, 'aquarius'],
  [2, 19, 'pisces'],
  [3, 21, 'aries'],
  [4, 20, 'taurus'],
  [5, 21, 'gemini'],
  [6, 21, 'cancer'],
  [7, 23, 'leo'],
  [8, 23, 'virgo'],
  [9, 23, 'libra'],
  [10, 23, 'scorpio'],
  [11, 22, 'sagittarius'],
  [12, 22, 'capricorn'],
];

// \uFE0E forces text (not emoji) rendering
export const ZODIAC_SYMBOLS: Record<string, string> = {
  aries: '\u2648\uFE0E',
  taurus: '\u2649\uFE0E',
  gemini: '\u264A\uFE0E',
  cancer: '\u264B\uFE0E',
  leo: '\u264C\uFE0E',
  virgo: '\u264D\uFE0E',
  libra: '\u264E\uFE0E',
  scorpio: '\u264F\uFE0E',
  sagittarius: '\u2650\uFE0E',
  capricorn: '\u2651\uFE0E',
  aquarius: '\u2652\uFE0E',
  pisces: '\u2653\uFE0E',
};

export const getZodiacFromDate = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  let sign = 'capricorn';
  for (const [startMonth, startDay, id] of ZODIAC_START_DATES) {
    if (month > startMonth || (month === startMonth && day >= startDay)) {
      sign = id;
    }
  }
  return sign;
};
