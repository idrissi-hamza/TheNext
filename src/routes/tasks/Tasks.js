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
    ["createdAt", "desc"],
    ["day", "==", pickDay]
  );
  
  let todos;
  let doings;
  let dones
  if (documents) {
    todos = documents.filter((task) => task.status === "todo");
    doings = documents.filter((task) => task.status === "doing");
    dones = documents.filter((task) => task.status === "done");
  }
 

  let date = dayjs(pickDay).format("dddd, MMMM DD, YYYY");
  // console.log(dayjs(pickDay).format("dddd MMMM YYYY"));
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="p-4 pb-2 text-lg font-semibold text-slate-600">
        Tasks of {date}
      </h1>

      <div className="flex space-x-2 m-2 flex-1">
        <div className="w-1/3  bg-stone-200 rounded-t">
          <h2 className="p-2 font-semibold text-slate-600 ">TO DO</h2>
          <TaskForm uid={user.uid} />
          <ul>
            {error && <p>{error}</p>}
            {todos && todos.map((doc) => <Task key={doc.id} doc={doc} />)}
          </ul>
        </div>
        <div className="w-1/3 bg-gray-200 rounded-t ">
          <h2 className="p-2 font-semibold text-slate-600 pb-3">DOING</h2>
          <ul>
          {error && <p>{error}</p>}
            {doings &&
              doings.map((doc) => <Task key={doc.id} doc={doc} />)}
          </ul>
        </div>
        <div className="w-1/3 bg-slate-200 rounded-t">
          <h2 className="p-2 font-semibold text-slate-600">DONE</h2>
          <ul>  {error && <p>{error}</p>}
            {dones &&
              dones.map((doc) => <Task key={doc.id} doc={doc} />)}</ul>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
