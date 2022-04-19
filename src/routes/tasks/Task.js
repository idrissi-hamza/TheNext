// pending_actions
import React from "react";
import { useFirestore } from "../../hooks/useFirestore";
import {
  TrashIcon,
  ClipboardCopyIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline";

const Task = ({ doc }) => {
  const { deleteDocument, doingDocument,doneDocument } = useFirestore("todos");
  console.log(doc.status);
  return (
    <li className="flex items-center group bg-stone-100 m-1 p-2 rounded text-slate-700">
      <span className="mr-auto">{doc.task}</span>
      <div>
        {doc.status === "todo" && (
          <button onClick={() => doingDocument(doc.id)}>
            <ClipboardCopyIcon className=" mt-1 text-yellow-500   opacity-0 group-hover:opacity-100 w-5 h-5" />
          </button>
        )}
        {doc.status === "doing" && (
          <button onClick={() => doneDocument(doc.id)}>
            <ClipboardCheckIcon className=" mt-1 text-green-400  opacity-0 group-hover:opacity-100 w-5 h-5" />
          </button>
        )}
      </div>
      <div>
        <button onClick={() => deleteDocument(doc.id)}>
          <TrashIcon className="mt-1 text-red-400 opacity-0 group-hover:opacity-100 w-5 h-5" />
        </button>
      </div>
    </li>
  );
};

export default Task;
