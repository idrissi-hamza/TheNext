import React from "react";
import dayjs from "dayjs";
import { weekday } from "../../util";
import { useCtrlContext } from "../../hooks/useCtrlContext";
import { Link } from "react-router-dom";

function SmallCalendar({ month }) {
  // const dispatch = useDispatch();
  const { dispatch,pickDay} = useCtrlContext();
  return (
    <div className="text-sm font-medium text-slate-700 grid grid-cols-7    ">
      {weekday.map((day, i) => (
        <div className="font-bold  pl-2   w-5 text-center  " key={i}>
          {day.slice(0, 1)}
        </div>
      ))}

      {month.map((day, i) => (
        <Link
          to={`/tasks/${day.format("DD-MM-YYYY")}`}
          id={day}
          className={`flex justify-center items-center h-8 w-8  transition ease-out duration-300 select-none cursor-pointer hover:bg-slate-500 hover:text-blue-100 hover:font-semibold hover:text-base focus:bg-lime-200 focus:text-lime-700
            ${+day===pickDay && 'bg-lime-200 text-lime-700 font-semibold text-base '}  ${
              day.format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY") &&
              "bg-blue-400 rounded-full  font-semibold text-base text-blue-100  "
            }`}
          key={i}
          onClick={(e) =>
            dispatch({ type: "SELECT_DAY_MONTH", payload: e.target.id })
          }
        >
          {day.format("DD")}
          
        </Link>
      ))}
    </div>
  );
}

export default SmallCalendar;
