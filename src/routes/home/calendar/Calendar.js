import React from "react";
import DayOfCalendar from "./DayOfCalendar";
import { getMonth, weekday } from "../../../util";
import { useCtrlContext } from "../../../hooks/useCtrlContext";

import {
  ClipboardIcon,
  ClipboardCopyIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline";

function Month() {
  const { monthIndex } = useCtrlContext();
  const month = getMonth(monthIndex, 35);

  return (
    <div className="h-full flex flex-col w-full">
     
      <div className="flex h-12 ">
        {weekday.map((day, i) => (
          <div
            className="flex-1 flex items-end pl-2 pb-1 text-gray-700 text-sm sm:text-base"
            key={i}
          >
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      <div className=" grid grid-cols-7  h-full auto-rows-[1fr]">
        {month.map((day, i) => (
          <DayOfCalendar key={i} day={day} />
        ))}
      </div>
      <div className=" pt-2 border-t  flex justify-around bg-neutral-200">
        <div className=" flex flex-col items-center text-gray-400">
          <ClipboardIcon className="   w-4 h-4" />
          <span className=" text-sm text-gray-400">Todo</span>
        </div>
        <div className=" flex flex-col items-center  text-yellow-500">
        <ClipboardCopyIcon className="   w-4 h-4" />
        <span className=" text-sm ">In progress</span>
        </div>

       <div className=" flex flex-col items-center   text-green-400">
       <ClipboardCheckIcon className="   w-4 h-4" />
       <span className=" text-sm ">Done</span>
       </div>
      </div>
    </div>
  );
}

export default Month;
