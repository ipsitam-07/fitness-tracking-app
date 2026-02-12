//Calculate the workout streak of an user

export function calculateStreak(workouts: Array<{ date: Date }>): {
  currentStreak: number;
  longestStreak: number;
} {
  if (workouts.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const validWorkouts = workouts.filter((w) => new Date(w.date) <= today);

  if (validWorkouts.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const dates = validWorkouts.map((w) => new Date(w.date).toDateString());
  const uniqueDates = [...new Set(dates)].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  const todayString = new Date().toDateString();
  const yesterdayString = new Date(Date.now() - 86400000).toDateString();

  if (uniqueDates[0] === todayString || uniqueDates[0] === yesterdayString) {
    currentStreak = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
      const prevDate = new Date(uniqueDates[i - 1]!);
      const currDate = new Date(uniqueDates[i]!);
      const diffDays = Math.floor(
        (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]!);
    const currDate = new Date(uniqueDates[i]!);
    const diffDays = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  return { currentStreak, longestStreak };
}

//Get week number of the year
export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

//Get week dates
export function getWeekDates(year: number, week: number): { startDate: Date; endDate: Date } {
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay() || 7;
  const weekStart = new Date(jan4);
  weekStart.setDate(jan4.getDate() - dayOfWeek + 1 + (week - 1) * 7);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  return { startDate: weekStart, endDate: weekEnd };
}
