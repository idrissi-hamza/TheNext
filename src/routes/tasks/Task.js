// pending_actions
import React from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { TrashIcon } from "@heroicons/react/outline";

const Task = ({doc}) => {
  const { deleteDocument } = useFirestore("todos");
  console.log(doc);
  return (
    <li className="relative bg-stone-100 m-1 p-2 rounded text-slate-700">
      <span>{doc.task}</span>
      <button
        className="group absolute  text-center right-1 "
        onClick={() => deleteDocument(doc.id)}
      >
        <TrashIcon className="group-hover:text-red-500 w-4 h-4" />
      </button>
    </li>
  );
};

export default Task;
