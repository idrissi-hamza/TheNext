import React, { useEffect, useState } from "react";
import SmallCalendar from "./SmallCalendar";
import { getMonth } from "../../../util";
import dayjs from "dayjs";
import { useCtrlContext } from "../../../hooks/useCtrlContext";

function Sidebar() {
  let initialIndex = +dayjs().month();
  // console.log("mi", monthIndex);
  // const [monthIndex] = useSelector((state) => state.calendar.monthIndex);
  // const change = useSelector((state) => state.calendar.change);
  // const navBar = useSelector((state) => state.calendar.navBar);
  // const [sidebar, setSidebar] = useState(true);
  const { sidebar, dispatch } = useCtrlContext();

  // console.log(sidebar);
  const [Index, setIndex] = useState(initialIndex);
  console.log(Index);
  // useEffect(() => {
  //   setIndexSmCal(Index);
  // }, [Index, change]);

  // const prevMonthHandler = () => {
  //   setIndex((prev) => prev - 1);
  // };

  // const nextMonthHandler = () => {
  //   setIndex((prev) => prev + 1);
  // };

  const month = getMonth(Index, 42);

  return (
    <>
      {sidebar && (
        <aside className="  text-gray-50 px-2 bg-slate-700 shrink-0 relative">
          <button
            className="material-icons-outlined  text-2xl absolute right-1 mb-10 "
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          >
            menu_open
          </button>
          <div className=" mt-10 text-gray-50 flex  mb-2  ">
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
        <aside className="  text-gray-50 px-4 bg-slate-700 shrink-0 relative">
          <button
            className="material-icons-outlined rotate-180 text-2xl absolute right-1  ml-8 mb-10 "
            onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          >
            menu_open
          </button>
          {/* <div className=" mt-10 flex flex-col items-center">
            <div>
              <button
                className="material-icons-outlined"
                // onClick={nextMonthHandler}
              >
                chevron_left
              </button>

              <button
                className="material-icons-outlined"
                // onClick={prevMonthHandler}
              >
                chevron_right
              </button>
            </div>

            <span className="-mt-2">
              {dayjs(new Date(dayjs().year(), Index)).format("MMMM YYYY")}
            </span>
          </div> */}
        </aside>
      )}
    </>
  );
}

export default Sidebar;
