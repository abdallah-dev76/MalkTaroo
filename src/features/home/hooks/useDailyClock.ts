import { useEffect, useState } from 'react';

export const getNextDailyRefresh = (now: Date) => {
  const next = new Date(now);
  if (now.getHours() < 12) {
    next.setHours(12, 0, 0, 0);
  } else {
    next.setDate(next.getDate() + 1);
    next.setHours(0, 0, 0, 0);
  }
  return next;
};

export const useDailyClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timeout = setTimeout(
      () => setNow(new Date()),
      getNextDailyRefresh(now).getTime() - now.getTime(),
    );
    return () => clearTimeout(timeout);
  }, [now]);
  return now;
};
