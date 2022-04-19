import React from "react";
import dayjs from "dayjs";
import { useCtrlContext } from "../../../hooks/useCtrlContext";
import { Link } from "react-router-dom";

import { useCollection } from "../../../hooks/useCollection";
import { useAuthContext } from "../../../hooks/useAuthContext";

import {
  ClipboardIcon,
  ClipboardCopyIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline";

function DayOfCalendar({ day }) {
  const { dispatch, pickDay } = useCtrlContext();

  //css for != states today, pickDay, otherdays
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

  //
  const content = isToday ? day.format("MMM-DD") : day.format("DD");
  //dashbord for everyday day number of tasks in != status
  const { user } = useAuthContext();
  const { documents } = useCollection("todos", ["uid", "==", user.uid]);
  let tasks;
  let todos;
  let doings;
  let dones;
  if (documents) {
    tasks = documents.filter((task) => task.day === +day);
    todos = tasks.filter((task) => task.status === "todo").length;
    doings = tasks.filter((task) => task.status === "doing").length;
    dones = tasks.filter((task) => task.status === "done").length;
  }

  return (
    <Link
      to={`/tasks/${day.format("DD-MM-YYYY")}`}
      onClick={(e) => dispatch({ type: "SELECT_DAY", payload: e.target.id })}
      id={day}
      className={`${tdyCss} ${pickCss}  focus:bg-blue-100   active:bg-blue-300 group   border-r pl-2   transition ease-out duration-200 select-none cursor-pointer `}
    >
      <h2 className="pb-1">{content}</h2>

   
        {!!todos && todos !== 0 && (
          <div className="flex">
            <ClipboardIcon className="  text-gray-400  w-4 h-4" />
            <span className="text-xs flex">
              {" "}
              {todos > 1 ? `${todos} todos` : `${todos} todo`}{" "}
            </span>
          </div>
        )}
        {!!doings && doings !== 0 && (
          <div className="flex">
            <ClipboardCopyIcon  className="  text-yellow-500  w-4 h-4" />
            <span className="text-xs flex">
              {" "}
              {doings > 1 ? `${doings} doings` : `${doings} in progress`}{" "}
            </span>
          </div>
        )}
        {!!dones && dones !== 0 && (
          <div className="flex">
            <ClipboardCheckIcon className="  text-green-400  w-4 h-4" />
            <span className="text-xs flex">
              {" "}
              {dones > 1 ? `${dones} dones` : `${dones} done`}{" "}
            </span>
          </div>
        )}
     
      {/*       
      <div className={` text-xs`}>{doings === 0 ? "" : `${doings} `}</div>
      <div className={` text-xs`}>{dones === 0 ? "" : dones} </div> */}
    </Link>
  );
}

export default DayOfCalendar;
