import dayjs from "dayjs";

export const getMonth = (month, numberOfDays) => {
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysArray = new Array(numberOfDays).fill(null).map(() => {
    currentMonthCount++;
    return dayjs(new Date(year, month, currentMonthCount));
  });

  return daysArray;
};

export const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getToday = () => {
  const year = dayjs().year();
  const day = dayjs().date();
  const month = dayjs().month();
  return +dayjs(new Date(year, month, day));
};
