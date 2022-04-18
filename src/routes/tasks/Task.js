// pending_actions
import React from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { TrashIcon, ClipboardCopyIcon } from "@heroicons/react/outline";

const Task = ({ doc }) => {
  const { deleteDocument,doingDocument } = useFirestore("todos");

  return (
    <li className="flex group bg-stone-100 m-1 p-2 rounded text-slate-700">
      <span className="mr-auto">{doc.task}</span>
      <button
        onClick={() => doingDocument(doc.id)}
      >
        <ClipboardCopyIcon className="  text-green-400 opacity-0 group-hover:opacity-100 w-5 h-5" />
      </button>
      <button
        className=" "
        onClick={() => deleteDocument(doc.id)}
      >
        <TrashIcon className="text-red-400 opacity-0 group-hover:opacity-100 w-5 h-5" />
      </button>
      
    </li>
  );
};

export default Task;
