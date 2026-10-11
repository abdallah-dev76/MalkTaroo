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
