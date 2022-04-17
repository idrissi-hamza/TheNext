import dayjs from "dayjs";
import React from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCtrlContext } from "../../hooks/useCtrlContext";
import TaskForm from "./TaskForm";
import { useCollection } from "../../hooks/useCollection";
import Task from "./Task";

const Tasks = () => {
  let params = useParams();
  const { pickDay } = useCtrlContext();
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "todos",
    ["uid", "==", user.uid],
    ["createdAt", "desc"],
    ['day', '==', pickDay ]
  );
 
  let date = dayjs(pickDay).format("dddd, MMMM DD, YYYY");
  // console.log(dayjs(pickDay).format("dddd MMMM YYYY"));
  return (
    <div className="w-full h-full flex flex-col">
      <h1 className="p-4 pb-2 text-lg font-semibold text-slate-600">
        Tasks of {date}
      </h1>
      {error && <p>{error}</p>}
      <div className="flex space-x-2 m-2 flex-1">
        <div className="w-1/3 grow-0 bg-stone-200 rounded-t">
          <h2 className="p-2 font-semibold text-slate-600 ">TO DO</h2>
          <TaskForm uid={user.uid} />
          <ul>
            {documents &&
              documents.map((doc) => <Task key={doc.id} doc={doc} />)}
          </ul>

        </div>
        <div className="w-1/3 bg-gray-200 rounded-t">
          <h2 className="p-2 font-semibold text-slate-600">ONGOING</h2>
        </div>
        <div className="w-1/3 bg-slate-200 rounded-t">
          <h2 className="p-2 font-semibold text-slate-600">DONE</h2>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
