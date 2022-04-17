import React, { useState } from "react";
import SmallCalendar from "./SmallCalendar";
import { getMonth } from "../../util";
import dayjs from "dayjs";
import { useCtrlContext } from "../../hooks/useCtrlContext";


function Sidebar() {
  let initialIndex = +dayjs().month();
    const { sidebar, dispatch } = useCtrlContext();

  const [Index, setIndex] = useState(initialIndex);
   
  const month = getMonth(Index, 42);

  return (
    
    <>
      {sidebar && (
        <aside className="h-full text-gray-700 px-2 bg-neutral-200 shadow-sm shrink-0 relative">
          <button
            className="material-icons-outlined  text-2xl absolute right-1 mb-10 "
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          >
            menu_open
          </button>
          <div className=" mt-10 text-gray-700 flex  mb-2  ">
            <button
              className="material-icons-outlined  ml-4 "
              onClick={() => {
                setIndex((prev) => prev - 1);
              }}
            >
              chevron_left
            </button>
            <button
              className="material-icons-outlined  ml-3 "
              onClick={() => {
                setIndex((prev) => prev + 1);
              }}
            >
              chevron_right
            </button>
            <span>
              {dayjs(new Date(dayjs().year(), Index)).format("MMMM YYYY")}
            </span>
          </div>

          <SmallCalendar month={month} />
        </aside>
      )}
      {!sidebar && (
        <aside className=" h-full text-gray-700 px-4 bg-slate-300 shrink-0 relative">
          <button
            className="material-icons-outlined rotate-180 text-2xl absolute right-1  ml-8 mb-10 "
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          >
            menu_open
          </button>
          
        </aside>
      )}
    </>
  );
}

export default Sidebar;
