export type BirthdateParts = { year?: number; month?: number; day?: number };

export const calculateAge = (birthdate: Date, today = new Date()) => {
  const hadBirthday =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() &&
      today.getDate() >= birthdate.getDate());
  return today.getFullYear() - birthdate.getFullYear() - (hadBirthday ? 0 : 1);
};

export const getValidatedAge = (birthdate: Date, now = new Date()) => {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return Number.isNaN(birthdate.getTime()) || birthdate > today
    ? null
    : calculateAge(birthdate, today);
};

export const parseBirthdate = (value?: string) => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return undefined;
  }
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : undefined;
};

export const parseBirthdatePart = (birthdate: string, index: number) => {
  const part = Number(birthdate.split('-')[index]);
  return Number.isInteger(part) && part > 0 ? part : undefined;
};

export const getDaysInMonth = (year?: number, month?: number) =>
  month ? new Date(year ?? 2000, month, 0).getDate() : 31;

export const getBirthdateObject = ({ year, month, day }: BirthdateParts) => {
  if (
    !year ||
    !month ||
    !day ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > getDaysInMonth(year, month)
  ) {
    return undefined;
  }
  return new Date(year, month - 1, day);
};

export const updateBirthdatePart = (
  value: BirthdateParts,
  part: keyof BirthdateParts,
  selected: number,
) => {
  const next = { ...value, [part]: selected };
  if (next.day && next.day > getDaysInMonth(next.year, next.month)) {
    next.day = undefined;
  }
  return next;
};
