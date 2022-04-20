import React from "react";
import { useCtrlContext } from "../hooks/useCtrlContext";
import dayjs from "dayjs";
import { Link } from "react-router-dom";


const CtrlNavbar = () => {
  const { dispatch ,monthIndex,pickDay} = useCtrlContext();
  return (
    <>
      <div className="ml-2 sm:ml-8  w-11 h-11 flex justify-center items-center rounded-full hover:bg-slate-400 text-gray-700 hover:text-gray-600 transition ease-in-out duration-300  ">
        <Link
          to='/'
          className="material-icons-round sm:text-4xl"
        >
          menu
        </Link>
      </div>
      <Link
      to={`/tasks/${dayjs(pickDay).format("DD-MM-YYYY")}`}
        className="ml-2 sm:ml-8 border px-3 py-1 mr-2 sm:mr-4 rounded-md border-slate-700 text-slate-500  hover:bg-slate-600 hover:text-slate-100 "
        onClick={() => {
          dispatch({ type: "TODAY" });
        }}
      >
        Today
      </Link>
      <button
        className="material-icons-outlined text-gray-600 sm:mr-2 "
        onClick={() => dispatch({ type: "PREV_MONTH" })}
      >
        chevron_left
      </button>

      <button
        className="material-icons-outlined text-gray-600 sm:mr-3 mr-1  "
        onClick={() => {
          dispatch({ type: "NEXT_MONTH" });
        }}
      >
        chevron_right
      </button>
      <p className="text-slate-500 font-bold text-sm">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </p>
    </>
  );
};

export default CtrlNavbar;
