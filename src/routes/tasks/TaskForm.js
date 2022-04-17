import { useState, useEffect, useRef } from "react";
import { useCtrlContext } from "../../hooks/useCtrlContext";
import { useFirestore } from "../../hooks/useFirestore";

export default function TaskForm({ uid }) {
  const [task, setTask] = useState("");
  const { pickDay } = useCtrlContext();
  const { addDocument, response } = useFirestore("todos");
  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      task,
      day: pickDay,
    });
  };

  //reset the form fields and focus on name input
  const taskInputRef = useRef(null);

  useEffect(() => {
    if (response.success) {
      setTask("");
      taskInputRef.current.focus();
    }
  }, [response.success]);

  return (
    <>
      <form className=" p-1   rounded-lg " onSubmit={handleSubmit}>
        <label className="flex items-center bg-gray-100 ">
          
          <input
            ref={taskInputRef}
            className="block w-full p-2 border-none outline-hidden  text-gray-500 bg-stone-100  text-base outline-none"
            type="text"
            required
            onChange={(e) => setTask(e.target.value)}
            value={task}
            placeholder='Add a todo'
          />
          
          <button className="material-icons-outlined px-1  ">add</button>
        </label>

        {/* <div className="bg-stone-100 m-1 p-2 rounkded flex items-center justify-start  text-slate-400 pb-1 border-b ">
          <span className="material-icons-outlined">add</span>
          <input
            className="outline-none pl-3 bg-inherit"
            type="text"
            placeholder="Add a todo"
            value={task}
            ref={taskInputRef}
            onChange={(e) => setTask(e.target.value)}
          ></input>
        </div> */}

        {/* <button className="border-2 border-white text-white px-3 py-1 rounded hover:bg-indigo-50 hover:text-indigo-500 focus:bg-indigo-100 font-semibold transition ease-in-out w-full block">
          Add Transaction
        </button> */}
      </form>
    </>
  );
}
