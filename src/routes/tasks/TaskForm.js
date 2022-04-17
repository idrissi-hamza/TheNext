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
      status:'todo'
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
      </form>
    </>
  );
}
