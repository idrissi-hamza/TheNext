import React from "react";
import dayjs from "dayjs";
import { getToday } from "../../../util";
import { useCtrlContext } from "../../../hooks/useCtrlContext";

function DayOfCalendar({ day }) {
  const { dispatch,pickDay } = useCtrlContext();
  // let pickDay = getToday();/

  let isToday = day.format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY");
  const tdyCss = isToday
    ? " border-t-4 border-t-blue-400  text-blue-800  font-semibold "
    : "text-md text-slate-700 border-t";
  let pickCss;
  if (pickDay) {
    if (day.format("DD/MM/YYYY") === dayjs(pickDay).format("DD/MM/YYYY")) {
      pickCss = "bg-blue-200";
    }
  }

  return (
    <div
      onClick={(e) => dispatch({ type: "SELECT_DAY", payload: e.target.id })} 
      onDoubleClick={()=>console.log('db')}
      id={day}
      className={`${tdyCss} ${pickCss} focus:bg-blue-100   active:bg-blue-300 group   border-r pl-2   transition ease-out duration-200 select-none cursor-pointer `}
    >
      {isToday ? day.format("MMM-DD") : day.format("DD")}
    </div>
  );
}

export default DayOfCalendar;
