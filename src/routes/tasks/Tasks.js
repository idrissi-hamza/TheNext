import dayjs from "dayjs";
import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCtrlContext } from "../../hooks/useCtrlContext";
import TaskForm from "./TaskForm";
import { useCollection } from "../../hooks/useCollection";
import Task from "./Task";

const Tasks = () => {
  const { pickDay } = useCtrlContext();
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "todos",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  let tasks;
  let todos;
  let doings;
  let dones;
  if (documents) {
    tasks = documents.filter((task) => task.day === pickDay);
    todos = tasks.filter((task) => task.status === "todo");
    doings = tasks.filter((task) => task.status === "doing");
    dones = tasks.filter((task) => task.status === "done");
  }
  let date = dayjs(pickDay).format("dddd, MMMM DD, YYYY");
  // console.log(dayjs(pickDay).format("dddd MMMM YYYY"));
  return (
    <div className="w-full h-full flex flex-col  ">
      <h1 className="p-4 pb-2" >
         <span className="text-lg font-semibold text-slate-600">{date}</span>
      </h1>

      <div className=" sm:flex space-x-2 m-2 flex-1">
        <div className="ml-2 sm:ml-0 mb-2 sm:mb-0 sm:w-1/3  h-1/3 sm:h-auto bg-stone-200 rounded-t shadow">
          <h2 className="p-2 font-semibold text-slate-600 ">TO DO</h2>
          <TaskForm uid={user.uid} />
          <ul>
            {error && <p>{error}</p>}
            {todos && todos.map((doc) => <Task key={doc.id} doc={doc} />)}
          </ul>
        </div>
        <div className="mb-2 sm:mb-0  sm:w-1/3 h-1/3 sm:h-auto bg-gray-200 rounded-t shadow">
          <h2 className="p-2  font-semibold text-slate-600 ">DOING</h2>
          <ul>
            {error && <p>{error}</p>}
            {doings && doings.map((doc) => <Task key={doc.id} doc={doc} />)}
          </ul>
        </div>
        <div className="mb-2 sm:mb-0  sm:w-1/3 h-1/3 sm:h-auto bg-slate-200 rounded-t shadow">
          <h2 className="p-2 font-semibold text-slate-600">DONE</h2>
          <ul>
            {error && <p>{error}</p>}
            {dones && dones.map((doc) => <Task key={doc.id} doc={doc} />)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
