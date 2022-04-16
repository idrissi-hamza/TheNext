import React from "react";
import dayjs from "dayjs";
import { weekday } from "../../../util";
import { useCtrlContext } from "../../../hooks/useCtrlContext";
function SmallCalendar({ month }) {
  // const dispatch = useDispatch();
  const { dispatch } = useCtrlContext();
  return (
    <div className="text-sm font-medium text-slate-50 grid grid-cols-7    ">
      {weekday.map((day, i) => (
        <div className="font-bold  pl-2   w-5 text-center  " key={i}>
          {day.slice(0, 1)}
        </div>
      ))}

      {month.map((day, i) => (
        <div
          id={day}
          className={`flex justify-center items-center h-8 w-8 hover:border-2 transition ease-out duration-300 select-none cursor-pointer
            ${
              day.format("DD/MM/YYYY") === dayjs().format("DD/MM/YYYY")
                ? "bg-slate-500   font-semibold text-base text-blue-100  "
                : "  hover:bg-slate-700 hover:font-semibold hover:text-base  transition ease-out duration-400  "
            }`}
          key={i}
          onClick={(e) =>
            dispatch({ type: "SELECT_DAY_MONTH", payload: e.target.id })
          }
        >
          {day.format("DD")}
        </div>
      ))}
    </div>
  );
}

export default SmallCalendar;
