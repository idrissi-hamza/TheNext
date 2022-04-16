import React from "react";
import { useCtrlContext } from "../hooks/useCtrlContext";
import dayjs from "dayjs";


const CtrlNavbar = () => {
  const { dispatch ,monthIndex} = useCtrlContext();
  return (
    <>
      <div className="ml-8  w-11 h-11 flex justify-center items-center rounded-full hover:bg-slate-400 text-gray-700 hover:text-gray-600 transition ease-in-out duration-300  ">
        <button
          onClick={() => {
            dispatch({ type: "TOGGLE_SIDEBAR" });
          }}
          className="material-icons-round text-4xl"
        >
          menu
        </button>
      </div>
      <button
        className="ml-8 border px-3 py-1 mr-4 rounded-md border-slate-700 text-slate-500  hover:bg-slate-600 hover:text-slate-100 "
        onClick={() => {
          dispatch({ type: "TODAY" });
        }}
      >
        Today
      </button>
      <button
        className="material-icons-outlined text-gray-600 mr-2 "
        onClick={() => dispatch({ type: "PREV_MONTH" })}
      >
        chevron_left
      </button>

      <button
        className="material-icons-outlined text-gray-600 mr-3 "
        onClick={() => {
          dispatch({ type: "NEXT_MONTH" });
        }}
      >
        chevron_right
      </button>
      <p className="text-slate-500 font-bold ">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </p>
    </>
  );
};

export default CtrlNavbar;
