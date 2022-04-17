import React from "react";
import DayOfCalendar from "./DayOfCalendar";
import dayjs from "dayjs";
import { getMonth, weekday } from "../../../util";
import { useCtrlContext } from "../../../hooks/useCtrlContext";

function Month() {
  const {monthIndex}=useCtrlContext()
  // const monthIndex = dayjs().month();
  // const monthIndex = useSelector((state) => state.calendar.monthIndex)

  const month = getMonth(monthIndex,35);

  return (
    <div className="h-full flex flex-col w-full">
      <div className="flex h-12 ">
        {weekday.map((day, i) => (
          <div
            className="flex-1 flex items-end pl-2 pb-1 text-gray-700"
            key={i}
          >
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      <div className=" grid grid-cols-7 flex-1">
        {month.map((day, i) => (
          <DayOfCalendar key={i} day={day}  />
        ))}
      </div>
    </div>
  );
}

export default Month;